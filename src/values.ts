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

export { BOARD_COORDINATES, BLOCKS_PER_LINE, BLOCKS_PER_COLUMNS, BLOCKS, BLOCK_SIZE };
