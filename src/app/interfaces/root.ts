import { Corners } from "./corners";
import { Point } from "./point";

export interface Root {
    width: number,
    height: number,
    corners: Corners,
    pointer: Point,
    pointerInScreen: boolean
}
