import { create } from 'zustand'
import { Vector3 } from 'three'

interface CameraDirectionState {
  forward: Vector3
  right: Vector3
  set: (f: Vector3, r: Vector3) => void
}

export const useCameraDirectionStore = create<CameraDirectionState>(() => ({
  forward: new Vector3(0, 0, -1),
  right: new Vector3(1, 0, 0),
  set: () => {},
}))
