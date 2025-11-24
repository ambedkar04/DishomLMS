import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
 

const Blogs = () => {
  return (
    <div>
      <Navbar />
      {/* Educational Blog Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Educational Blog</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Study Techniques That Work", desc: "Evidence-backed methods like spaced repetition and active recall to improve retention." },
            { title: "Time Management for Students", desc: "Pomodoro, weekly planning, and task batching to stay consistent." },
            { title: "Note-taking Methods", desc: "Cornell, outline, and mind mapping—when and how to use each effectively." },
            { title: "Exam Strategy", desc: "How to attempt questions, manage time, and avoid common pitfalls during exams." },
            { title: "Building Strong Fundamentals", desc: "Concept-first learning with practice loops to master tough topics." },
            { title: "Healthy Habits for Learners", desc: "Sleep, nutrition, and short breaks to maintain long-term focus." },
          ].map((item, idx) => (
            <article key={idx} className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
              <button className="mt-4 inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Read More</button>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blogs;
