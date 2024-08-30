import { GameEngine } from 'react-game-engine';
import { BlockShape, Board, ScorePanel, ScorePreviewHighlight, TargetSpaceShadow } from "./renderers";
import { NextLevel, Score, ScorePreview, DragBlockShape, DropBlockShape, MoveBlockShape, TargetSpaceByShape, GameOver, EVENT } from "./systems";
import { BLOCK_SHAPES, BLOCK_SIZE, BLOCKS_PER_COLUMNS, BLOCKS_PER_LINE, BOARD_COORDINATES, SHAPES } from './values';
import { BlockConfig, Space } from './types';
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

  const initializeBlockShape = (config: BlockConfig) => {
    return {
      id: config.id,
      x: config.initialX,
      y: config.initialY,
      initialX: config.initialX,
      initialY: config.initialY,
      shape: randomizeBlockShape(),
      selected: false,
      isDragged: false,
      available: true,
      renderer: <BlockShape />
    }
  };

  const entities = () => {
    return {
      state: { selected: "", isOnTarget: false, spacesOnTarget: [], lastBlocksFilled: 0, score: 0, filledRowsAndColumns: 0 },
      board: { x: BOARD_COORDINATES.x, y: BOARD_COORDINATES.y, spaces: initializeBoard(), renderer: <Board /> },
      shape1: initializeBlockShape(SHAPES[0]),
      shape2: initializeBlockShape(SHAPES[1]),
      shape3: initializeBlockShape(SHAPES[2]),
      shadow: { spaces: [], renderer: <TargetSpaceShadow /> },
      preview: { spaces: [], renderer: <ScorePreviewHighlight /> },
      scorePanel: { x: 100, y: 10, score: 0, renderer: <ScorePanel /> }
    };
  }

  const gameOver = () => {
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

  const handleEvent = (event: { type: string }) => {
    console.log("event:", event.type);

    switch (event.type) {
      case EVENT.GAME_OVER:
        gameOver();
        break;

      default:
        break;
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
        style={{ width: 500, height: 700, backgroundColor: "blue" }}
        systems={[DragBlockShape, DropBlockShape, MoveBlockShape, TargetSpaceByShape, NextLevel, Score, ScorePreview, GameOver]}
        entities={entities()}
        onEvent={handleEvent}
        running={running}
      />
    </>
  );
}

export default App;
