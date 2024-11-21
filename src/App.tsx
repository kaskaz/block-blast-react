import { GameEngine } from 'react-game-engine';
import { BlockShape, Board, ScorePanel, ScorePreviewHighlight, TargetSpaceShadow } from "./renderers";
import { NextLevel, Score, ScorePreview, DragBlockShape, DropBlockShape, MoveBlockShape, TargetSpaceByShape, GameOver, EVENT } from "./systems";
import { BLOCK_COLORS, BLOCK_SHAPES, BLOCK_SIZE, BLOCKS_PER_COLUMNS, BLOCKS_PER_LINE, BOARD_COORDINATES, GAMEOVER_PANEL_COORDINATES, GAMEOVER_PANEL_SIZE, SHAPES } from './values';
import { BlockConfig, Space } from './types';
import { useRef, useState } from 'react';

function GameOverPanel({ show, onRestart }: { show: boolean, onRestart: () => void }) {
  return (
    <div
      style={{
        display: show ? 'flex' : 'none',
        flexDirection: "column",
        justifyContent: 'space-evenly',
        position: "absolute",
        zIndex: 1000,
        left: GAMEOVER_PANEL_COORDINATES.x,
        top: GAMEOVER_PANEL_COORDINATES.y,
        width: GAMEOVER_PANEL_SIZE.width,
        height: GAMEOVER_PANEL_SIZE.heigth,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <p style={{
        color: "white",
        textAlign: "center",
        fontFamily: 'fantasy',
        fontSize: 'x-large',
        margin: 0
      }}>
        Game Over
      </p>
      <button
        style={{
          width: '80%',
          alignSelf: 'center',
          fontFamily: 'fantasy',
          fontSize: 'medium',
          backgroundColor: '#82ABFA',
          color: '#21358E',
          border: 'none',
          borderRadius: '2px',
          padding: '4px 6px'
        }}
        onClick={() => onRestart()}
      >
        restart
      </button>
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
        _spaces.set(
          `${column + 1}${line + 1}`,
          {
            x: column * BLOCK_SIZE,
            y: line * BLOCK_SIZE,
            occupied: false,
            colors: { center: '', top: '', bottom: '', right: '', left: '' }
          }
        );
      }
    }

    return _spaces;
  }

  const randomizeBlockShape = () => BLOCK_SHAPES[Math.floor(Math.random() * BLOCK_SHAPES.length)];

  const randomizeBlockColor = () => BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];

  const initializeBlockShape = (config: BlockConfig) => {
    return {
      id: config.id,
      x: config.initialX,
      y: config.initialY,
      initialX: config.initialX,
      initialY: config.initialY,
      shape: randomizeBlockShape(),
      colors: randomizeBlockColor(),
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
      shadow: { spaces: [], colors: {}, renderer: <TargetSpaceShadow /> },
      preview: { spaces: [], colors: {}, renderer: <ScorePreviewHighlight /> },
      scorePanel: { score: 0, renderer: <ScorePanel /> }
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <GameOverPanel
        show={showGameOver}
        onRestart={handleRestart}
      />
      <GameEngine
        ref={gameEngineRef}
        style={{ width: 500, height: 700 }}
        systems={[DragBlockShape, DropBlockShape, MoveBlockShape, TargetSpaceByShape, NextLevel, Score, ScorePreview, GameOver]}
        entities={entities()}
        onEvent={handleEvent}
        running={running}
      />
    </div>
  );
}

export default App;
