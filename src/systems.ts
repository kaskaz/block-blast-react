import { Space, State } from "./types";
import { BLOCK_SHAPES, BLOCK_SIZE, BLOCKS_PER_COLUMNS, BLOCKS_PER_LINE, BOARD_COORDINATES, SHAPES } from "./values";

const hasBlockShapeId = (blockId: string): boolean => {
  return SHAPES.map(b => b.id).some(id => id == blockId);
}

const DragBlockShape = (entities: any, { input }: { input: any }) => {
  const { name, payload } = input.find((x: any) => x.name === "onMouseDown") || {};
  
  if (name === "onMouseDown" && payload) {
    const blockId = payload.target.id;

    if (hasBlockShapeId(blockId)) {
      entities["state"].selected = blockId;
    }  
  }

  return entities;
};

const DropBlockShape = (entities: any, { input }: { input: any }) => {
  const { name, payload } = input.find((x: any) => x.name === "onMouseUp") || {};
  const blockId = entities["state"].selected;

  if (name === "onMouseUp" && payload) {
    if (hasBlockShapeId(blockId)) {
      if (entities["state"].isOnTarget) {
        for (let i = 0; i < entities["state"].spacesOnTarget.length; i++) {
          let spaceId = entities["state"].spacesOnTarget[i];
          let space = (entities["board"].spaces as Map<string, Space>).get(spaceId);
          
          if (space) {
            space.occupied = true;
            (entities["state"] as State).lastBlocksFilled++;
          }
          
          entities[blockId].available = false;
        }
      } else {
        const blockShapeConfig = SHAPES.find(x => x.id == blockId);
        entities[blockId].x = blockShapeConfig?.initialX;
        entities[blockId].y = blockShapeConfig?.initialY;
      }

      entities["state"].selected = "";
      entities["shadow"].spaces = [];
    }  
  }

  return entities;
};

const MoveBlockShape = (entities: any, { input }: { input: any }) => {
  const { name, payload } = input.find((x: any) => x.name === "onMouseMove") || {};
  const blockId = entities["state"].selected; 

  if (name === "onMouseMove" && payload) {
    if (hasBlockShapeId(blockId)) {
      entities[blockId].x = payload.pageX;
      entities[blockId].y = payload.pageY;
    }  
  }

  return entities;
};

const TargetSpaceByShape = (entities: any, { input }: { input: any }) => {
  const blockId = entities["state"].selected;
  const spaces = [...entities["board"].spaces.entries()];
  const spacesOnTarget = [];

  if (hasBlockShapeId(blockId)) {
    const block = entities[blockId];

    const centeredCoordinates = block.shape
      .map((fn: any) => fn(block.x, block.y))
      .map((c: { x: number, y: number }) => { return { x: c.x - BOARD_COORDINATES.x, y: c.y - BOARD_COORDINATES.y } });

    for (let i = 0; i < spaces.length; i++) {
      const space = spaces[i][1] as Space;
      
      if (!space.occupied) {
        let spaceCenterX = space.x + (BLOCK_SIZE/2);
        let spaceCenterY = space.y + (BLOCK_SIZE/2);
        let distances = centeredCoordinates.map((c: { x: number, y: number }) => Math.sqrt(Math.pow(c.x - spaceCenterX, 2) + Math.pow(c.y - spaceCenterY, 2)));
        let minDistance = distances.reduce((acc: number, curr: number) => acc < curr ? acc : curr, distances[0]);

        if (minDistance < BLOCK_SIZE/2) {
          spacesOnTarget.push(spaces[i][0]);
        }
      }
    }

    let isOnTarget = spacesOnTarget.length == centeredCoordinates.length;

    entities["shadow"].spaces = isOnTarget ? spacesOnTarget
      .map(id => entities["board"].spaces.get(id))
      .map(space => { return { x: space.x + BOARD_COORDINATES.x, y: space.y + BOARD_COORDINATES.y } }) : [];

    entities["state"].spacesOnTarget = isOnTarget ? spacesOnTarget : [];
    entities["state"].isOnTarget = isOnTarget;
  }

  

  return entities;
}

const NextLevel = (entities: any, { input }: { input: any }) => {
  const areAllUnavailable = SHAPES
    .map(b => b.id)
    .map(id => entities[id].available)
    .every(e => !e);
  
  if(areAllUnavailable) {
    SHAPES.forEach(shape => {
      entities[shape.id].shape = BLOCK_SHAPES[Math.floor(Math.random()*BLOCK_SHAPES.length)];
      entities[shape.id].x = shape.initialX;
      entities[shape.id].y = shape.initialY;
      entities[shape.id].available = true
    });
  }
  
  return entities;
}

const Score = (entities: any, { input }: { input: any }) => {
  const filledLines = [], filledColumns = [];

  // find filled columns and lines
  for (let column = 1; column <= BLOCKS_PER_COLUMNS; column++) {
    let isColumnFilled = true;

    for (let line = 1; line <= BLOCKS_PER_LINE; line++) {
      if (!entities["board"].spaces.get(`${column}${line}`).occupied) {
        isColumnFilled = false;
        break;
      }
    }
    
    if (isColumnFilled) {
      filledColumns.push(column);
    }
  }

  for (let line = 1; line <= BLOCKS_PER_LINE; line++) {
    let isLineFilled = true;

    for (let col = 1; col <= BLOCKS_PER_COLUMNS; col++) {
      if (!entities["board"].spaces.get(`${col}${line}`).occupied) {
        isLineFilled = false;
        break;
      }
    }
    
    if (isLineFilled) {
      filledLines.push(line);
    }
  }

  // clean filled columns and lines
  filledColumns.forEach(column => {
    for (let line = 1; line <= BLOCKS_PER_LINE; line++) {
      entities["board"].spaces.get(`${column}${line}`).occupied = false;        
    }
  });

  filledLines.forEach(line => {
    for (let column = 1; column <= BLOCKS_PER_COLUMNS; column++) {
      entities["board"].spaces.get(`${column}${line}`).occupied = false;        
    }
  });

  // score 
  (entities["state"] as State).filledRowsAndColumns += filledColumns.length + filledLines.length;
  (entities["state"] as State).score += (entities["state"] as State).lastBlocksFilled 
  
  if (filledColumns.length > 0 || filledLines.length > 0) {
    (entities["state"] as State).score += 10*(entities["state"] as State).filledRowsAndColumns;
  }
  
  entities["scorePanel"].score = (entities["state"] as State).score;
  (entities["state"] as State).lastBlocksFilled = 0;
  
  return entities;
}

const GameOver = (entities: any, { input }: { input: any }) => {
  const nonFilledSpaces: Space[] = [];
  let hasSpacesAvailable = false;

  for(const space of entities["board"].spaces.values()) {
    if (!space.occupied) {
      nonFilledSpaces.push(space);
    }
  }

  SHAPES
    .map(shape => shape.id)
    .forEach(shapeId => {
      const blockShape = entities[shapeId];

      if (!blockShape.available || hasSpacesAvailable) {
        return;
      }

      for (const refSpace of nonFilledSpaces) {
        const spacesOnTarget: Space[] = [];

        if (hasSpacesAvailable) {
          return;
        }

        const centeredCoordinates = blockShape.shape
          .map((fn: any) => fn(refSpace.x + (BLOCK_SIZE/2), refSpace.y + (BLOCK_SIZE/2)))
          .map((c: { x: number, y: number }) => { return { x: c.x - BOARD_COORDINATES.x, y: c.y - BOARD_COORDINATES.y } });
  
        for (const space of nonFilledSpaces) {
          let spaceCenterX = space.x + (BLOCK_SIZE/2);
          let spaceCenterY = space.y + (BLOCK_SIZE/2);
          let distances = centeredCoordinates.map((c: { x: number, y: number }) => Math.sqrt(Math.pow(c.x - spaceCenterX, 2) + Math.pow(c.y - spaceCenterY, 2)));
          let minDistance = distances.reduce((acc: number, curr: number) => acc < curr ? acc : curr, distances[0]);
  
          if (minDistance < BLOCK_SIZE/2) {
            spacesOnTarget.push(space);
          }
        }
        
        hasSpacesAvailable = centeredCoordinates.length == spacesOnTarget.length;
      }
    });

  if (!hasSpacesAvailable) {
    entities["state"].onGameOver();
  }
   
  return entities;
}

export { DragBlockShape, DropBlockShape, MoveBlockShape, TargetSpaceByShape, NextLevel, Score, GameOver };
