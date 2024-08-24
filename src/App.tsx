import { GameEngine } from 'react-game-engine';
import { BlockShape, Board, ScorePanel, TargetSpaceShadow } from "./renderers";
import { NextLevel, Score, DragBlockShape, DropBlockShape, MoveBlockShape, TargetSpaceByShape, GameOver } from "./systems";
import { BLOCK_SHAPES, BLOCK_SIZE, BLOCKS_PER_COLUMNS, BLOCKS_PER_LINE, BOARD_COORDINATES, SHAPES } from './values';
import { Space } from './types';
import { useRef, useState } from 'react';

function GameOverPanel({ show, onRestart }: { show: boolean, onRestart: () => void }) {
  return (
    <div
      style={{
        display: show ? 'flex' : 'none',
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
      <p style={{ color: "white", textAlign: "center" }}>
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
        _spaces.set(`${column + 1}${line + 1}`, { x: column * BLOCK_SIZE, y: line * BLOCK_SIZE, occupied: false });
      }
    }

    return _spaces;
  }

  const randomizeBlockShape = () => BLOCK_SHAPES[Math.floor(Math.random() * BLOCK_SHAPES.length)];

  const entities = () => {
    return {
      state: { selected: "", isOnTarget: false, spacesOnTarget: [], lastBlocksFilled: 0, score: 0, filledRowsAndColumns: 0, onGameOver: handleGameOver },
      board: { x: BOARD_COORDINATES.x, y: BOARD_COORDINATES.y, spaces: initializeBoard(), renderer: <Board /> },
      shape1: { x: SHAPES[0].initialX, y: SHAPES[0].initialY, id: SHAPES[0].id, shape: randomizeBlockShape(), selected: false, available: true, renderer: <BlockShape /> },
      shape2: { x: SHAPES[1].initialX, y: SHAPES[1].initialY, id: SHAPES[1].id, shape: randomizeBlockShape(), selected: false, available: true, renderer: <BlockShape /> },
      shape3: { x: SHAPES[2].initialX, y: SHAPES[2].initialY, id: SHAPES[2].id, shape: randomizeBlockShape(), selected: false, available: true, renderer: <BlockShape /> },
      shadow: { spaces: [], renderer: <TargetSpaceShadow /> },
      scorePanel: { x: 100, y: 10, score: 0, renderer: <ScorePanel /> }
    };
  }

  const handleGameOver = () => {
    if (gameEngineRef && gameEngineRef.current) {
      setRunning(false);
      setShowGameOver(true);
    }
  }

  const handleRestart = () => {
    if (gameEngineRef && gameEngineRef.current) {
      gameEngineRef.current.swap(entities());
      setRunning(true);
      setShowGameOver(false);
    }
  }

  return (
    <>
      <GameOverPanel
        show={showGameOver}
        onRestart={handleRestart}
      />
      <GameEngine
        ref={gameEngineRef}
        style={{ width: 500, height: 600, backgroundColor: "blue" }}
        systems={[DragBlockShape, DropBlockShape, MoveBlockShape, TargetSpaceByShape, NextLevel, Score, GameOver]}
        entities={entities()}
        running={running}
      />
    </>
  );
}

export default App;
