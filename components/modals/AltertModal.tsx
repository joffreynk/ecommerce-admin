"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../reusableComponents/madal";

interface AltertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AltertModal: React.FC<AltertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  },[])

  if(!isMounted) return null;

  return (
    <Modal
    title="Are you sure you?"
    description="This action cannot be reverted"
    isOpen={isOpen}
    onClose={onClose}
    >
      <div className="flex justify-end items-center ">
        <button disabled={loading} onClick={onConfirm} type="button">Confirm</button>
      </div>
    </Modal>
  )
};

export default AltertModal;
