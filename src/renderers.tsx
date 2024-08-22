import { BLOCK_SIZE } from "./values";

function Board(props: any) {
  return (
    <div style={{ position: "absolute", backgroundColor: "cyan", width: 400, height: 400, left: props.x, top: props.y }}>
      {[...props.spaces.entries()].map(space => {
        return (
          <div
            key={space[0]}
            style={{
              position: "absolute",
              border: "solid 1px black",
              backgroundColor: space[1].occupied ? "green" : "yellow",
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              left: space[1].x, 
              top: space[1].y,
              userSelect: "none"
            }}
          />
        )
      })}
    </div>
  );
}

function Block(props: any) {
  const size = BLOCK_SIZE;
  const x = props.x - size / 2;
  const y = props.y - size / 2;
  return (
    <div
      id={props.id}
      style={{
        display: props.available ? 'inline': 'none',
        position: "absolute",
        width: size,
        height: size,
        backgroundColor: "red",
        left: x,
        top: y,
        userSelect: "none"
      }}
    />
  );
}

function BlockShape(props: any) {
  return (
    <>
      {props.shape.map((fn: (x: number, y: number) => { x: number, y: number }, key: number) => {
        const coordinates = fn(props.x, props.y);
        const x = coordinates.x - BLOCK_SIZE / 2;
        const y = coordinates.y - BLOCK_SIZE / 2;
        return (
          <div
            key={key}
            id={props.id}
            style={{
              display: props.available ? 'inline': 'none',
              position: "absolute",
              left: x,
              top: y,
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              backgroundColor: "red",
              userSelect: "none"
            }}
          />
        );
      })}
    </>
  );
}

function ScorePanel(props: any) {
  return <div style={{ color: "white"}}>score: {props.score}</div>
}

export { Block, BlockShape, Board, ScorePanel };
