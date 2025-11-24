import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Menubar from '@/components/Menubar';
import { ShoppingBag } from 'lucide-react';

const Purchases = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Menubar />
        <div className="flex-1 overflow-y-auto py-6 px-3 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">My Purchases</h1>
                  <p className="text-gray-600 mt-1">View your purchased items and access them here</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl">
                  <ShoppingBag className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No purchases yet</h3>
                <p className="text-gray-500 mb-6">Your purchased items will appear here</p>
                <button
                  onClick={() => navigate('/store')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Browse Store
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
