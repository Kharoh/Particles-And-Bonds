import { Coordinates } from "../global";
import Particle from "./Particle";

export default class Electron extends Particle {
    constructor(position: Coordinates, velocity: Coordinates, acceleration: Coordinates) {
        const electronMass = 9.1093837015e-31; // kg
        super(position, velocity, acceleration,
            .3 /* radii are not supposed to represent something but for representation */, electronMass, -1, "#000000");
    }
}