"use server";

import { prisma } from "@/app/config/PrismaClient";
import { auth } from "@clerk/nextjs/server";


export async function getWorkflows() {
  try {
    const user = await auth();
    if (!user.userId) {
      throw new Error("Unauthorized");
    }
    const workflows = await prisma.workflow.findMany({
      where: {
        userId: user.userId,
      },
    });

    return workflows;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
