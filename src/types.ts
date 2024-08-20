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

export type { BlockConfig, Space };
