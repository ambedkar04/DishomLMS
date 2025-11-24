import React from "react";
import Slider, { type Settings } from "react-slick";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  rating?: number; // 1-5
};

const AVATAR = "/images/testimonial/Vikas_Image_60KB.jpg";

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarav Singh",
    role: "B.Sc Nursing Aspirant",
    quote:
      "Dishom Classes helped me stay consistent. Live classes and doubt sessions were game-changing.",
    rating: 5,
    avatar: AVATAR,
  },
  {
    name: "Priya Sharma",
    role: "Pharmacy Candidate",
    quote:
      "The test series and notes are concise and practical. I improved my score in just weeks!",
    rating: 5,
    avatar: AVATAR,
  },
  {
    name: "Rahul Verma",
    role: "Paramedical Student",
    quote:
      "24x7 doubt solving kept me unblocked. The platform is simple and affordable.",
    rating: 4,
    avatar: AVATAR,
  },
  {
    name: "Neha Gupta",
    role: "M.Sc Entrance",
    quote:
      "Amazing explanations and practice sets. Highly recommend for serious aspirants!",
    rating: 5,
    avatar: AVATAR,
  },
];

const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    aria-label="Next"
    onClick={onClick}
    className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 rounded-[5px] bg-white/90 hover:bg-white shadow p-2 hidden sm:inline-flex"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-right"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </button>
);

const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    aria-label="Previous"
    onClick={onClick}
    className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 rounded-[5px] bg-white/90 hover:bg-white shadow p-2 hidden sm:inline-flex"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-left"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  </button>
);

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => {
  return (
    <div className="h-full">
      <div className="h-full rounded-[5px] bg-white shadow-md ring-1 ring-black/5 p-5 flex flex-col justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0">
            <Quote size={16} />
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{t.quote}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {t.avatar && (
              <img
                src={t.avatar}
                alt={`${t.name} avatar`}
                className="h-9 w-9 rounded-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div>
              <div className="font-semibold text-gray-900">{t.name}</div>
              <div className="text-xs text-gray-500">{t.role}</div>
            </div>
          </div>

          {typeof t.rating === "number" && (
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < (t.rating || 0) ? "fill-current" : ""}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Testimonial: React.FC = () => {
  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    pauseOnFocus: false,
    lazyLoad: "ondemand",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="relative w-full py-10 sm:py-12 bg-transparent px-4 sm:px-0 pt-48 sm:pt-36 md:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            What our students say
          </h2>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Real results from real learners
          </p>
        </div>
        <div className="relative">
          <Slider {...settings} className="slick-testimonials h-full">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="px-2 sm:px-3 h-full">
                <TestimonialCard t={t} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;