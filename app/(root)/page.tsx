'use client'

import { Modal } from '@/components/ui/DialogModel'
import Image from 'next/image'

export default function Home() {
  return (
    <main >
      <h1>Hello admin</h1>
      <Modal title='create category'  description='create category' isOpen={true} onClose={()=>{}}  />
    </main>
  )
}
