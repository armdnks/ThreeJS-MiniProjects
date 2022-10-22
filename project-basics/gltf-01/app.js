import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";
import { RGBELoader } from "RGBELoader";
import { OrbitControls } from "OrbitControls";

let scene, camera, renderer, model, controls;

function init() {
  scene = new THREE.Scene();
  scene.position.y = -0.7;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.set(3, 1, 7);

  /**
   * ### RGBE Loader
   */

  new RGBELoader().setPath("../../assets/hdr/").load("pedestrian_overpass_1k_small.hdr", function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // texture.flipY = false;
    scene.environment = texture;

    /**
     * ### GLTF Loader
     * @docs https://threejs.org/docs/#examples/en/loaders/GLTFLoader
     * @example https://threejs.org/examples/#webgl_loader_gltf
     * @code https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html
     */

    let loader = new GLTFLoader();
    loader.load(
      "../../assets/gltf/lowpoly_abflug_supra_s900_-_no_textures/scene.gltf",
      function (gltf) {
        model = gltf.scene;
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        /**
         * ### Callback function
         * @desc callback to load init function first then animate function
         * @error Uncaught TypeError: Cannot read properties of undefined (reading 'rotation')
         */

        animate();
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log(error);
      }
    );
  });

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 13;
  controls.minPolarAngle = Math.PI * 0.3;
  controls.maxPolarAngle = Math.PI * 0.5;
  controls.enablePan = false;
  controls.update();

  // ### AxesHelper
  // scene.add(new THREE.AxesHelper(500));
}

/**
 * ### On Mouse Down or Touch Start
 * @desc If mouse click, freeze model.rotation.y. Else rotate the model
 * @url https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down
 */

let mouseActive = 0;
window.addEventListener("mousedown", () => ++mouseActive);
window.addEventListener("mouseup", () => --mouseActive);
window.addEventListener("touchstart", () => ++mouseActive);
window.addEventListener("touchend", () => --mouseActive);

function animate() {
  requestAnimationFrame(animate);

  if (mouseActive === 1) {
    model.rotation.y += 0;
  } else {
    // Fix with callback function
    model.rotation.y += -0.007;
    mouseActive = 0;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", onWindowResize);

init();

// const resizeObserver = new ResizeObserver(onWindowResize);
// resizeObserver.observe(renderer.domElement, { box: "content-box" });
