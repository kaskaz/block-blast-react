import { BLOCKS } from "./values";

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
        // place block
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

export { DragBlock, DropBlock, MoveBlock };
