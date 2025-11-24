import Sidebar from "@/components/Sidebar";
import Menubar from "@/components/Menubar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LiveCard from "@/components/LiveCard";
import BatchCard from "@/components/BatchCard";
import { mockCourses } from "@/data/mockData";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, MessageSquare} from "lucide-react";

function Study() {
  const navigate = useNavigate();
  const [topBatches] = useState([...mockCourses.slice(0, 3), ...(mockCourses.length > 3 ? [mockCourses[3]] : [])]);
  
  const handleEnroll = (id: number) => {
    console.log(`Enrolling in batch ${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile, shown on medium screens and up */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Bar */}
        <Menubar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="space-y-6">
              {/* Live Classes Section */}
              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white p-4 sm:p-6 rounded-lg shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Live Classes</h2>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-1 border-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 text-base font-medium shadow-sm"
                      style={{
                        boxShadow: '0 0 0 1px rgba(37, 99, 235, 0.5)',
                        border: '1px solid rgb(37, 99, 235)'
                      }}
                      onClick={() => navigate('/weekly-schedule')}
                    >
                      Weekly Schedule
                    </Button>
                  </div>
                  <div className="w-full h-[1px] bg-gray-200"></div>
                  
                  {/* Live Classes Grid */}
                  <motion.div 
                    variants={staggerContainer(0.1, 0.1)}
                    className="overflow-x-hidden pb-4 -mx-2 px-2"
                  >
                    <div className="flex gap-1 w-max min-w-full py-4">
                      <AnimatePresence>
                        <motion.div
                          variants={fadeIn('right', 'spring', 0.6, 1)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LiveCard 
                            isLive={false}
                            className="opacity-90 hover:opacity-100"
                          />
                        </motion.div>
                        <motion.div
                          variants={fadeIn('right', 'spring', 0.6, 1)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LiveCard 
                            isLive={false}
                            className="opacity-90 hover:opacity-100"
                          />
                        </motion.div>

                        <motion.div
                          variants={fadeIn('right', 'spring', 0.6, 1)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LiveCard 
                            isLive={false}
                            className="opacity-90 hover:opacity-100"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Continue Learning Section */}
              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white p-4 sm:p-6 rounded-lg shadow"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h2>
                  <div className="w-full h-px bg-gray-200"></div>
                </div>
                
                <div className="md:flex overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                  <div className="grid grid-cols-2 gap-2 w-full md:flex md:gap-3 md:w-max md:min-w-full">
                    {/* My Batch Card 1 */}
                    <Card className="hover:shadow-md transition-shadow h-full rounded-lg cursor-pointer w-full md:w-40 flex-shrink-0">
                      <CardHeader className="p-3 h-full flex flex-col">
                        <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2 flex items-center justify-center gap-2 text-center">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          My Batch
                        </CardTitle>
                        <CardContent className="p-2 pt-1 flex-1 flex items-center justify-center">
                          <p className="text-xs text-gray-600 text-center">Quick Access</p>
                        </CardContent>
                      </CardHeader>
                    </Card>

                    {/* Doubt Card 3 */}
                    <Card className="hover:shadow-md transition-shadow h-full rounded-lg cursor-pointer w-40 flex-shrink-0">
                      <CardHeader className="p-3 h-full flex flex-col">
                        <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2 flex items-center justify-center gap-2 text-center">
                          <MessageSquare className="w-4 h-4 text-green-600" />
                          Doubt
                        </CardTitle>
                        <CardContent className="p-2 pt-1 flex-1 flex items-center justify-center">
                          <p className="text-xs text-gray-600 text-center">Ask Questions</p>
                        </CardContent>
                      </CardHeader>
                    </Card>

                  </div>
                </div>
              </motion.div>

              {/* Top Batch Section */}
              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white p-4 sm:p-6 rounded-lg shadow"
              >
                <motion.div className="mb-6">
                  <motion.div 
                    variants={fadeIn('up', 'tween', 0.2, 1)}
                    className="flex flex-row justify-between items-center gap-3 mb-4"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Top Batches</h2>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-auto">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-1 border-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 text-base font-medium shadow-sm whitespace-nowrap"
                        style={{
                          boxShadow: '0 0 0 1px rgba(37, 99, 235, 0.5)',
                          border: '1px solid rgb(37, 99, 235)'
                        }}
                        onClick={() => navigate('/batches')}
                      >
                        View All
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    variants={fadeIn('up', 'tween', 0.3, 1)}
                    className="w-full h-[1px] bg-gray-200 mt-4"
                  />
                </motion.div>
                
                <motion.div 
                  variants={staggerContainer(0.1, 0.2)}
                  className="overflow-hidden"
                >
                  <div className="flex overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                    <div className="flex gap-1 w-max min-w-full">
                      <AnimatePresence>
                        {topBatches.map((batch, index) => (
                          <motion.div
                            key={batch.id}
                            variants={fadeIn('right', 'spring', index * 0.2, 1)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="w-72 flex-shrink-0"
                          >
                            <BatchCard
                              {...batch}
                              onEnroll={handleEnroll}
                              hideExploreButton={false}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Study;
