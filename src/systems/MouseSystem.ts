let deltaX = 0
let deltaY = 0
let wheelDelta = 0
let isDragging = false

export function initMouseSystem() {
  window.addEventListener('mousedown', () => (isDragging = true))
  window.addEventListener('mouseup', () => (isDragging = false))
  window.addEventListener('mouseleave', () => (isDragging = false))

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return
    deltaX += e.movementX
    deltaY += e.movementY
  })

  window.addEventListener('wheel', (e) => {
    wheelDelta += e.deltaY
  })
}

export function consumeMouseInput() {
  const dx = deltaX
  const dy = deltaY
  const wheel = wheelDelta

  deltaX = 0
  deltaY = 0
  wheelDelta = 0

  return { dx, dy, wheel }
}
