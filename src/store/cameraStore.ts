import { create } from 'zustand'

interface CameraState {
  target: any | null
  setTarget: (ref: any) => void
}

export const useCameraStore = create<CameraState>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
}))
