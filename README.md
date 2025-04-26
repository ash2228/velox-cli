# 🚀 velox3d

**velox3d** is a lightweight Three.js scene initializer with built-in best practices, clean defaults, and extensibility. It gives you a powerful 3D setup with just one function call — ideal for beginners and fast prototyping, but flexible enough for advanced customization.

---

## ✨ Features

- 📦 Sensible defaults (camera, lighting, background, renderer)
- 🔧 Fully customizable via options
- 🎮 OrbitControls out of the box
- 📐 Responsive resizing
- 🧩 Modular — bring your own components or use Velox CLI

---

## 📦 Installation

```bash
npm install three
```

---

## Usage
```bash
npx velox3d add Cube
npx velox3d add initScene
```

---
``` javascript
import { addCube } from "./../components/Cube.js";
import initScene from "./../components/initScene.js";

const { scene } = initScene("#my3d-scene", {
  background: "#111",
  light: {
    type: "directional"
  }
});

addCube(scene, { position: [0, 1, 0], color: "orange" });
```