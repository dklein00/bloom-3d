import * as THREE from 'three';

export const GaussianBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uDirection: { value: new THREE.Vector2(1.0, 0.0) },
    uRadius: { value: 1.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform vec2 uDirection;
    uniform float uRadius;
    varying vec2 vUv;

    void main() {
      vec4 color = vec4(0.0);
      float total = 0.0;

      for (float i = -10.0; i <= 10.0; i++) {
        float weight = exp(-0.5 * (i*i) / (uRadius*uRadius));
        vec2 offset = uDirection * i / uResolution;
        color += texture2D(tDiffuse, vUv + offset) * weight;
        total += weight;
      }

      gl_FragColor = color / total;
    }
  `
};