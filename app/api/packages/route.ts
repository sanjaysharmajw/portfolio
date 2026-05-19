import { NextResponse } from "next/server";
import { packages } from "@/lib/data";

export async function GET() {
  try {
    const enriched = await Promise.all(
      packages.map(async (pkg) => {
        try {
          const res = await fetch(
            `https://pub.dev/api/packages/${pkg.name}`,
            { next: { revalidate: 3600 } }
          );
          if (!res.ok) return pkg;
          const data = await res.json();
          const scoreRes = await fetch(
            `https://pub.dev/api/packages/${pkg.name}/score`,
            { next: { revalidate: 3600 } }
          );
          const score = scoreRes.ok ? await scoreRes.json() : {};
          return {
            ...pkg,
            version: data.latest?.version ?? "1.0.0",
            pubPoints: score.grantedPoints ?? pkg.points,
            likes: score.likeCount ?? pkg.likes,
          };
        } catch {
          return pkg;
        }
      })
    );
    return NextResponse.json(enriched);
  } catch {
    return NextResponse.json(packages);
  }
}
