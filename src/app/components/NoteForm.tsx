"use client";

import { useFormStatus } from "react-dom";

import { createNoteAction } from "@/actions/notes";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
    >
      {pending ? "Saving..." : "Add note"}
    </button>
  );
}

export default function NoteForm() {
  return (
    <form
      action={createNoteAction}
      className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-foreground dark:border-zinc-600 dark:bg-zinc-950"
          placeholder="What do you want to remember?"
        />
      </div>
      <div>
        <label
          htmlFor="body"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Body
        </label>
        <textarea
          id="body"
          name="body"
          rows={3}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-foreground dark:border-zinc-600 dark:bg-zinc-950"
          placeholder="Optional details"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
