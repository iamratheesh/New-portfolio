import { AnimState } from '@/store/animationStore'

export function resolveAnimState(
  speed: number,
  grounded: boolean
): AnimState {
  if (!grounded) return 'JUMP'
  if (speed < 0.1) return 'IDLE'
  if (speed < 4) return 'WALK'
  return 'RUN'
}
