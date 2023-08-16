import Particle from "./Particle"

export default class Renderer {
    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    public particles: Particle[]

    public projectionCenterX: number
    public projectionCenterY: number

    constructor(particles: Particle[]) {
        this.canvas = document.getElementsByTagName('canvas')[0]
        this.ctx = this.canvas.getContext('2d')

        this.particles = particles

        this.canvasHeight = this.canvas.offsetHeight
        this.canvasWidth = this.canvas.offsetWidth

        const width = this.canvas.offsetWidth
        const height = this.canvas.offsetHeight
        this.projectionCenterX = width / 2
        this.projectionCenterY = height / 2
    }

    public get canvasWidth() {
        return this.canvas.offsetWidth
    }

    public get canvasHeight() {
        return this.canvas.offsetHeight
    }

    public set canvasWidth(value: number) {
        this.ctx.canvas.width = value
    }

    public set canvasHeight(value: number) {
        this.ctx.canvas.height = value
    }

    public resetCanvas() {
        this.ctx.fillStyle = "#2E2E2E"
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.ctx.fillStyle = "#fff"
    }

    public draw() {
        this.resetCanvas()
        this.particles.forEach(particle => particle.draw(this))
    }

    public update() {
        this.particles.forEach(particle => particle.update(this.particles)) // may need to change this to only take into acount old particle positions
        // go créer dans les particules un état updatedX updatedY ... qui stocke l'update et une fois que toutes
        // les particules ont été updated on valide toutes les updates en même temps
        // pour les états updatedX, ... on utilise juste l'état normal de la particule voilà c'est cool
        this.particles.forEach(particle => particle.validateUpdate())
    }

    public loop(delay: number = 1 /* ms */): NodeJS.Timeout {
        return setInterval(() => {
            this.update()
            this.draw()
        }, delay)

        // this.update() old version
        // this.draw()
        // requestAnimationFrame(() => this.loop())
    }

}
