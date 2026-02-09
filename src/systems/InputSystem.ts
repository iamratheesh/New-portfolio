type InputState = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  jump: boolean
}

const state: InputState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
}

export function initInputSystem() {
  window.addEventListener('keydown', onKey)
  window.addEventListener('keyup', onKey)
}

function onKey(e: KeyboardEvent) {
  const pressed = e.type === 'keydown'

  switch (e.code) {
    case 'KeyW':
    case 'ArrowUp':
      state.forward = pressed
      break
    case 'KeyS':
    case 'ArrowDown':
      state.backward = pressed
      break
    case 'KeyA':
    case 'ArrowLeft':
      state.left = pressed
      break
    case 'KeyD':
    case 'ArrowRight':
      state.right = pressed
      break
    case 'Space':
      state.jump = pressed
      break
  }
}

export function getInput() {
  return state
}
