import { Point } from "./point"

export interface Overscreen {
    height: number,
    width: number,
    height_base: number,
    width_base: number,
    left: number,
    top: number,
    corners: {
        topLeft: Point,
        topRight: Point,
        bottomRight: Point,
        bottomLeft: Point
    },
    center: Point,
    overflowRight: number,
    overflowLeft: number,
    overflowTop: number,
    overflowBottom: number
}
