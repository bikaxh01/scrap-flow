import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { prisma } from "./PrismaClient";

interface userType {}

export async function getUserIdServer(): Promise<string> {
  const { userId, redirectToSignIn } = await auth();
  console.log("🚀 ~ getUserId ~ userId:", userId);

  if (!userId) {
    return redirectToSignIn();
  }
  return userId;
}

// export function getUserClient() {
//   const { isSignedIn, user, isLoaded } = useUser();

//   if (!user) {
//     return redirect("/sign-in");
//   }
//   return user;
// }
