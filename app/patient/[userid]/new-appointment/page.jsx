import Image from "next/image";
import secondCol from "@/public/assets/images/secondCol.jpg";
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

      <div className=" w-[35%] h-screen hidden sm:block relative">
        <Image
          className="w-full h-full absolute object-cover"
          fill
          src={secondCol}
        />
      </div>
    </main>
  );
}
