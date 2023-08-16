import Force from "./Force"
import Particle from "./Particle"
import Utils from "./Utils"

const ELECTRICAL_CONSTANT = 10

export default class Field {
    public interactingParticles: [Particle, InteractionParams][] = []

    public subscribe(particle: Particle, params: InteractionParams) {
        this.interactingParticles.push([particle, params])
    }

    public applyForce(particle: Particle) {
        const charge = this.interactingParticles.find(([p]) => p.id === particle.id)[1]

        // For the electric field only
        for (const [interactingParticle, iCharge] of this.interactingParticles) {
            if (interactingParticle.id === particle.id) continue

            const distanceSquared = Utils.workoutDistanceSquared(particle.position, interactingParticle.position)
            const force = (-1) * ELECTRICAL_CONSTANT * charge * iCharge / distanceSquared
            const direction = Utils.workoutDirection(particle.position, interactingParticle.position)
            const electricForce = {
                x: direction.x * force,
                y: direction.y * force,
                z: direction.z * force,
            }

            particle._updatedAcceleration = Utils.addCoordinates(particle._updatedAcceleration, Utils.scaleCoordinates(electricForce, 1 / particle.mass))
        }
    }

}

export type Interaction = "ELECTRIC"

export type InteractionParams<Interaction = any> =
    Interaction extends "ELECTRIC" ? number : undefined
