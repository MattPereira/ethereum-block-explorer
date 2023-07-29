"use client";

import Image from "next/image";
import searchSvg from "@/public/search.svg";
import { useForm } from "react-hook-form";

/**
 * dynamically directs user to account, transaction, or block page
 * depending on the input
 *
 */

// TODO: handle not found input page
// TODO: handle 404 page
export default function SearchBar() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  //
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex">
        <input
          className="w-full px-4 py-3 rounded-l-lg text-xl outline-none"
          id="search"
          type="text"
          placeholder="Address, Transaction Hash, or Block Number"
          {...register("search", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <button
          type="submit"
          className="bg-[#28a0f0] w-16 flex justify-center items-center rounded-r-lg"
        >
          <Image src={searchSvg} alt="eye glass search button" />
        </button>
      </form>
    </>
  );
}
