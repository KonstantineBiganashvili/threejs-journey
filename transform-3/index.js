import * as THREE from 'three';

const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
// });

// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// mesh.position.x = 1;
// mesh.position.y = -0.6;
// mesh.position.z = 1;

// mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

// Rotation
// mesh.rotation.reorder('YXZ');
// mesh.rotation.y = Math.PI / 2;
// mesh.rotation.x = Math.PI / 4;
// mesh.rotation.z = Math.PI / 2;

// Group
const group = new THREE.Group();

group.position.y = 1;
group.scale.y = 2;
group.rotateY(1);

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

cube2.position.x = -2;
cube3.position.x = 2;

group.add(cube1);
group.add(cube2);
group.add(cube3);

// Axis helper

const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

// Camera

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// camera.position.x = 1;
// camera.position.y = 1;
camera.position.z = 3;

// camera.lookAt(mesh.position);

scene.add(camera);

// Renderer

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
