"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Heading from "@/components/uiComponents/Heading";
import { color } from "@prisma/client";
import AlertModal from "@/components/modals/AlertModal";


const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message: "Color value must be a valid hex code color"
  }),
});

type ColorFormValues = z.infer<typeof formSchema>;

const ColorPageForm = ({
  initialData,
}: {
  initialData: color | null;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const title = initialData ? "Edit your Color" : "create a Color";
  const description = initialData
    ? "Edit your existing Color"
    : "create new bill Board for your store";
  const toastmessageSuccess = initialData
    ? "You have successfully Edited your bill Board"
    : "You have successfully created a new Color";
  const toastmessageError = initialData
    ? "Failed to edit your bill board"
    : "Failed to create new bill board";
  const action = initialData ? "Save changes" : "Create";

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", value: "" },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await fetch(`/api/${params.storeId}/colors/${params.colorId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`/api/${params.storeId}/colors`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      router.push(`/${params.storeId}/colors`);
      router.refresh()
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
      await fetch(`/api/${params.storeId}/colors/${params.colorId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      router.push(`/${params.storeId}/colors/`);
      router.refresh()
      toast.success("Successfully deleted the color");
    } catch (error: any) {
      toast.error("Failed to delete color, Make sure you passed the correct parameters");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        title="Are you sure you?"
        description="This action cannot be reverted. It will delete current color"
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <button
            type="button"
            disabled={loading}
            onClick={() => setOpen(true)}
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
        )}
      </div>
      <div className="h-[2px] my-6 w-full bg-slate-200" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-2 gap-6 py-4"
      >
        <div className="flex gap-10">
        <div className="flex flex-col gap-1">
          <label htmlFor="backgroundImage">Color Name</label>
          <input
            disabled={loading}
            {...register("name")}
            defaultValue={initialData?.name}
            className="border p-2 text-lg rounded-md outline-none w-72 md:w-96 "
          />
          {errors?.name && (
            <p className="text-orange-300 " role="alert">
              Color Name must be exist
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="backgroundImage">Color Value</label>
          <div>

          <input
            disabled={loading}
            {...register("value")}
            defaultValue={initialData?.value}
            className="border p-2 text-lg rounded-md outline-none w-72 md:w-96 "
          />
          <div className="w-6 h-6 rounded-full" style={{background: getValues('value')}} />
          </div>
          {errors?.value && (
            <p className="text-orange-300 " role="alert">
              Color value must be at least 2 characters
            </p>
          )}
        </div>
        </div>
        <div className="flex items-center gap-5 text-lg justify-self-start">
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
    </>
  );
};

export default ColorPageForm;
