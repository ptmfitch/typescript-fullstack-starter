import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createNote,
  createNoteSchema,
  deleteNote,
  formatNoteDate,
  getNotes,
} from "@/lib/notes";

const { findMany, create, deleteMock } = vi.hoisted(() => ({
  findMany: vi.fn(),
  create: vi.fn(),
  deleteMock: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: {
    note: {
      findMany,
      create,
      delete: deleteMock,
    },
  },
}));

describe("createNoteSchema", () => {
  it("rejects empty titles", () => {
    const result = createNoteSchema.safeParse({ title: "   " });

    expect(result.success).toBe(false);
  });

  it("accepts valid input with optional body", () => {
    const result = createNoteSchema.safeParse({ title: "Hello" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ title: "Hello", body: "" });
    }
  });

  it("trims title and body", () => {
    const result = createNoteSchema.safeParse({
      title: "  Hello  ",
      body: "  details  ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ title: "Hello", body: "details" });
    }
  });
});

describe("formatNoteDate", () => {
  it("formats dates in en-US with UTC timezone", () => {
    const label = formatNoteDate(new Date("2026-05-30T16:00:00.000Z"));

    expect(label).toBe("May 30, 2026, 04:00 PM");
  });
});

describe("getNotes", () => {
  beforeEach(() => {
    findMany.mockReset();
  });

  it("returns notes ordered by createdAt descending", async () => {
    const notes = [{ id: "1", title: "A", body: "", createdAt: new Date() }];
    findMany.mockResolvedValue(notes);

    await expect(getNotes()).resolves.toEqual(notes);
    expect(findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
  });
});

describe("createNote", () => {
  beforeEach(() => {
    create.mockReset();
  });

  it("creates a note from validated input", async () => {
    const created = { id: "1", title: "Hello", body: "World", createdAt: new Date() };
    create.mockResolvedValue(created);

    await expect(createNote({ title: "Hello", body: "World" })).resolves.toEqual(
      created,
    );
    expect(create).toHaveBeenCalledWith({
      data: { title: "Hello", body: "World" },
    });
  });

  it("rejects invalid input before calling the database", async () => {
    await expect(createNote({ title: "", body: "" })).rejects.toThrow();
    expect(create).not.toHaveBeenCalled();
  });
});

describe("deleteNote", () => {
  beforeEach(() => {
    deleteMock.mockReset();
  });

  it("deletes a note by id", async () => {
    const deleted = { id: "note-1", title: "Gone", body: "", createdAt: new Date() };
    deleteMock.mockResolvedValue(deleted);

    await expect(deleteNote("note-1")).resolves.toEqual(deleted);
    expect(deleteMock).toHaveBeenCalledWith({ where: { id: "note-1" } });
  });
});
