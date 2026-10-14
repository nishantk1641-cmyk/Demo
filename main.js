import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const mount = document.querySelector('#scene');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#e5e0d7');

const camera = new THREE.PerspectiveCamera(
  45,
  mount.clientWidth / mount.clientHeight,
  0.1,
  100
);
camera.position.set(3.2, 2.4, 4.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(mount.clientWidth, mount.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
mount.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.HemisphereLight(0xffffff, 0x77716a, 2));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
keyLight.position.set(3, 5, 4);
scene.add(keyLight);

const geometry = new THREE.TorusKnotGeometry(0.9, 0.28, 160, 24);
const material = new THREE.MeshStandardMaterial({
  color: 0x252525,
  metalness: 0.55,
  roughness: 0.24
});
const object = new THREE.Mesh(geometry, material);
scene.add(object);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0xd4cec3, roughness: 1 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.4;
scene.add(floor);

function resize() {
  const width = mount.clientWidth;
  const height = mount.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
window.addEventListener('resize', resize);

function animate() {
  requestAnimationFrame(animate);
  object.rotation.y += 0.003;
  controls.update();
  renderer.render(scene, camera);
}
animate();
