import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isToday, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import LiveCard from "@/components/LiveCard";
import Sidebar from "@/components/Sidebar";
import Menubar from "@/components/Menubar";
import { useState } from "react";

interface UpcomingPageProps {
  embedded?: boolean;
}

const UpcomingPage: React.FC<UpcomingPageProps> = ({ embedded = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFullPage = !embedded && location.pathname === '/weekly-schedule';
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(today.setDate(diff));
  });

  // Generate dates for the current week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prev => addDays(prev, direction === 'prev' ? -7 : 7));
  };

  const content = (
    <div className="flex flex-1 gap-8">
      {/* Date Indicator */}
      <div className="flex flex-col items-stretch w-40 flex-shrink-0 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        {/* Week Navigation */}
        <div className="flex items-center justify-between w-full mb-4 px-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-blue-50 text-gray-500 hover:text-blue-600"
            onClick={() => navigateWeek('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-gray-700">
            {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d')}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-blue-50 text-gray-500 hover:text-blue-600"
            onClick={() => navigateWeek('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Date List */}
        <div className="flex flex-col space-y-3 py-2">
          {weekDays.map((day, index) => {
            const isCurrentDay = isToday(day);
            const isSelected = isSameDay(day, selectedDate);
            const dayName = format(day, 'EEE');
            const dayNumber = format(day, 'd');
            
            return (
              <div 
                key={index} 
                className={cn(
                  "relative group flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200",
                  isCurrentDay && !isSelected && "bg-blue-50/70",
                  isSelected 
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-100" 
                    : "hover:bg-gray-50"
                )}
                onClick={() => setSelectedDate(day)}
              >
                {/* Day and Date */}
                <div className="flex items-center space-x-3">
                  <span className={cn(
                    "text-sm font-medium transition-colors",
                    isSelected ? "text-blue-100" : "text-gray-500"
                  )}>
                    {dayName}
                  </span>
                  <span className={cn(
                    "text-base font-semibold transition-colors",
                    isSelected ? "text-white" : "text-gray-800"
                  )}>
                    {dayNumber}
                  </span>
                </div>
                
                {/* Current Day Indicator */}
                {isCurrentDay && !isSelected && (
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-2"></div>
                )}
                
                {/* Hover/Active State Indicator */}
                <div className={cn(
                  "absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-200",
                  "group-hover:border-blue-100",
                  isSelected && "border-blue-200"
                )}></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <LiveCard />
      </div>
    </div>
  );

  if (isFullPage) {
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Navigation Bar */}
          <Menubar />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-8 px-16">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-bold text-gray-800">Weekly Schedule</h1>
                      {!embedded && (
                        <Button 
                          variant="ghost" 
                          onClick={() => navigate(-1)}
                          className="gap-2 text-blue-600 hover:text-blue-700"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Back to Dashboard</span>
                        </Button>
                      )}
                    </div>
                    <div className="border-b border-gray-200"></div>
                    <div className="py-4 w-full">
                      {content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return content;
};

export default UpcomingPage;