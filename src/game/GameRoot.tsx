'use client'

import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense, useEffect } from 'react'
import { initInputSystem } from '@/systems/InputSystem'
import { initMouseSystem } from '@/systems/MouseSystem'
import { Player } from './Player/Player'
import { World } from './World/World'
import { FollowCamera } from './Camera/FollowCamera'
import { Lights } from './Lighting/Lights'
import { Sky } from './World/Sky'

export default function GameRoot() {

  useEffect(() => {
    initInputSystem()
    initMouseSystem()
  }, [])

  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 8], fov: 50 }}
      gl={{
        // physicallyCorrectLights: true,
        toneMappingExposure: 1.2,
      }}
      >
      <Suspense fallback={null}>
        <Lights />
          <Sky />


        <Physics gravity={[0, -9.81, 0]}>
          <World />
          <Player />
        </Physics>

        <FollowCamera />
      </Suspense>
    </Canvas>
  )
}
