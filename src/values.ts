import { BlockConfig } from "./types";

const BLOCKS_PER_LINE = 8;

const BLOCKS_PER_COLUMNS = 8;

const BLOCK_SIZE = 50;

const BOARD_COORDINATES = { 
  x: (window.document.body.clientWidth / 2) - (BLOCK_SIZE * (BLOCKS_PER_LINE / 2)), 
  y: 100 
};

const GAMEOVER_PANEL_SIZE = {
  width: 150,
  heigth: 150
};

const GAMEOVER_PANEL_COORDINATES = {
  x: BOARD_COORDINATES.x + (BLOCK_SIZE * (BLOCKS_PER_LINE / 2)) - (GAMEOVER_PANEL_SIZE.width / 2),
  y: BOARD_COORDINATES.y + (BLOCK_SIZE * (BLOCKS_PER_LINE / 2)) - (GAMEOVER_PANEL_SIZE.heigth / 2)
};

const SHAPES: BlockConfig[] = [
  {
    id: "shape1",
    initialX: (window.document.body.clientWidth / 2) - (BLOCK_SIZE * (BLOCKS_PER_LINE / 2)),
    initialY: 600
  },
  {
    id: "shape2",
    initialX: (window.document.body.clientWidth / 2),
    initialY: 600
  },
  {
    id: "shape3",
    initialX: (window.document.body.clientWidth / 2) + (BLOCK_SIZE * (BLOCKS_PER_LINE / 2)),
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

const BLOCK_COLORS = [
  // blue
  {
    center: '#3D60E2',
    top: '#82ABFA',
    bottom: '#21358E',
    right: '#284FC8',
    left: '#446BF4'
  },
  // light blue
  {
    center: '#2FB3E3',
    top: '#95EEFF',
    bottom: '#086DA3',
    right: '#1F91CF',
    left: '#46CBEE'
  },
  // red
  {
    center: '#C53131',
    top: '#F1878B',
    bottom: '#861E25',
    right: '#A62927',
    left: '#D34142'
  },
  // orange
  {
    center: '#ED7D29',
    top: '#FFBE84',
    bottom: '#974806',
    right: '#C05D19',
    left: '#FD8838'
  },
  // green
  {
    center: '#36B83C',
    top: '#84F198',
    bottom: '#0E6F28',
    right: '#279234',
    left: '#45D64D'
  },
  // purple
  {
    center: '#8B57D5',
    top: '#D8A0F7',
    bottom: '#582A82',
    right: '#6E379F',
    left: '#955ED3'
  },
  // yellow
  {
    center: '#E8B737',
    top: '#F7E47B',
    bottom: '#AD7218',
    right: '#CA9219',
    left: '#FAC940'
  },
];

const SCORE_EMPTY_BOARD = 300;

export {
  BOARD_COORDINATES,
  GAMEOVER_PANEL_SIZE,
  GAMEOVER_PANEL_COORDINATES,
  BLOCKS_PER_LINE,
  BLOCKS_PER_COLUMNS,
  SHAPES,
  BLOCK_SIZE,
  BLOCK_SHAPES,
  BLOCK_COLORS,
  SCORE_EMPTY_BOARD
};
