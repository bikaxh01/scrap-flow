"use server";

import { prisma } from "@/app/config/PrismaClient";
import customNode from "@/lib/workflow/customNode";
import { createWorkflowSchema } from "@/schema/workflow/workflowSchema";
import { AppNode, TaskType } from "@/types/NodeTypes";
import { auth } from "@clerk/nextjs/server";
import { workflow, WORKFLOWSTATUS } from "@prisma/client";
import { Edge, Viewport } from "@xyflow/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getWorkflows() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }
    const workflows = await prisma.workflow.findMany({
      where: {
        userId: userId,
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

  const initialNode: { nodes: AppNode[]; edges: Edge[]; viewPort: Viewport } = {
    nodes: [],
    edges: [],
    viewPort: {
      x: 195.98172169740644,
      y: 55.36678366972616,
      zoom: 0.6597539553864471,
    },
  };
  initialNode.nodes.push(customNode(TaskType.LAUNCH_BROWSER));
  const workflow = await prisma.workflow.create({
    data: {
      ...values,
      status: "DRAFT",
      definition: JSON.stringify(initialNode),
      userId,
    },
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

export async function updateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (workflow.status === WORKFLOWSTATUS.PUBLIC) {
    throw new Error("can't make changes on published workflow");
  }

  const update = await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      definition,
    },
  });
}

export async function getWorkflow(workflowId: string): Promise<workflow> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const workflow = await prisma.workflow.findUnique({
      where: {
        id: workflowId,
      },
    });
    if (!workflow) {
      throw new Error("Workflow not found");
    }
    return workflow;
  } catch (error) {
    console.error("Error fetching workflow:", error);
    throw error;
  }
}
