import { NextResponse } from "next/server";
import { fetchGithubCommitRaw } from "@/lib/github-commit-fetch";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const commits = await fetchGithubCommitRaw();
    return NextResponse.json(
      { commits, timestamp: Date.now() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { commits: 22, error: "Failed to fetch live commits" },
      { status: 500 }
    );
  }
}
