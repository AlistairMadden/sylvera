import { Project } from "./types";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export async function openDb() {
  return open({
    filename:
      "/home/alistair/workspaces/sylvera/app/api/project/sylvera-programming-task.db",
    driver: sqlite3.Database,
  });
}

// Authentication?
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // More validation

  const db = await openDb();

  if (searchParams.has("status")) {
    // Filter by status
    const status = searchParams.get("status");
    if (status) {
      const result = await db.all<Project[]>(
        "SELECT * FROM projects WHERE status = ?",
        status
      );
      
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    // Return all records if no search parameters are provided

    // Bad for large datasets, but fine for small ones
    const result = await db.all<Project[]>("SELECT * FROM projects");

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
