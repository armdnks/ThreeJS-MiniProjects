import * as THREE from "three";

const scene = new THREE.Scene(); // Create scene

/**
 * ### Create Camera
 * @docs https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
 *
 * @syntax PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
 * - fov — Camera frustum vertical field of view.
 * - aspect — Camera frustum aspect ratio.
 * - near — Camera frustum near plane.
 * - far — Camera frustum far plane.
 */

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5; // Adjust camera position

/**
 * ### Create Renderer
 * @docs https://threejs.org/docs/?q=WebGLRenderer#api/en/renderers/WebGLRenderer
 */

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/**
 * ### Box Geometry
 * @docs https://threejs.org/docs/#api/en/geometries/BoxGeometry
 */

const geometry = new THREE.BoxGeometry(2, 2, 2);

// Solid Color
// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // solid color

/**
 * ### Texture Map
 * @url https://github.com/mrdoob/three.js/tree/master/examples/textures
 */

const texturePath = "../../assets/textures/crate-texture-01.jpg";
const texture = new THREE.TextureLoader().load(texturePath);
const material = new THREE.MeshBasicMaterial({ map: texture });

/**
 * ### Mesh
 * @docs https://threejs.org/docs/#api/en/objects/Mesh
 */

const cube = new THREE.Mesh(geometry, material);

scene.add(cube); // Add mesh to scene

/**
 * ### Animate Function
 * @desc Render scene and camera
 */

function animate() {
  requestAnimationFrame(animate);

  // Cube rotation animation
  cube.rotation.x += 0.01;
  cube.rotation.y -= 0.01;

  renderer.render(scene, camera); // render 3D to browser
}

/**
 * ### On Window Resize Function
 * @desc realtime change canvas size based on window width and height
 * @url https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
 */

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", onWindowResize);

animate(); // invoke animate function
