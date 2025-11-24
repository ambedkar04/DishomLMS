import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
 

const Courses = () => {
  return (
    <div>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Popular Courses</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Foundation Course", desc: "Comprehensive syllabus coverage with concept clarity and practice." },
            { title: "Crash Course", desc: "Fast-track revision with high-yield topics and mocks." },
            { title: "Advanced Problem Solving", desc: "Challenging problems to build exam-level confidence." },
            { title: "Weekend Batch", desc: "Flexible schedule for working students with weekly tests." },
            { title: "Doubt Resolution", desc: "Live sessions to clear doubts and strengthen fundamentals." },
            { title: "Mock Test Series", desc: "Full-length mocks with detailed performance analysis." },
          ].map((item, idx) => (
            <div key={idx} className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
              <button className="mt-4 inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Courses;
