type BlockConfig = {
  id: string
  initialX: number
  initialY: number
};

type Colors = {
  center: string,
  top: string,
  bottom: string,
  right: string,
  left: string
};

type Coordinates = {
  x: number
  y: number
}

type Space = {
  x: number
  y: number
  occupied: boolean
  colors: Colors
};

type State = {
  selected: string
  isOnTarget: boolean
  spacesOnTarget: string[]
  lastBlocksFilled: number
  score: number
  filledRowsAndColumns: number
};

type ShapeFunction = (x: number, y: number, size: number) => { x: number, y: number };

export type { BlockConfig, Coordinates, Colors, Space, State, ShapeFunction };
