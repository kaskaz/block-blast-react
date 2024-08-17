const BLOCK_IDS= ["block1", "block2", "block3"];

const DragBlock = (entities: any, { input }: { input: any }) => {
  const { name, payload } = input.find((x: any) => x.name === "onMouseDown") || {};
  
  if (name === "onMouseDown" && payload) {
    const blockId = payload.target.id;

    if (BLOCK_IDS.some(id => id == blockId)) {
      entities["state"].selected = blockId;
    }  
  }

  return entities;
};

const DropBlock = (entities: any, { input }: { input: any }) => {
  const { name, payload } = input.find((x: any) => x.name === "onMouseUp") || {};
  const blockId = entities["state"].selected; 

  if (name === "onMouseUp" && payload) {
    if (BLOCK_IDS.some(id => id == blockId)) {
      entities["state"].selected = "";
    }  
  }

  return entities;
};

const MoveBlock = (entities: any, { input }: { input: any }) => {
  const { name, payload } = input.find((x: any) => x.name === "onMouseMove") || {};
  const blockId = entities["state"].selected; 

  if (name === "onMouseMove" && payload) {
    if (BLOCK_IDS.some(id => id == blockId)) {
      entities[blockId].x = payload.pageX;
      entities[blockId].y = payload.pageY;
    }  
  }

  return entities;
};

export { DragBlock, DropBlock, MoveBlock };
