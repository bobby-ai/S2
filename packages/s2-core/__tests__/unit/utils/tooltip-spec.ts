import { createFakeSpreadSheet } from 'tests/util/helpers';
import { BBox } from '@antv/g-canvas';
import {
  getAutoAdjustPosition,
  setContainerStyle,
  getTooltipOptions,
} from '@/utils/tooltip';
import {
  CellTypes,
  SpreadSheet,
  Tooltip,
  TOOLTIP_POSITION_OFFSET,
} from '@/index';
import { BaseFacet } from '@/facet/base-facet';

describe('Tooltip Utils Tests', () => {
  let s2: SpreadSheet;
  let tooltipContainer: HTMLDivElement;

  const containerSize = {
    width: 200,
    height: 200,
    top: 20,
    left: 10,
  };

  const tooltipSize = {
    width: 100,
    height: 100,
  };

  const bodySize = {
    width: 1000,
    height: 1000,
  };

  beforeAll(() => {
    s2 = createFakeSpreadSheet();
    tooltipContainer = {
      getBoundingClientRect: () =>
        ({
          ...tooltipSize,
        } as DOMRect),
    } as HTMLDivElement;
    s2.container.get = () => ({
      getBoundingClientRect: () => ({
        ...containerSize,
      }),
    });
    s2.facet = {
      panelBBox: {
        maxX: containerSize.width,
        maxY: containerSize.height,
      } as BBox,
    } as BaseFacet;
    document.body.getBoundingClientRect = () =>
      ({
        ...bodySize,
      } as DOMRect);
  });

  describe('Tooltip Position Tests', () => {
    test('should get original position if not set autoAdjustBoundary', () => {
      expect(
        getAutoAdjustPosition({
          position: { x: 0, y: 0 },
          autoAdjustBoundary: null,
          spreadsheet: s2,
          tooltipContainer,
        }),
      ).toEqual({
        x: TOOLTIP_POSITION_OFFSET.x,
        y: TOOLTIP_POSITION_OFFSET.y,
      });
    });

    test('should get original position if tooltip width less than container boundary', () => {
      expect(
        getAutoAdjustPosition({
          position: { x: 20, y: 20 },
          autoAdjustBoundary: 'container',
          spreadsheet: s2,
          tooltipContainer,
        }),
      ).toEqual({
        x: 20 + TOOLTIP_POSITION_OFFSET.x,
        y: 20 + TOOLTIP_POSITION_OFFSET.y,
      });
    });

    test('should get auto adjust position if tooltip width more than container boundary', () => {
      // x
      expect(
        getAutoAdjustPosition({
          position: { x: 200, y: 20 },
          autoAdjustBoundary: 'container',
          spreadsheet: s2,
          tooltipContainer,
        }),
      ).toEqual({
        x: containerSize.width - tooltipSize.width + containerSize.left,
        y: 20 + TOOLTIP_POSITION_OFFSET.y,
      });

      // y
      expect(
        getAutoAdjustPosition({
          position: { x: 20, y: 200 },
          autoAdjustBoundary: 'container',
          spreadsheet: s2,
          tooltipContainer,
        }),
      ).toEqual({
        x: 20 + TOOLTIP_POSITION_OFFSET.x,
        y: containerSize.height - tooltipSize.height + containerSize.top,
      });

      // x, y
      expect(
        getAutoAdjustPosition({
          position: { x: 200, y: 200 },
          autoAdjustBoundary: 'container',
          spreadsheet: s2,
          tooltipContainer,
        }),
      ).toEqual({
        x: containerSize.width - tooltipSize.width + containerSize.left,
        y: containerSize.height - tooltipSize.height + containerSize.top,
      });
    });

    test('should get auto adjust position if tooltip width more than body boundary', () => {
      // x
      expect(
        getAutoAdjustPosition({
          position: { x: 900, y: 20 },
          autoAdjustBoundary: 'body',
          spreadsheet: s2,
          tooltipContainer,
        }),
      ).toEqual({
        x: bodySize.width - tooltipSize.width,
        y: 20 + TOOLTIP_POSITION_OFFSET.y,
      });

      // y
      expect(
        getAutoAdjustPosition({
          position: { x: 20, y: 900 },
          autoAdjustBoundary: 'body',
          spreadsheet: s2,
          tooltipContainer,
        }),
      ).toEqual({
        x: 20 + TOOLTIP_POSITION_OFFSET.x,
        y: bodySize.height - tooltipSize.height,
      });

      // x, y
      expect(
        getAutoAdjustPosition({
          position: { x: 900, y: 900 },
          autoAdjustBoundary: 'body',
          spreadsheet: s2,
          tooltipContainer,
        }),
      ).toEqual({
        x: bodySize.width - tooltipSize.width,
        y: bodySize.height - tooltipSize.height,
      });
    });

    test('should get auto adjust position if tooltip width more than container boundary and real render width less container width', () => {
      const panelBBox = {
        maxX: 120,
        maxY: 120,
      };

      s2.facet = {
        panelBBox: panelBBox,
      } as BaseFacet;

      // x, y
      expect(
        getAutoAdjustPosition({
          position: { x: 100, y: 100 },
          autoAdjustBoundary: 'container',
          spreadsheet: s2,
          tooltipContainer,
        }),
      ).toEqual({
        x: panelBBox.maxX - tooltipSize.width + containerSize.left,
        y: panelBBox.maxY - tooltipSize.height + containerSize.top,
      });
    });
  });

  describe('Get Tooltip Options Tests', () => {
    const getCellNameByType = (cellType: CellTypes) => {
      return {
        [CellTypes.ROW_CELL]: 'row',
        [CellTypes.COL_CELL]: 'col',
        [CellTypes.DATA_CELL]: 'data',
        [CellTypes.CORNER_CELL]: 'corner',
      }[cellType];
    };
    test.each([
      CellTypes.ROW_CELL,
      CellTypes.COL_CELL,
      CellTypes.DATA_CELL,
      CellTypes.CORNER_CELL,
    ])(
      'should use %o tooltip content from tooltip config first for string content',
      (cellType) => {
        const tooltipContent = `${cellType} tooltip content`;
        const defaultTooltipContent = 'default tooltip content';
        const type = getCellNameByType(cellType);

        const tooltip: Tooltip = {
          content: defaultTooltipContent,
          [type]: {
            content: tooltipContent,
          },
        };

        const spreadsheet = {
          getCellType: () => cellType,
          options: {
            tooltip,
          },
        } as unknown as SpreadSheet;

        expect(getTooltipOptions(spreadsheet, {} as Event)).toEqual({
          content: tooltipContent,
          [type]: {
            content: tooltipContent,
          },
        });
      },
    );
  });

  test('should set container style', () => {
    const container = document.createElement('div');

    setContainerStyle(container, {
      style: {
        width: '100px',
        pointerEvents: 'none',
      },
    });

    expect(container.style.width).toEqual('100px');
    expect(container.style.pointerEvents).toEqual('none');
  });

  test('should set container class name', () => {
    const container = document.createElement('div');

    setContainerStyle(container, {
      className: 'test',
    });

    expect(container.className).toEqual('test');
  });
});
