"use client";

import SubmitBtn from "@/src/components/SubmitBtn";
import addProduct from "./Product-server";
import toast from "react-hot-toast";
import { CategoryType } from "./page";
import { EnumLike } from "zod";
import {updateProduct} from "./Product-server";
interface ProductFormProps {
  categories: CategoryType;
  brands: CategoryType;
  subCategories: CategoryType;
  buttonType: string
  productId?: string
}



export default function ProductForm({
  categories,
  brands,
  subCategories,
  buttonType,
  productId
}: ProductFormProps) {
  async function clientAction(formData: FormData) {
    let result = await addProduct(formData);
    if(buttonType === "Update"){
       result = await updateProduct(formData, productId || "");
      
    }
    if(result?.successMsg) toast(result.successMsg as string);
    if (result?.error) toast.error(result.error);
  }

  return (
    <form action={clientAction} name="createPrduct">
      <input
        type="text"
        placeholder="Name"
        name="name"
        required = {buttonType !== "Update"}
        className="input input-bordered mb-3 block w-[60%] "
      />
      <textarea
        placeholder="Description"
        required = {buttonType !== "Update"}
        name="description"
        className="textarea textarea-bordered mb-3 block w-[60%] "
      ></textarea>
      <input
        type="number"
        placeholder="Price"
        name="price"
        required = {buttonType !== "Update"}
        className="input input-bordered mb-3 block w-[60%] "
      />
      <select
        title="category"
        name="category"
        required = {buttonType !== "Update"}
        className="select select-bordered mb-3 block w-[60%] "
      >
        <option disabled selected hidden>
          Select A category
        </option>
        {categories?.results?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        title="subCategory"
        name="subCategory"
        required = {buttonType !== "Update"}
        className="select select-bordered mb-3 block w-[60%] "
      >
        <option disabled selected hidden>
          Select A SubCategory
        </option>
        {subCategories?.results?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        title="brand"
        name="brand"
        required = {buttonType !== "Update"}
        className="select select-bordered mb-3 block w-[60%] "
      >
        <option disabled selected hidden>
          Select A Brand
        </option>
        {brands?.results?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <label htmlFor="images" className="mb-2 block text-left text-lg">
        Product Gallery Imgs:
      </label>
      <input
        id="images"
        type="file"
        multiple = {true}
        placeholder="images"
        name="imgs"
        required = {buttonType !== "Update"}
        className="file-input file-input-bordered file-input-secondary mb-3 block block w-[60%] max-w-xs"
      />
      <label htmlFor="supnail" className="mb-2 block text-left text-lg">
        Product Subnail:
      </label>
      <input
        id="supnail"
        type="file"
        placeholder="default image"
        name="defaultImg"
        required = {buttonType !== "Update"}
        className="file-input file-input-bordered file-input-secondary mb-3 block block w-[60%] max-w-xs"
      />
      <input
        type="number"
        placeholder="available items"
        name="availableItems"
        required = {buttonType !== "Update"}
        className="input input-bordered mb-3 block w-[60%] "
      />
      <SubmitBtn className="block">{buttonType} Product</SubmitBtn>
    </form>
  );
}
