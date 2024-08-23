import { GameEngine } from 'react-game-engine';
import { Block, BlockShape, Board, ScorePanel, TargetSpaceShadow } from "./renderers";
import { DragBlock, DropBlock, MoveBlock, TargetSpace, NextLevel, Score, DragBlockShape, DropBlockShape, MoveBlockShape, TargetSpaceByShape, GameOver } from "./systems";
import { BLOCK_SHAPES, BLOCK_SIZE, BLOCKS, BLOCKS_PER_COLUMNS, BLOCKS_PER_LINE, BOARD_COORDINATES, SHAPES } from './values';
import { Space } from './types';
import { useEffect, useRef, useState } from 'react';

function GameOverPanel({ show, onRestart }: { show: boolean, onRestart: () => void }) {
  return (
    <div
      style={{
        display: show ? 'flex': 'none',
        flexDirection: "column",
        position: "absolute",
        zIndex: 1000,
        left: 200,
        top: 200,
        width: "100px",
        height: "100px",
        backgroundColor: "black"
      }}
    >
      <p style={{color: "white", textAlign: "center"}}>
        Game Over
      </p>
      <button onClick={() => onRestart()}>restart</button>
    </div>
  );
}

function App() {
  const gameEngineRef = useRef<any>();
  const [running, setRunning] = useState(true);
  const [showGameOver, setShowGameOver] = useState(false);

  const initializeBoard = (): Map<string, Space> => {
    let _spaces: Map<string, Space> = new Map();

    for (let column = 0; column < BLOCKS_PER_COLUMNS; column++) {
      for (let line = 0; line < BLOCKS_PER_LINE; line++) {
        _spaces.set(`${column+1}${line+1}`, { x: column*BLOCK_SIZE, y: line*BLOCK_SIZE, occupied: false });
      }
    }

    return _spaces;
  }

  const randomizeBlockShape = () => BLOCK_SHAPES[Math.floor(Math.random()*BLOCK_SHAPES.length)];

  const handleGameOver = () => {
    if (gameEngineRef && gameEngineRef.current) {
      setRunning(false);
      setShowGameOver(true); 
    }
  }

  const handleRestart = () => {
    if (gameEngineRef && gameEngineRef.current) {
      gameEngineRef.current.swap({
        state: {selected: "", isOnTarget: false, spacesOnTarget: [], lastBlocksFilled: 0, score: 0, filledRowsAndColumns: 0, onGameOver: handleGameOver },
        board: {x: BOARD_COORDINATES.x, y: BOARD_COORDINATES.y, spaces: initializeBoard(), renderer: <Board />},
        block1: {x: BLOCKS[0].initialX, y: BLOCKS[0].initialY, id: BLOCKS[0].id, selected: false, available: true, renderer: <Block />},
        block2: {x: BLOCKS[1].initialX, y: BLOCKS[1].initialY, id: BLOCKS[1].id, selected: false, available: true, renderer: <Block />},
        block3: {x: BLOCKS[2].initialX, y: BLOCKS[2].initialY, id: BLOCKS[2].id, selected: false, available: true, renderer: <Block />},
        shape1: {x: SHAPES[0].initialX, y: SHAPES[0].initialY, id: SHAPES[0].id, shape: randomizeBlockShape(), selected: false, available: true, renderer: <BlockShape />},
        shape2: {x: SHAPES[1].initialX, y: SHAPES[1].initialY, id: SHAPES[1].id, shape: randomizeBlockShape(), selected: false, available: true, renderer: <BlockShape />},
        shape3: {x: SHAPES[2].initialX, y: SHAPES[2].initialY, id: SHAPES[2].id, shape: randomizeBlockShape(), selected: false, available: true, renderer: <BlockShape />},
        shadow: {x: 0, y: 0, shape: [], renderer: <TargetSpaceShadow />},
        scorePanel: {x: 100, y: 10, score: 0, renderer: <ScorePanel /> }
      })
      setRunning(true);
      setShowGameOver(false);
    }
  }

  return (
    <>
      <GameOverPanel show={showGameOver} onRestart={handleRestart} />
      <GameEngine
        ref={gameEngineRef}
        style={{ width: 500, height: 600, backgroundColor: "blue" }}
        systems={[DragBlock, DragBlockShape, DropBlock, DropBlockShape, MoveBlock, MoveBlockShape, TargetSpace, TargetSpaceByShape, NextLevel, Score, GameOver]}
        entities={{
          state: {selected: "", isOnTarget: false, spacesOnTarget: [], lastBlocksFilled: 0, score: 0, filledRowsAndColumns: 0, onGameOver: handleGameOver },
          board: {x: BOARD_COORDINATES.x, y: BOARD_COORDINATES.y, spaces: initializeBoard(), renderer: <Board />},
          block1: {x: BLOCKS[0].initialX, y: BLOCKS[0].initialY, id: BLOCKS[0].id, selected: false, available: true, renderer: <Block />},
          block2: {x: BLOCKS[1].initialX, y: BLOCKS[1].initialY, id: BLOCKS[1].id, selected: false, available: true, renderer: <Block />},
          block3: {x: BLOCKS[2].initialX, y: BLOCKS[2].initialY, id: BLOCKS[2].id, selected: false, available: true, renderer: <Block />},
          shape1: {x: SHAPES[0].initialX, y: SHAPES[0].initialY, id: SHAPES[0].id, shape: randomizeBlockShape(), selected: false, available: true, renderer: <BlockShape />},
          shape2: {x: SHAPES[1].initialX, y: SHAPES[1].initialY, id: SHAPES[1].id, shape: randomizeBlockShape(), selected: false, available: true, renderer: <BlockShape />},
          shape3: {x: SHAPES[2].initialX, y: SHAPES[2].initialY, id: SHAPES[2].id, shape: randomizeBlockShape(), selected: false, available: true, renderer: <BlockShape />},
          shadow: {spaces: [], renderer: <TargetSpaceShadow />},
          scorePanel: {x: 100, y: 10, score: 0, renderer: <ScorePanel /> }
        }}
        running={running}
      />
    </>
  );
}

export default App;
