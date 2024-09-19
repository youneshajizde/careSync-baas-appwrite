import PatientForms from "@/components/forms/PatientForms";
import Image from "next/image";
import Link from "next/link";
import video from "@/files/video.mp4";
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

      <div className="bg-black w-[35%] h-screen hidden sm:block">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          src={require("@/files/video.mp4")}
        />
      </div>
    </main>
  );
}
