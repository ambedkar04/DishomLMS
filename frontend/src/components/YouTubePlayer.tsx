import React from "react";

interface YouTubePlayerProps {
    videoId: string;
    title?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title }) => {
    return (
        <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black shadow-lg">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title={title || "YouTube video player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default YouTubePlayer;
