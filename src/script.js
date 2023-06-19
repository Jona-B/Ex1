// Importer la bibliothèque Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sol
const groundGeometry = new THREE.PlaneGeometry(50, 10);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x42A77E });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(ground);

// Créer les sphères avec les matériaux et textures
const textureLoader = new THREE.TextureLoader();

// Première sphère
const sphere1Geometry = new THREE.SphereGeometry(1, 32, 32);
const sphere1Material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./textures/raw_plank_wall_diff_1k.jpg'),
});
const sphere1 = new THREE.Mesh(sphere1Geometry, sphere1Material);
scene.add(sphere1);

// Deuxième sphère
const sphere2Geometry = new THREE.SphereGeometry(1, 32, 32);
const sphere2Material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);

// Troisième sphère
const sphere3Geometry = new THREE.SphereGeometry(1, 32, 32);
const sphere3Material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./textures/raw_plank_wall_disp_1k.png'),
});
const sphere3 = new THREE.Mesh(sphere3Geometry, sphere3Material);
sphere3.position.set(3, 0, 0);
scene.add(sphere3);

// Lumière
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 5, 0);
spotLight.target.position.set(sphere2.position.x, sphere2.position.y, sphere2.position.z);
scene.add(spotLight);
scene.add(spotLight.target);

// Positionner la caméra
camera.position.z = 5;

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Animaton
function animate() {
  requestAnimationFrame(animate);

  // 1ère sphère sur les axes Y et X
  sphere1.rotation.y += 0.01;
  sphere1.rotation.x += 0.01;

  // 2ème sphère orbite
  const radius = 3;
  const angle = Date.now() * 0.001;
  sphere2.position.x = sphere1.position.x + radius * Math.cos(angle);
  sphere2.position.z = sphere1.position.z + radius * Math.sin(angle);

  // 3ème sphère sur les axes Y et X
  sphere3.rotation.y += 0.01;
  sphere3.rotation.x += 0.01;

  // Rendre la scène
  renderer.render(scene, camera);
}

// Rendu
animate();
