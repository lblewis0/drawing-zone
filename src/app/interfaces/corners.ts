import { Coord } from "./coord";
import { Point } from "./point";

export interface Corners {
    topLeft: Coord | Point;
    topRight: Coord | Point;
    bottomRight: Coord | Point;
    bottomLeft: Coord | Point;
}
