import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";
import { RGBELoader } from "RGBELoader";
import { OrbitControls } from "OrbitControls";

import scrollAnimationDesktop from "./scroll-animation-desktop.js";
import scrollAnimationMobile from "./scroll-animation-mobile.js";

// static variable
let scene, camera, renderer, model, controls;

let canvas = document.getElementById("three-canvas");
let isMobile = window.innerWidth <= 640;

// dynamic variable
let target, position;

function init() {
  scene = new THREE.Scene();
  scene.position.y = -0.7;

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  position = camera.position;
  isMobile ? position.set(0, 0.25, 7) : position.set(0, 0.25, 5);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  target = controls.target;
}

new RGBELoader().setPath("../../assets/hdr/").load("pedestrian_overpass_1k_small.hdr", function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;

  let loader = new GLTFLoader();
  loader.load("../../assets/gltf/lowpoly_abflug_supra_s900_-_no_textures/scene.gltf", function (gltf) {
    model = gltf.scene;
    model.scale.set(0.01, 0.01, 0.01);
    scene.add(model);

    animate();
  });

  // scrollAnimationDesktop(position, target);
  isMobile ? scrollAnimationMobile(position, target) : scrollAnimationDesktop(position, target);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(onWindowResize);
resizeObserver.observe(renderer.domElement, { box: "content-box" });
