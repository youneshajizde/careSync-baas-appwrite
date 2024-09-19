import PatientForms from "@/components/forms/PatientForms";
import Image from "next/image";
import Link from "next/link";
import video from "@/files/video3.mp4";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/functionality";
export default async function Register({ params: { userid } }) {
  const user = await getUser(userid);
  console.log("this is my Register.js page log : ", userid);
  return (
    <main className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[75%] flex-1 flex-col py-10">
          <RegisterForm user={user} />
        </div>
      </section>

      <div className="bg-black w-[35%] h-screen hidden sm:block">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          src={require("@/files/video3.mp4")}
        />
      </div>
    </main>
  );
}
