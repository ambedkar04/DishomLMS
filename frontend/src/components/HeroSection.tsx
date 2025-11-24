import React from "react";
import { Button } from "@/components/ui/button";
import { Video, FileText, HelpCircle, BadgeCheck } from "lucide-react";

const HeroSection: React.FC = () => {
  // Images are positioned responsively to avoid overlap

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] w-full bg-white px-4 sm:px-0 pb-56 sm:pb-48 md:pb-40 lg:pb-32 overflow-visible">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight text-gray-900">
                <span className="text-blue-600">Bharat's</span> Trusted &{" "}
                <span className="text-green-600">Affordable</span>{" "}
                <span className="block mt-2">Educational Platform</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl sm:max-w-2xl leading-normal sm:leading-relaxed">
                Unlock your potential by signing up with{" "}
                <span className="font-semibold text-blue-600">
                  Dishom Classes
                </span>{" "}
                - The most affordable learning solution
              </p>
            </div>
            <div className="">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-[18px] font-semibold rounded-[5px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </Button>
            </div>
          </div>
          {/* Right Side - Two Round Images (responsive, non-overlapping) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 scale-150"></div>
              {/* Images Container (fixed square across breakpoints) */}
              <div className="relative aspect-square w-64 sm:w-80">
                {/* First Image - top left */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="/images/HeroSection/imageTeacher.jpg"
                      alt="Educational Excellence"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMzMzOEZGIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0cHgiPkVkdTwvdGV4dD4KPHN2Zz4=";
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                {/* Second Image - bottom right */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="/images/HeroSection/imageStudent.JPG"
                      alt="Learning Success"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMTBCOTgxIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0cHgiPlBXPC90ZXh0Pgo8L3N2Zz4=";
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              {/* Floating elements for visual appeal */}
              <div className="absolute -top-4 left-2 sm:-left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 right-2 sm:-right-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-2 sm:-right-8 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
            </div>
            </div>
          </div>
        </div>
      {/* Overlapping feature strip */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 md:bottom-8 lg:bottom-8 xl:bottom-12 z-20 w-full -translate-x-1/2 translate-y-1/2 md:translate-y-1/3 lg:translate-y-1/3 xl:translate-y-1/2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-auto w-full rounded-[5px] bg-white shadow-lg ring-1 ring-black/5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-0 py-4 sm:py-6 px-0 md:divide-x md:divide-gray-200 place-items-center md:place-items-stretch">
            {/* Item 1 */}
            <div className="flex flex-col items-center justify-center text-center gap-2 px-2 lg:px-0 py-3 sm:py-4">
              <div className="flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-[8px] bg-rose-100 text-rose-600">
                <Video size={22} />
              </div>
              <div>
                <div className="font-bold leading-tight text-base sm:text-lg">Daily Live</div>
                <div className="text-sm sm:text-base text-gray-600">Interactive classes</div>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex flex-col items-center justify-center text-center gap-2 px-2 lg:px-0 py-3 sm:py-4">
              <div className="flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-[8px] bg-sky-100 text-sky-600">
                <FileText size={22} />
              </div>
              <div>
                <div className="font-bold leading-tight text-base sm:text-lg">10 Million +</div>
                <div className="text-sm sm:text-base text-gray-600">Tests, sample papers & notes</div>
              </div>
            </div>
            {/* Item 3 */}
            <div className="flex flex-col items-center justify-center text-center gap-2 px-2 lg:px-0 py-3 sm:py-4">
              <div className="flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-[8px] bg-violet-100 text-violet-600">
                <HelpCircle size={22} />
              </div>
              <div>
                <div className="font-bold leading-tight text-base sm:text-lg">24 x 7</div>
                <div className="text-sm sm:text-base text-gray-600">Doubt solving sessions</div>
              </div>
            </div>
            {/* Item 4 */}
            <div className="flex flex-col items-center justify-center text-center gap-2 px-2 lg:px-0 py-3 sm:py-4">
              <div className="flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-[8px] bg-amber-100 text-amber-600">
                <BadgeCheck size={22} />
              </div>
              <div>
                <div className="font-bold leading-tight text-base sm:text-lg">100 +</div>
                <div className="text-sm sm:text-base text-gray-600">Offline centres</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;
