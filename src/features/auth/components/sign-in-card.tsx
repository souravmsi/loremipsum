import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import Link from "next/link";

import React from 'react'

const SignIncard = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Loremipsum Group Pvt Ltd.
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    width={200}
                    height={200}
                    src="https://img.freepik.com/free-vector/logo-tie-design-template_474888-1906.jpg"
                    alt="Image"
                    className="absolute bg-blend-difference left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] h-30 w-1/2 object-cover brightness-[0.8]"
                />
            </div>
        </div>
  )
}

export default SignIncard;
