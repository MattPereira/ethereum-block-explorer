"use client";

import Image from "next/image";
import searchSvg from "@/public/search.svg";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

/**
 * dynamically directs user to account, transaction, or block page
 * depending on the input
 */
export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const input = data.search;
    // accounts are 42 characters long and start with 0x
    if (
      (input.startsWith("0x") && input.length === 42) ||
      input.endsWith(".eth")
    ) {
      router.push(`/account/${input}`);

      // transactions are 66 characters long and start with 0x
    } else if (input.startsWith("0x") && input.length === 66) {
      router.push(`/transaction/${input}`);

      // blocks are integers greater than 0
    } else if (Number.isInteger(Number(input)) && Number(input) > 0) {
      router.push(`/block/${input}`);
    } else {
      router.push(`/404?query=${input}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex"
        style={{
          boxShadow: "rgba(189, 197, 209, 0.25) 0px 8px 19.2px 0px",
        }}
      >
        <input
          className={`w-full px-4 py-3 rounded-l-lg text-xl ${
            pathname === "/" ? "outline-none" : "border border-neutral-400"
          }`}
          id="search"
          type="text"
          placeholder="Address, ENS Name, Transaction Hash, or Block Number"
          required
          {...register("search", { required: true })}
        />
        <button
          type="submit"
          className="bg-[#28a0f0] w-16 flex justify-center items-center rounded-r-lg"
        >
          <Image src={searchSvg} alt="eye glass search button" />
        </button>
      </form>
      {/* {errors.search && <span>This field is required</span>} */}
    </>
  );
}
