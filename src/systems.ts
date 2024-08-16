const MoveBox = (entities: any, { input }: { input: any }) => {
  const { payload } = input.find((x: any) => x.name === "onMouseDown") || {};

  if (payload) {
    const box1 = entities["box1"];

    box1.x = payload.pageX;
    box1.y = payload.pageY;
  }

  return entities;
};

export { MoveBox };
