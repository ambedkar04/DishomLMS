import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Menubar from "@/components/Menubar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Tag, ArrowLeft, Users, Clock3 } from "lucide-react";
import { mockCourses } from "@/data/mockData";
import BatchCard from "@/components/BatchCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Not specified';
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const toRs = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const BatchDetails: React.FC = () => {
  // Sample schedule data
  const classSchedule = [
    { day: 'Monday', time: '4:00 PM - 6:00 PM', subject: 'Mathematics' },
    { day: 'Wednesday', time: '4:00 PM - 6:00 PM', subject: 'Physics' },
    { day: 'Friday', time: '4:00 PM - 6:00 PM', subject: 'Chemistry' },
    { day: 'Sunday', time: '10:00 AM - 1:00 PM', subject: 'Weekly Test' },
  ];

  // FAQ data
  const faqs = [
    {
      question: 'What if I miss a live class?',
      answer: 'All live classes are recorded and will be available in your dashboard for later viewing.'
    },
    {
      question: 'How can I clear my doubts?',
      answer: 'You can ask your doubts during the live class or post them in our dedicated doubt forum.'
    },
    {
      question: 'Can I get a demo class?',
      answer: 'Yes, we offer a free demo class. Contact our support to schedule one.'
    },
    {
      question: 'What is the refund policy?',
      answer: '100% refund within 7 days if not satisfied. No questions asked.'
    }
  ];
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const batch = mockCourses.find((b) => b.id === Number(id));

  if (!batch) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Menubar />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Batches
              </Button>
              
              <Card>
                <CardHeader>
                  <CardTitle>Batch not found</CardTitle>
                  <CardDescription>The batch you are looking for does not exist or has been removed.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/batches')} className="mt-4">
                    View Available Batches
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Menubar />
        <div className="flex-1 overflow-y-auto p-6 px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Batches
              </Button>
              
              {/* Main Content Area */}
              <Card className="p-6 mx-4 sm:mx-0 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{batch.name}</h1>
                <p className="text-gray-600 mb-6">{batch.subject} • {batch.category}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Starts: {formatDate(batch.startDate)}</span>
                    </div>
                    {batch.endDate && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Ends: {formatDate(batch.endDate)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Duration: {batch.duration || '3 months'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Validity: 1 year</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Tag className="h-4 w-4" />
                      <span>Price: {toRs(batch.offerPrice || batch.price)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Enrolled: 0 students</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Live Online Classes</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Recorded Sessions</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Course Details Section */}
              <Card className="p-6 mx-4 sm:mx-0 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Subject:</h3>
                    <p className="text-gray-700">{batch.subject}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Key Features:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Interactive live classes with expert faculty</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Comprehensive study material and practice questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Regular tests and performance analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Doubt clearing sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Access to recorded lectures for revision</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* About the Course */}
              <Card className="p-6 mx-4 sm:mx-0 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Course</h2>
                <p className="text-gray-700 mb-4">
                  {batch.description || 'This comprehensive course is designed to provide in-depth knowledge and practice for students preparing for competitive exams. Our expert faculty will guide you through each topic with detailed explanations and problem-solving techniques.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Expert Faculty</h3>
                      <p className="text-sm text-gray-600">Learn from experienced educators with proven track records</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Flexible Learning</h3>
                      <p className="text-sm text-gray-600">Access recorded lectures and study materials anytime</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Class Schedule */}
              <Card className="p-6 mx-4 sm:mx-0 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Class Schedule</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {classSchedule.map((schedule, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.day}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.subject}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Recommended Study Material */}
              <Card className="p-6 mx-4 sm:mx-0 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Study Material</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Textbooks</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Concepts of Physics - H.C. Verma (Vol 1 & 2)</li>
                      <li>Problems in Calculus of One Variable - I.A. Maron</li>
                      <li>Organic Chemistry - O.P. Tandon</li>
                      <li>Inorganic Chemistry - J.D. Lee</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Reference Books</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Problems in General Physics - I.E. Irodov</li>
                      <li>Algebra - S.K. Goyal (Arihant)</li>
                      <li>Physical Chemistry - P. Bahadur</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Right Sidebar */}
            <div className="lg:sticky lg:top-6 h-fit">
              <div className="px-4 sm:px-0">
                <BatchCard 
                  {...batch}
                  onEnroll={() => {}}
                  hideExploreButton={true}
                />
              </div>
            </div>
          </div>

          {/* Full-width FAQ Section */}
          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 px-4 sm:px-0">Frequently Asked Questions</h2>
            <div className="bg-white rounded-lg shadow">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <AccordionTrigger className="py-4 px-6 hover:no-underline hover:bg-gray-50">
                      <div className="flex items-center">
                        <span className="text-left font-medium text-gray-900 text-lg">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-11 pr-6 text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
