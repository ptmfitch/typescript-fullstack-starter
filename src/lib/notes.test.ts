import { describe, expect, it } from "vitest";

import { createNoteSchema } from "@/lib/notes";

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
});
