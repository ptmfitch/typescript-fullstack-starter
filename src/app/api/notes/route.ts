import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { createNote, createNoteSchema, getNotes } from "@/lib/notes";

export async function GET() {
  const notes = await getNotes();
  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = createNoteSchema.parse(body);
    const note = await createNote(input);

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: error.flatten() },
        { status: 400 },
      );
    }

    throw error;
  }
}
