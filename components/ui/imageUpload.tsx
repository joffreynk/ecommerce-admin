'use client'
import React, { useEffect, useState } from 'react'

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
} 



const ImageUpload = ({disabled, onChange, onRemove, value}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(()=>{
    setIsMounted(true);
  },[])

  if(!isMounted) return null;

  return (
    <div>
      
    </div>
  )
}

export default ImageUpload
