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

export type { BlockConfig, Space, State };
