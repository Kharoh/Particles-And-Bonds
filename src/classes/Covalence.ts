import Particle from "./Particle"
import Utils from "./Utils"

const COVALENCE_CONSTANT = 0.001

export default class Covalence {
    public radius: number
    public particleA: Particle
    public particleB: Particle

    constructor(radius: number, particleA: Particle, particleB: Particle) {
        this.radius = radius
        this.particleA = particleA
        this.particleB = particleB

        particleA.addCovalence(this)
        particleB.addCovalence(this)
    }

    public getAbsForceNorm(): number {
        return COVALENCE_CONSTANT * (Utils.workoutDistance(this.particleA.position, this.particleB.position) - this.radius)
    }

    public getParabolaForceNorm(): number {
        return (this.radius - Utils.workoutDistance(this.particleA.position, this.particleB.position)) ** 2
        // need to add the attraction sign
    }

    public getOtherParticle(baseParticle: Particle): Particle {
        if (this.particleA.id === baseParticle.id) return this.particleB
        return this.particleA
    }
}