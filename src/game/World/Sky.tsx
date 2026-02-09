'use client'

import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three-stdlib'
import { MTLLoader } from 'three-stdlib'
import { Group } from 'three'
import { useEffect } from 'react'

export function Sky() {
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
    object.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = false
        child.receiveShadow = false
        child.frustumCulled = false
      }
    })
  }, [object])

  return (
    <primitive
      object={object}
      scale={50}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  )
}
