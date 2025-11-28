import * as THREE from 'three';
import { scene } from './scene.js';

let bloomCenter, bloomOrbit, bloomLogo, velocity = 0;
const clock = new THREE.Clock();
let booting = true;

const material = new THREE.MeshStandardMaterial({
  color: 0x849BD1,
  emissive: 0x849BD1,
  emissiveIntensity: 0,
});

export function initLogo(sceneRef) {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);

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
  bloomLogo.rotation.set(0 , -Math.PI/12, -Math.PI/2);
  sceneRef.add(bloomLogo);
}

let startTime = 0
let qCurrent = new THREE.Quaternion();
const q0 = new THREE.Quaternion(-0.092296, 0.092296, -0.7010574, 0.7010574);
const q1 = new THREE.Quaternion(0.1690817, -0.0700359, -0.3919038, 0.9016195);
function bootUpAnimation() {
  if (startTime == 0) startTime = clock.getElapsedTime();
  const elapsed = clock.getElapsedTime() - startTime;
  const progress = Math.min(elapsed / 2, 1); 
  const eased = 1 - Math.pow(1 - progress, 3);
  qCurrent.slerpQuaternions(q0, q1, eased);
  bloomLogo.quaternion.copy(qCurrent);
  material.emissiveIntensity = eased * 1.8;

  const progressOrbit = Math.min(elapsed / 3, 1); 
  const easedOrbit = 1 - Math.pow(1 - progressOrbit, 3);
  bloomOrbit.rotation.y = easedOrbit * Math.PI/4 - Math.PI/4;

  if (progressOrbit >= 1) {
    booting = false;
  }
}

export function animateLogo() {
  if (booting) {
    bootUpAnimation();
  } else {
    const dt = clock.getDelta();
    bloomOrbit.rotation.y += velocity;
    velocity *= 0.1 ** dt;
    if (Math.abs(velocity) < 0.0001) velocity = 0;
  }

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
