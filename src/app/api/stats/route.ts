import { NextResponse } from "next/server";

export async function GET() {
  try {
    const handles = {
      github: "HiMaN108",
      codeforces: process.env.CODEFORCES_HANDLE || "HiM69CoDe",
      leetcode: "HiMaN108",
      chess: "HiMaN108",
      valorant: "HiMaN108"
    };

    // GitHub
    const githubRes = await fetch(`https://api.github.com/users/${handles.github}`, { next: { revalidate: 3600 } });
    const githubData = githubRes.ok ? await githubRes.json() : null;

    // GitHub Latest Repo
    const githubRepoRes = await fetch(`https://api.github.com/users/${handles.github}/repos?sort=updated&per_page=1`, { next: { revalidate: 3600 } });
    const githubRepoData = githubRepoRes.ok ? await githubRepoRes.json() : null;
    const latestRepo = githubRepoData && githubRepoData.length > 0 ? {
      name: githubRepoData[0].name,
      description: githubRepoData[0].description,
      language: githubRepoData[0].language,
      url: githubRepoData[0].html_url
    } : null;

    // GitHub Orgs
    const githubOrgsRes = await fetch(`https://api.github.com/users/${handles.github}/orgs`, { next: { revalidate: 3600 } });
    const githubOrgsData = githubOrgsRes.ok ? await githubOrgsRes.json() : [];
    const orgs = Array.isArray(githubOrgsData) ? githubOrgsData.map((org: any) => ({
      login: org.login,
      avatar_url: org.avatar_url
    })) : [];

    // Codeforces Info
    const cfInfoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handles.codeforces}`, { next: { revalidate: 3600 } });
    const cfInfoData = cfInfoRes.ok ? await cfInfoRes.json() : null;
    const cfProfile = cfInfoData?.status === "OK" ? cfInfoData.result[0] : null;

    // Codeforces Submissions
    const cfStatusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handles.codeforces}`, { next: { revalidate: 3600 } });
    const cfStatusData = cfStatusRes.ok ? await cfStatusRes.json() : null;
    let cfSolvedCount = 0;
    if (cfStatusData?.status === "OK") {
      const solved = new Set();
      cfStatusData.result.forEach((sub: any) => {
        if (sub.verdict === "OK" && sub.problem?.contestId) {
          solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
        }
      });
      cfSolvedCount = solved.size;
    }

    // Codeforces Rating History
    const cfRatingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${handles.codeforces}`, { next: { revalidate: 3600 } });
    const cfRatingData = cfRatingRes.ok ? await cfRatingRes.json() : null;
    let cfLastChange = 0;
    if (cfRatingData?.status === "OK" && cfRatingData.result.length > 0) {
      const lastContest = cfRatingData.result[cfRatingData.result.length - 1];
      cfLastChange = lastContest.newRating - lastContest.oldRating;
    }

    // LeetCode (GraphQL API)
    handles.leetcode = process.env.LEETCODE_HANDLE || "HiMaN810";
    const lcQuery = `
      query getUserProfile($username: String!) { 
        matchedUser(username: $username) { 
          submitStats { 
            acSubmissionNum { 
              difficulty 
              count 
            } 
          } 
          profile { 
            ranking 
          }
          badges {
            id
            name
            icon
          }
        } 
      }
    `;
    const lcRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: lcQuery, variables: { username: handles.leetcode } }),
      next: { revalidate: 3600 }
    });
    const lcData = lcRes.ok ? await lcRes.json() : null;
    const lcUser = lcData?.data?.matchedUser;
    
    let lcStats = { 
      solved: "N/A", 
      easy: 0, medium: 0, hard: 0, 
      ranking: "N/A", 
      handle: handles.leetcode,
      badges: [] as any[]
    };
    
    if (lcUser) {
      lcStats.ranking = lcUser.profile?.ranking || "N/A";
      
      if (lcUser.badges) {
        lcStats.badges = lcUser.badges.map((b: any) => ({
          id: b.id,
          name: b.name,
          icon: b.icon.startsWith("http") ? b.icon : `https://leetcode.com${b.icon}`
        }));
      }

      const subs = lcUser.submitStats?.acSubmissionNum || [];
      subs.forEach((sub: any) => {
        if (sub.difficulty === "All") lcStats.solved = sub.count;
        if (sub.difficulty === "Easy") lcStats.easy = sub.count;
        if (sub.difficulty === "Medium") lcStats.medium = sub.count;
        if (sub.difficulty === "Hard") lcStats.hard = sub.count;
      });
    }

    // Chess.com
    const chessRes = await fetch(`https://api.chess.com/pub/player/${handles.chess}/stats`, { next: { revalidate: 3600 } });
    const chessData = chessRes.ok ? await chessRes.json() : null;
    const chessRating = chessData?.chess_rapid?.last?.rating || "N/A";

    return NextResponse.json({
      github: {
        repos: githubData?.public_repos || "N/A",
        followers: githubData?.followers || "N/A",
        latestRepo,
        orgs
      },
      codeforces: {
        handle: cfProfile?.handle || handles.codeforces,
        rating: cfProfile?.rating || "Unrated",
        maxRating: cfProfile?.maxRating || "Unrated",
        rank: cfProfile?.rank || "newbie",
        avatar: cfProfile?.avatar || "",
        solved: cfSolvedCount,
        lastChange: cfLastChange,
      },
      leetcode: lcStats,
      chess: {
        rating: chessRating,
      },
      valorant: {
        rank: "Diamond 2", // Placeholder
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch telemetry" }, { status: 500 });
  }
}
