"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/madal";
import { log } from "console";

const formSchema = z
  .object({
    name: z.string().min(2),
  })
  .required();

const StoreModal = () => {
  const storeModal = useStoreModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-2 gap-6 py-4"
      >
        <div className="w-full flex flex-col gap-1">
          <input
            {...register("name")}
            placeholder="E-commerce"
            className="border p-2 text-lg rounded-md outline-none w-full "
          />
          {errors.name && (
            <p className="text-orange-300 " role="alert">
              Store name must be at least 2 characters
            </p>
          )}
        </div>
        <div className="flex justify-end items-center gap-5 text-lg">
          <button
            className="bg-yellow-900 bg-opacity-40 hover:bg-yellow-600 rounded-xl px-4 py-2 text-white"
            onClick={storeModal.onClose}
          >
            cancel
          </button>
          <button
            className="bg-slate-600 rounded-xl px-4 py-2 hover:bg-green-900 text-white"
            type="submit"
          >
            continue
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StoreModal;
