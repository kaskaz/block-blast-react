import { GameEngine } from 'react-game-engine';
import { Block, Board } from "./renderers";
import { DragBlock, DropBlock, MoveBlock, TargetSpace } from "./systems";
import { BLOCKS, BOARD_COORDINATES } from './values';

function App() {
  return (
    <GameEngine
      style={{ width: 800, height: 600, backgroundColor: "blue" }}
      systems={[DragBlock, DropBlock, MoveBlock, TargetSpace]}
      entities={{
        state: { selected: "", isOnTarget: false, spacesOnTarget: [] },
        board: { x: BOARD_COORDINATES.x, y: BOARD_COORDINATES.y, spaces: [{ x: 150, y: 150 }], renderer: <Board />},
        block1: {x: BLOCKS[0].initialX, y: BLOCKS[0].initialY, id: BLOCKS[0].id, selected: false, renderer: <Block />},
        block2: {x: BLOCKS[1].initialX, y: BLOCKS[1].initialY, id: BLOCKS[1].id, selected: false, renderer: <Block />},
        block3: {x: BLOCKS[2].initialX, y: BLOCKS[2].initialY, id: BLOCKS[2].id, selected: false, renderer: <Block />}
      }}>
    </GameEngine>
  );
}

export default App;
