import PatientForms from "@/components/forms/PatientForms";
import Image from "next/image";
import Link from "next/link";
import firstCol from "@/public/assets/images/firstCol.jpg";
import PassKeyModal from "@/components/PassKeyModal";
export default function Home({ searchParams }) {
  const isAdmin = searchParams?.admin === "true";
  return (
    <main className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[75%] flex-1 flex-col py-10">
          <PatientForms />

          <span className="mt-7 flex items-center justify-between ">
            <div></div>
            <Link href={"/?admin=true"}>
              <h1 className="cursor-pointer font-semibold">Log as Admin</h1>
            </Link>
          </span>
        </div>
      </section>

      <div className="w-[35%] h-screen hidden sm:block relative">
        <Image
          className="w-full h-full absolute object-cover"
          fill
          src={firstCol}
        />
      </div>
    </main>
  );
}
