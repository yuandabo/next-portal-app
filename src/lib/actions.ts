"use server";

import { signIn } from "./auth";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: Record<string, unknown>
) {
  console.log("authenticate", prevState, formData);

  try {
    const result = await signIn("credentials", formData);
    console.log("signIn result", result);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
