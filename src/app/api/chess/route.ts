import { NextResponse } from "next/server";

export async function GET() {
  const username = "Himan879";

  try {
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    };

    const profilePromise = fetch(`https://api.chess.com/pub/player/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    const statsPromise = fetch(`https://api.chess.com/pub/player/${username}/stats`, {
      headers,
      next: { revalidate: 3600 },
    });

    const [profileRes, statsRes] = await Promise.all([profilePromise, profilePromise.then(() => statsPromise)]);

    if (!profileRes.ok || !statsRes.ok) {
      throw new Error("Failed to fetch Chess.com data");
    }

    const profileData = await profileRes.json();
    const statsData = await statsRes.json();

    const result = {
      username: profileData?.username || username,
      avatar: profileData?.avatar || "https://www.chess.com/bundles/web/images/noavatar.png",
      ratings: {
        rapid: statsData?.chess_rapid?.last?.rating || null,
        blitz: statsData?.chess_blitz?.last?.rating || null,
        bullet: statsData?.chess_bullet?.last?.rating || null,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chess API Error:", error);
    return NextResponse.json({ error: "Failed to load chess stats" }, { status: 500 });
  }
}
