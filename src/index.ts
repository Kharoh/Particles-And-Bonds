import Particle from "./classes/Particle";
import Renderer from "./classes/Renderer";

const particleA = new Particle('A', { x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 0 }, 10, 5, 1, '#f00', true)
const particleB = new Particle('B', { x: 100, y: 0, z: 0 }, { x: 0, y: 2, z: 0 }, { x: 0, y: 0, z: 0 }, 10, 1, 1, '#0f0')
const particleC = new Particle('C', { x: -100, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, 10, 1, 1, '#00f')

// il faut régir les forces entre les particules une fois qu'elles se déplacent et s'affichent correctement

const renderer = new Renderer([particleA, particleB])
renderer.loop()
