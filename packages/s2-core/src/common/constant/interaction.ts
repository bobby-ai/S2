export enum InteractionName {
  DATA_CELL_CLICK = 'dataCellClick',
  MERGED_CELLS_CLICK = 'mergedCellsClick',
  ROW_COLUMN_CLICK = 'rowColumnClick',
  ROW_TEXT_CLICK = 'rowTextClick',
  HOVER = 'hover',
  BRUSH_SELECTION = 'brushSelection',
  COL_ROW_RESIZE = 'rowColResize',
  DATA_CELL_MULTI_SELECTION = 'dataCellMultiSelection',
  COL_ROW_SHIFT_MULTI_SELECTION = 'colRowShiftMultiSelection',
  SELECTED_CELL_MOVE = 'selectedCellMove',
}

export enum InteractionStateName {
  ALL_SELECTED = 'allSelected',
  SELECTED = 'selected',
  UNSELECTED = 'unselected',
  HOVER = 'hover',
  HOVER_FOCUS = 'hoverFocus',
  PREPARE_SELECT = 'prepareSelect',
}

export enum CellTypes {
  DATA_CELL = 'dataCell',
  HEADER_CELL = 'headerCell',
  ROW_CELL = 'rowCell',
  COL_CELL = 'colCell',
  CORNER_CELL = 'cornerCell',
  MERGED_CELL = 'mergedCell',
}

export const HOVER_FOCUS_TIME = 800;

// 主题配置和canvas属性的映射
export const SHAPE_STYLE_MAP = {
  textOpacity: 'fillOpacity',
  backgroundOpacity: 'fillOpacity',
  backgroundColor: 'fill',
  borderOpacity: 'strokeOpacity',
  borderColor: 'stroke',
  borderWidth: 'lineWidth',
  opacity: 'opacity',
};

// 设置属性的时候实际对应改变的shape映射
export const SHAPE_ATTRS_MAP = {
  textShape: ['textOpacity'],
  linkFieldShape: ['opacity'],
  interactiveBgShape: ['backgroundColor', 'backgroundOpacity'],
  interactiveBorderShape: ['borderColor', 'borderOpacity', 'borderWidth'],
};

export const INTERACTION_STATE_INFO_KEY = 'interactionStateInfo';

export enum InteractionBrushSelectionStage {
  CLICK = 'click',
  UN_DRAGGED = 'unDragged',
  DRAGGED = 'dragged',
}

export enum InteractionKeyboardKey {
  SHIFT = 'Shift',
  COPY = 'c',
  ESC = 'Escape',
  META = 'Meta',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
}

export enum SortMethodType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum InterceptType {
  HOVER = 'hover',
  CLICK = 'click',
  BRUSH_SELECTION = 'brushSelection',
  MULTI_SELECTION = 'multiSelection',
  RESIZE = 'resize',
}

export enum ScrollbarPositionType {
  CONTENT = 'content',
  CANVAS = 'canvas',
}
