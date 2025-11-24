import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import BioCureLogo from "@/assets/BioCure.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Column 1: Logo and Company Info */}
          <div className="sm:col-span-2 md:col-span-1 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-40 h-auto">
                  <img
                    src={BioCureLogo}
                    alt="BioCure - Medical Education Platform"
                    className="object-contain w-full"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Empowering students with cutting-edge educational resources and
                comprehensive exam preparation. Your journey to academic
                excellence starts here.
              </p>
            </div>
            {/* Social Links */}
            <div className="flex space-x-2 sm:space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-accent"
                asChild
              >
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-[#1877F2]" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-accent"
                asChild
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-[#000000]" />
                  <span className="sr-only">Twitter (X)</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-accent"
                asChild
              >
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-[#E4405F]" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-accent"
                asChild
              >
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A66C2]" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">Quick Links</h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                {
                  name: "About Us",
                  href: "/about",
                },
                {
                  name: "Contact Us",
                  href: "/contact",
                },
                {
                  name: "Privacy Policy",
                  href: "/privacy-policy",
                },
                {
                  name: "Terms of Service",
                  href: "/terms",
                },
                {
                  name: "FAQ",
                  href: "/faq",
                },
              ].map((link, index) => (
                <div key={index}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground leading-relaxed transition-colors"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Popular Exams */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Popular Exams
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                {
                  name: "B.Sc Nursing",
                  href: "/exams/bsc-nursing",
                },
                {
                  name: "Pharmacy",
                  href: "/exams/pharmacy",
                },
                {
                  name: "Paramedical",
                  href: "/exams/paramedical",
                },

                {
                  name: "B.Sc",
                  href: "/exams/bsc",
                },
                {
                  name: "M.Sc",
                  href: "/exams/msc",
                },
              ].map((exam, index) => (
                <div key={index}>
                  <a
                    href={exam.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground leading-relaxed transition-colors"
                  >
                    {exam.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Contact Info
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                {
                  icon: (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ),
                  text: "Ambedkar Road Patna -800001",
                },
                {
                  icon: (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  ),
                  text: "+91 9955935318",
                },
                {
                  icon: (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.05a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  text: "info@biocure.com",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 sm:space-x-3"
                >
                  <div className="flex-shrink-0 text-muted-foreground mt-0.5">
                    {contact.icon}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {contact.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2025 BioCure. All rights reserved.
            </p>
            <div className="hidden sm:block w-1 h-1 bg-border rounded-full"></div>
            <p className="text-xs text-muted-foreground">
              Made with ❤️ for education
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs sm:text-sm text-muted-foreground hover:text-foreground font-normal min-h-[32px] sm:min-h-[36px]"
                  asChild
                >
                  <a href="#">{link}</a>
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
