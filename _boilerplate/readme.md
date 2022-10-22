# Three.js Installation

https://threejs.org/docs/index.html#manual/en/introduction/Installation

> index.html

```html
<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.143.0/build/three.module.js",
      "OrbitControls": "https://unpkg.com/three@0.143.0/examples/jsm/controls/OrbitControls.js",
      "GLTFLoader": "https://unpkg.com/three@0.143.0/examples/jsm/loaders/GLTFLoader.js",
      "RGBELoader": "https://unpkg.com/three@0.143.0/examples/jsm/loaders/RGBELoader.js"
    }
  }
</script>
```

> app.js

```js
import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "GLTFLoader";
import { RGBELoader } from "RGBELoader";
```
