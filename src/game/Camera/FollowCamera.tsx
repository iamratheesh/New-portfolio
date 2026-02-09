'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useRef } from 'react'
import { useCameraStore } from '@/store/cameraStore'
import { consumeMouseInput } from '@/systems/MouseSystem'
import { CAMERA_CONFIG } from './camera.config'
import { useCameraDirectionStore } from '@/store/cameraDirectionStore'

export function FollowCamera() {
  const { camera } = useThree()
  const targetRef = useCameraStore((s) => s.target)

  const setDir = useCameraDirectionStore((s) => s.set)
const forward = new Vector3()
const right = new Vector3()

camera.getWorldDirection(forward)
forward.y = 0
forward.normalize()

right.crossVectors(forward, camera.up).normalize()

setDir(forward.clone(), right.clone())


  // camera state (persistent, no re-render)
  const yaw = useRef(0)
  const pitch = useRef(0.3)
  const distance = useRef(8)

  const targetPos = new Vector3()
  const camPos = new Vector3()

  useFrame(() => {
    if (!targetRef?.current) return

    // 1️⃣ Read mouse intent
    const { dx, dy, wheel } = consumeMouseInput()

    yaw.current -= dx * CAMERA_CONFIG.rotateSpeed
    pitch.current -= dy * CAMERA_CONFIG.rotateSpeed
    distance.current += wheel * CAMERA_CONFIG.zoomSpeed

    // clamp
    pitch.current = Math.max(
      CAMERA_CONFIG.minPitch,
      Math.min(CAMERA_CONFIG.maxPitch, pitch.current)
    )

    distance.current = Math.max(
      CAMERA_CONFIG.minDistance,
      Math.min(CAMERA_CONFIG.maxDistance, distance.current)
    )

    // 2️⃣ Get player position
    const t = targetRef.current.translation()
    targetPos.set(t.x, t.y + 1, t.z)

    // 3️⃣ Spherical → Cartesian
    camPos.set(
      Math.sin(yaw.current) * Math.cos(pitch.current) * distance.current,
      Math.sin(pitch.current) * distance.current,
      Math.cos(yaw.current) * Math.cos(pitch.current) * distance.current
    )

    camPos.add(targetPos)

    // 4️⃣ Apply camera
    camera.position.lerp(camPos, 0.12)
    camera.lookAt(targetPos)
  })

  return null
}
