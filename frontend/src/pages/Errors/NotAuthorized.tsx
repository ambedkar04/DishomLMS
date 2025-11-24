import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldX, Home, ArrowLeft } from "lucide-react";

export default function NotAuthorized() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    // In a real app, you'd use your router's navigation
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Icon and Status */}
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <ShieldX className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Access Denied
          </h2>
        </div>

        {/* Alert Message */}
        <Alert className="border-red-200 bg-red-50">
          <ShieldX className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            You don't have permission to access this resource. Please contact
            your administrator if you believe this is an error.
          </AlertDescription>
        </Alert>

        {/* Description */}
        <div className="text-center text-gray-600 space-y-2">
          <p>Sorry, you're not authorized to view this page.</p>
          <p className="text-sm">This could be because:</p>
          <ul className="text-sm text-left space-y-1 bg-gray-50 p-4 rounded-lg border">
            <li>• Your session has expired</li>
            <li>• You don't have the required permissions</li>
            <li>• The resource has been moved or deleted</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </button>
        </div>

        {/* Additional Help */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Need help?</p>
          <div className="space-y-2">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium underline decoration-1 underline-offset-2">
              Contact Support
            </button>
            <span className="text-gray-300 text-sm mx-2">•</span>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium underline decoration-1 underline-offset-2">
              Request Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
