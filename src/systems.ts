import { Space, State } from "./types";
import { BLOCK_SIZE, BLOCKS, BLOCKS_PER_COLUMNS, BLOCKS_PER_LINE, BOARD_COORDINATES } from "./values";

const hasBlockId = (blockId: string): boolean => {
  return BLOCKS.map(b => b.id).some(id => id == blockId);
}

const DragBlock = (entities: any, { input }: { input: any }) => {
  const { name, payload } = input.find((x: any) => x.name === "onMouseDown") || {};
  
  if (name === "onMouseDown" && payload) {
    const blockId = payload.target.id;

    if (hasBlockId(blockId)) {
      entities["state"].selected = blockId;
    }  
  }

  return entities;
};

const DropBlock = (entities: any, { input }: { input: any }) => {
  const { name, payload } = input.find((x: any) => x.name === "onMouseUp") || {};
  const blockId = entities["state"].selected;

  if (name === "onMouseUp" && payload) {
    if (hasBlockId(blockId)) {
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
        const blockConfig = BLOCKS.find(x => x.id == blockId);
        entities[blockId].x = blockConfig?.initialX;
        entities[blockId].y = blockConfig?.initialY;
      }

      entities["state"].selected = "";
    }  
  }

  return entities;
};

const MoveBlock = (entities: any, { input }: { input: any }) => {
  const { name, payload } = input.find((x: any) => x.name === "onMouseMove") || {};
  const blockId = entities["state"].selected; 

  if (name === "onMouseMove" && payload) {
    if (hasBlockId(blockId)) {
      entities[blockId].x = payload.pageX;
      entities[blockId].y = payload.pageY;
    }  
  }

  return entities;
};

const TargetSpace = (entities: any, { input }: { input: any }) => {
  const blockId = entities["state"].selected;
  const spaces = [...entities["board"].spaces.entries()];
  const spacesOnTarget = [];

  if (hasBlockId(blockId)) {
    const block = entities[blockId];
    let blockCenterX = block.x - BOARD_COORDINATES.x;
    let blockCenterY = block.y - BOARD_COORDINATES.y;

    for (let i = 0; i < spaces.length; i++) {
      const space = spaces[i][1] as Space;
      
      if (!space.occupied) {
        let spaceCenterX = space.x + (BLOCK_SIZE/2);
        let spaceCenterY = space.y + (BLOCK_SIZE/2);
        let distance = Math.sqrt(Math.pow(blockCenterX - spaceCenterX, 2) + Math.pow(blockCenterY - spaceCenterY, 2));

        if (distance < BLOCK_SIZE/2) {
          spacesOnTarget.push(spaces[i][0]);
        }
      }
    }

    entities["state"].spacesOnTarget = spacesOnTarget;
    entities["state"].isOnTarget = spacesOnTarget.length > 0;
  }  

  return entities;
}

const NextLevel = (entities: any, { input }: { input: any }) => {
  const areAllUnavailable = BLOCKS
    .map(b => b.id)
    .map(id => entities[id].available)
    .every(e => !e);
  
  if(areAllUnavailable) {
    BLOCKS.forEach(block => {
      entities[block.id].x = block.initialX;
      entities[block.id].y = block.initialY;
      entities[block.id].available = true
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

export { DragBlock, DropBlock, MoveBlock, TargetSpace, NextLevel, Score };
