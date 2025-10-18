import { Point } from "./point"

export interface Screen {
    height: number,
    width: number,
    minimizerMode: boolean,
    minimizerRatio: number,
    left: number,
    right: number,
    corners: {
        topLeft: Point,
        topRight: Point,
        bottomRight: Point,
        bottomLeft: Point
    },
    center: Point
}
