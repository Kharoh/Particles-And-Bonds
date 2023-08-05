import { Coordinates } from "../global";
import Particle from "./Particle";

export const amu = 1.66053906660e-27 // kg

/**
 * Specialized Particle describing the nucleus of a Carbon atom.
 */
export default class CarbonNucleus extends Particle {

    constructor(position: Coordinates, velocity: Coordinates, acceleration: Coordinates, radius: number, mass: number, color: string) {
        const carbonNucleusMass = 12 * amu
        super(position, velocity, acceleration, radius, carbonNucleusMass, color)
    }
}