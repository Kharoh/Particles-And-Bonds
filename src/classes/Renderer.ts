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

        this.canvasWidth = window.innerWidth
        this.canvasHeight = window.innerHeight

        const width = this.canvas.offsetWidth
        const height = this.canvas.offsetHeight
        this.projectionCenterX = width / 2
        this.projectionCenterY = height / 2
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
        this.particles.forEach(particle => particle.draw())
    }

    public update() {
        this.particles.forEach(particle => particle.update()) // may need to change this to only take into acount old particle positions
    }

    public loop() {
        this.update()
        this.draw()
        requestAnimationFrame(() => this.loop())
    }

}
