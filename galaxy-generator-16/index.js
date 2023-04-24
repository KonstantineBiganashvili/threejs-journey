import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// GALAXY
const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
};

const generateGalaxy = () => {
  const {
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  } = parameters;

  // Geometry
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorInside = new THREE.Color(insideColor);
  const colorOutside = new THREE.Color(outsideColor);

  for (let i = 0; i < count * 3; i++) {
    const i3 = i * 3;
    const galaxyRadius = Math.random() * radius;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const spinAngle = galaxyRadius * spin;

    const randomX =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      radius;

    positions[i3] = Math.sin(branchAngle + spinAngle) * galaxyRadius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] =
      Math.cos(branchAngle + spinAngle) * galaxyRadius + randomZ;

    // Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, galaxyRadius / radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Material
  const material = new THREE.PointsMaterial({
    size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  // Points
  const points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy();

// DEBUG PANEL
gui.width = 400;
gui
  .add(parameters, 'count')
  .name('Particle Count')
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(() => {
    scene.clear();
    generateGalaxy();
  }); // We could also destroy elements inside the function

gui
  .add(parameters, 'size')
  .name('Particle Size')
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(() => {
    scene.clear();
    generateGalaxy();
  });

gui
  .add(parameters, 'radius')
  .name('Galaxy Radius')
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(() => {
    scene.clear();
    generateGalaxy();
  });

gui
  .add(parameters, 'branches')
  .name('Galaxy Branches')
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    scene.clear();
    generateGalaxy();
  });

gui
  .add(parameters, 'spin')
  .name('Galaxy Spin')
  .min(-5)
  .max(5)
  .step(1)
  .onFinishChange(() => {
    scene.clear();
    generateGalaxy();
  });

gui
  .add(parameters, 'randomness')
  .name('Galaxy Randomness')
  .min(0)
  .max(2)
  .step(0.01)
  .onFinishChange(() => {
    scene.clear();
    generateGalaxy();
  });

gui
  .add(parameters, 'randomnessPower')
  .name('Galaxy Randomness Power')
  .min(1)
  .max(10)
  .step(0.01)
  .onFinishChange(() => {
    scene.clear();
    generateGalaxy();
  });

gui
  .addColor(parameters, 'insideColor')
  .name('Inside Color')
  .onFinishChange(() => {
    scene.clear();
    generateGalaxy();
  });

gui
  .addColor(parameters, 'outsideColor')
  .name('Outside Color')
  .onFinishChange(() => {
    scene.clear();
    generateGalaxy();
  });

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
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
