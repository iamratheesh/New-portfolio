import { Vector3 } from 'three'
import { getInput } from '@/systems/InputSystem'
import { PLAYER_CONFIG } from './constants'
import { useCameraDirectionStore } from '@/store/cameraDirectionStore'

const move = new Vector3()

export function updatePlayerMovement(
  body: any,
  delta: number,
  grounded: boolean
) {
  const input = getInput()
  const { forward, right } = useCameraDirectionStore.getState()

  move.set(0, 0, 0)

  if (input.forward) move.add(forward)
  if (input.backward) move.sub(forward)
  if (input.right) move.add(right)
  if (input.left) move.sub(right)

  const vel = body.linvel()

  if (move.lengthSq() > 0) {
    move.normalize().multiplyScalar(PLAYER_CONFIG.speed)
    vel.x = move.x
    vel.z = move.z
  } else {
    vel.x *= PLAYER_CONFIG.damping
    vel.z *= PLAYER_CONFIG.damping
  }

  if (input.jump && grounded) {
    vel.y = PLAYER_CONFIG.jumpForce
  }

  body.setLinvel(vel, true)
}
