import { PlayCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

interface LiveCardProps {
  isLive?: boolean;
  className?: string;
}

const LiveCard = ({ isLive = false, className = "" }: LiveCardProps) => {
  return (
    <Card className={`h-45 w-55 overflow-hidden hover:shadow-md transition-shadow p-0 rounded-[5px] ${className}`}>
      <CardHeader className="p-0 relative">
        {/* Video Thumbnail */}
        <div className="relative h-25 w-full">
          <img 
            src="/images/LiveThumbnail/LiveDemo.png" 
            alt="Class Thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30">
            <div className="absolute -bottom-4 right-4 bg-white rounded-full p-2 z-10 shadow-md cursor-pointer">
              <PlayCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          {isLive && (
            <Badge 
              variant="destructive"
              className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 text-xs h-6"
            >
              <span className="w-2 h-2 bg-white rounded-full"></span>
              LIVE
            </Badge>
          )}
          <CardContent className="p-0 pt-0">
            <div className="space-y-0">
              <div className="bg-gray-300/50 rounded-none p-1 mb-1">
                <p className="text-sm font-bold text-blue-600 text-center">Vikas Sir</p>
              </div>
              <div className="flex justify-between pl-3 pr-3 items-center">
                <span className="text-sm font-bold">Class Start:</span>
                <span className="text-sm font-bold">04:00 PM</span>
              </div>
              <p className="text-sm font-bold text-center">Mathematics</p>
            </div>
          </CardContent>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LiveCard;