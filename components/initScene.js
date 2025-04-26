import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function initScene(selector, options = {}) {
  const container = document.querySelector(selector);
  const scene = new THREE.Scene();

  // 🌟 Defaults
  const defaults = {
    background: "#000",
    camera: {
      fov: 75,
      near: 0.1,
      far: 1000,
      position: [0, 1, 3],
    },
    light: {
      enabled: true,
      type: "hemisphere", // or 'directional', 'point', etc.
      color: 0xffffff,
      groundColor: 0x444444,
      intensity: 1,
    },
    renderer: {
      antialias: true,
      shadowMap: true,
    },
  };

  // 🧠 Merge user options
  const config = {
    background: options.background ?? defaults.background,
    camera: { ...defaults.camera, ...options.camera },
    light:
      typeof options.light === "object"
        ? { ...defaults.light, ...options.light }
        : defaults.light,
    renderer: { ...defaults.renderer, ...options.renderer },
  };
  // 🎥 Camera setup
  const camera = new THREE.PerspectiveCamera(
    config.camera.fov,
    container.clientWidth / container.clientHeight,
    config.camera.near,
    config.camera.far
  );
  camera.position.set(...config.camera.position);

  // 🖼️ Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: config.renderer.antialias,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = config.renderer.shadowMap;
  container.appendChild(renderer.domElement);

  // 🎮 Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // 🎨 Background
  scene.background = new THREE.Color(config.background);

  // 💡 Lighting
  if (config.light !== false && config.light.enabled !== false) {
    let light;

    switch (config.light.type) {
      case "directional":
        light = new THREE.DirectionalLight(
          config.light.color,
          config.light.intensity
        );
        light.position.set(5, 10, 7.5);
        break;

      case "point":
        light = new THREE.PointLight(
          config.light.color,
          config.light.intensity
        );
        light.position.set(0, 5, 0);
        break;

      case "hemisphere":
      default:
        light = new THREE.HemisphereLight(
          config.light.color,
          config.light.groundColor,
          config.light.intensity
        );
        break;
    }

    scene.add(light);
  }

  // 🌀 Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // 📐 Resize handler
  window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  return { scene, camera, renderer };
}
