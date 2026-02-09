'use client'

import dynamic from 'next/dynamic'

const GameRoot = dynamic(
  () => import('@/game/GameRoot'),
  { ssr: false }
)

export default function Page() {
  return <GameRoot />
}
