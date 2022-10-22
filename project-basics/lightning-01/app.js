import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";
import { RGBELoader } from "RGBELoader";
import { OrbitControls } from "OrbitControls";
import { EffectComposer } from "EffectComposer";
import { RenderPass } from "RenderPass";
import { BokehPass } from "BokehPass";

let scene, camera, renderer, model, controls, composer;

function init() {
  scene = new THREE.Scene();
  scene.position.y = -0.7;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.7;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  /**
   * ### DIRECTINAL LIGHT
   * @desc ...
   */

  let lights = [];

  lights[0] = new THREE.DirectionalLight(0xffffff, 1);
  lights[0].position.set(0, 5, 0);
  lights[0].castShadow = true;
  lights[1] = new THREE.DirectionalLight(0x11e8bb, 3);
  lights[1].position.set(2.5, 2.5, 2.5);
  lights[1].castShadow = true;
  lights[2] = new THREE.DirectionalLight(0x8200c9, 3);
  lights[2].position.set(-2.5, 2.5, -2.5);
  lights[2].castShadow = true;

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);

  // scene.add(new THREE.DirectionalLightHelper(lights[1]));

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.set(3, 1, 7);

  new RGBELoader().setPath("../../assets/hdr/").load("studio011small_color.hdr", function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.flipY = true;
    scene.environment = texture;

    let loader = new GLTFLoader();
    loader.load("../../assets/gltf/lowpoly_abflug_supra_s900_-_no_textures/scene.gltf", function (gltf) {
      model = gltf.scene;

      model.receiveShadow = true;
      model.castShadow = true;
      model.scale.set(0.01, 0.01, 0.01);

      model.traverse(function (object) {
        if (object.isMesh) {
          object.castShadow = true;
          model.receiveShadow = true;
        }
      });

      scene.add(model);

      animate();
    });
  });

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 13;
  controls.minPolarAngle = Math.PI * 0.3;
  controls.maxPolarAngle = Math.PI * 0.5;
  controls.enablePan = false;
  controls.update();

  /**
   * ### EFFECT COMPOSER
   * @desc ...
   */

  composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  const bokehPass = new BokehPass(scene, camera, {
    focus: 1.0,
    aperture: 0.00015,
    maxblur: 0.01,

    width: window.innerWidth,
    height: window.innerHeight,
  });

  composer.addPass(renderPass);
  composer.addPass(bokehPass);
}

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
    model.rotation.y += -0.007;
    mouseActive = 0;
  }

  composer.render(scene, camera);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", onWindowResize);
init();
