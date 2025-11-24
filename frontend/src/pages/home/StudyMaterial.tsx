import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
 

const StudyMaterial = () => {
  return (
    <div>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Study Material</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Syllabus Notes", desc: "Concise chapter-wise notes with key formulas and examples." },
            { title: "Practice Worksheets", desc: "Topic-wise questions with varying difficulty and solutions." },
            { title: "PYQ Compendium", desc: "Previous years’ questions arranged by chapter for quick revision." },
            { title: "Formula Sheets", desc: "One-pagers for quick lookup before tests and exams." },
            { title: "Concept Mindmaps", desc: "Visual summaries to connect ideas and improve recall." },
            { title: "Assignments", desc: "Curated sets to apply concepts and build speed." },
          ].map((item, idx) => (
            <article key={idx} className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
              <button className="mt-4 inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
                Download
              </button>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default StudyMaterial;
