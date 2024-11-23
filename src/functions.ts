import { BLOCK_SHAPES, BLOCK_COLORS } from "./values";

const randomizeBlockShape = () => BLOCK_SHAPES[Math.floor(Math.random() * BLOCK_SHAPES.length)];

const randomizeBlockColor = () => BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];

export {
    randomizeBlockColor,
    randomizeBlockShape
}
