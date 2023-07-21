'use client'

import { useStoreModal } from "@/hooks/useStoreModal"
import { useEffect } from "react"

export default function Home() {
  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)
  useEffect(() => {
    if(!isOpen){
      onOpen();
    }
  }, [isOpen , onOpen])
  
  return (
    <main >
      <h1>Hello admin</h1>
    
    </main>
  )
}
