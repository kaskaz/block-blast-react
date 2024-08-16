function Box(props: any) {
  const size = 100;
  const x = props.x - size / 2;
  const y = props.y - size / 2;
  return <div id={props.id} style={{ position: "absolute", width: size, height: size, backgroundColor: "red", left: x, top: y }} />;
}

export { Box };
