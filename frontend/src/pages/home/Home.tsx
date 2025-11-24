import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Carousel from "@/components/Carousel";
import Testimonial from "@/components/Testimonial";
import YTBanner from "@/components/YTBanner";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="space-y-0">
        <Carousel />
        <HeroSection />
        <Testimonial />
        <YTBanner />
        <Footer />
      </div>
      
    </div>
  );
};

export default Home;
