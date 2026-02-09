import { create } from 'zustand'

interface GameState {
  paused: boolean
  setPaused: (v: boolean) => void
}

export const useGameStore = create<GameState>((set) => ({
  paused: false,
  setPaused: (paused) => set({ paused })
}))
