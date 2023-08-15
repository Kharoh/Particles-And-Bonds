import { Coordinates } from "../global"

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

const WIDTH = canvas.offsetWidth
const HEIGHT = canvas.offsetHeight
let PROJECTION_CENTER_X = WIDTH / 2
let PROJECTION_CENTER_Y = HEIGHT / 2
const PERSPECTIVE = WIDTH * 0.8

export default class Particle {

    public id: string

    private _position: Coordinates
    private _velocity: Coordinates
    private _acceleration: Coordinates
    private _mass: number
    private _charge: number

    private _radius: number
    private _color: string /* Hexadecimal e.g. #000000 */
    private _positionProjection: Coordinates // on peut ajouter des particules qui font intéragir avec leurs pos préc
    private _scaleProjection: number

    constructor(id: string, position: Coordinates, velocity: Coordinates, acceleration: Coordinates, radius: number, mass: number, charge: number, color: string) {
        this.id = id

        this._position = position
        this._velocity = velocity
        this._acceleration = acceleration
        this._mass = mass
        this._charge = charge

        this._radius = radius
        this._color = color
        this._positionProjection = { x: 0, y: 0, z: 0 }
        this._scaleProjection = 0
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

    public get radius(): number {
        return this._radius
    }

    public set radius(value: number) {
        this._radius = value
    }

    public get mass(): number {
        return this._mass
    }

    public set mass(value: number) {
        this._mass = value
    }

    public get charge(): number {
        return this._charge
    }

    public set charge(value: number) {
        this._charge = value
    }

    public get color(): string {
        return this._color
    }

    public set color(value: string) {
        this._color = value
    }

    public projectPosition(): void {
        // The scaleProjected will store the scale of the element based on its distance from the 'camera'
        this._scaleProjection = PERSPECTIVE / (PERSPECTIVE + this.position.z)
        // The xProjected is the x position on the 2D world
        this._positionProjection.x = (this.position.x * this._scaleProjection) + PROJECTION_CENTER_X
        // The yProjected is the y position on the 2D world
        this._positionProjection.y = (this.position.y * this._scaleProjection) + PROJECTION_CENTER_Y
    }

    draw() {
        // We first calculate the projected values of our dot
        this.projectPosition()
        // We define the opacity of our element based on its distance
        ctx.globalAlpha = Math.abs(1 - this.position.z / WIDTH)
        // We draw a rectangle based on the projected coordinates and scale
        ctx.roundRect(this._positionProjection.x - this.radius, this._positionProjection.y - this.radius, this.radius * 2 * this._scaleProjection, this.radius * 2 * this._scaleProjection, this._radius)
        ctx.fill()

        console.log(this._positionProjection.x - this.radius)
    }

}
