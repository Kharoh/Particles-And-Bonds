import { Coordinates } from "../global"
import Bond from "./Bond"

export default class Particle {

    private _position: Coordinates
    private _velocity: Coordinates
    private _acceleration: Coordinates
    private _radius: number
    private _mass: number
    private _color: string
    private _bonds: [Bond, Particle][] = []

    constructor(position: Coordinates, velocity: Coordinates, acceleration: Coordinates, radius: number, mass: number, color: string) {
        this._position = position
        this._velocity = velocity
        this._acceleration = acceleration
        this._radius = radius
        this._mass = mass
        this._color = color
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

    public get color(): string {
        return this._color
    }

    public set color(value: string) {
        this._color = value
    }

    public get bonds(): [Bond, Particle][] {
        return this._bonds
    }

}
