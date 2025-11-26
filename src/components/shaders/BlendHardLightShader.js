import * as THREE from 'three';

export const BlendHardLightShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTexture: { value: null },
    mix: { value: 1.0 }
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
    uniform sampler2D uTexture;
    uniform float mix;
    varying vec2 vUv;

    vec3 blendHardLight(vec3 base, vec3 blend){
      float r = (blend.r < 0.5) ? 2.0 * base.r * blend.r : 1.0 - 2.0 * (1.0 - base.r) * (1.0 - blend.r);
      float g = (blend.g < 0.5) ? 2.0 * base.g * blend.g : 1.0 - 2.0 * (1.0 - base.g) * (1.0 - blend.g);
      float b = (blend.b < 0.5) ? 2.0 * base.b * blend.b : 1.0 - 2.0 * (1.0 - base.b) * (1.0 - blend.b);
      return vec3(r, g, b);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      vec4 blend = texture2D(uTexture, vUv);
      vec4 hardLightColor = vec4(blendHardLight(color.rgb, blend.rgb), 1.0);
      gl_FragColor = hardLightColor * mix + color * (1.0 - mix);
    }
  `
};