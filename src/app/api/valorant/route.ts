import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.VAL_API_KEY || process.env.VALORANT_KEY;
  const username = process.env.VAL_USERNAME || "Him69Her";
  const tag = process.env.VAL_ID || "9530";

  if (!apiKey) {
    return NextResponse.json({ error: "Missing VAL_API_KEY / VALORANT_KEY" }, { status: 500 });
  }

  try {
    const headers = {
      Authorization: apiKey,
    };

    // 1. Fetch Account info to get PUUID (needed to identify player in matches)
    const accountRes = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${username}/${tag}`, {
      headers,
      next: { revalidate: 3600 },
    });
    const accountData = await accountRes.json();
    const puuid = accountData?.data?.puuid;

    // 2. Fetch MMR (Rank)
    const mmrRes = await fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/ap/${username}/${tag}`, {
      headers,
      next: { revalidate: 3600 },
    });
    const mmrData = await mmrRes.json();
    const rank = {
      currenttierpatched: mmrData?.data?.currenttierpatched || "Unrated",
      images: mmrData?.data?.images || { small: null, large: null },
    };

    // 3. Fetch Matches
    const matchesRes = await fetch(`https://api.henrikdev.xyz/valorant/v3/matches/ap/${username}/${tag}`, {
      headers,
      next: { revalidate: 3600 },
    });
    const matchesData = await matchesRes.json();

    const formattedMatches = (matchesData?.data || []).slice(0, 3).map((match: any) => {
      // Find the player by puuid in this match
      const player = match.players?.all_players?.find((p: any) => p.puuid === puuid) || 
                     match.players?.all_players?.find((p: any) => p.name === "" && p.tag === ""); // Fallback if puuid missing

      const teamColor = player?.team?.toLowerCase() || "blue";
      const hasWon = match.teams?.[teamColor]?.has_won || false;

      return {
        metadata: {
          map: match.metadata?.map || "Unknown",
          game_start_patched: match.metadata?.game_start_patched || "Recently",
          mode: match.metadata?.mode || "Standard",
          rounds_played: match.metadata?.rounds_played || 0,
        },
        stats: {
          kills: player?.stats?.kills || 0,
          deaths: player?.stats?.deaths || 0,
          assists: player?.stats?.assists || 0,
          score: player?.stats?.score || 0,
          character: player?.character || "Unknown",
          character_image: player?.assets?.agent?.small || null,
          result: hasWon ? "Win" : "Loss",
        },
      };
    });

    return NextResponse.json({
      rank,
      matches: formattedMatches,
    });
  } catch (error: any) {
    console.error("Valorant API Error:", error);
    return NextResponse.json({ error: "Failed to fetch Valorant stats" }, { status: 500 });
  }
}
