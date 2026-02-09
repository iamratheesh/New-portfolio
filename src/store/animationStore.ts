import { create } from 'zustand'

export type AnimState = 'IDLE' | 'WALK' | 'RUN' | 'JUMP'

interface AnimationState {
  state: AnimState
  speed: number
  grounded: boolean
  set: (s: Partial<AnimationState>) => void
}

export const useAnimationStore = create<AnimationState>((set) => ({
  state: 'IDLE',
  speed: 0,
  grounded: true,
  set: (s) => set(s),
}))
