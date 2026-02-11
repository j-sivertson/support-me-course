"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PersonStandingIcon, CalendarIcon } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signUpSchema = z
  .object({
    email: z.string().regex(emailRegex, "Please enter a valid email address"),
    accountType: z.string().min(1, "Please select an account type"),
    companyName: z.string().optional(),
    employees: z.number().optional(),
    dateOfBirth: z.date({
      error: "Please select your date of birth",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .superRefine((data, ctx) => {
    if (data.accountType === "business") {
      if (!data.companyName || data.companyName.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company name is required for business accounts",
          path: ["companyName"],
        });
      }
      if (
        data.employees === undefined ||
        data.employees === null ||
        Number.isNaN(data.employees) ||
        data.employees <= 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid number of employees",
          path: ["employees"],
        });
      }
    }
  });

type SignUpValues = z.infer<typeof signUpSchema>;

const defaultValues: Partial<SignUpValues> = {
  email: "",
  accountType: "",
  companyName: "",
  employees: undefined,
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export default function SignUpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const onSubmit = async (values: SignUpValues) => {
    setIsSubmitting(true);

    // TODO: Replace with your real sign-up logic.
    console.log("Sign up values", values);

    setIsSubmitting(false);
  };

  const dateOfBirth = form.watch("dateOfBirth");
  const accountType = form.watch("accountType");

  return (
    <>
      <PersonStandingIcon size={50} className="text-pink-500" />
      <Card className="w-full max-w-md border border-zinc-800 bg-black/60">
        <CardHeader>
          <CardTitle className="text-3xl">Sign up</CardTitle>
          <CardDescription>Sign up for a new SupportMe account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@doe.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs font-medium text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountType">Account type</Label>
              <Select
                onValueChange={(value) => {
                  form.setValue("accountType", value, { shouldValidate: true });
                  if (value !== "business") {
                    form.setValue("companyName", "");
                    form.setValue("employees", undefined);
                  }
                }}
                value={accountType || undefined}
              >
                <SelectTrigger id="accountType">
                  <SelectValue placeholder="Select an account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.accountType && (
                <p className="text-xs font-medium text-red-500">
                  {form.formState.errors.accountType.message}
                </p>
              )}
            </div>

            {accountType === "business" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company name</Label>
                  <Input
                    id="companyName"
                    placeholder="Company name"
                    {...form.register("companyName")}
                  />
                  {form.formState.errors.companyName && (
                    <p className="text-xs font-medium text-red-500">
                      {form.formState.errors.companyName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Employees</Label>
                  <Input
                    id="employees"
                    type="number"
                    min={0}
                    placeholder="Employees"
                    {...form.register("employees", {
                  setValueAs: (v) => {
                    if (v === "" || v === undefined) return undefined;
                    const num = Number(v);
                    return Number.isNaN(num) ? undefined : num;
                  },
                })}
                  />
                  {form.formState.errors.employees && (
                    <p className="text-xs font-medium text-red-500">
                      {form.formState.errors.employees.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Date of birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal normal-case pl-4 pr-2",
                      !dateOfBirth && "text-muted-foreground",
                    )}
                  >
                    {dateOfBirth ? (
                      dateOfBirth.toLocaleDateString()
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="h-6 w-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={(date) => {
                      if (date)
                        form.setValue("dateOfBirth", date, {
                          shouldValidate: true,
                        });
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.dateOfBirth && (
                <p className="text-xs font-medium text-red-500">
                  {form.formState.errors.dateOfBirth.message as string}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Your date of birth is used to calculate your age.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                type="password"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-xs font-medium text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                type="password"
                {...form.register("confirmPassword")}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-xs font-medium text-red-500">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="acceptTerms"
                  className="mt-0.5 border-pink-500 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                  checked={form.watch("acceptTerms")}
                  onCheckedChange={(checked) =>
                    form.setValue("acceptTerms", checked === true, {
                      shouldValidate: true,
                    })
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="acceptTerms"
                    className="text-sm font-medium leading-none"
                  >
                    I accept the terms and conditions
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By signing up you agree to our{" "}
                    <span className="text-pink-500">terms and conditions</span>.
                  </p>
                </div>
              </div>
              {form.formState.errors.acceptTerms && (
                <p className="text-xs font-medium text-red-500">
                  {form.formState.errors.acceptTerms.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 w-full bg-pink-500 text-white hover:bg-pink-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <small className="text-xs text-muted-foreground">
            Already have an account?
          </small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
