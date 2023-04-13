import gsap from 'gsap';
import * as THREE from 'three';

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const canvas = document.querySelector('.webgl');

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

// Renderer

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

// let time = Date.now();
const clock = new THREE.Clock();

gsap.to(mesh.position, { duration: 1, x: 2, delay: 1 });

// Animations
const tick = () => {
  // const currentTime = Date.now();

  // const deltaTime = currentTime - time;
  // time = currentTime;

  // console.log(deltaTime);

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime * Math.PI * 2;
  // mesh.rotation.x = elapsedTime * Math.PI * 2;
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);

  // camera.lookAt(mesh.position);
  // camera.position.z = Math.sin(elapsedTime);

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
