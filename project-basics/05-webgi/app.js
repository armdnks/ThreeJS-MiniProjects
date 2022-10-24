/**
 * ### WEBGI STARTER
 * @desc WebGI to serve 3D model on the browser
 *
 * @url https://github.com/pixotronics/webgi-vanilla-starter/blob/master/src/index.ts
 * @docs https://webgi.xyz/docs/intro
 */

import {
  ViewerApp,
  AssetManagerPlugin,
  AssetManagerBasicPopupPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  DiamondPlugin,
  DepthOfFieldPlugin,
  GroundPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  TweakpaneUiPlugin,

  // Color, // Import THREE.js internals
  // Texture, // Import THREE.js internals
} from "webgi";

async function setupViewer() {
  /**
   * ### Initialize The Viewer
   * @desc The main entry point for the 3D viewer SDK. Creates a scene, renderer and attaches itself to a canvas.
   * @docs https://webgi.xyz/docs/api/classes/Core_API.ViewerApp#canvas
   */

  const viewer = new ViewerApp({ canvas: document.getElementById("webgi-canvas") });

  /**
   * ### Add Some Plugins
   * @desc ...
   * @docs https://webgi.xyz/docs/api/classes/Asset_Management.AssetManagerPlugin
   *
   * @syntax async _.addPlugin(plugin, ...args): Promise
   */

  const manager = await viewer.addPlugin(AssetManagerPlugin);

  /**
   * ### Pop Up Notifications
   * @desc Add a popup(in HTML) with download progress when any asset is downloading.
   */

  await viewer.addPlugin(AssetManagerBasicPopupPlugin);

  /**
   * ### Plugins
   * @desc Add plugins individually.
   *
   * @note Or use this to add all main (plugins) ones at once.
   * @example
   *    import { addBasePlugins } from "webgi";
   *    ...
   *    await addBasePlugins(viewer)
   */

  await viewer.addPlugin(GBufferPlugin);
  await viewer.addPlugin(new ProgressivePlugin(32));
  await viewer.addPlugin(new TonemapPlugin(viewer.useRgbm));
  await viewer.addPlugin(GammaCorrectionPlugin);
  await viewer.addPlugin(SSRPlugin);
  await viewer.addPlugin(SSAOPlugin);
  await viewer.addPlugin(DiamondPlugin);
  await viewer.addPlugin(DepthOfFieldPlugin);
  await viewer.addPlugin(BloomPlugin);
  await viewer.addPlugin(GroundPlugin);

  /**
   * ### Depth of Field Settings
   * @desc ...
   *
   * @tweak
   *  const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin);
   *  uiPlugin.setupPlugins(DepthOfFieldPlugin);
   */

  const depthOfField = viewer.plugins.DepthOfField;
  depthOfField.depthRange = 0.5;
  depthOfField.nearBlurScale = 0.05;
  depthOfField.farBlurScale = 0.15;

  /**
   * ### Bloom Effect Settings
   * @desc ...
   *
   * @tweak
   *  const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin);
   *  uiPlugin.setupPlugins(BloomPlugin);
   */

  const bloomEffect = viewer.plugins.Bloom.pass.passObject;
  bloomEffect.threshold = 1;
  bloomEffect.intensity = 2;

  /**
   * ### Ground Floor Settings
   * @desc ...
   *
   * @tweak
   *  const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin);
   *  uiPlugin.setupPlugins(GroundPlugin);
   */

  const groundFloor = viewer.plugins.Ground;
  groundFloor.enabled = true;
  groundFloor.size = 20;

  /**
   * ### Call Plugins
   * @desc This must be called once after all plugins are added.
   */

  viewer.renderer.refreshPipeline();

  /**
   * ### UI Plugin
   * @desc Add some UI for tweak and testing & Add plugins to the UI to see their settings.
   */

  // un-comment this 2 lines of code to show tweak panel ui
  // const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin);
  // uiPlugin.setupPlugins(GroundPlugin, BloomPlugin, DepthOfFieldPlugin);

  /**
   * ### CAMERA TRANSFORM
   * @desc The camera position and target can be set directly in the controller.
   * @docs https://webgi.xyz/docs/manual/camera-control/index.html#camera-transform
   */

  const camera = viewer.scene.activeCamera;
  camera.position.set(2.5, 1, 6.5);
  camera.positionUpdated();
  camera.target.set(0, 0.45, 0);
  camera.targetUpdated();

  /**
   * ### CAMERA CONTROLS
   * @desc Options for controls like OrbitControls can be set directly after accessing it.
   * @docs https://webgi.xyz/docs/manual/camera-control/index.html#controls-options
   */

  const controls = viewer.scene.activeCamera.controls;
  controls.autoRotate = false; // Automatically rotate camera 360deg
  controls.autoRotateSpeed = -2;
  controls.minDistance = 4.5;
  controls.maxDistance = 13;
  controls.minPolarAngle = Math.PI * 0.25;
  controls.maxPolarAngle = Math.PI * 0.5;
  controls.enablePan = false; // Move the camera up, down, right, left (shift + left click || right click)
  controls.update();

  /**
   * ### Add 3D Models
   * @desc ...
   * @docs https://webgi.xyz/docs/api/classes/Asset_Management.AssetManagerPlugin#addfrompath
   * @syntax async _.addFromPath(path, options?): Promise
   */

  const options = { autoScale: true };
  await manager.addFromPath("../../assets/glb/bmw_1m.glb", options);

  /**
   * ### Environment Map
   * @desc Load an environment map if not set in the glb file
   * @docs https://webgi.xyz/docs/api/classes/Asset_Management.AssetImporter#importsinglepath
   * @syntax async _.importSinglePath(path, options?): Promise
   */

  const environmentMap = await manager.importer.importSinglePath("../../assets/hdr/studio011small.hdr");
  environmentMap.flipY = true;
  environmentMap.rotation = 300;
  viewer.scene.setEnvironment(environmentMap); // Render environment map to scene
  // viewer.setBackground(environmentMap); // Change background based on environment map
}

setupViewer();
