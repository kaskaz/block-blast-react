import { BlockConfig } from "./types";

const BOARD_COORDINATES = { x: 50, y: 100 };

const BLOCKS_PER_LINE = 8;

const BLOCKS_PER_COLUMNS = 8;

const BLOCK_SIZE = 50;

const SHAPES: BlockConfig[] = [
  {
    id: "shape1",
    initialX: 83.33,
    initialY: 600
  },
  {
    id: "shape2",
    initialX: 250,
    initialY: 600
  },
  {
    id: "shape3",
    initialX: 416.66,
    initialY: 600
  }
];

const BLOCK_SHAPES = [
  // dot
  [(x: number, y: number, size: number) => { return { x: x, y: y } }],
  // normal S
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y + size } },
  ],
  // vertical S
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y + size } },
  ],
  // normal Z
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
  ],
  // vertical Z
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
  ],
  // normal L
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y + size } },
  ],
  // horizontal right L
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y + size } },
  ],
  // horizontal left L
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y - size } },
  ],
  // upside down L
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y - size } },
  ],
  // mirrored L
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y + size } },
  ],
  // mirrored horizontal right L
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y - size } },
  ],
  // mirrored horizontal left L
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y + size } },
  ],
  // mirrored upside down L
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y - size } },
  ],
  // small bottom left corner 
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } }
  ],
  // small bottom right corner 
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } }
  ],
  // small upper left corner
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } }
  ],
  // small upper right corner
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } }
  ],
  // large bottom left corner 
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x, y: y - 2 * size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + 2 * size, y: y } }
  ],
  // large bottom right corner 
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x, y: y - 2 * size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
    (x: number, y: number, size: number) => { return { x: x - 2 * size, y: y } }
  ],
  // large upper left corner
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + 2 * size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + 2 * size, y: y } }
  ],
  // large upper right corner
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + 2 * size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
    (x: number, y: number, size: number) => { return { x: x - 2 * size, y: y } }
  ],
  // vertical line 2
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } }
  ],
  // vertical line 3
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + 2 * size } }
  ],
  // vertical line 4
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + 2 * size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + 3 * size } }
  ],
  // vertical line 5
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + 2 * size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + 3 * size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + 4 * size } }
  ],
  // horizontal line 2
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } }
  ],
  // horizontal line 3
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + 2 * size, y: y } }
  ],
  // horizontal line 4
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + 2 * size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + 3 * size, y: y } }
  ],
  // horizontal line 5
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + 2 * size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + 3 * size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + 4 * size, y: y } }
  ],
  // small T normal
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } }
  ],
  // small T upside-down
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } }
  ],
  // small T rotate right
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } }
  ],
  // small T rotate left
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } }
  ],
  // 2-sided square
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y - size } }
  ],
  // 3-sided square
  [
    (x: number, y: number, size: number) => { return { x: x, y: y } },
    (x: number, y: number, size: number) => { return { x: x, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y - size } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y } },
    (x: number, y: number, size: number) => { return { x: x - size, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x, y: y + size } },
    (x: number, y: number, size: number) => { return { x: x + size, y: y + size } }
  ]
];

export { BOARD_COORDINATES, BLOCKS_PER_LINE, BLOCKS_PER_COLUMNS, SHAPES, BLOCK_SIZE, BLOCK_SHAPES };
