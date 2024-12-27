import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/app/config/PrismaClient";

export async function POST(req: Response) {
  const SIGNING_SECRET = process.env.WEBHOOK_SECRET;
  console.log("request clammed");

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  console.log("🚀 ~ POST ~ payload:", payload.data.id);
  console.log("🚀 ~ POST ~ payload:", payload.data.first_name);
  console.log("🚀 ~ POST ~ payload:", payload.data.last_name);
  console.log("🚀 ~ POST ~ payload:", payload.data.image_url);
  console.log(
    "🚀 ~ POST ~ payload:",
    payload.data.email_addresses[0].email_address
  );

  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }


const user= await prisma.user.create({data:{
    id:payload.data.id,
    firstName:payload.data.first_name,
    lastName:payload.data.last_name,
    email:  payload.data.email_addresses[0].email_address,
    avatarUrl:payload.data.image_url
}})

  return new Response("Webhook received", { status: 200 });
}
