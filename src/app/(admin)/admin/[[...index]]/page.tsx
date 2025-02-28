'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import config from '@/../sanity.config'

const NextStudio = dynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), 
  { 
    ssr: false,
    loading: () => (
      <div>Loading...</div>
    )
  }
)

export default function StudioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NextStudio config={config} />
    </Suspense>
  )
}