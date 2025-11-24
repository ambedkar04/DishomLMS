import React, { useEffect, useState } from "react";
import YouTubePlayer from "../../components/YouTubePlayer";

// Define interface locally or in a types file
interface LiveSession {
    id: number;
    title: string;
    teacher_name: string;
    live_platform: "videosdk" | "youtube";
    youtube_video_id?: string;
    start_time: string;
    duration_minutes: number;
}

const LiveClassesPage: React.FC = () => {
    const [sessions, setSessions] = useState<LiveSession[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch live sessions
        const fetchSessions = async () => {
            try {
                // Note: You need to add this export to api.ts or use request directly
                const token = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")!).access : null;
                const res = await fetch("http://localhost:8000/api/live/sessions/", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setSessions(data);
                }
            } catch (error) {
                console.error("Failed to fetch sessions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading live classes...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Live Classes</h1>

            {sessions.length === 0 ? (
                <div className="text-center text-gray-500">No live sessions scheduled at the moment.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sessions.map((session) => (
                        <div key={session.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                            {session.live_platform === "youtube" && session.youtube_video_id ? (
                                <YouTubePlayer videoId={session.youtube_video_id} title={session.title} />
                            ) : (
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">
                                        {session.live_platform === "videosdk" ? "VideoSDK Session" : "No Video Available"}
                                    </span>
                                </div>
                            )}

                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
                                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                                    <span>By {session.teacher_name}</span>
                                    <span>{new Date(session.start_time).toLocaleString()}</span>
                                </div>

                                {session.live_platform === "videosdk" && (
                                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                        Join Class
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LiveClassesPage;
