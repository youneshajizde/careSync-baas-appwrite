import Image from "next/image";
import React from "react";
import img from "@/public/assets/images/tick.gif";
import Link from "next/link";
function Success() {
  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className=" w-[450px] h-auto mx-auto flex flex-col items-center justify-center">
        <Image width={100} height={100} src={img} />
        <h1 className="text-2xl font-semibold text-center mt-3 leading-10">
          Your <span className="text-green-500">Appointment </span>has been sent{" "}
          <span className="text-green-500"> Successfully</span> to the{" "}
          <span className="text-green-500">doctor</span>
        </h1>

        <Link
          href={"/"}
          className="bg-green-500 px-6 py-3 rounded-xl text-white mt-6"
        >
          Go back to main page
        </Link>
      </div>
    </section>
  );
}

export default Success;
