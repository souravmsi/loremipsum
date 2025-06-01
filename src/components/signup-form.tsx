"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/features/auth/schemas";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof registerSchema>;

export function SignupForm({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
    },
  });

  const role = useWatch({
    control: form.control,
    name: "role",
  });

  const onSubmit = (values: FormData) => {
    startTransition(async () => {
      try {
        await axios.post("/api/register", values);
        toast.success("User registered!");
        form.reset();
        router.push("/sign-in");
      } catch (error: unknown) {
        if(error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }else {
          toast.error("Something went wrong");
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create an account</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Common fields */}
            {["name", "email", "password", "confirmPassword"].map((name) => (
              <FormField
                key={name}
                name={name as keyof FormData}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor={name}>
                      {name.replace(/([A-Z])/g, " $1")}
                    </Label>
                    <FormControl>
                      <Input
                        id={name}
                        type={
                          name.toLowerCase().includes("password")
                            ? "password"
                            : "text"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Role Select */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <Label>Role</Label>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="COMPANY">Company</SelectItem>
                        <SelectItem value="PHDCC">PHDCCI</SelectItem>
                        <SelectItem value="MINISTRY">Ministry</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Student-specific fields */}
            {role === "STUDENT" && (
              <>
                {["contact", "aadhaarNumber", "college", "graduationLevel"].map(
                  (name) => (
                    <FormField
                      key={name}
                      name={name as keyof FormData}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Label>{name.replace(/([A-Z])/g, " $1")}</Label>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                )}

                {/* Resume URL */}
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Resume Link</Label>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/resume.pdf"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Company-specific fields */}
            {role === "COMPANY" && (
              <>
                {["contact", "location", "about", "website"].map((name) => (
                  <FormField
                    key={name}
                    name={name as keyof FormData}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>{name.replace(/([A-Z])/g, " $1")}</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Roles Offered - comma separated */}
                <FormField
                  control={form.control}
                  name="rolesOffered"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Roles Offered</Label>
                      <FormControl>
                        <Input
                          placeholder="e.g. Software Engineer, Marketing"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(", ")
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.split(",").map((v) => v.trim())
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Register"}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="#" className="underline underline-offset-4">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4">
            Privacy Policy
          </a>
          .
        </div>
      </form>
    </Form>
  );
}
