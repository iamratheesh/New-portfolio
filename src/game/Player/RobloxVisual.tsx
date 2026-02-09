'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { useAnimationStore } from '@/store/animationStore'

export function RobloxVisual() {
  const leftArm = useRef<any>(null)
  const rightArm = useRef<any>(null)
  const leftLeg = useRef<any>(null)
  const rightLeg = useRef<any>(null)

  const { state, speed } = useAnimationStore()

  useFrame((_, delta) => {
    if (state !== 'WALK' && state !== 'RUN') {
      // reset pose smoothly
      const t = 5 * delta
      leftArm.current.rotation.x = MathUtils.lerp(leftArm.current.rotation.x, 0, t)
      rightArm.current.rotation.x = MathUtils.lerp(rightArm.current.rotation.x, 0, t)
      leftLeg.current.rotation.x = MathUtils.lerp(leftLeg.current.rotation.x, 0, t)
      rightLeg.current.rotation.x = MathUtils.lerp(rightLeg.current.rotation.x, 0, t)
      return
    }

    const time = performance.now() * 0.005
    const swing = Math.sin(time) * (state === 'RUN' ? 0.8 : 0.4)

    leftArm.current.rotation.x = swing
    rightArm.current.rotation.x = -swing
    leftLeg.current.rotation.x = -swing
    rightLeg.current.rotation.x = swing
  })

  return (
    <group position={[0, 0.6, 0]}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#ffeb3b" />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.5]} />
        <meshStandardMaterial color="#1565c0" />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArm} position={[-0.75, 1.1, 0]}>
        <boxGeometry args={[0.3, 0.9, 0.3]} />
        <meshStandardMaterial color="#ffeb3b" />
      </mesh>

      <mesh ref={rightArm} position={[0.75, 1.1, 0]}>
        <boxGeometry args={[0.3, 0.9, 0.3]} />
        <meshStandardMaterial color="#ffeb3b" />
      </mesh>

      {/* Legs */}
      <mesh ref={leftLeg} position={[-0.25, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.4]} />
        <meshStandardMaterial color="#1e88e5" />
      </mesh>

      <mesh ref={rightLeg} position={[0.25, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.4]} />
        <meshStandardMaterial color="#1e88e5" />
      </mesh>
    </group>
  )
}
