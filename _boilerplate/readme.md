```html
<script type="importmap">
  {
    "imports": {
      // THREE.JS
      "three": "https://unpkg.com/three@0.143.0/build/three.module.js",
      "OrbitControls": "https://unpkg.com/three@0.143.0/examples/jsm/controls/OrbitControls.js",
      "GLTFLoader": "https://unpkg.com/three@0.143.0/examples/jsm/loaders/GLTFLoader.js",
      "RGBELoader": "https://unpkg.com/three@0.143.0/examples/jsm/loaders/RGBELoader.js",
      // GSAP
      "gsap": "https://unpkg.com/gsap@3.11.3/index.js",
      "ScrollTrigger": "https://unpkg.com/gsap@3.11.3/ScrollTrigger.js"
    }
  }
</script>
```

```js
import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "GLTFLoader";
import { RGBELoader } from "RGBELoader";

import gsap from "gsap";
import { ScrollTrigger } from "ScrollTrigger";
```
