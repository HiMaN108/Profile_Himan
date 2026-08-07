import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken || "",
    }),
  });

  const data = await response.json();
  return data.access_token as string | undefined;
}

export async function GET() {
  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ isPlaying: false });
  }

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ isPlaying: false });
    }

    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 204 || !response.ok) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();

    if (!data.item) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists
        .map((artist: { name: string }) => artist.name)
        .join(", "),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images?.[0]?.url,
      songUrl: data.item.external_urls?.spotify,
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json({ isPlaying: false });
  }
}
