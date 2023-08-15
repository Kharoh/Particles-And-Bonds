import Particle from "./classes/Particle";
import Renderer from "./classes/Renderer";

// Create 1 particle
// à chaque génération il faudra remettre un fond blanc sur le canvas


const particle = new Particle('', { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, 10, 1, 1, '#fff')

const renderer = new Renderer([particle])
