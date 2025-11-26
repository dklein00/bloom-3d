import * as THREE from 'three';

export const GaussianBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    direction: { value: new THREE.Vector2(1.0, 0.0) },
    radius: { value: 1.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform vec2 direction;
    uniform float radius;
    varying vec2 vUv;

    void main() {
      vec4 color = vec4(0.0);
      float total = 0.0;

      for (float i = -10.0; i <= 10.0; i++) {
        float weight = exp(-0.5 * (i*i) / (radius*radius));
        vec2 offset = direction * i / resolution;
        color += texture2D(tDiffuse, vUv + offset) * weight;
        total += weight;
      }

      gl_FragColor = color / total;
    }
  `
};