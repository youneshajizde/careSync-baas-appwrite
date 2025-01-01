"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";
function PassKeyModal() {
  const [open, setOpen] = useState(true);
  const path = usePathname();
  const [passKey, setPassKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const encryptedKey =
    typeof window !== "undefined" ? localStorage.getItem("accessKey") : null;

  useEffect(() => {
    const passKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePassKey = (e) => {
    e.preventDefault();

    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      localStorage.setItem("accessKey", encryptedKey);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        className="bg-white flex flex-col items-center justify-center space-y-5 rounded-2xl px-4 py-6 w-[90vw] max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <AlertDialogHeader>
          <div className="flex items-center justify-center space-y-3 mb-4"></div>

          <div className="flex flex-col items-center justify-center mt-7">
            <InputOTP
              maxLength={6}
              value={passKey}
              onChange={(value) => setPassKey(value)}
              className="mt-6 "
            >
              <InputOTPGroup className="gap-3">
                <InputOTPSlot className="shad-otp-slot" index={0} />
                <InputOTPSlot className="shad-otp-slot" index={1} />
                <InputOTPSlot className="shad-otp-slot" index={2} />
                <InputOTPSlot className="shad-otp-slot" index={3} />
                <InputOTPSlot className="shad-otp-slot" index={4} />
                <InputOTPSlot className="shad-otp-slot" index={5} />
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <p className="shad-error text-14-regular mt-4 flex justify-center">
                {error}
              </p>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between w-full">
          <AlertDialogCancel
            onClick={() => closeModal()}
            className="bg-black text-white rounded-lg px-4 py-2"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => validatePassKey(e)}
            className="px-4 py-2"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PassKeyModal;
