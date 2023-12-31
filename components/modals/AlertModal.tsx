"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../reusableComponents/madal";

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  },[])

  if(!isMounted) return null;

  return (
    <Modal
    title={title}
    description={description}
    isOpen={isOpen}
    onClose={onClose}
    >
      <div className="flex justify-end items-center ">
        <button className="bg-slate-600 rounded-xl px-4 py-2 hover:bg-red-950 text-white" disabled={loading} onClick={onConfirm} type="button">Confirm</button>
      </div>
    </Modal>
  )
};

export default AlertModal;
