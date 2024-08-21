import { GameEngine } from 'react-game-engine';
import { Block, Board } from "./renderers";
import { DragBlock, DropBlock, MoveBlock, TargetSpace, NextLevel } from "./systems";
import { BLOCK_SIZE, BLOCKS, BOARD_COORDINATES } from './values';
import { Space } from './types';

function App() {
  const initializeBoard = (): Map<string, Space> => {
    let _spaces: Map<string, Space> = new Map();

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        _spaces.set(`${i+1}${j+1}`, { x: i*BLOCK_SIZE, y: j*BLOCK_SIZE, occupied: false });
      }
    }

    return _spaces;
  }

  return (
    <GameEngine
      style={{ width: 500, height: 600, backgroundColor: "blue" }}
      systems={[DragBlock, DropBlock, MoveBlock, TargetSpace, NextLevel]}
      entities={{
        state: { selected: "", isOnTarget: false, spacesOnTarget: [] },
        board: { x: BOARD_COORDINATES.x, y: BOARD_COORDINATES.y, spaces: initializeBoard(), renderer: <Board />},
        block1: {x: BLOCKS[0].initialX, y: BLOCKS[0].initialY, id: BLOCKS[0].id, selected: false, available: true, renderer: <Block />},
        block2: {x: BLOCKS[1].initialX, y: BLOCKS[1].initialY, id: BLOCKS[1].id, selected: false, available: true, renderer: <Block />},
        block3: {x: BLOCKS[2].initialX, y: BLOCKS[2].initialY, id: BLOCKS[2].id, selected: false, available: true, renderer: <Block />}
      }}>
    </GameEngine>
  );
}

export default App;
