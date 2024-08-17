import { GameEngine } from 'react-game-engine';
import { Block, Board } from "./renderers";
import { DragBlock, DropBlock, MoveBlock } from "./systems";

function App() {
  return (
    <GameEngine
      style={{ width: 800, height: 600, backgroundColor: "blue" }}
      systems={[DragBlock, DropBlock, MoveBlock]}
      entities={{
        state: { selected: "" },
        board: { x: 50, y: 50, renderer: <Board />},
        block1: {x: 100, y: 500, id: "block1", selected: false, renderer: <Block />},
        block2: {x: 220, y: 500, id: "block2", selected: false, renderer: <Block />},
        block3: {x: 350, y: 500, id: "block3", selected: false, renderer: <Block />}
      }}>
    </GameEngine>
  );
}

export default App;
