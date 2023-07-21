'use client';

import { useEffect, useState } from "react";

import StoreModal from "@/components/modals/storeModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);
    
  return (<StoreModal />);
};

export default ModalProvider
