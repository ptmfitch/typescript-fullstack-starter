import { z } from "zod";

import { db } from "@/lib/db";

export const createNoteSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  body: z.string().trim().optional().default(""),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

/** Stable label for SSR + hydration (do not use default toLocaleString in client components). */
export function formatNoteDate(date: Date): string {
  return date.toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function getNotes() {
  return db.note.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createNote(input: CreateNoteInput) {
  const data = createNoteSchema.parse(input);

  return db.note.create({
    data: {
      title: data.title,
      body: data.body,
    },
  });
}

export async function deleteNote(id: string) {
  return db.note.delete({
    where: { id },
  });
}
