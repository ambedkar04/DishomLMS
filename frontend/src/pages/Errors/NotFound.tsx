import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const NotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    // In a real app, you'd use your router's navigation
    window.location.href = "/";
  };

  const handleSearch = () => {
    // In a real app, you'd navigate to search page or open search modal
    console.log("Opening search...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-slate-200 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle className="w-16 h-16 text-slate-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-slate-600 text-lg">
              Oops! The page you're looking for seems to have wandered off into
              the digital wilderness.
            </p>
          </div>

          {/* Alert with suggestion */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              The page might have been moved, deleted, or you may have entered
              an incorrect URL.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={handleGoHome}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Home className="w-4 h-4" />
              Go Home
            </button>

            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-3">
              Popular pages you might be looking for:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Home
              </a>
              <span className="text-slate-300">•</span>
              <a
                href="/about"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                About
              </a>
              <span className="text-slate-300">•</span>
              <a
                href="/contact"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Contact
              </a>
              <span className="text-slate-300">•</span>
              <a
                href="/help"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Help
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-slate-300 rounded-full opacity-30 animate-pulse"></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-25 animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
