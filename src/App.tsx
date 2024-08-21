import { GameEngine } from 'react-game-engine';
import { Block, Board, ScorePanel } from "./renderers";
import { DragBlock, DropBlock, MoveBlock, TargetSpace, NextLevel, Score } from "./systems";
import { BLOCK_SIZE, BLOCKS, BLOCKS_PER_COLUMNS, BLOCKS_PER_LINE, BOARD_COORDINATES } from './values';
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
      systems={[DragBlock, DropBlock, MoveBlock, TargetSpace, NextLevel, Score]}
      entities={{
        state: {selected: "", isOnTarget: false, spacesOnTarget: [], score: 0},
        board: {x: BOARD_COORDINATES.x, y: BOARD_COORDINATES.y, spaces: initializeBoard(), renderer: <Board />},
        block1: {x: BLOCKS[0].initialX, y: BLOCKS[0].initialY, id: BLOCKS[0].id, selected: false, available: true, renderer: <Block />},
        block2: {x: BLOCKS[1].initialX, y: BLOCKS[1].initialY, id: BLOCKS[1].id, selected: false, available: true, renderer: <Block />},
        block3: {x: BLOCKS[2].initialX, y: BLOCKS[2].initialY, id: BLOCKS[2].id, selected: false, available: true, renderer: <Block />},
        scorePanel: {x: 10, y: 10, score: 0, renderer: <ScorePanel /> }
      }}>
    </GameEngine>
  );
}

export default App;
