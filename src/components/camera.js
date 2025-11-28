import * as THREE from 'three';

let aspect = window.innerWidth / window.innerHeight;
const frustumSize = 20;

export const camera = new THREE.OrthographicCamera(
  frustumSize * aspect / -2,
  frustumSize * aspect / 2,
  frustumSize / 2,
  frustumSize / -2,
  14,
  26
);
camera.position.set(0, 0, 20);

export function updateCameraOnResize(renderer, composer) {
  aspect = window.innerWidth / window.innerHeight;
  camera.left = -frustumSize * aspect / 2;
  camera.right = frustumSize * aspect / 2;
  camera.updateProjectionMatrix(renderer, composer);
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}
