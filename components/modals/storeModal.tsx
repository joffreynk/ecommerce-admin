"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/madal";
import { log } from "console";

const formSchema = z.object({
  name: z.string().min(1),
}).required();

const StoreModal = () => {
  const storeModal = useStoreModal();

  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("====================================");
    console.log(values);
    console.log("====================================");
  };

  return (
    <Modal
      title="create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-2 gap-6 py-4" >
          <input
            {...register("name")}
            placeholder="E-commerce"
            className="border p-2 text-lg rounded-md outline-none "
          />
          <div className="flex justify-end items-center gap-5 text-xl">
            <button  >cancel</button>
            <button type="submit">continue</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default StoreModal;
