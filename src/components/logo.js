import * as THREE from 'three';
import { scene } from './scene.js';

let bloomCenter, bloomOrbit, bloomLogo, velocity = 0;
const clock = new THREE.Clock();

export function initLogo(sceneRef) {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x849BD1,
    emissive: 0x849BD1,
    emissiveIntensity: 1.8,
  });

  bloomCenter = new THREE.Mesh(geometry, material);
  sceneRef.add(bloomCenter);

  bloomOrbit = new THREE.Group();
  for (let i = 0; i < 18; i++) {
    const sphere = new THREE.Mesh(geometry, material);
    const angle = (i / 18) * Math.PI * 2;
    sphere.position.set(Math.cos(angle) * 5, 0, Math.sin(angle) * 5);
    bloomOrbit.add(sphere);
  }

  bloomLogo = new THREE.Group();
  bloomLogo.add(bloomCenter);
  bloomLogo.add(bloomOrbit);
  bloomLogo.rotation.set(Math.PI/12, -Math.PI/12, 3 * Math.PI/4);
  sceneRef.add(bloomLogo);
}

export function animateLogo() {
  bloomOrbit.rotation.y += velocity;
  velocity *= 0.1 ** clock.getDelta();
  if (Math.abs(velocity) < 0.0001) velocity = 0;

  bloomOrbit.children.forEach(sphere => {
    const worldPos = new THREE.Vector3();
    sphere.getWorldPosition(worldPos);
    const localPos = bloomLogo.worldToLocal(worldPos.clone());

    const distanceToZ = Math.sqrt(localPos.x ** 2 + localPos.y ** 2);
    const scale = 0.01 + (distanceToZ / 5) * (1 - 0.01);
    sphere.scale.set(scale, scale, scale);
  });
}

export function addVelocity(v) {
  velocity = Math.min(0.01, velocity + v);
}
