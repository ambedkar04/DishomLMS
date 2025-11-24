import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
 

const TestSeries = () => {
  return (
    <div>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Test Series</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Full-Length Mocks", desc: "Simulate real exam conditions with timed full-length tests." },
            { title: "Subject-wise Tests", desc: "Focus on individual subjects to strengthen weak areas." },
            { title: "Chapter-wise Quizzes", desc: "Quick practice after each chapter to reinforce learning." },
            { title: "Performance Analytics", desc: "Detailed analytics with accuracy, speed, and comparison." },
            { title: "Leaderboard", desc: "Compete with peers and track your rank progression." },
            { title: "Doubt Discussion", desc: "Post-test discussions and solutions for every question." },
          ].map((item, idx) => (
            <article key={idx} className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
              <button className="mt-4 inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
                Start Now
              </button>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TestSeries;
