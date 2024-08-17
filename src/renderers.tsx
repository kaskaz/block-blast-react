function Board(props: any) {
  return (
    <div style={{ position: "absolute", backgroundColor: "cyan", width: 400, height: 400, left: props.x, top: props.y }}>

    </div>
  )
}

function Block(props: any) {
  const size = 50;
  const x = props.x - size / 2;
  const y = props.y - size / 2;
  return <div id={props.id} style={{ position: "absolute", width: size, height: size, backgroundColor: "red", left: x, top: y }} />;
}

export { Block, Board };
