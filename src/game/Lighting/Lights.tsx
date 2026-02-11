'use client'

export function Lights() {
  return (
    <>

    <hemisphereLight
  intensity={0.7}
  skyColor="#bcdfff"
  groundColor="#444"
/>
      {/* Ambient base */}
      <ambientLight intensity={0.6} />

      {/* Key directional light */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
    </>
  )
}
