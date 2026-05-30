import path from "path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveSqliteDatabaseUrl } from "@/lib/db";

describe("resolveSqliteDatabaseUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("resolves relative SQLite paths to prisma/dev.db under cwd", () => {
    vi.stubEnv("DATABASE_URL", "file:./dev.db");

    expect(resolveSqliteDatabaseUrl()).toBe(
      `file:${path.resolve(process.cwd(), "prisma", "dev.db")}`,
    );
  });

  it("defaults to prisma/dev.db when DATABASE_URL is unset", () => {
    vi.stubEnv("DATABASE_URL", undefined);

    expect(resolveSqliteDatabaseUrl()).toBe(
      `file:${path.resolve(process.cwd(), "prisma", "dev.db")}`,
    );
  });

  it("returns absolute file URLs unchanged", () => {
    const absolute = "file:///tmp/notes.db";
    vi.stubEnv("DATABASE_URL", absolute);

    expect(resolveSqliteDatabaseUrl()).toBe(absolute);
  });

  it("passes through non-file connection strings", () => {
    const postgres = "postgresql://localhost:5432/app";
    vi.stubEnv("DATABASE_URL", postgres);

    expect(resolveSqliteDatabaseUrl()).toBe(postgres);
  });
});
