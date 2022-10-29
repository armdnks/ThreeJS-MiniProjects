import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

let scene, camera, renderer, cube, controls;

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000);
  camera.position.set(200, 0, 0);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 100;
  controls.maxDistance = 300;
  controls.enablePan = false;
  controls.update();

  /**
   * ### TEXTURE ARRAY
   * @desc ...
   */

  const textureArray = [];

  const texture_ft = new THREE.TextureLoader().load("../../assets/skybox/ryfjallet/front.jpg");
  const texture_bk = new THREE.TextureLoader().load("../../assets/skybox/ryfjallet/back.jpg");
  const texture_up = new THREE.TextureLoader().load("../../assets/skybox/ryfjallet/top.jpg");
  const texture_dn = new THREE.TextureLoader().load("../../assets/skybox/ryfjallet/bottom.jpg");
  const texture_rt = new THREE.TextureLoader().load("../../assets/skybox/ryfjallet/right.jpg");
  const texture_lf = new THREE.TextureLoader().load("../../assets/skybox/ryfjallet/left.jpg");

  textureArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  textureArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  textureArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  textureArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  textureArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  textureArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  for (let i = 0; i < textureArray.length; i++) textureArray[i].side = THREE.BackSide;

  const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
  const skybox = new THREE.Mesh(skyboxGeometry, textureArray);

  scene.add(skybox);

  animate();
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
