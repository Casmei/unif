"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export const loginAction = async (data: FormData) => {
  try {
    await signIn("credentials", {
      email: data.get("email") as string,
      password: data.get("password") as string,
      redirect: false,
      redirectTo: "/teste",
      callbackUrl: "/login",
    });
  } catch (error) {
    return console.log(error);
  }

  redirect("/teste");
};
