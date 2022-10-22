import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

let scene, camera, renderer, cube, controls;
let canvas = document.getElementById("canvas-main");

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 2.5, 7);

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const texture = new THREE.TextureLoader().load("../../assets/textures/crate-texture-01.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  /**
   * ### Orbit Controls
   * @docs https://threejs.org/docs/#examples/en/controls/OrbitControls
   */

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 7;
  controls.maxDistance = 11;
  // controls.minPolarAngle = Math.PI * 0.3;
  // controls.maxPolarAngle = Math.PI * 0.5;
  controls.enablePan = false;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", onWindowResize);

init();
animate();

// const resizeObserver = new ResizeObserver(onWindowResize);
// resizeObserver.observe(renderer.domElement, { box: "content-box" });
