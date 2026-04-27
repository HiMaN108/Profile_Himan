import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.CHANNEL_ID;

  if (!API_KEY || !CHANNEL_ID) {
    return NextResponse.json(
      { error: "YouTube API configuration missing." },
      { status: 500 }
    );
  }

  try {
    // 1. Fetch Channel Statistics
    const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`;
    const statsRes = await fetch(statsUrl);
    const statsData = await statsRes.json();

    if (!statsData.items || statsData.items.length === 0) {
      throw new Error("Channel not found.");
    }

    const channelStats = statsData.items[0].statistics;
    const channelSnippet = statsData.items[0].snippet;
    const channelAvatar = channelSnippet.thumbnails.medium.url;

    // 2. Fetch Latest Video
    const latestVideoUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1&type=video`;
    const latestRes = await fetch(latestVideoUrl);
    const latestData = await latestRes.json();

    let latestVideo = null;
    if (latestData.items && latestData.items.length > 0) {
      const videoId = latestData.items[0].id.videoId;
      const snippet = latestData.items[0].snippet;
      const vStatsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
      const vStatsRes = await fetch(vStatsUrl);
      const vStatsData = await vStatsRes.json();

      latestVideo = {
        id: videoId,
        title: snippet.title,
        thumbnail: snippet.thumbnails.high.url,
        date: snippet.publishedAt,
        views: vStatsData.items?.[0]?.statistics?.viewCount || "0",
      };
    }

    // 3. Fetch Popular Video (by view count)
    const popularUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=viewCount&maxResults=1&type=video`;
    const popularRes = await fetch(popularUrl);
    const popularData = await popularRes.json();

    let popularVideo = null;
    if (popularData.items && popularData.items.length > 0) {
      const videoId = popularData.items[0].id.videoId;
      const snippet = popularData.items[0].snippet;
      const vStatsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
      const vStatsRes = await fetch(vStatsUrl);
      const vStatsData = await vStatsRes.json();

      popularVideo = {
        id: videoId,
        title: snippet.title,
        thumbnail: snippet.thumbnails.high.url,
        date: snippet.publishedAt,
        views: vStatsData.items?.[0]?.statistics?.viewCount || "0",
      };
    }

    return NextResponse.json({
      subscribers: channelStats.subscriberCount,
      totalViews: channelStats.viewCount,
      videoCount: channelStats.videoCount,
      channelName: channelSnippet.title,
      channelAvatar,
      latestVideo,
      popularVideo,
    });
  } catch (error: any) {
    console.error("YouTube API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube data." },
      { status: 500 }
    );
  }
}
