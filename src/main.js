import './style.css';
import { scene } from './components/scene.js';
import { camera, onWindowResize } from './components/camera.js';
import { renderer } from './components/renderer.js';
import { initLogo, animateLogo } from './components/logo.js';
import { setupMouseControls } from './components/controls.js';
import { composer, animatePostProcessing } from './components/postprocessing.js';

initLogo(scene);
setupMouseControls();

function animate() {
  requestAnimationFrame(animate);
  animateLogo();
  animatePostProcessing();
  composer.render();
}

window.addEventListener('resize', () => onWindowResize(renderer, composer, camera));
animate();
