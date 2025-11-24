import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider, { type CustomArrowProps, type Settings } from "react-slick";
import React from "react";

// Optional prop to allow overriding images
interface CarouselProps {
  images?: string[];
  autoplaySpeedMs?: number;
}

const PrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      aria-label="Previous"
      className={`${className} absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-10 hidden sm:flex`}
      onClick={onClick}
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
};

const NextArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      aria-label="Next"
      className={`${className} absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-10 hidden sm:flex`}
      onClick={onClick}
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
};

const Carousel: React.FC<CarouselProps> = ({
  images = [
    "/images/carousel/01.jpg",
    "/images/carousel/02.jpg",
    "/images/carousel/03.jpg",
    "/images/carousel/05.jpg",
  ],
  autoplaySpeedMs = 3000,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplaySpeedMs,
    adaptiveHeight: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          adaptiveHeight: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-[100vw] overflow-hidden">
      <Slider {...(settings as Settings)}>
        {images.length === 0 ? (
          <div className="w-full h-[180px] sm:h-auto flex items-center justify-center bg-gray-100 text-gray-500">
            <span>No images found in /public/images/carousel</span>
          </div>
        ) : (
          images.map((src, index) => (
            <SlideImage key={src} src={src} index={index} />
          ))
        )}
      </Slider>
    </div>
  );
};

export default Carousel;

// Local component to handle per-image error fallback without DOM manipulation
const SlideImage: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  const [failed, setFailed] = React.useState(false);
  return (
    <div className="w-full max-w-[100vw]">
      <div className="w-full h-[180px] sm:h-auto overflow-hidden rounded-none flex items-center justify-center">
        {failed ? (
          <div className="w-full h-[180px] sm:h-auto flex items-center justify-center bg-gray-100 text-gray-500">
            Image not found
          </div>
        ) : (
          <img
            src={src}
            alt={`Carousel ${index + 1}`}
            className="block w-full max-w-[100vw] h-[180px] sm:h-auto object-cover sm:object-contain transition-transform duration-300"
            onError={() => setFailed(true)}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};
