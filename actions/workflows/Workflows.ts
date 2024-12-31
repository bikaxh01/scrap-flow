"use server";

import { prisma } from "@/app/config/PrismaClient";
import { createWorkflowSchema } from "@/schema/workflow/workflowSchema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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

export async function createWorkflow(
  values: z.infer<typeof createWorkflowSchema>
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const workflow = await prisma.workflow.create({
    data: { ...values, status: "DRAFT", definition: "Nothing", userId },
  });


  redirect(`/workflow/editor/${workflow.id}`);
}

export async function deleteWorkflow(workflowId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const workflow = await prisma.workflow.delete({
    where: {
      id: workflowId,
      userId: userId,
    },
  });
  if (!workflow) {
    throw new Error("something went wrong");
  }

  revalidatePath("/workflows");
}
