"use client";

import React, { useState } from "react";
import Heading from "@/components/uiComponents/Heading";
import { Image, Product, category, color, size } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AlertModal from "@/components/modals/AlertModal";
import ImageUpload from "@/components/uiComponents/imageUpload";

const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(true).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
}

const ProductPageForm = ({ initialData, colors, categories, sizes }: { initialData: any, colors: color[], categories: category[], sizes: size[] }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const title = initialData ? "Edit your Product" : "create a Product";
  const description = initialData
    ? "Edit your existing Product"
    : "create new Product for your store";
  const toastmessageSuccess = initialData
    ? "You have successfully Edited your Product"
    : "You have successfully created a new Product";
  const toastmessageError = initialData
    ? "Failed to edit your Product"
    : "Failed to create new Product";
  const action = initialData ? "Save changes" : "Create";

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: 0,
        }
      : {
          name: "",
          price: "",
          sizeId: "",
          colorId: "",
          categoryId: "",
          images: [],
          isArchived: false,
          isFeatured: true,
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await fetch(`/api/${params.storeId}/products/${params.productId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`/api/${params.storeId}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      router.push(`/${params.storeId}/products/`);
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
      await fetch(`/api/${params.storeId}/products/${params.productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      router.push(`/${params.storeId}/products/`);
      router.refresh();
      toast.success("Successfully deleted the product");
    } catch (error: any) {
      toast.error("Failed to delete product.");
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
        description="This action cannot be reverted. It will delete current Product"
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
        <div className="flex flex-col gap-8">
          <label htmlFor="backgroundImage">Product Image</label>
          <ImageUpload
            value={watch("images").map((image) => image.url)}
            disabled={loading}
            onChange={(url) =>
              setValue("images", [...watch("images"), { url }])
            }
            onRemove={(url) =>
              setValue(
                "images",
                watch("images").filter((image) => image.url !== url)
              )
            }
          />
          {errors?.images && (
            <p className="text-orange-300 " role="alert">
              Product image must be exist
            </p>
          )}
        </div>

        <div className="flex gap-7">
          <div className="flex flex-col gap-1">
            <label htmlFor="backgroundImage">Name</label>
            <input
              disabled={loading}
              {...register("name")}
              placeholder="product name"
              defaultValue={initialData?.name}
              className="border p-2 text-lg rounded-md outline-none w-72 md:w-96 "
            />
            {errors?.name && (
              <p className="text-orange-300 " role="alert">
                Product name must be at least 2 characters
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-72 ">
            <label htmlFor="category_id" className="">
              Choose a category
            </label>
            <select
              {...register("categoryId")}
              className=" mb-6 py-2 text-md text-gray-900 border border-gray-300 rounded-lg outline-none"
            >
             {
              categories.map((item) =>(
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
             }
            </select>
            {errors?.name && (
              <p className="text-orange-300 " role="alert">
                Category id must exist
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-72 ">
            <label htmlFor="size_id">Choose Size</label>
            <select
              {...register("sizeId")}
              className=" mb-6 py-2 text-md text-gray-900 border border-gray-300 rounded-lg outline-none"
            >
              {
              sizes.map((item) =>(
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
             }
            </select>
            {errors?.name && (
              <p className="text-orange-300 " role="alert">
                Size Id must exist
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-7">
          <div className="flex flex-col gap-1">
            <label htmlFor="backgroundImage">Price</label>
            <input
              disabled={loading}
              {...register("price")}
              placeholder="9.99"
              className="border p-2 text-lg rounded-md outline-none w-72 md:w-96 "
            />
            {errors?.name && (
              <p className="text-orange-300 " role="alert">
                Product price is required
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-72 ">
            <label htmlFor="category_id" className="">
              Choose a product color
            </label>
            <select
              {...register("colorId")}
              className="mb-6 py-2 text-md text-gray-900 border border-gray-300 rounded-lg outline-none"
            >
             {
              colors.map((item) =>(
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
             }
            </select>
            {errors?.name && (
              <p className="text-orange-300 " role="alert">
                Product color is required
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-72 pl-20 ">
            <p>product status</p>
            <div className="flex flex-col  gap-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox" className="sr-only peer" {...register("isFeatured")} defaultChecked={watch("isFeatured")}/>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Featured
                </span>
              </label>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox" className="sr-only peer" {...register("isArchived")} defaultChecked={watch("isArchived")}/>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Archived
                </span>
              </label>

            </div>
          </div>
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

export default ProductPageForm;
