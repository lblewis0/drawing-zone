import { Corners } from "./corners";
import { Point } from "./point";

export interface Zone {
    zoom: number,
    zoom_max: number,
    zoom_min: number,
    zoom_step: number,
    width_base: number,
    height_base: number,
    width: number,
    height: number,
    left_base: number,
    top_base: number,
    left: number,
    top: number,
    panX: number,
    panY: number,
    panX_max: number,
    panX_min: number,
    panY_max: number,
    panY_min: number,
    center: Point,
    corners: Corners
}
