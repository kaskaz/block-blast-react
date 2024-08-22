import { BlockConfig } from "./types";

const BOARD_COORDINATES = { x: 50, y: 50 };

const BLOCKS_PER_LINE = 8;

const BLOCKS_PER_COLUMNS = 8;

const BLOCK_SIZE = 50;

const BLOCKS: BlockConfig[] = [
  {
    id: "block1",
    initialX: 100,
    initialY: 500
  },
  {
    id: "block2",
    initialX: 220,
    initialY: 500
  },
  {
    id: "block3",
    initialX: 350,
    initialY: 500
  }
];

const SHAPES: BlockConfig[] = [
  {
    id: "shape1",
    initialX: 95,
    initialY: 600
  },
  {
    id: "shape2",
    initialX: 255,
    initialY: 600
  },
  {
    id: "shape3",
    initialX: 415,
    initialY: 600
  }
];

const BLOCK_SHAPES = [
  // dot
  [(x: number, y: number) => { return { x: x, y: y }}],
  // normal S
  [
    (x: number, y: number) => { return { x: x, y: y }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y }},
    (x: number, y: number) => { return { x: x, y: y+BLOCK_SIZE }},
    (x: number, y: number) => { return { x: x-BLOCK_SIZE, y: y+BLOCK_SIZE }},
  ],
  // vertical S
  [
    (x: number, y: number) => { return { x: x, y: y }},
    (x: number, y: number) => { return { x: x, y: y-BLOCK_SIZE }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y+BLOCK_SIZE }},
  ],
  // normal Z
  [
    (x: number, y: number) => { return { x: x, y: y }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y+BLOCK_SIZE }},
    (x: number, y: number) => { return { x: x, y: y+BLOCK_SIZE }},
    (x: number, y: number) => { return { x: x-BLOCK_SIZE, y: y }},
  ],
  // vertical Z
  [
    (x: number, y: number) => { return { x: x, y: y }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y-BLOCK_SIZE }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y }},
    (x: number, y: number) => { return { x: x, y: y+BLOCK_SIZE }},
  ],
  // normal L
  [
    (x: number, y: number) => { return { x: x, y: y }},
    (x: number, y: number) => { return { x: x, y: y-BLOCK_SIZE }},
    (x: number, y: number) => { return { x: x, y: y+BLOCK_SIZE }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y+BLOCK_SIZE }},
  ],
  // horizontal right L
  [
    (x: number, y: number) => { return { x: x, y: y }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y }},
    (x: number, y: number) => { return { x: x-BLOCK_SIZE, y: y }},
    (x: number, y: number) => { return { x: x-BLOCK_SIZE, y: y+BLOCK_SIZE }},
  ],
  // horizontal left L
  [
    (x: number, y: number) => { return { x: x, y: y }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y }},
    (x: number, y: number) => { return { x: x-BLOCK_SIZE, y: y }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y+BLOCK_SIZE }},
  ],
  // upside down L
  [
    (x: number, y: number) => { return { x: x, y: y }},
    (x: number, y: number) => { return { x: x, y: y+BLOCK_SIZE }},
    (x: number, y: number) => { return { x: x, y: y-BLOCK_SIZE }},
    (x: number, y: number) => { return { x: x+BLOCK_SIZE, y: y-BLOCK_SIZE }},
  ]
];

export { BOARD_COORDINATES, BLOCKS_PER_LINE, BLOCKS_PER_COLUMNS, BLOCKS, SHAPES, BLOCK_SIZE, BLOCK_SHAPES };
