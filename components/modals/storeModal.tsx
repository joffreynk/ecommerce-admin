"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/madal";

const StoreModal = () => {
  const storeModal = useStoreModal();
  return (<Modal
    title='create store'
    description="Add a new store to manage products and categories"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
      Future store Form
    </Modal>
    )
};

export default StoreModal;
