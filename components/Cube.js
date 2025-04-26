import * as THREE from "three";

export function addCube(scene, options = {}) {
  const size = options.size || 1;
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({
    color: options.color || "skyblue",
  });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(...(options.position || [0, 0, 0]));
  scene.add(cube);
  return cube;
}
