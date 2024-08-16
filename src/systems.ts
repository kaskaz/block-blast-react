
const MoveBox = (entities: any, { input }: { input: any }) => {
  let { name, payload } = input.find((x: any) => x.name === "onMouseDown" || x.name === "onMouseUp" || x.name === "onMouseMove") || {};

  const box1 = entities["box1"];

  if (name === "onMouseDown") {
    if(!box1.selected) {
      if (payload.target.id == "box1") {
        box1.selected = true;
      }
    } else {
      box1.x = payload.pageX;
      box1.y = payload.pageY;
    }    
  } else if(name === "onMouseUp") {
    if (box1.selected) {
      box1.selected = false;
    }
  } else if(name === "onMouseMove") {
    if (box1.selected) {
      box1.x = payload.pageX;
      box1.y = payload.pageY;
    }
  }

  return entities;
};

export { MoveBox };
