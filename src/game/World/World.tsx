import { Terrain } from './Terrain'
import { Props } from './Props'
import { Sky } from './Sky'

export function World() {
  return (
    <>
      {/* Sky FIRST (background layer) */}
      <Sky />

      {/* World geometry */}
      <Terrain />
      <Props />
    </>
  )
}
