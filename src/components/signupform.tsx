"use client";
import React, { useEffect, useState, useRef } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { useUser, UserButton } from "@civic/auth/react";
import { StateDistrictForm } from "./statedistrictform";
import Webcam from "react-webcam";

export default function SignupForm() {
  const { user } = useUser();
  const isAuthenticated = !!user?.email;
  const [authEmail, setAuthEmail] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setAuthEmail(user.email);
      console.log("✅ Civic Auth Email:", user.email);
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const enteredEmail = (form.elements.namedItem("email") as HTMLInputElement).value;

    if (!isAuthenticated) {
      alert("❗ Please authenticate using Civic first.");
      return;
    }

    if (enteredEmail !== authEmail) {
      alert("❗ Entered email does not match authenticated Civic email.");
      return;
    }

    console.log("✅ Emails match. Opening webcam...");
    setShowWebcam(true); // 🎯 Show webcam after email match
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setShowWebcam(false);
      console.log("📸 Captured Image:", imageSrc);
      // Proceed to face matching / backend logic
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">DIGIVOTER</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        DigiVoter lets you vote safely from home using your Voter ID and face scan.
      </p>

      {/* 📸 Webcam Section */}
      {showWebcam && (
        <div className="flex flex-col items-center mt-6">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="rounded-lg w-full"
          />
          <button
            onClick={capturePhoto}
            className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Capture Photo
          </button>
        </div>
      )}

      {/* ✅ Form Section */}
      {!showWebcam && (
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="VoterID">Voter ID</Label>
            <Input id="voterid" placeholder="Enter Your Voter ID" type="text" />
          </LabelInputContainer>

          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="First Name" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="middlename">Middle name</Label>
              <Input id="middlename" placeholder="Middle Name" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Last Name" type="text" />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="Enter Your EmailID" type="email" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" placeholder="DD/MM/YYYY" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <StateDistrictForm />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+91 98765 43210" type="tel" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="aadhaar">Upload Aadhaar Card</Label>
            <Input id="aadhaar" type="file" accept="image/*,application/pdf" />
          </LabelInputContainer>

          <div className="mb-8">
            <UserButton />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 transition mt-6"
          >
            Submit
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      )}

      {/* Preview of Captured Photo */}
      {capturedImage && (
        <div className="mt-4">
          <p className="text-green-600">✅ Photo captured successfully</p>
          <img src={capturedImage} alt="Captured" className="rounded-md mt-2" />
        </div>
      )}
    </div>
  );
}

// Reusable Label-Input wrapper
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
