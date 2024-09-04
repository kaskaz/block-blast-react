type BlockConfig = {
  id: string
  initialX: number
  initialY: number
};

type Space = {
  x: number
  y: number
  occupied: boolean
}

type State = {
  selected: string
  isOnTarget: boolean
  spacesOnTarget: string[]
  lastBlocksFilled: number
  score: number
  filledRowsAndColumns: number
}

type ShapeFunction = (x: number, y: number, size: number) => { x: number, y: number };

export type { BlockConfig, Space, State, ShapeFunction };
