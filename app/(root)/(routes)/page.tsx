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
  
  return null;
}
