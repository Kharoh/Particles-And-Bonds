import { Coordinates } from "../global";

export default class Utils {
    public static workoutDistance(point1: Coordinates, point2: Coordinates): number {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) + Math.pow(point1.z - point2.z, 2))
    }

    public static workoutDistanceSquared(point1: Coordinates, point2: Coordinates): number {
        return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) + Math.pow(point1.z - point2.z, 2)
    }

    public static workoutVector(point1: Coordinates, point2: Coordinates): Coordinates {
        return {
            x: point2.x - point1.x,
            y: point2.y - point1.y,
            z: point2.z - point1.z
        }
    }

    public static workoutDirection = this.workoutUnitVector
    public static workoutUnitVector(point1: Coordinates, point2: Coordinates): Coordinates {
        const vector = this.workoutVector(point1, point2)
        const distance = this.workoutDistance(point1, point2)
        return {
            x: vector.x / distance,
            y: vector.y / distance,
            z: vector.z / distance
        }
    }

    public static addCoordinates(modifiedCoordinates: Coordinates, coordinates: Coordinates): Coordinates {
        return {
            x: modifiedCoordinates.x + coordinates.x,
            y: modifiedCoordinates.y + coordinates.y,
            z: modifiedCoordinates.z + coordinates.z
        }
    }

    public static scaleCoordinates(modifiedCoordinates: Coordinates, scale: number): Coordinates {
        return {
            x: modifiedCoordinates.x * scale,
            y: modifiedCoordinates.y * scale,
            z: modifiedCoordinates.z * scale
        }
    }

}
