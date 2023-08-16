import { Coordinates } from "../global"
import Covalence from "./Covalence"
import Field from "./Field"
import Force from "./Force"
import Renderer from "./Renderer"
import Utils from "./Utils"

export default class Particle {

    public id: string

    public _updatedPosition: Coordinates
    public _updatedVelocity: Coordinates
    public _updatedAcceleration: Coordinates

    public isFixed: boolean
    private _position: Coordinates
    private _velocity: Coordinates
    private _acceleration: Coordinates
    private _mass: number

    private radius: number
    private color: string /* Hexadecimal e.g. #000000 */
    public positionProjection: Coordinates // on peut ajouter des particules qui font intéragir avec leurs pos préc
    private _scaleProjection: number

    public covalence: Covalence[]
    public fields: Field[]

    constructor(id: string, position: Coordinates, velocity: Coordinates, acceleration: Coordinates, radius: number, mass: number, color: string, isFixed?: boolean) {
        this.id = id

        this.isFixed = !!isFixed
        this._position = position
        this._velocity = velocity
        this._acceleration = acceleration
        this._mass = mass

        this.radius = radius
        this.color = color
        this.positionProjection = { x: 0, y: 0, z: 0 }
        this._scaleProjection = 0

        this.covalence = []
        this.fields = []
    }

    public get position(): Coordinates {
        return this._position
    }

    public set position(value: Coordinates) {
        this._position = value
    }

    public get velocity(): Coordinates {
        return this._velocity
    }

    public set velocity(value: Coordinates) {
        this._velocity = value
    }

    public get acceleration(): Coordinates {
        return this._acceleration
    }

    public set acceleration(value: Coordinates) {
        this._acceleration = value
    }

    public get mass(): number {
        return this._mass
    }

    public set mass(value: number) {
        this._mass = value
    }




    /*
     * ABOUT THE DISPLAY OF THE PARTICLE       
     */

    private projectPosition(renderer: Renderer): void {
        const perspective = renderer.canvasWidth * 0.8
        // The scaleProjected will store the scale of the element based on its distance from the 'camera'
        this._scaleProjection = perspective / (perspective + this.position.z)
        // The xProjected is the x position on the 2D world
        this.positionProjection.x = (this.position.x * this._scaleProjection) + renderer.projectionCenterX
        // The yProjected is the y position on the 2D world
        this.positionProjection.y = (this.position.y * this._scaleProjection) + renderer.projectionCenterY
    }

    public draw(renderer: Renderer) {
        // We first calculate the projected values of our dot
        this.projectPosition(renderer)
        // We define the opacity of our element based on its distance
        renderer.ctx.globalAlpha = Math.abs(1 - this.position.z / renderer.canvasWidth)
        // We draw a rectangle based on the projected coordinates and scale
        renderer.ctx.fillStyle = this.color
        renderer.ctx.beginPath()
        renderer.ctx.arc(this.positionProjection.x, this.positionProjection.y,
            Math.max(this.radius + this.position.z / renderer.canvasWidth * 100, 1), 0, 2 * Math.PI)
        renderer.ctx.fill()
    }

    public update(particles: Particle[]) {
        if (this.isFixed) return

        // First update the acceleration based on the forces, then velocity and finally position
        this._updatedAcceleration = { x: 0, y: 0, z: 0 }

        this.applyCovalence()
        this.applyFields()

        // Update the particle's velocity based on the acceleration
        this._updatedVelocity = {
            x: this.velocity.x + this.acceleration.x,
            y: this.velocity.y + this.acceleration.y,
            z: this.velocity.z + this.acceleration.z
        }

        // Workout the friction
        this.applyFriction()

        // Update the position based on the particle's velocity
        this._updatedPosition = {
            x: this.position.x + this.velocity.x,
            y: this.position.y + this.velocity.y,
            z: this.position.z + this.velocity.z
        }
    }

    public validateUpdate() {
        if (this.isFixed) return
        this._acceleration = this._updatedAcceleration
        this._velocity = this._updatedVelocity
        this._position = this._updatedPosition
    }




    /*
     * ABOUT THE ENVIRONMENT
     */

    private applyFriction() {
        this._updatedVelocity = Utils.scaleCoordinates(this._updatedVelocity, Force.FRICTION.constant)
    }

    private applyCovalence() {
        // Apply covalent force
        for (const covalence of this.covalence) {
            const direction = Utils.workoutUnitVector(this.position, covalence.getOtherParticle(this).position)
            this._updatedAcceleration = Utils.addCoordinates(this._updatedAcceleration,
                Utils.scaleCoordinates(Utils.scaleCoordinates(direction, covalence.getAbsForceNorm()), 1 / this.mass))
        }
    }

    private applyFields() {
        // Applied the forces created by fields
        for (const field of this.fields) {
            field.applyForce(this)
        }
    }




    /*
     * HANDLE COVALENCE
     */

    public addCovalence(covalence: Covalence) {
        this.covalence.push(covalence)
    }




    /*
     * HANDLE FIELDS
     */

    public subscribeToElectricField(electricField: Field, charge: number) {
        electricField.subscribe(this, charge)
        this.fields.push(electricField)
        console.log(electricField.interactingParticles)
    }


}
