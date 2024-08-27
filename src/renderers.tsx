import { CSSProperties } from "react";
import { BLOCK_SIZE } from "./values";

const ZINDEX_OF_SHAPE = 3;
const ZINDEX_OF_SHADOW = 2;
const ZINDEX_OF_PREVIEW = 1;

function Board(props: any) {

  const commonStyle = (x: number, y: number): CSSProperties => {
    return {
      position: "absolute",
      border: "solid 1px black",
      userSelect: "none",
      left: x,
      top: y,
    };
  };

  const freeStyle = (): CSSProperties => {
    return {
      borderRadius: 5,
      backgroundColor: "#242C53",
      width: BLOCK_SIZE - 2,
      height: BLOCK_SIZE - 2
    };
  };

  const occupiedStyle = (): CSSProperties => {
    return {
      width: BLOCK_SIZE - 20,
      height: BLOCK_SIZE - 20,
      backgroundColor: "#3D60E2",
      borderTop: "10px solid #82ABFA",
      borderBottom: "10px solid #21358E",
      borderLeft: "10px solid #446BF4",
      borderRight: "10px solid #284FC8"
    };
  };

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#1D254A",
        width: 400,
        height: 400,
        left: props.x,
        top: props.y
      }}
    >
      {[...props.spaces.entries()].map(space => {
        const finalStyle = space[1].occupied ? occupiedStyle() : freeStyle();

        return (
          <div
            key={space[0]}
            style={{
              ...commonStyle(space[1].x, space[1].y),
              ...finalStyle
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
              display: props.available ? 'inline' : 'none',
              position: "absolute",
              left: x,
              top: y,
              zIndex: ZINDEX_OF_SHAPE,
              width: BLOCK_SIZE - 20,
              height: BLOCK_SIZE - 20,
              userSelect: "none",
              backgroundColor: "#3D60E2",
              borderTop: "10px solid #82ABFA",
              borderBottom: "10px solid #21358E",
              borderLeft: "10px solid #446BF4",
              borderRight: "10px solid #284FC8"
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
              width: BLOCK_SIZE - 20,
              height: BLOCK_SIZE - 20,
              left: space.x,
              top: space.y,
              zIndex: ZINDEX_OF_SHADOW,
              userSelect: "none",
              backgroundColor: "rgba(61, 96, 226, 0.2)",
              borderTop: "10px solid rgba(130, 171, 250, 0.2)",
              borderBottom: "10px solid rgba(33, 53, 142, 0.2)",
              borderLeft: "10px solid rgba(68, 107, 244, 0.2)",
              borderRight: "10px solid rgba(40, 79, 200, 0.2)",
            }}
          />
        );
      })}
    </>
  );
}

function ScorePreviewHighlight(props: any) {
  return (
    <>
      {props.spaces.map((space: { x: number, y: number }, key: number) => {
        return (
          <div
            key={key}
            style={{
              position: "absolute",
              border: "solid 1px black",
              width: BLOCK_SIZE - 20,
              height: BLOCK_SIZE - 20,
              left: space.x,
              top: space.y,
              zIndex: ZINDEX_OF_PREVIEW,
              userSelect: "none",
              backgroundColor: "#E87323",
              borderTop: "10px solid #FFBF82",
              borderBottom: "10px solid #994809",
              borderLeft: "10px solid #FE8630",
              borderRight: "10px solid #BD5E1A"
            }}
          />
        );
      })}
    </>
  );
}

function ScorePanel(props: any) {
  return <div style={{ color: "white" }}>score: {props.score}</div>
}

export { BlockShape, Board, ScorePanel, TargetSpaceShadow, ScorePreviewHighlight };
