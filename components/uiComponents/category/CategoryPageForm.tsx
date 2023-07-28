"use client";

import { Listbox, Transition } from "@headlessui/react";
import  { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Heading from "@/components/uiComponents/Heading";
import { billboard, category } from "@prisma/client";
import AlertModal from "@/components/modals/AlertModal";

const formSchema = z.object({
  name: z.string().min(2),
  billboardId: z.string().min(2),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryPageForm = ({
  initialData,
  billboards,
}: {
  initialData: category | null;
  billboards: billboard[];
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", billboardId: "" },
  });
  const [selected, setSelected] = useState(billboards[0]);

  const dowork = () => {
    setValue("billboardId", selected.id);
  };

  const title = initialData ? "Edit category" : "create new category";
  const description = initialData
    ? "Edit your existing category"
    : "create new category for your store";
  const toastmessageSuccess = initialData
    ? "You have successfully Edited your category"
    : "You have successfully created a new category";
  const toastmessageError = initialData
    ? "Failed to edit your category"
    : "Failed to create new category";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await fetch(`/api/${params.storeId}/categories/${params.categoryId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`/api/${params.storeId}/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      router.push(`/${params.storeId}/categories/`);
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
      await fetch(`/api/${params.storeId}/categories/${params.categoryId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      router.push(`/${params.storeId}/categories/`);
      router.refresh()
      toast.success("Successfully deleted the Category");
    } catch (error: any) {
      toast.error(
        "Failed to delete The category, Make sure all products uses this Category have been deleted"
      );
    } finally {
      setLoading(false);
    }
  };

  if(billboards.length<1) {
    return (<AlertModal
    isOpen={!open}
    onClose={() => {
      setOpen(false)
      router.push(`/${params.storeId}/categories`)
    }}
    onConfirm={()=>{
      setOpen(false)
      router.push(`/${params.storeId}/billboards/new`)
    }}
    loading={loading}
    title="Don't have any Billboards"
    description="You have to create a billboard before you create a category."
  />)
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        title="Are you sure you?"
        description="This action cannot be reverted. It will delete current Category"
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
        <div className="flex flex-col gap-1">
          <label htmlFor="backgroundImage">billboard ID</label>
          <div className=" w-72">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected?.label}</span>
                </Listbox.Button>
                <Transition
                  as={"div"}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {billboards.map((billboard: billboard) => (
                      <Listbox.Option
                        key={billboard.id}
                        onClick={dowork}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={billboard}
                      >
                        {billboard?.label}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          {errors?.billboardId && (
            <p className="text-orange-300 " role="alert">
              Billboard ID must be exist
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="backgroundImage">Label</label>
          <input
            disabled={loading}
            {...register("name")}
            defaultValue={initialData?.name}
            className="border p-2 text-lg rounded-md outline-none w-4/12 md:w-96 "
          />
          {errors?.name && (
            <p className="text-orange-300 " role="alert">
              category name must be at least 2 characters
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
    </>
  );
};

export default CategoryPageForm;
