import { CSSProperties } from "react";
import { BLOCK_SIZE } from "./values";
import { Colors, Coordinates, ShapeFunction } from "./types";

const ZINDEX_OF_SHAPE = 3;
const ZINDEX_OF_SHADOW = 2;
const ZINDEX_OF_PREVIEW = 1;

function Board(props: any) {

  const commonStyle = (x: number, y: number): CSSProperties => {
    return {
      position: "absolute",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "black",
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

  const occupiedStyle = (colors: Colors): CSSProperties => {
    return {
      width: BLOCK_SIZE - 20,
      height: BLOCK_SIZE - 20,
      borderWidth: "10px",
      borderStyle: "solid",
      borderColor: "none",
      backgroundColor: colors.center,
      borderTopColor: colors.top,
      borderBottomColor: colors.bottom,
      borderLeftColor: colors.left,
      borderRightColor: colors.right
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
        const finalStyle = space[1].occupied ? occupiedStyle(space[1].colors) : freeStyle();

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

function minAxisValueOf<K extends keyof Coordinates>(coordinates: Coordinates[], key: K): Coordinates[K] {
  return coordinates
      .map(c => c[key])
      .reduce((res, curr) => res < curr ? res : curr, coordinates[0][key]);
}

function maxAxisValueOf<K extends keyof Coordinates>(coordinates: Coordinates[], key: K): Coordinates[K] {
  return coordinates
      .map(c => c[key])
      .reduce((res, curr) => res > curr ? res : curr, coordinates[0][key]);
}

function BlockShape(props: any) {
  const size = props.isDragged ? BLOCK_SIZE - 20 : BLOCK_SIZE - 20 - 9;
  const blockSize = props.isDragged ? BLOCK_SIZE : BLOCK_SIZE - 20;

  const coordinates = props.shape.map((fn: ShapeFunction) => fn(props.x, props.y, blockSize));

  let xOffset = 0;
  let yOffset = 0;

  if (!props.isDragged) {
    const xMin = minAxisValueOf(coordinates, "x");
    const xMax = maxAxisValueOf(coordinates, "x");

    const yMin = minAxisValueOf(coordinates, "y");
    const yMax = maxAxisValueOf(coordinates, "y");

    const xCenter = xMin + (((xMax + size) - xMin) / 2);
    const yCenter = yMin + (((yMax + size) - yMin) / 2);

    xOffset = props.initialX - xCenter;
    yOffset = props.initialY - yCenter;
  }

  return (
    <>
      {props.shape.map((fn: ShapeFunction, key: number) => {
        const coordinates = fn(props.x, props.y, blockSize);
        const x = coordinates.x - size / 2;
        const y = coordinates.y - size / 2;
        return (
          <div
            key={key}
            id={props.id}
            style={{
              display: props.available ? 'inline' : 'none',
              position: "absolute",
              left: x + xOffset,
              top: y + yOffset,
              zIndex: ZINDEX_OF_SHAPE,
              width: size,
              height: size,
              userSelect: "none",
              backgroundColor: props.colors.center,
              borderStyle: "solid",
              borderWidth: props.isDragged ? "10px" : "5px",
              borderTopColor: props.colors.top,
              borderBottomColor: props.colors.bottom,
              borderLeftColor: props.colors.left,
              borderRightColor: props.colors.right
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
              opacity: 0.2,
              borderStyle: "solid",
              borderWidth: '10px',
              backgroundColor: props.colors.center,
              borderTopColor: props.colors.top,
              borderBottomColor: props.colors.bottom,
              borderLeftColor: props.colors.left,
              borderRightColor: props.colors.right,
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
              backgroundColor: props.colors.center,
              borderTopColor: props.colors.top,
              borderBottomColor: props.colors.bottom,
              borderLeftColor: props.colors.left,
              borderRightColor: props.colors.right,
              borderStyle: 'solid',
              borderWidth: '10px'
            }}
          />
        );
      })}
    </>
  );
}

function ScorePanel(props: any) {
  return (
    <div
      style={{
        color: "white",
        fontFamily: "fantasy",
        fontSize: "xxx-large",
        textAlign: "center",
        padding: 20,
        userSelect: "none",
      }}
    >
      {props.score}
    </div>
  );


}

export { BlockShape, Board, ScorePanel, TargetSpaceShadow, ScorePreviewHighlight };
