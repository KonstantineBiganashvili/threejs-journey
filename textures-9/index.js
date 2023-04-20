// TinyPNG for image compression - JPG lighter, PNG heavier
// Use power of 2 resolutions
// Normals should be PNG (lossless)

// Poliigon.com, 3dtextures.me, arroway-textures.ch
// Substance designer
// We can use AI tools to generate textures

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import imgSrc from 'textures/color/jpg';
import './style.css';

const cursor = {
  x: 0,
  y: 0,
};

const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//   console.log('onStart');
// };

// loadingManager.onLoaded = () => {
//   console.log('onLoaded');
// };

// loadingManager.onProgress = () => {
//   console.log('onProgress');
// };

// loadingManager.onError = () => {
//   console.log('onError');
// };

const textureLoader = new THREE.TextureLoader(loadingManager);
// const colorTexture = textureLoader.load('/textures/door/color.jpg');
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png');
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png');
const colorTexture = textureLoader.load('/textures/minecraft.png');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
);
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 2;

// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI * 0.25;

colorTexture.generateMipmaps = false;

// Minifaction Filter
colorTexture.minFilter = THREE.NearestFilter;

// Magnification Filter
colorTexture.magFilter = THREE.NearestFilter;

// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//   texture.needsUpdate = true;
// };

// image.src = '/textures/door/color.jpg';

// console.log(image.src);

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// console.log(geometry.attributes.uv);

const canvas = document.querySelector('.webgl');

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 2;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const tick = () => {
  controls.update();

  camera.lookAt(mesh.position);

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
