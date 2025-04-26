import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export async function addModel(
  scene,
  { src, position = [0, 0, 0], scale = 1 }
) {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(src);

  gltf.scene.position.set(...position);
  gltf.scene.scale.set(scale, scale, scale);
  scene.add(gltf.scene);

  return gltf.scene;
}
