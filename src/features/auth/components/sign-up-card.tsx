import { GalleryVerticalEnd } from "lucide-react"
import { SignupForm } from "@/components/signup-form";
import React from "react";

const SignUpCard = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Loremipsum Inc.
        </a>
        <SignupForm/>
      </div>
    </div>
  )
}

export default SignUpCard;
