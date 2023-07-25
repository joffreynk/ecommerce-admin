"use client";

import React, { useState } from "react";
import Heading from "./Heading";
import { billboard } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AlertModal from "../modals/AlertModal";
import ClipBoard from "@/components/ui/ClipBoard";
import useOrigin from "@/utils/use-origin";

const formSchema = z.object({
  label: z.string().min(2),
  imgUrl: z.string().min(7),
});

type BillBoardFormValues = z.infer<typeof formSchema>;

const BillBoardPageForm = ({ initialData }: { initialData: billboard | null}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin()


  const title = initialData? "Edit bill Board": "crate bill Board";
  const description = initialData? "Edit your existing bill Board": "create new bill Board for your store";
  const toastmessageSuccess = initialData? "You have successfully Edited your bill Board": "You have successfully created a new bill Board";
  const toastmessageError = initialData? "Failed to edit your bill board": "Failed to create new bill board";
  const action = initialData? "Save changes": "Create";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BillBoardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData||{label: "", imgUrl: ""},
  });

  const onSubmit = async (data: BillBoardFormValues) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stores/${params.storeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const store = await response.json();
      router.refresh();
      toast.success(toastmessageSuccess);
    } catch (error: any) {
      toast.error(toastmessageError);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stores/${params.storeId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const store = await response.json();
      router.refresh();
      router.push("/");
      toast.success("Store delete successfully");
    } catch (error: any) {
      toast.error("Failed to delete given store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        <button
          type="button"
          disabled={loading}
          onClick={() =>setOpen(true)}
          className="bg-red-700 p-2 rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
      <div className="h-[2px] my-2 w-full bg-white" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-2 gap-6 py-4"
      >
        <div className="flex flex-col gap-1">
          <input
            disabled={loading}
            {...register("label")}
            defaultValue={initialData?.label}
            className="border p-2 text-lg rounded-md outline-none w-72 md:w-96 "
          />
          {errors.label && (
            <p className="text-orange-300 " role="alert">
              Bill Board name must be at least 2 characters
            </p>
          )}
        </div>
        <div className="flex items-center gap-5 text-lg">
          <button
            disabled={loading}
            className="bg-slate-600 rounded-xl px-4 py-2 hover:bg-green-900 text-white"
            type="submit"
          >
           {action}
          </button>
        </div>
      </form>

      <div className="h-[2px] my-2 w-full bg-white" />

      {/* <ClipBoard
        title="NEXT_STORE_PUBLIC_API"
        url={`${origin}/api/${params.storeId}/${params.billboardId}`}
        variant="Public"
       /> */}
    </>
  );
};

export default BillBoardPageForm;
