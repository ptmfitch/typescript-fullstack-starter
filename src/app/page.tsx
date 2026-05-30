import NoteForm from "@/app/components/NoteForm";
import NoteList from "@/app/components/NoteList";
import "@/lib/env";
import { formatNoteDate, getNotes } from "@/lib/notes";

export const dynamic = "force-dynamic";

export default async function Home() {
  const notes = await getNotes();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Starter template
        </p>
        <h1 className="text-3xl font-semibold text-foreground">Notes</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          A minimal full-stack sample: Server Components for reads, Server Actions
          for creates, and REST API routes for programmatic access.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-medium text-foreground">Add a note</h2>
        <NoteForm />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-medium text-foreground">Your notes</h2>
        <NoteList
          notes={notes.map((note) => {
            const createdAtLabel = formatNoteDate(note.createdAt);
            return {
              id: note.id,
              title: note.title,
              body: note.body,
              createdAt: note.createdAt.toISOString(),
              createdAtLabel,
            };
          })}
        />
      </section>
    </main>
  );
}
