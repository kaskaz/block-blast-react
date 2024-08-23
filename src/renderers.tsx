import { BLOCK_SIZE } from "./values";

const ZINDEX_OF_SHAPE = 2;
const ZINDEX_OF_SHADOW = 1;


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
              zIndex: ZINDEX_OF_SHAPE,
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

function TargetSpaceShadow(props: any) {
  return (
    <>
      {props.spaces.map((space: { x: number, y: number }, key: number) => {
        return (
          <div
            key={key}
            style={{
              position: "absolute",
              border: "solid 1px black",
              backgroundColor: "cyan",
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              left: space.x, 
              top: space.y,
              zIndex: ZINDEX_OF_SHADOW,
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

export { BlockShape, Board, ScorePanel, TargetSpaceShadow };
