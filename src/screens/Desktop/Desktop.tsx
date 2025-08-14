import "aos/dist/aos.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MailIcon, PhoneIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";

// ---- CONTACT / WHATSAPP ----
const PHONE_NUMBER = "+919833646316"; // call target
const WHATSAPP_NUMBER = "+919833646316"; // WhatsApp target
const WHATSAPP_MSG = encodeURIComponent(
  "Hi Dr. Devki, I'd like to book an appointment."
);

// ---- MAP LOCATIONS ----
type LocationItem = {
  id: string;
  label: string;
  query: string; // readable address / place
  embedUrl: string; // for <iframe> embed
  directionsUrl: string; // for "Get Directions"
};

// Helper to build embed & directions URLs from a query string
const mkLoc = (id: string, label: string, query: string): LocationItem => {
  const q = encodeURIComponent(query);
  return {
    id,
    label,
    query,
    embedUrl: `https://www.google.com/maps?q=${q}&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  };
};

const LOCATIONS: LocationItem[] = [
  mkLoc(
    "reliance",
    "Sir HN Reliance Hospital",
    "Sir H. N. Reliance Foundation Hospital, Mumbai"
  ),
  mkLoc(
    "breach",
    "Breach Candy Hospital",
    "Breach Candy Hospital Trust, Mumbai"
  ),
  mkLoc("saifee", "Saifee Hospital", "Saifee Hospital, Mumbai"),
  mkLoc(
    "babies",
    "Babies & Us Fertility and IVF Centre",
    "Babies and Us Fertility IVF Centre, Mumbai"
  ),
  mkLoc("wockhardt", "Wockhardt Hospital", "Wockhardt Hospital Mumbai Central"),
  mkLoc("seh", "Saint Elizabeth Hospital", "St. Elizabeth's Hospital, Mumbai"),
];

// Define service data for mapping
const services = [
  {
    title: "Maternity Care",
    description:
      "Holistic support and medical care for a \n healthy pregnancy, childbirth, and \n post-pregnancy recovery.",
  },
  {
    title: "Laparoscopic Surgery",
    description:
      "Minimally invasive keyhole surgery for \n quicker recovery and less pain.",
  },
  {
    title: "Infertility: IUI & IVF",
    description:
      "Advanced treatments to help couples \n conceive, including In Vitro Fertilization (IVF) \n and Intrauterine Insemination (IUI).",
  },
  {
    title: "Cosmetic Gynaecology  \n & Vaginal Aesthetics",
    description:
      "Treatments to enhance the appearance and \n function of intimate areas.",
    multiline: true,
  },
  {
    title: "Arvati-ThermiVa",
    description:
      "Non-surgical, radiofrequency treatment for \n vaginal rejuvenation and improved intimate \n wellness.",
  },
];

// Define navigation items
const navItems = [
  { label: "Home", active: true },
  { label: "About", active: false },
  { label: "Services", active: false },
  { label: "Clinic", active: false },
  { label: "Gallery", active: false },
  { label: "Testimonials", active: false },
];

export const Desktop = ({}: { isVisible: boolean }): JSX.Element => {
  const [, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeNav, setActiveNav] = React.useState("Home");

 // Add refs (move these above any useEffect that needs them)
const heroRef = useRef<HTMLElement>(null);
const aboutSectionRef = useRef<HTMLElement>(null);
const servicesRef = useRef<HTMLElement>(null);
const galleryRef = useRef<HTMLElement>(null);
const clinicRef = useRef<HTMLElement>(null);
const testimonialsRef = useRef<HTMLElement>(null);

  // put near the top of the component, after refs:
const HEADER_OFFSET = 120; // adjust to your fixed header height

// In-view states for each top-level section
const homeInView        = useInView(heroRef,          { amount: 0.6, margin: `-${HEADER_OFFSET}px 0px -40% 0px` });
const aboutInView       = useInView(aboutSectionRef,   { amount: 0.6, margin: `-${HEADER_OFFSET}px 0px -40% 0px` });
const servicesInView    = useInView(servicesRef,       { amount: 0.6, margin: `-${HEADER_OFFSET}px 0px -40% 0px` });
const galleryInView     = useInView(galleryRef,        { amount: 0.6, margin: `-${HEADER_OFFSET}px 0px -40% 0px` });
const clinicInView      = useInView(clinicRef,         { amount: 0.6, margin: `-${HEADER_OFFSET}px 0px -40% 0px` });
const testimonInView    = useInView(testimonialsRef,   { amount: 0.6, margin: `-${HEADER_OFFSET}px 0px -40% 0px` });

// Single resolver – choose ONE active tab even if two overlap.
// Priority goes from bottom to top here; tweak if you want.
useEffect(() => {
  if (testimonInView)   return setActiveNav("Testimonials");
  if (clinicInView)     return setActiveNav("Clinic");
  if (galleryInView)    return setActiveNav("Gallery");
  if (servicesInView)   return setActiveNav("Services");
  if (aboutInView)      return setActiveNav("About");
  if (homeInView)       return setActiveNav("Home");
}, [
  homeInView,
  aboutInView,
  servicesInView,
  galleryInView,
  clinicInView,
  testimonInView,
]);


  // Function to scroll to section
  const scrollToSection = (sectionName: string) => {
    let targetRef: React.RefObject<HTMLElement> | null = null;

    switch (sectionName) {
      case "Home":
        targetRef = heroRef;
        break;
      case "About":
        targetRef = aboutSectionRef;
        break;
      case "Services":
        targetRef = servicesRef;
        break;
      case "Gallery":
        targetRef = galleryRef;
        break;
      case "Clinic":
        targetRef = clinicRef;
        break;
      case "Testimonials":
        targetRef = testimonialsRef;
        break;
    }

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const linesRef = useRef(null);
  const isLinesInView = useInView(linesRef, { once: true, margin: "-100px" });

  const quoteRef = useRef(null);
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.4 }); // ~40% visible

  const [showFullBio, setShowFullBio] = useState(false);
  const bioRef = useRef<HTMLParagraphElement | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<LocationItem>(
    LOCATIONS[0]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const paths = (
            linesRef.current as HTMLElement | null
          )?.querySelectorAll("path");
          paths?.forEach((path: Element) => {
            path.classList.add("stroke-draw-start");
          }, 2000);
        }
      },
      { threshold: 0.5 }
    );

    if (linesRef.current) {
      observer.observe(linesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [fadeOut, setFadeOut] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [startSplitSlide, setStartSplitSlide] = useState(false);

  useEffect(() => {
    if (!quoteInView) return;

    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 6000); // 3s (last delay) + 1.5s (animation) + buffer

    const finalTextTimer = setTimeout(() => {
      // Show final text 2s after fade-out (i.e., after 7s total)
      setShowFinalText(true);
    }, 6500);

    const slideTimer = setTimeout(() => {
      setStartSplitSlide(true);
    }, 8000); // 1s after final text is visible

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finalTextTimer);
      clearTimeout(slideTimer);
    };
  }, [quoteInView]);

  return (
    <div className="bg-[#FFFFFF] flex flex-row justify-center w-full font-inter overflow-x-clip">
      <div className="bg-[#FFFFFF] w-full max-w-[1440px] xl:max-w-[1720px] 2xl:max-w-[1920px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 relative">
        {/* Fixed Navigation */}
        <header
          data-aos="slide-down"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-easing="ease-in-out"
          className="fixed top-[30px] left-0 right-0 z-50 flex justify-center"
        >
          <div className="flex w-[210px] h-[60px] items-center justify-center px-4 py-2 bg-[#F5F5F5] rounded-[50px] absolute left-16">
            <img
              src="/Dr Devki Logo.svg"
              alt="Dr Devki Logo"
              className="h-[35px] w-auto object-contain"
            />
            <span className="ml-2 font-inter font-semibold text-[#2b2b2b] text-[20px]">
              Dr. Devki Potwar
            </span>
          </div>

          <NavigationMenu className="h-[60px] px-4 py-5 bg-[#F5F5F5] rounded-[50px] backdrop-blur-[25px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(25px)_brightness(100%)] ml-[50px]">
            <NavigationMenuList className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setActiveNav(item.label);
                      scrollToSection(item.label);
                    }}
                    className={
                      activeNav === item.label
                        ? "rounded-[50px] bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] text-white font-inter font-light px-4 py-2 text-base hover:bg-[linear-gradient(90deg,rgba(152,77,149,0.9)_0%,rgba(211,156,192,0.9)_100%)]"
                        : "rounded-[50px] bg-transparent text-[#2b2b2b] font-inter font-light px-4 py-2 text-base hover:bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] hover:text-white transition-all duration-200"
                    }
                  >
                    {item.label}
                  </Button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            asChild
            className="inline-flex h-[50px] items-center gap-[10px] px-3 py-2 fixed top-[5px] right-14 rounded-[50px] bg-[#F5F5F5] hover:bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] group transition-all duration-300"
          >
            <a href={`tel:${PHONE_NUMBER}`} aria-label="Call Potwar Clinic">
              <span className="font-inter font-thin text-[#2b2b2b] text-base group-hover:text-white transition-colors duration-300">
                Contact Us
              </span>
              <div className="p-3 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] group-hover:bg-none group-hover:bg-white transition-all duration-300">
                <PhoneIcon className="w-6 h-6 fill-white group-hover:fill-[#984D95] transition-all duration-300" />
              </div>
            </a>
          </Button>
        </header>

        {/* Hero Section */}
        <section
          className="pt-[100px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pb-20 flex flex-col xl:flex-row gap-12 xl:gap-0 relative scroll-mt-[120px]"
        >
          <div ref={heroRef as React.RefObject<HTMLDivElement>} aria-hidden className="absolute top-0 left-0 h-px w-px" />
          {/* Large gradient spot behind image grid */}
          <div
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-easing="ease-in-out"
            className="absolute top-[30%] right-[-20%] w-[1100px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(211,156,192,0.3)_0%,rgba(152,77,149,0.2)_40%,transparent_80%)] blur-xl pointer-events-none"
          />

          <div
            data-aos="fade-up"
            data-aos-duration="4000"
            data-aos-delay="100"
            data-aos-easing="ease-in-out"
            className="w-full lg:flex-1 max-w-full lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] flex flex-col justify-center relative pr-0 lg:pr-6 xl:pr-12 -ml-10 md:-ml-20 xl:-ml-36 2xl:-ml-48"
          >
            {/* Text gradient spots */}
            <div className="absolute bottom-[-10%] left-[-40%] w-[900px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(211,156,192,0.3)_0%,rgba(152,77,149,0.2)_40%,transparent_100%)] blur-xl pointer-events-none" />

            <h1 className="text-[44px] leading-[64px] font-inter font-semibold text-[#2b2b2b] relative z-10 max-w-[700px]">
              Where women’s health meets
              understanding and expertise
            </h1>
            <p className="w-[559px] mt-6 font-inter font-light text-[#747474] text-base leading-relaxed relative z-10">
              Keep scrolling to know how I can help you.
            </p>
            <Button
              asChild
              className="mt-8 w-fit pl-3 pr-1.5 py-2 relative overflow-hidden group rounded-[50px] transition-all duration-300"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book WhatsApp appointment"
              >
                <div className="absolute inset-0 w-full bg-[#2B2B2B]" />
                <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
                <span className="font-inter font-light text-[#F5F5F5] text-base group-hover:text-white transition-colors duration-300 relative z-10">
                  Book Appointment
                </span>
                <div className="p-2 bg-[#FFFFFF] group-hover:bg-white rounded-full transition-all duration-300 relative z-10 ml-[1px]">
                  <img src="/arrow.svg" alt="Frame" className="w-2.5 h-2.5" />
                </div>
              </a>
            </Button>
          </div>

          {/* Hero Images Grid */}
          <div className="flex-1 relative h-[850px] overflow-visible z-10">
            {/* Animated HeroLine */}
            <svg
              viewBox="0 0 806 1011"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[-10%] right-[-35%] xl:right-[-40%] 2xl:right-[-52%] w-[850px] h-[1011px] z-0"
            >
              <defs>
                <linearGradient
                  id="heroLineGradient"
                  x1="197.596"
                  y1="991.298"
                  x2="788.872"
                  y2="260.086"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#984D95" />
                  <stop offset="1" stopColor="#D39CC0" />
                </linearGradient>
              </defs>

              <path
                d="M166.566 966.207C163.078 919.628 184.205 779.685 263.581 738.325C346.866 694.927 400.175 717.895 561.199 658.585C723.294 598.881 820.737 368.208 846.099 306.361"
                stroke="url(#heroLineGradient)"
                strokeWidth="27"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                className="animate-stroke-draw-reverse animation-delay-200"
              />
            </svg>

            <div className="absolute right-[-10%] xl:right-[-14%] 2xl:right-[-18%] flex gap-6 z-10 translate-x-12 xl:translate-x-24 2xl:translate-x-32">
              {/* Left Column */}
              <motion.div
                initial={{ y: -300, opacity: 0 }}
                animate={{
                  y: [-1000, -900, 40, -10, 0],
                  opacity: [0, 0.5, 1, 1, 1],
                }}
                transition={{
                  duration: 6, // total animation time
                  times: [0.1, 0.4, 0.7, 0.85, 1], // ⏳ phase split: slow fade → fast roll
                  ease: "easeInOut",
                }}
                className="flex flex-col gap-6 mt-[50px] animation-delay-0"
              >
                <div className="w-[300px] h-[410px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/FirstCol(1).svg"
                    alt="Clinic Interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-[300px] h-[410px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/FirstCol(2).svg"
                    alt="Clinic Consultation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>

              {/* Right Column */}
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{
                  y: [1200, 1150, -40, 10, 0], // start from below → overshoot up → settle
                  opacity: [0, 0.5, 1, 1, 1],
                }}
                transition={{
                  duration: 6,
                  times: [0.1, 0.4, 0.7, 0.85, 1],
                  ease: "easeInOut",
                }}
                className="flex flex-col gap-6 -mt-[465px] animation-delay-0"
              >
                <div className="w-[312px] h-[414px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/SecondCol(1).svg"
                    alt="Medical Equipment"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-[312px] h-[415px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/SecondCol(2).svg"
                    alt="Clinic Reception"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-[312px] h-[414px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/SecondCol(3).svg"
                    alt="Clinic Reception"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section
          ref={linesRef}
          className="ml-[-10px] mr-[10px] my-16 relative z-0 flex justify-start  scroll-mt-[120px]"
          >
            <div ref={aboutSectionRef as React.RefObject<HTMLDivElement>} aria-hidden className="absolute top-0 left-0 h-px w-px" />
            {/* Background lines */}
            <div className="absolute inset-0 overflow-visible pointer-events-none">
              {/* Left Line */}
              <svg
              viewBox="0 0 831 252"
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute left-0 -translate-x-[200px] xl:-translate-x-[250px] 2xl:-translate-x-[300px] top-20 w-[800px] h-[300px] ${
                isLinesInView ? "animate-stroke-draw" : ""
              }`}
            >
              <defs>
                <linearGradient
                  id="leftLineGradient"
                  x1="-124.801"
                  y1="136.467"
                  x2="815.279"
                  y2="113.473"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#984D95" />
                  <stop offset="1" stopColor="#D39CC0" />
                </linearGradient>
              </defs>
              <path
                d="M-125.777 96.5739C-92.5439 63.7515 27.772 -10.7775 110.692 22.9201C197.695 58.2772 214.717 113.772 364.189 198.059C514.656 282.908 753.527 207.773 817.078 187.046"
                stroke="url(#leftLineGradient)"
                strokeWidth="27"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                className={`stroke-init transition-all duration-1000 ${
                  isLinesInView ? "animate-stroke-draw " : ""
                }`}
              />
            </svg>

            {/* Right Line (flipped to start from top-right) */}
            <svg
              viewBox="0 0 868 322"
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute right-0 translate-x-[200px] xl:translate-x-[250px] 2xl:translate-x-[300px] bottom-10 w-[800px] h-[300px] scale-y-[1] ${
                isLinesInView ? "animate-stroke-draw-reverse" : ""
              }`}
            >
              <defs>
                <linearGradient
                  id="rightLineGradient"
                  x1="9.45726"
                  y1="110.82"
                  x2="943.84"
                  y2="216.685"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#984D95" />
                  <stop offset="1" stopColor="#D39CC0" />
                </linearGradient>
              </defs>
              <path
                d="M13.9497 71.1687C51.3617 43.2028 180.744 -14.1607 258.273 30.5669C339.619 77.4971 348.887 134.799 485.419 238.748C622.86 343.388 869.765 301.648 935.555 289.813"
                stroke="url(#rightLineGradient)"
                strokeWidth="27"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                className={`stroke-init transition-all duration-1000 ${
                  isLinesInView ? "animate-stroke-draw-reverse " : ""
                }`}
              />
            </svg>
          </div>

          <Card
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            data-aos-delay="700"
            data-aos-easing="ease-in-out"
            className="
              w-[1500px] sm:w-[1200px] md:w-[92vw] lg:w-[90vw] xl:w-[88vw] 2xl:w-[86vw]
              max-w-[2500px]
              h-[640px] md:h-[680px] lg:h-[720px]
              bg-[#D6A0C229] rounded-[30px]
              flex flex-col items-center justify-center
              overflow-hidden backdrop-blur-[25px] backdrop-saturate-150
            "
          >
            <CardContent
              ref={quoteRef}
              className="w-full text-center p-0 mt-[50px] max-w-[90%] md:max-w-[1000px] lg:max-w-[1100px] xl:max-w-[1200px]"
            >
              <motion.div
                animate={{ opacity: startSplitSlide ? 0 : 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div
                  data-aos="fade-up"
                  data-aos-duration="1400"
                  data-aos-delay="1250"
                  data-aos-easing="ease-in-out"
                  className="flex gap-4 mt-[-180px] justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] flex items-center justify-center">
                    <img src="/phone.svg" alt="Phone" className="w-5 h-5" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] flex items-center justify-center">
                    <img src="/message.svg" alt="Message" className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>

              <div
                className={`relative transition-opacity duration-1000 ${
                  fadeOut ? "opacity-0" : "opacity-100"
                }`}
              >
                <div
                  data-aos="fade-up"
                  data-aos-duration="1400"
                  data-aos-delay="1250"
                  data-aos-easing="ease-in-out"
                  className="absolute inset-0 flex items-center justify-center mt-[40px]"
                >
                  <p className="text-[20px] lg:text-[38px] font-inter font-semibold text-[#2b2b2b]">
                    14 years ago, I created Potwar clinic out of a simple <br />
                  </p>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="2150"
                  data-aos-easing="ease-in-out"
                  className="absolute inset-0 flex items-center justify-center mt-[90px]"
                >
                  <p className="text-[20px] lg:text-[38px] font-inter font-semibold text-[#2b2b2b] flex items-center gap-4">
                    idea:
                    <img
                      src="/womendeservecare.svg"
                      alt="Women Deserve Care"
                      className="w-auto h-[40px] lg:h-[60px]"
                    />
                    that feels personal,
                  </p>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="3000"
                  data-aos-easing="ease-in-out"
                  className="absolute inset-0 flex items-center justify-center mt-[140px]"
                >
                  <p className="text-[20px] lg:text-[38px] font-inter font-semibold text-[#2b2b2b]">
                    safe, and never rushed.
                  </p>
                </div>
              </div>
              {showFinalText && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center mt-[-40px]"
                >
                  <p className="text-[26px] sm:text-[28px] md:text-[36px] lg:text-[48px] leading-[32px] sm:leading-[36px] md:leading-[44px] lg:leading-[56px] font-inter font-bold text-[#2b2b2b] px-4 lg:px-0 md:px-4 sm:px-4 flex items-center gap-[8px] flex-nowrap justify-center">
                    <motion.span
                      animate={startSplitSlide ? { x: -205 } : { x: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                      Hi, I'm
                    </motion.span>

                    <motion.span
                      animate={startSplitSlide ? { x: 165 } : { x: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                      Dr. Devki Potwar
                    </motion.span>
                  </p>
                </motion.div>
              )}
              {startSplitSlide && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "29%", opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
                  className="w-[500px] h-[500px] overflow-hidden rounded-[20px] ml-[285px] mt-[140px]"
                >
                  <img
                    src="/DrDevki.svg"
                    alt="Dr. Devki Potwar"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
              {startSplitSlide && (
                <div
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="400"
                  data-aos-easing="ease-in-out"
                  className="absolute inset-0 flex items-center justify-center mt-[255px] mr-[-700px] px-4 z-[60]"
                >
                  <div className="relative">
                    {/* Close (appears only when expanded). Absolutely positioned so it doesn't reflow anything */}
                    {showFullBio && (
                      <button
                        type="button"
                        onClick={() => {
                          bioRef.current?.scrollTo({ top: 0 });
                          setShowFullBio(false);
                        }}
                        className="absolute -top-6 right-0 text-xs md:text-sm text-blue-600 underline z-[70]"
                      >
                        Close
                      </button>
                    )}

                    <p
                      ref={bioRef}
                      className="
                      relative
                      font-inter text-[17px] font-thin text-[#000000] leading-relaxed text-left
                      w-[620px] max-w-[620px]
                      max-h-[240px] lg:max-h-[260px]
                      overflow-y-scroll pr-4
                      bio-scroll
                    "
                      style={{
                        // prevents the content width from shrinking when the scrollbar appears
                        scrollbarGutter: "stable both-edges",
                        // smooth iOS scroll
                        WebkitOverflowScrolling: "touch",
                      }}
                    >
                      I’m an Obstetrician and Gynaecologist with over 14 years
                      of <br />
                      experience dedicated to women’s health, from adolescence
                      to <br />
                      motherhood and beyond. Whether it’s guiding a high-risk{" "}
                      <br />
                      pregnancy, performing advanced gynaecological surgeries,
                      or <br />
                      supporting couples on their fertility journey, I’m
                      passionate <br />
                      about providing compassionate and evidence-based care to{" "}
                      <br />
                      each patient.{" "}
                      {!showFullBio ? (
                        <button
                          type="button"
                          onClick={() => {
                            bioRef.current?.scrollTo({ top: 0 });
                            setShowFullBio(true);
                          }}
                          className="text-blue-500 underline cursor-pointer"
                        >
                          Read more
                        </button>
                      ) : (
                        <span className="inline">
                          &nbsp;I specialise in High-risk Obstetrics, Minimally
                          Invasive Gynaecological Surgeries, Infertility and
                          IVF, and Vaginal Aesthetics. I’m the first in Mumbai
                          to use Arvati-ThermiVa, an advanced, non-surgical
                          technology which helps women with sexual dysfunction,
                          urinary incontinence and vaginal laxity. <br />
                          <br />
                          I’m also a member of Mumbai Obstetric and
                          Gynaecological Society (MOGS), Federation of Obstetric
                          and Gynaecological Societies of India (FOGSI) and the
                          Indian Association of Gynecological Endoscopist
                          (IAGE). <br />
                          <br />
                          <strong>Thanks for stopping by!</strong> I look
                          forward to supporting you through your healthcare
                          journey.
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )}
              {startSplitSlide && (
                <div
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="400"
                  data-aos-easing="ease-in-out"
                  className="absolute inset-0 flex items-center justify-center gap-6 mt-[500px] pointer-events-none" // adjust mt and gap as needed
                >
                  {/* First Image */}
                  <div className="w-[260px] h-[150px]rounded-[20px] overflow-hidden ml-[-590px] mt-[-1030px]">
                    <img
                      src="/About(top).svg"
                      alt="Obstetrics Icon"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Second Image */}
                  <div className="w-[260px] h-[130px]rounded-[20px] overflow-hidden ml-[-600px] mt-[-80px]">
                    <img
                      src="/About(left).svg"
                      alt="Obstetrics Icon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Services Section */}
        <section
          className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-10 scroll-mt-[120px]"
        >
          <div ref={servicesRef as React.RefObject<HTMLDivElement>} aria-hidden className="absolute top-0 left-0 h-px w-px" />
          <h2 className="w-full max-w-[969px] xl:max-w-[1140px] 2xl:max-w-[1280px] mx-auto text-[42px] text-center leading-[52px] font-inter font-bold text-[#2b2b2b] mb-12">
            Our Services
          </h2>

          <div className="space-y-8">
            {services.map((service, index) => {
              const [isRevealed, setIsRevealed] = useState(false);

              return (
                <div
                  key={index}
                  className="w-full h-[328px] flex justify-center"
                  onMouseEnter={() => setIsRevealed(true)} // triggers reveal
                >
                  <div className="relative w-full h-[320px] mx-auto flex justify-center items-center overflow-visible rounded-[50px]">
                    {/* White card that slides out from behind pink */}
                    <div
                      className={`absolute w-[650px] h-[320px] bg-[#F5F5F5] rounded-l-[50px] px-12 py-10 flex items-center justify-center z-10 shadow-[0_4px_0_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out ${
                        isRevealed ? "-translate-x-[300px]" : "translate-x-0"
                      }`}
                    >
                      <div
                        data-aos="fade-up"
                        data-aos-duration="1200"
                        data-aos-delay="350"
                        data-aos-easing="ease-in-out"
                        className="flex items-center gap-8 w-full justify-center"
                      >
                        {/* Icon */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#984D95] to-[#D39CC0] flex items-center justify-center flex-shrink-0">
                          <img
                            src={`/Service${index + 1}.svg`}
                            alt={`Service ${index + 1}`}
                            className="w-10 h-10 object-contain"
                          />
                        </div>

                        {/* Description */}
                        <div className="flex-1 text-left max-w-[400px]">
                          <p className="text-[#5C5C5C] text-lg leading-tight font-extralight whitespace-pre-line">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Pink Card */}
                    <div
                      className={`w-[650px] h-[327px] bg-[#d6a0c2] rounded-[50px] flex flex-col justify-center items-center text-center z-20 transition-transform duration-500 ease-out ${
                        isRevealed ? "translate-x-[300px]" : "translate-x-0"
                      }`}
                    >
                      <p className="text-white/70 text-lg mb-1">
                        We are here for
                      </p>
                      <h3 className="font-inter font-bold text-white text-5xl leading-tight whitespace-pre-line">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gallery Section */}
        <section
          className="pt-[100px] ml-[-100px] mr-[10px] pb-20 flex justify-center relative overflow-visible px-2 lg:px-4 xl:px-14 2xl:px-20 scroll-mt-[120px]"
        >
            <div ref={galleryRef as React.RefObject<HTMLDivElement>} aria-hidden className="absolute top-0 left-0 h-px w-px" />
          <div className="w-full max-w-[1800px] 2xl:max-w-[2000px] relative">
            {/* Background lines */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <img
                src="/Galleryline.svg"
                alt="Background line"
                className="absolute left-[-14vw] top-1/2 -translate-y-1/2
                w-[62vw] min-w-[820px] max-w-[1200px] h-auto object-contain"
              />
            </div>

            <Card
              data-aos="zoom-in-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-easing="ease-in-out"
              className="relative z-10 mx-auto w-[1300px]
              max-w-[1600px] xl:max-w-[2150px] 2xl:max-w-[2880px]
              min-h-[630px] xl:min-h-[700px] 2xl:min-h-[760px]
              bg-[#D6A0C229] rounded-[30px] backdrop-blur-[25px] backdrop-saturate-150
              flex items-center justify-start overflow-hidden
              px-2 lg:px-14 xl:px-16 2xl:px-20 pt-10 pb-12"
            >
              <CardContent className="p-0 w-full h-full">
                <div className="flex flex-row w-full h-full gap-8 xl:gap-10">
                  {/* LEFT SIDE - Text content */}
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-delay="1500"
                    data-aos-easing="ease-in-out"
                    className="w-[50%] max-w-[600px] relative z-10 ml-4 flex flex-col justify-center mt-[-100px]"
                  >
                    <h1 className="text-[44px] leading-[64px] font-inter font-semibold text-[#2b2b2b] mb-4">
                      Gallery
                    </h1>
                    <Button
                      asChild
                      className="mt-8 w-fit pl-3 pr-1.5 py-2 relative overflow-hidden group rounded-[50px] transition-all duration-300"
                    >
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Book WhatsApp appointment"
                      >
                        <div className="absolute inset-0 w-full bg-[#2B2B2B]" />
                        <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
                        <span className="font-inter font-light text-[#F5F5F5] text-base group-hover:text-white transition-colors duration-300 relative z-10">
                          Book Appointment
                        </span>
                        <div className="p-2 bg-[#FFFFFF] group-hover:bg-white rounded-full transition-all duration-300 relative z-10 ml-[1px]">
                          <img
                            src="/arrow.svg"
                            alt="Frame"
                            className="w-2.5 h-2.5"
                          />
                        </div>
                      </a>
                    </Button>
                  </div>

                  {/* RIGHT SIDE - Image gallery with scroll-triggered horizontal animation */}
                  <div className="w-full overflow-x-visible overflow-y-hidden mt-8 ml-[-100px] pr-8 scrollbar-hide">
                    <motion.div
                      initial={{ x: 300, opacity: 0 }}
                      whileInView={{
                        x: [1000, 800, -200, 50, 0],
                        opacity: [0, 0.5, 1, 1, 1],
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        times: [0.1, 0.4, 0.65, 0.85, 1],
                      }}
                      viewport={{ once: true, amount: 0.4 }}
                      className="flex flex-row gap-6"
                    >
                      {/* Gallery Image 1 */}
                      <div className="w-[330px] h-[480px] bg-gray-300 rounded-[30px] overflow-hidden shadow-lg shrink-0">
                        <img
                          src="/Gallerylarge(1).svg"
                          alt="Gallery Image 1"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Gallery Image 2 (small stacked) */}
                      <div className="flex flex-col gap-6 shrink-0">
                        <div className="w-[400px] h-[225px] bg-gray-200 rounded-[30px] overflow-hidden shadow-lg">
                          <img
                            src="/Gallerysmall(1).svg"
                            alt="Gallery Image 2"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="w-[400px] h-[225px] bg-gray-200 rounded-[30px] overflow-hidden shadow-lg">
                          <img
                            src="/Gallerysmall(2).svg"
                            alt="Gallery Image 2"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Gallery Image 3 */}
                      <div className="w-[300px] h-[480px] bg-gray-300 rounded-[30px] overflow-hidden shadow-lg shrink-0">
                        <img
                          src="/Gallerylarge(2).svg"
                          alt="Gallery Image 3"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Gallery Image 4 */}
                      <div className="w-[300px] h-[480px] bg-gray-300 rounded-[30px] overflow-hidden shadow-lg shrink-0">
                        <img
                          src="/Gallerylarge(3).svg"
                          alt="Gallery Image 4"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Gallery Image 5 */}
                      <div className="w-[300px] h-[480px] bg-gray-300 rounded-[30px] overflow-hidden shadow-lg shrink-0">
                        <img
                          src="/Gallerylarge(4).svg"
                          alt="Gallery Image 5"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Gallery Image 6 */}
                      <div className="w-[300px] h-[480px] bg-gray-300 rounded-[30px] overflow-hidden shadow-lg shrink-0">
                        <img
                          src="/Gallerylarge(5).svg"
                          alt="Gallery Image 6"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials — FULL-BLEED */}
        <section
          data-aos="fade-up"
          data-aos-duration="5500"
          data-aos-delay="800"
          data-aos-easing="ease-in-out"
          /* break out of the page padding/max-width */
          className="
    relative w-full max-w-[1300px]
    xl:max-w-[1600px] 2xl:max-w-[1800px]
    mx-auto bg-white py-12 overflow-visible scroll-mt-[120px]
  "
        >
            <div ref={testimonialsRef as React.RefObject<HTMLDivElement>} aria-hidden className="absolute top-0 left-0 h-px w-px" />
          {/* Header (centered, with safe max width) */}
          <div className="mx-auto w-full max-w-[1600px] px-6">
            <div className="flex justify-between items-start mb-16">
              <div>
                <h2 className="text-[40px] font-bold text-[#000000]">
                  Hear from my patients
                </h2>
                <p className="text-[#747474] text-base font-light leading-6 mt-4 w-[475px]">
                  Real stories and experiences shared by patients I’ve had the
                  privilege to treat.
                </p>
              </div>

              <Button
                asChild
                className="mt-8 w-fit pl-3 pr-1.5 py-2 relative overflow-hidden group rounded-[50px] transition-all duration-300"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book WhatsApp appointment"
                >
                  <div className="absolute inset-0 w-full bg-[#2B2B2B]" />
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
                  <span className="font-inter font-light text-[#F5F5F5] text-base group-hover:text-white transition-colors duration-300 relative z-10">
                    Book Appointment
                  </span>
                  <div className="p-2 bg-[#FFFFFF] group-hover:bg-white rounded-full transition-all duration-300 relative z-10 ml-[1px]">
                    <img src="/arrow.svg" alt="Frame" className="w-2.5 h-2.5" />
                  </div>
                </a>
              </Button>
            </div>
          </div>

          {/* Grid — full width with no side padding so it can touch the edges */}
          <div className="w-full px-0">
            <div className="grid grid-cols-4 gap-10 auto-rows-auto w-full max-w-none px-6 2xl:px-8">
              {/* 1. Liked our service (Purple) */}
              <div className="rounded-[50px] overflow-hidden shadow-md w-[300px] h-[420px] translate-y-5 ml-[-24px]">
                <img
                  src="/Testimonial(1).svg"
                  alt="Column 1 Row 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 2. Anil Poojari */}
              <div className="rounded-[50px] overflow-hidden shadow-sm w-[300px] h-[450px] mt-[160px] ml-[-12px]">
                <img
                  src="/Testimonial(3).jpg"
                  alt="Column 2 Row 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 3. Clinic ipad */}
              <div className="rounded-[50px] overflow-hidden shadow-sm w-[300px] h-[320px] mt-[70px] ml-[-10px]">
                <img
                  src="/Testimonial(5).svg"
                  alt="Column 3 Row 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 4. Priyanka Lingawale */}
              <div className="rounded-[50px] overflow-hidden shadow-sm w-[300px] h-[210px] mt-[-20px] ml-[-1px]">
                <img
                  src="/Testimonial(7).jpg"
                  alt="Column 4 Row 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 5. Sonali Bansode */}
              <div className="rounded-[50px] overflow-hidden shadow-sm w-[300px] h-[300px] mt-[-190px] ml-[-24px]">
                <img
                  src="/Testimonial(2).jpg"
                  alt="Column 1 Row 2"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 6. 2 Girls with Ipad */}
              <div className="rounded-[50px] overflow-hidden shadow-sm w-[300px] h-[300px] translate-y-0 ml-[-12px]">
                <img
                  src="/Testimonial(4).svg"
                  alt="Column 2 Row 2"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 7. Alok Pardeshi */}
              <div className="rounded-[50px] overflow-hidden shadow-sm w-[300px] h-[300px] mt-[-235px] ml-[-10px]">
                <img
                  src="/Testimonial(6).svg"
                  alt="Column 3 Row 2"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 8. Anil Vazirani */}
              <div className="rounded-[50px] overflow-hidden shadow-sm w-[300px] h-[570px] mt-[-440px] ml-[-1px]">
                <img
                  src="/Testimonial(8).svg"
                  alt="Column 4 Row 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Explore All Link */}
          <div className="mt-[50px] text-center">
            <a
              href="https://www.google.com/search?client=safari&sca_esv=6db176930c53557b&hl=en-us&biw=375&bih=637&sxsrf=AE3TifOkmfxSz340JKyvYpWRSpGscycRFw:1750859493622&q=dr+devki+potwar+reviews&uds=AOm0WdFY0GdalVU1UsU-tNmlAtO_bsXUnYPsSKMvIl0gS1w-rLIYFusuMl3p-Tjp9oLC1aGO5bP_WcB1cCBPiOgb8DHT1ieJWQYPlkf3FxhyXbHynb47DpOq8ca-7QMOIO0Ow86YvGjNOpjyTEs5r-fEm0ySZTITJVVHzk6LmB54gGHEp7J7dHmj5HL5VnN5imNEq2hnjxbRXIX5_cOdCeffMx5rRe-HvpiBsak4pxm_4lExPcd7yi_imPrzzt3njuyMJnpGkpoEmW8bNBn44_xVz968eYT8Gt6FwPQ8sEz7stwzLc0lMOlDv4YzYqp4HmN8hIR7R4im_KuhNznOoDr8fhPQxBdC7vDP8TNgGugoznVJKMVJiZvta0fDuu6nFG8GeFZKXMZGxczqNEW0BNTCOs-VrqLEt8pj3M21xhsqfkEwALitwuB_1a6C8cyT48f-L0MuLCSITxQmALD8W7osNaKwUPr8Gw&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E66d_c9x3anzXlA7SKuVG2UiYHKwSapILqgEWGQjQxM5-Ze0VRqX6j9MIKtj3goJ8macmfK7ufumAeYZb7jjUEYGDkmr&sa=X&ved=2ahUKEwi54Kzx24yOAxUmh1YBHajEH3QQk8gLegQIIxAB&ictx=1&stq=1&cs=1&lei=5f5baPnZJaaO2roPqIn_oAc#ebo=2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="text-base text-[#000000] font-inter font-light inline-flex items-center gap-2 hover:underline">
                Explore All
                <img src="/arrow.svg" alt="Frame" className="w-3 h-3" />
              </button>
            </a>
          </div>
        </section>

        {/* Clients/Backlinks/Companies Section */}
        <section className="w-[2500px] h-[140px] bg-[#e8e8e8] flex items-center overflow-visible relative px-16 ml-[-250px] mt-2">
          <div className="w-full h-full flex items-center">
            <div className="flex whitespace-nowrap animate-marquee gap-16">
              {/* Duplicate this group to ensure seamless loop */}
              {Array(100).fill(
                <>
                  <img
                    src="/RelianceBL1.svg"
                    alt="Client 1"
                    className="w-[220px] h-[220px] object-contain"
                  />
                  <img
                    src="/BCTrustBL2.svg"
                    alt="Client 2"
                    className="w-[220px] h-[220px] object-contain"
                  />
                  <img
                    src="/SaifeeBL3.svg"
                    alt="Client 3"
                    className="w-[220px] h-[220px] object-contain"
                  />
                  <img
                    src="/WorkhardBL4.svg"
                    alt="Client 4"
                    className="w-[220px] h-[220px] object-contain"
                  />
                  <img
                    src="/SEHBL5.svg"
                    alt="Client 5"
                    className="w-[220px] h-[220px] object-contain"
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section
          data-aos="fade-up"
          data-aos-duration="5000"
          data-aos-delay="800"
          data-aos-easing="ease-in-out"
          className="w-full bg-white mt-10 scroll-mt-[120px]"
        >
          <div ref={clinicRef as React.RefObject<HTMLDivElement>} aria-hidden className="absolute top-0 left-0 h-px w-px" />
          <div className="mx-auto max-w-[1120px] xl:max-w-[1760px] 2xl:max-w-[2000px] px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-12">
            {/* Grid: left text + right map */}
            <div
              className="
        grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-18 xl:gap-14 2xl:gap-16
        items-start
      "
            >
              {/* LEFT: Text/chips — slightly nudged left on wide screens */}
              <div className="lg:col-span-2 xl:col-span-5 2xl:col-span-6 min-w-0 lg:-ml-4 xl:-ml-8 2xl:-ml-12">
                <h2 className="text-[32px] lg:text-[38px] leading-[1.25] font-inter font-bold text-[#2b2b2b]">
                  Potwar Clinic
                </h2>

                <p className="mt-4 font-inter font-light text-[#747474] text-base leading-6">
                  Address: Om Chambers, Room No. 208, Second <br /> Floor, 123,
                  August Kranti Maidan, Kemps Corner, <br /> Mumbai - 400 026.
                </p>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Om%20Chambers%2C%20Room%20No.%20208%2C%20Second%20Floor%2C%20123%2C%20August%20Kranti%20Maidan%2C%20Kemps%20Corner%2C%20Mumbai%20-%20400%20026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-blue-600 underline font-inter font-normal text-sm lg:text-base hover:text-blue-700 transition-colors"
                >
                  Get Directions
                  <img
                    src="/arrow.svg"
                    alt="Arrow"
                    className="w-3 h-3 filter brightness-0 saturate-100 invert-[0.4] sepia-[0.5] saturate-[2.5] hue-rotate-[200deg]"
                  />
                </a>

                {/* Affiliated Hospitals */}
                <div className="mt-8">
                  <h3 className="text-[#984D95] font-semibold text-base uppercase mb-4">
                    Affiliated Hospitals
                  </h3>

                  <div className="flex flex-wrap gap-3 max-w-full">
                    {LOCATIONS.map((loc) => {
                      const isActive = selectedLocation.id === loc.id;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocation(loc)}
                          className={[
                            "px-3 py-2 rounded-[25px] text-sm inline-flex items-center gap-3 transition-all duration-300",
                            "min-w-0", // allow wrapping
                            isActive
                              ? "bg-gradient-to-r from-[#984D95] to-[#D39CC0] text-white shadow-lg"
                              : "bg-[#EEEEEE] text-[#2b2b2b] hover:bg-gradient-to-r hover:from-[#984D95] hover:to-[#D39CC0] hover:text-white",
                          ].join(" ")}
                          aria-pressed={isActive}
                          aria-label={`Show ${loc.label} on map`}
                        >
                          <span className="truncate">{loc.label}</span>
                          <img
                            src="/arrow.svg"
                            alt=""
                            className="w-3 h-3 flex-shrink-0"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT: Map — spans more columns on larger screens + nudged right */}
              <div className="lg:col-span-2 xl:col-span-5 2xl:col-span-8 lg:mr-[-50px] xl:mr-[-280px] 2xl:-mr-26">
                <Card className="w-full max-w-[800px] bg-white rounded-[30px] relative shadow-lg overflow-visible">
                  <CardContent className="p-0 h-full">
                    <div
                      className="
                w-full
                h-[440px] sm:h-[520px] lg:h-[620px] xl:h-[680px] 2xl:h-[740px]
                rounded-[30px] overflow-hidden relative
              "
                    >
                      <iframe
                        title={`Map - ${selectedLocation.label}`}
                        src={selectedLocation.embedUrl}
                        className="w-full h-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />

                      {/* Operating Hours Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-[#F5F5F5] rounded-b-[30px] px-6 py-8 sm:py-10 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center">
                        <div>
                          <p className="text-[#747474] font-inter font-light text-sm">
                            Monday to Saturday
                          </p>
                          <p className="text-[#1E1E1E] font-inter font-light text-sm">
                            3:00 pm - 6:00 pm
                          </p>
                        </div>

                        <a
                          href={selectedLocation.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Directions to ${selectedLocation.label}`}
                          className="inline-flex items-center gap-[11px] pl-3 pr-1.5 py-1.5 rounded-[50px] bg-[#2b2b2b] text-white transition-all duration-300"
                        >
                          <span className="font-inter font-light text-base">
                            Get Directions
                          </span>
                          <div className="p-2 bg-white rounded-[50px]">
                            <img
                              src="/arrow.svg"
                              alt="Frame"
                              className="w-3 h-3"
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full px-14 py-1">
          <div className="max-w-8xl mx-auto">
            <Card className="bg-[#f9f0f5] rounded-[30px] shadow-lg overflow-hidden relative">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="/Footer.svg"
                  alt="Footer Background"
                  className="w-full h-full object-cover"
                />
              </div>

              <CardContent className="p-10 relative z-10">
                <div className="flex justify-start mb-8">
                  <img
                    src="/Potwar.svg"
                    alt="Potwar Clinic logo"
                    className="h-15 w-auto mb-[-100px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  {/* Address Section */}
                  <div className="flex items-center gap-4 mt-[100px]">
                    <div>
                      <p className="text-[#747474] font-inter font-light text-base leading-6 max-w-xs">
                        Address : Om Chambers, Room No. 208, Second Floor, 123,
                        August Kranti Maidan, Kemps Corner, Mumbai - 400 026.
                      </p>
                      <Button
                        asChild
                        className="mt-8 w-fit pl-3 pr-1.5 py-2 relative overflow-hidden group rounded-[50px] transition-all duration-300"
                      >
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Book WhatsApp appointment"
                        >
                          <div className="absolute inset-0 w-full bg-[#2B2B2B]" />
                          <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
                          <span className="font-inter font-light text-[#F5F5F5] text-base group-hover:text-white transition-colors duration-300 relative z-10">
                            Book Appointment
                          </span>
                          <div className="p-2 bg-[#FFFFFF] group-hover:bg-white rounded-full transition-all duration-300 relative z-10 ml-[1px]">
                            <img
                              src="/arrow.svg"
                              alt="Frame"
                              className="w-2.5 h-2.5"
                            />
                          </div>
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-16 bg-gray-300 mx-6"></div>

                  {/* Phone Section */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#984D95] to-[#D39CC0] flex items-center justify-center">
                      <PhoneIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="space-y-1">
                        <p className="text-[#747474] font-inter font-light text-base">
                          +91-9833646316
                        </p>
                        <p className="text-[#747474] font-inter font-light text-base">
                          +91-9920414643
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-16 bg-gray-300 mx-12"></div>

                  {/* Email Section */}
                  <div className="flex items-center gap-4 mr-[40px]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#984D95] to-[#D39CC0] flex items-center justify-center">
                      <MailIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="space-y-1">
                        <p className="text-[#747474] font-inter font-light text-base">
                          devkidesai@gmail.com
                        </p>
                        <p className="text-[#747474] font-inter font-light text-base">
                          potwarclinic@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Book Appointment Button */}
                </div>

                {/* Copyright */}
                <div className="text-center mt-12 pt-8 border-t border-gray-200">
                  <p className="font-inter font-light text-[#2b2b2b] text-base">
                    2025 by Dr. Devki Potwar powerd and secured by Regis Digital
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </footer>
      </div>
    </div>
  );
};
