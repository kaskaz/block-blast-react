import { GameEngine } from 'react-game-engine';
import { Block, BlockShape, Board, ScorePanel } from "./renderers";
import { DragBlock, DropBlock, MoveBlock, TargetSpace, NextLevel, Score, DragBlockShape, DropBlockShape, MoveBlockShape, TargetSpaceByShape } from "./systems";
import { BLOCK_SHAPES, BLOCK_SIZE, BLOCKS, BLOCKS_PER_COLUMNS, BLOCKS_PER_LINE, BOARD_COORDINATES } from './values';
import { Space } from './types';

function App() {
  const initializeBoard = (): Map<string, Space> => {
    let _spaces: Map<string, Space> = new Map();

    for (let column = 0; column < BLOCKS_PER_COLUMNS; column++) {
      for (let line = 0; line < BLOCKS_PER_LINE; line++) {
        _spaces.set(`${column+1}${line+1}`, { x: column*BLOCK_SIZE, y: line*BLOCK_SIZE, occupied: false });
      }
    }

    return _spaces;
  }

  return (
    <GameEngine
      style={{ width: 500, height: 600, backgroundColor: "blue" }}
      systems={[DragBlock, DragBlockShape, DropBlock, DropBlockShape, MoveBlock, MoveBlockShape, TargetSpace, TargetSpaceByShape, NextLevel, Score]}
      entities={{
        state: {selected: "", isOnTarget: false, spacesOnTarget: [], lastBlocksFilled: 0, score: 0, filledRowsAndColumns: 0},
        board: {x: BOARD_COORDINATES.x, y: BOARD_COORDINATES.y, spaces: initializeBoard(), renderer: <Board />},
        block1: {x: BLOCKS[0].initialX, y: BLOCKS[0].initialY, id: BLOCKS[0].id, selected: false, available: true, renderer: <Block />},
        block2: {x: BLOCKS[1].initialX, y: BLOCKS[1].initialY, id: BLOCKS[1].id, selected: false, available: true, renderer: <Block />},
        block3: {x: BLOCKS[2].initialX, y: BLOCKS[2].initialY, id: BLOCKS[2].id, selected: false, available: true, renderer: <Block />},
        shape1: {x: 100, y: 600, id: "shape1", shape: BLOCK_SHAPES[1], selected: false, available: true, renderer: <BlockShape />},
        scorePanel: {x: 10, y: 10, score: 0, renderer: <ScorePanel /> }
      }}
    />
  );
}

export default App;
