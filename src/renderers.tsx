import { Space } from "./types";
import { BLOCK_SIZE } from "./values";

function Board(props: any) {
  return (
    <div style={{ position: "absolute", backgroundColor: "cyan", width: 400, height: 400, left: props.x, top: props.y }}>
      {props.spaces.map((space: Space, key: number) => {
        return (
          <div key={key} style={{ position: "absolute", backgroundColor: "yellow", width: BLOCK_SIZE, height: BLOCK_SIZE, left: space.x, top: space.y }}>
            <p>({space.x+(BLOCK_SIZE/2)},{space.y+(BLOCK_SIZE/2)})</p>
          </div>
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
    <div id={props.id} style={{ position: "absolute", width: size, height: size, backgroundColor: "red", left: x, top: y }}>
      <p>({props.x-50},{props.y-50})</p>
    </div>
  );
}

export { Block, Board };
