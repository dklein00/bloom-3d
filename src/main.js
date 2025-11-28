import './style.css';
import { scene } from './components/scene.js';
import { renderer } from './components/renderer.js';
import { updateCameraOnResize } from './components/camera.js';
import { initLogo, animateLogo } from './components/logo.js';
import { setupMouseControls } from './components/controls.js';
import { composer, animatePostProcessing, updateRendererOnResize } from './components/postprocessing.js';

initLogo(scene);
setupMouseControls();

function animate() {
  requestAnimationFrame(animate);
  animateLogo();
  animatePostProcessing();
  composer.render();
}

window.addEventListener('resize', () => {
  updateCameraOnResize(renderer, composer);
  updateRendererOnResize();
});

animate();
