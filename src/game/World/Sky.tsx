'use client'

import { useLoader, useThree } from '@react-three/fiber'
import { OBJLoader, MTLLoader } from 'three-stdlib'
import { Group, Mesh, MeshBasicMaterial, BackSide } from 'three'
import { useEffect } from 'react'

export function Sky() {
  const { camera } = useThree()

  const materials = useLoader(
    MTLLoader,
    '/assets/sky/BaseplateSky.mtl'
  )

  const object = useLoader(
    OBJLoader,
    '/assets/sky/BaseplateSky.obj',
    (loader) => {
      materials.preload()
      loader.setMaterials(materials)
    }
  ) as Group

  useEffect(() => {
    object.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh

        // 🔑 SKY RULES
        mesh.material = new MeshBasicMaterial({
          map: (mesh.material as any).map ?? null,
          side: BackSide,
          depthWrite: false,
          depthTest: false,
        })

        mesh.castShadow = false
        mesh.receiveShadow = false
        mesh.frustumCulled = false
        mesh.renderOrder = -1000
      }
    })
  }, [object])

  return (
    <primitive
      object={object}
      // scale={500}                 // 🔑 MUST be huge
      position={camera.position}  // 🔑 camera-locked
    />
  )
}
