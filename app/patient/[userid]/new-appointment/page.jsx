import PatientForms from "@/components/forms/PatientForms";
import Image from "next/image";
import Link from "next/link";
import video from "@/files/video.mp4";
import AppointmentForms from "@/components/forms/AppointmentForms";
import { getPatient } from "@/lib/functionality";
export default async function Appointment({ params: { userid } }) {
  const patient = await getPatient(userid);
  return (
    <main className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[75%] flex-1 flex-col py-10">
          <AppointmentForms
            patientId={patient?.$id}
            userId={userid}
            type="create"
          />
        </div>
      </section>

      <div className="bg-black w-[35%] h-screen hidden sm:block">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          src={require("@/files/video4.mp4")}
        />
      </div>
    </main>
  );
}
