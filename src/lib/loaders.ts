import { FBXLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'

export function useFBX(path: string) {
  return useLoader(FBXLoader, path)
}
