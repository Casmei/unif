"use server";

import { redirect } from "next/navigation";
import { signIn } from "../auth.config";

export const signInAction = async (data: FormData) => {
  await signIn("credentials", {
    email: data.get("email") as string,
    password: data.get("password") as string,
    redirect: false,
    redirectTo: "/",
    callbackUrl: "/auth/sign-in",
  });

  redirect("/");
};
