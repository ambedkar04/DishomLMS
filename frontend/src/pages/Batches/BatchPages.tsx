import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Menubar from '@/components/Menubar';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BatchCard from '@/components/BatchCard';
import { mockCourses } from '@/data/mockData';
import type { Course } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/motion';

// Using Course type from MockData

const BatchPages: React.FC = () => {
  const navigate = useNavigate();
  const batches: Course[] = mockCourses;
  
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('q') || '');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const filters = [
    'BCECE', 'DCECE', 'UG BOTANY', 'PG BOTANY', 'UG ZOOLOGY', 'PG ZOOLOGY', 'FREE'
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = [...batches];
    
    // Apply search query filter
    if (q) {
      result = result.filter(batch => 
        `${batch.name} ${batch.subject || ''} ${batch.category || ''}`.toLowerCase().includes(q)
      );
    }
    
    // Apply category filters if any selected
    if (selectedFilters.length > 0) {
      result = result.filter(batch => 
        selectedFilters.some(filter => {
          // Check if the batch's category includes the filter
          // or if it's a free course and 'Free' is selected
          return (batch.category && batch.category.includes(filter)) || 
                 (filter === 'FREE' && batch.price === 0);
        })
      );
    }
    
    console.log('Filtered batches:', result);
    return result;
  }, [query, batches, selectedFilters]);

  const handleEnroll = (id: number) => {
    // Navigate to batch details page with the specific batch ID
    navigate(`/batches/${id}`);
  };


  console.log('Rendering BatchPages with batches:', batches);
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Hidden on mobile, shown on medium screens and up */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="sticky top-0 z-50 bg-white shadow-sm w-full">
          <Menubar />
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 px-4 md:px-16">
            <div className="space-y-6">
              {/* Header + Search */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Available Batches</h1>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-non leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search batches..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    <Button asChild>
                      <Link to="/study" className="flex-shrink-0 text-white">
                        Study
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Separate Filter Card */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                    <svg 
                      className={`ml-1 h-4 w-4 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                {isFilterOpen && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {filters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => toggleFilter(filter)}
                          className={`px-3 py-1.5 text-sm rounded-full border ${
                            selectedFilters.includes(filter)
                              ? 'bg-blue-100 text-blue-700 border-blue-300'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          } transition-colors`}
                        >
                          {filter}
                          {selectedFilters.includes(filter) && (
                            <span className="ml-1.5">×</span>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    {selectedFilters.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-500">Selected:</span>
                          {selectedFilters.map(filter => (
                            <span 
                              key={filter}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {filter}
                              <button 
                                onClick={() => toggleFilter(filter)}
                                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 text-blue-600 hover:bg-blue-300"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedFilters([])}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>


            {/* Batches Grid - 3 cards per row */}
            <motion.div 
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4"
            >
              <AnimatePresence>
                {filtered.map((batch, index) => (
                  <motion.div
                    key={batch.id}
                    variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    initial="hidden"
                    animate="show"
                    className="h-full"
                  >
                    <BatchCard
                      id={batch.id}
                      name={batch.name}
                      subject={batch.subject}
                      category={batch.category}
                      startDate={batch.startDate}
                      endDate={batch.endDate}
                      duration={batch.duration}
                      offerPrice={batch.offerPrice}
                      price={batch.price}
                      discount={batch.discount}
                      image={batch.image}
                      onEnroll={handleEnroll}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            <AnimatePresence>
              {filtered.length === 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No batches found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      We couldn't find any batches matching your search.
                    </p>
                    <div className="mt-6">
                      <Button onClick={() => setQuery('')}>Clear search</Button>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  </div>
  );
};

export default BatchPages;