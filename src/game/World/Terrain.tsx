'use client'

import { RigidBody } from '@react-three/rapier'
import { WORLD_LAYOUT } from './WorldConfig'

export function Terrain() {
  const [width, depth] = WORLD_LAYOUT.ground.size

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial
          color="#444"
          roughness={0.9}
        />
      </mesh>
    </RigidBody>
  )
}
