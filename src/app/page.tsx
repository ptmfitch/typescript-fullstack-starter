import NoteForm from "@/app/components/NoteForm";
import NoteList from "@/app/components/NoteList";
import "@/lib/env";
import { getNotes } from "@/lib/notes";

export const dynamic = "force-dynamic";

export default async function Home() {
  const notes = await getNotes();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Starter template
        </p>
        <h1 className="text-3xl font-semibold">Notes</h1>
        <p className="text-sm text-zinc-600">
          A minimal full-stack sample: Server Components for reads, Server Actions
          for creates, and REST API routes for programmatic access.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-medium">Add a note</h2>
        <NoteForm />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-medium">Your notes</h2>
        <NoteList
          notes={notes.map((note) => ({
            ...note,
            createdAt: note.createdAt.toISOString(),
          }))}
        />
      </section>
    </main>
  );
}
