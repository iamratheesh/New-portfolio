'use client'

import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Quaternion, Vector3 } from 'three'
import { useAnimationStore } from '@/store/animationStore'

import { updatePlayerMovement } from './PlayerController'
import { useCameraStore } from '@/store/cameraStore'
import { RobloxVisual } from './RobloxVisual'

import { resolveAnimState } from './animationFSM'

const moveDir = new Vector3()
const quat = new Quaternion()
const forward = new Vector3(0, 0, 1)

export function Player() {
  const ref = useRef<any>(null)
  const setTarget = useCameraStore((s) => s.setTarget)

  const setAnim = useAnimationStore((s) => s.set)

  useEffect(() => {
    if (ref.current) setTarget(ref)
  }, [setTarget])

  useFrame((_, delta) => {
    const body = ref.current
    if (!body) return

    const vel = body.linvel()
    const grounded = Math.abs(vel.y) < 0.05

    updatePlayerMovement(body, delta, grounded)

    moveDir.set(vel.x, 0, vel.z)
    if (moveDir.lengthSq() > 0.001) {
      moveDir.normalize()
      quat.setFromUnitVectors(forward, moveDir)
      body.setRotation(quat, true)
    }

    const horizontalSpeed = Math.sqrt(vel.x * vel.x + vel.z * vel.z)
    setAnim({
      speed: horizontalSpeed,
      grounded,
    })
    setAnim((prev:any) => {
  const next = resolveAnimState(horizontalSpeed, grounded)
  return prev.state === next ? {} : { state: next }
})

  })

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      position={[0, 1, 0]}
      enabledRotations={[false, false, false]}
    >
      {/* Physics collider */}
      <CapsuleCollider args={[0.9, 0.4]} />

      {/* Visual only */}
      <RobloxVisual />
    </RigidBody>
  )
}
