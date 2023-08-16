import Particle from "./Particle";
import Utils from "./Utils";

const ELECTRICAL_CONSTANT = 5
const FRICTION_CONSTANT = 0.98

export default class Force {

    static get ELECTRIC() {
        return {
            calculate: this.workoutElectricForce,
            constant: ELECTRICAL_CONSTANT,
        }
    }

    static get FRICTION() {
        return {
            constant: FRICTION_CONSTANT,
        }
    }

    /**
     * Workout the electric force that is applied on the particle A by the particle B
     */
    private static workoutElectricForce(particleA: Particle, particleB: Particle) {
        const distanceSquared = Utils.workoutDistanceSquared(particleA.position, particleB.position)
        const force = (-1) * ELECTRICAL_CONSTANT * particleA.charge * particleB.charge / distanceSquared
        const direction = Utils.workoutDirection(particleA.position, particleB.position)
        return {
            x: direction.x * force,
            y: direction.y * force,
            z: direction.z * force,
        }
    }
}