import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import './style.css';

// Performance costs:
// Minimal cost - ambient light, hemisphere light
// Medium cost - direction light, point light
// High cost - spot light, rectangular light

// Baking light is better with 3D software

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */

// Ambient light, general
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// ambientLight.color = new THREE.Color('white');
// ambientLight.intensity = 0.5;

// One way directional light
const directionalLight = new THREE.DirectionalLight(0x00ffcc, 0.5);
// To change position and orientation
directionalLight.position.set(1, 0.25, 0);

// hemisphere light - first value will be applied from the top and second value will be applied on the bottom, mixing in the middle
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);

// point light - illuminates every direction from one point
const pointLight = new THREE.PointLight(0xff9000, 0.7);
pointLight.position.set(1, -0.5, 1);
// Fade distance
pointLight.distance = 3;
// How light decays with distance
// pointLight.decay = 10;

// Rect area light - rectangular/plane light with direction, third and fourth value are width and height
// Only works with MeshStandardMaterial and MeshPhysicalMaterial
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());

// Spot light
const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5, // intensity
  10, // distance
  Math.PI * 0.1, // radius
  0.25, // penumbra, intensity on edges
  1 // decay
);
spotLight.position.set(0, 2, 3);
spotLight.target.position.x = -0.75;

// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(hemisphereLight);
scene.add(pointLight);
scene.add(rectAreaLight);
scene.add(spotLight);
scene.add(spotLight.target);

// scene.add(hemisphereLightHelper);
// scene.add(directionalLightHelper);
// scene.add(pointLightHelper);
// scene.add(spotLightHelper);
scene.add(rectAreaLightHelper);

/**
 * GUI
 */

gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01);
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.01);
gui.add(pointLight, 'distance').min(1).max(100).step(1);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
