'use client'

import { RigidBody } from '@react-three/rapier'
import { WORLD_LAYOUT } from './WorldConfig'

export function Props() {
  return (
    <>
      {WORLD_LAYOUT.landmarks.map((item) => {
        if (item.shape === 'box') {
          return (
            <RigidBody
              key={item.id}
              type="fixed"
              colliders="cuboid"
              position={item.position as any}
            >
              <mesh castShadow position={[0, item.size[1] / 2, 0]}>
                <boxGeometry args={item.size as any} />
                <meshStandardMaterial color={item.color} />
              </mesh>
            </RigidBody>
          )
        }

        if (item.shape === 'cylinder') {
          return (
            <RigidBody
              key={item.id}
              type="fixed"
              colliders="hull"
              position={item.position as any}
            >
              <mesh castShadow position={[0, item.size[1] / 2, 0]}>
                <cylinderGeometry args={[item.size[0], item.size[0], item.size[1], 32]} />
                <meshStandardMaterial color={item.color} />
              </mesh>
            </RigidBody>
          )
        }

        return null
      })}
    </>
  )
}
