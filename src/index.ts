import Covalence from "./classes/Covalence";
import Field from "./classes/Field";
import Particle from "./classes/Particle";
import Renderer from "./classes/Renderer";

const electricField = new Field()

const particleA = new Particle('A', { x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 0 }, 5, 1, '#f00', true)
particleA.subscribeToElectricField(electricField, 1)
const particleB = new Particle('B', { x: 100, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 0 }, 5, 1, '#0f0')
particleB.subscribeToElectricField(electricField, 1)
const particleC = new Particle('C', { x: -100, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, 5, 1, '#00f')
particleC.subscribeToElectricField(electricField, 1)
// const particleD = new Particle('D', { x: -100, y: 0, z: 150 }, { x: 0, y: 0, z: 10 }, { x: 0, y: 0, z: 0 }, 5, 1, 1, '#0ff')
// const particleE = new Particle('E', { x: 0, y: 0, z: 20 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, 5, 1, 1, '#f0f')
const particles = [particleA, particleB, particleC, /*particleD, particleE*/]
// il faut régir les forces entre les particules une fois qu'elles se déplacent et s'affichent correctement

const covalences: Covalence[] = [
    new Covalence(50, particleA, particleB),
    new Covalence(50, particleB, particleC),
    // new Covalence(50, particleA, particleC), 
    // new Covalence(50, particleA, particleD),
    // new Covalence(50, particleB, particleD),
    // new Covalence(50, particleC, particleD),
    // new Covalence(25, particleA, particleE),
    // new Covalence(25, particleB, particleE),
    // new Covalence(25, particleC, particleE),
    // new Covalence(25, particleD, particleE),
]

const renderer = new Renderer(particles, covalences)
renderer.loop()
