'use client';

import { StoreModel } from "@/components/ui/storeModel";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);
    
  return (<StoreModel />);
};

export default ModalProvider
