"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  createdAtLabel: string;
};

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError(null);

    const response = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("Could not delete note.");
      setDeletingId(null);
      return;
    }

    router.refresh();
    setDeletingId(null);
  }

  if (notes.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        No notes yet. Add one above or run <code className="font-mono">npm run db:seed</code>.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <ul className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-medium text-foreground">{note.title}</h2>
                {note.body ? (
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {note.body}
                  </p>
                ) : null}
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {note.createdAtLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(note.id)}
                disabled={deletingId === note.id}
                className="rounded-md border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-300"
              >
                {deletingId === note.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
