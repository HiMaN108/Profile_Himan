import { redirect } from "next/navigation";

export default async function SpotifyCallback({ searchParams }: { searchParams: { code?: string, error?: string } }) {
  const code = searchParams.code;
  const error = searchParams.error;

  if (error) {
    return <div className="p-10 text-red-500 font-mono">Error: {error}</div>;
  }

  if (!code) {
    // Generate auth URL
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = "https://profile-himan.vercel.app/callback"; // As provided by user
    const scope = "user-read-currently-playing user-read-recently-played";
    
    if (!client_id) return <div className="p-10 font-mono">SPOTIFY_CLIENT_ID missing in .env.local</div>;

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    
    return (
      <div className="p-10 font-mono text-white">
        <h1 className="text-2xl font-bold mb-4">Spotify Authorization Needed</h1>
        <p className="mb-4">To get your refresh token, click the link below to authorize your application.</p>
        <p className="mb-4 text-xs text-gray-500">Note: Ensure your Spotify app redirect URI is exactly: {redirect_uri}</p>
        <a href={authUrl} className="bg-green-500 text-black px-4 py-2 rounded-sm font-bold inline-block hover:bg-green-400">
          Authorize Spotify
        </a>
      </div>
    );
  }

  // Exchange code for tokens
  const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
  
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://profile-himan.vercel.app/callback",
      }),
    });

    const data = await response.json();

    if (data.error) {
      return <div className="p-10 text-red-500 font-mono">API Error: {data.error_description || data.error}</div>;
    }

    return (
      <div className="p-10 font-mono text-white max-w-3xl mx-auto mt-20 bg-black/50 border border-green-500/30 rounded-sm">
        <h1 className="text-2xl font-bold mb-6 text-green-400">Spotify Authorization Successful!</h1>
        <p className="mb-4 text-sm text-gray-400">Add the following variable to your <code className="bg-white/10 px-1 py-0.5 rounded">.env.local</code> file:</p>
        
        <div className="bg-black border border-white/10 p-4 rounded-sm break-all">
          <span className="text-pink-400">SPOTIFY_REFRESH_TOKEN</span>="<span className="text-green-300">{data.refresh_token}</span>"
        </div>
        
        <p className="mt-8 text-xs text-gray-500">You can safely close this page and delete the <code className="bg-white/10 px-1 py-0.5 rounded">src/app/callback</code> folder once you have copied the token.</p>
      </div>
    );
  } catch (err: any) {
    return <div className="p-10 text-red-500 font-mono">Fetch Error: {err.message}</div>;
  }
}
