import { Coordinates } from "../global";

export default class Utils {
    public workoutDistanceBetweenTwoPoints(point1: Coordinates, point2: Coordinates): number {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) + Math.pow(point1.z - point2.z, 2))
    }
}
