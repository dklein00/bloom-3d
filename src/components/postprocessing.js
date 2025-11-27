import * as THREE from 'three';
import { scene } from './scene.js';
import { camera } from './camera.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GaussianBlurShader } from './shaders/GaussianBlurShader.js';
import { BlendHardLightShader } from './shaders/BlendHardLightShader.js';
import { SMAAPass } from 'three/examples/jsm/Addons.js';
import { renderer } from './renderer.js';
import grainImg from '../assets/textures/grain.png';

export const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.75,
  0.8,
  0.2
);
composer.addPass(bloomPass);

const hBlur = new ShaderPass(GaussianBlurShader);
const vBlur = new ShaderPass(GaussianBlurShader);
hBlur.uniforms.direction.value = new THREE.Vector2(1.0, 0.0);
vBlur.uniforms.direction.value = new THREE.Vector2(0.0, 1.0);
composer.addPass(hBlur);
composer.addPass(vBlur);

const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
composer.addPass(smaaPass);

const grainTexture = new THREE.TextureLoader().load(grainImg, () => {
    grainTexture.needsUpdate = true;
});
const grainPass = new ShaderPass(BlendHardLightShader);
grainPass.uniforms.uTexture.value = grainTexture;
grainPass.uniforms.mix.value = 0.8;
composer.addPass(grainPass);

const clock = new THREE.Clock();
export function animatePostProcessing(){
  bloomPass.strength = 0.75 + (Math.sin(clock.getElapsedTime() / 2) * 0.025);
  const random = Math.random();
  hBlur.uniforms.radius.value = 1.5 + (random > 0.98 ? 1.5 : 0);
  vBlur.uniforms.radius.value = 1.5 + (random > 0.98 ? 1.5 : 0);
};