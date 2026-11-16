// Keyboard, mouse and pointer lock. Nothing fancy: the game takes pointer lock on
// the canvas and turns mouse movement into look deltas, and keeps two key sets —
// keys held down right now, and keys tapped since the last frame. main.js drains the
// tapped set once a frame, so a tap of B, G or R is read exactly once, never twice
// and never missed, even on a slow frame.
export function createInput(canvas, onLockChange) {
  const held = new Set();
  const tapped = new Set();
  const state = { keys: held, pressed: tapped, locked: false, firing: false, lookX: 0, lookY: 0 };

  const onKey = (event, down) => {
    if (down) {
      if (!held.has(event.code)) tapped.add(event.code);
      held.add(event.code);
    } else {
      held.delete(event.code);
    }
    if (event.code === 'Space') event.preventDefault();
  };

  window.addEventListener('keydown', (event) => onKey(event, true));
  window.addEventListener('keyup', (event) => onKey(event, false));
  window.addEventListener('blur', () => {
    held.clear();
    tapped.clear();
  });
  window.addEventListener('mousemove', (event) => {
    if (state.locked) {
      state.lookX += event.movementX;
      state.lookY += event.movementY;
    }
  });
  window.addEventListener('mousedown', (event) => {
    if (state.locked && event.button === 0) state.firing = true;
  });
  window.addEventListener('mouseup', (event) => {
    if (event.button === 0) state.firing = false;
  });
  document.addEventListener('pointerlockchange', () => {
    state.locked = document.pointerLockElement === canvas;
    if (!state.locked) {
      held.clear();
      state.firing = false;
    }
    onLockChange(state.locked);
  });

  return {
    state,
    requestLock() {
      canvas.requestPointerLock();
    },
    takeLook() {
      const out = { x: state.lookX, y: state.lookY };
      state.lookX = 0;
      state.lookY = 0;
      return out;
    },
    takePressed() {
      const out = [...tapped];
      tapped.clear();
      return out;
    },
  };
}
