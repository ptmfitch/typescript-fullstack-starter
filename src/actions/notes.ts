"use server";

import { revalidatePath } from "next/cache";

import { createNote } from "@/lib/notes";

export async function createNoteAction(formData: FormData) {
  const title = formData.get("title");
  const body = formData.get("body");

  await createNote({
    title: typeof title === "string" ? title : "",
    body: typeof body === "string" ? body : "",
  });

  revalidatePath("/");
}
