'use server';

import { auth } from "@clerk/nextjs/server";

export async function getUserId() {
  const session = await auth();
  return session?.userId;
}

export async function generateSessionId() {
  const userId = await getUserId();
  
  if (!userId) {
    throw new Error("You must be signed in to use this feature");
  }
  
  return {
    userId,
    sessionId: `session_${Date.now()}`
  };
}
