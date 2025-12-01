import { addVelocity } from './logo.js';

export function setupMouseControls() {
  let isDragging = false;
  let previousMouseY = 0;

  window.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => isDragging = false);

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaY = (e.clientY - previousMouseY) / window.innerHeight;
    previousMouseY = e.clientY;
    if(e.clientX < window.innerWidth/2) {
      addVelocity(deltaY * 0.1);
    } else {
      addVelocity(deltaY * -0.1);
    }
  });
}
