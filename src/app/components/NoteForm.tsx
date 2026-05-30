"use client";

import { useFormStatus } from "react-dom";

import { createNoteAction } from "@/actions/notes";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
    >
      {pending ? "Saving..." : "Add note"}
    </button>
  );
}

export default function NoteForm() {
  return (
    <form action={createNoteAction} className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-zinc-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          placeholder="What do you want to remember?"
        />
      </div>
      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium text-zinc-700">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          rows={3}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          placeholder="Optional details"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
