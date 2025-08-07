import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence } from "framer-motion";
import { motion, useAnimation, useInView } from "framer-motion";
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
import { Separator } from "../../components/ui/separator";

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

export const Desktop = ({ isVisible }: { isVisible: boolean }): JSX.Element => {
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeNav, setActiveNav] = React.useState("Home");

  // Add refs for each section
  const heroRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const clinicRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

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
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5000); // 3s (last delay) + 1.5s (animation) + buffer

    const finalTextTimer = setTimeout(() => {
      // Show final text 2s after fade-out (i.e., after 7s total)
      setShowFinalText(true);
    }, 6000);

    const slideTimer = setTimeout(() => {
      setStartSplitSlide(true);
    }, 8000); // 1s after final text is visible

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finalTextTimer);
      clearTimeout(slideTimer);
    };
  }, []);

  return (
    <div className="bg-[#FFFFFF] flex flex-row justify-center w-full font-inter">
      <div className="bg-[#FFFFFF] w-full max-w-[1440px] relative">
        {/* Fixed Navigation */}
        <header
          data-aos="slide-down"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-easing="ease-in-out"
          className="fixed top-[30px] left-0 right-0 z-50 flex justify-center"
        >
          <div className="flex w-[200px] h-[50px] items-center justify-center px-4 py-2 bg-[#F5F5F5] rounded-[50px] absolute left-16">
            <img
              src="/Dr Devki Logo.svg"
              alt="Dr Devki Logo"
              className="h-[30px] w-auto object-contain"
            />
            <span className="ml-2 font-inter font-normal text-[#2b2b2b] text-base">
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

          <Button className="inline-flex h-[50px] items-center gap-[10px] px-3 py-2 fixed top-[5px] right-14 rounded-[50px] bg-[#F5F5F5] hover:bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] group transition-all duration-300">
            <span className="font-inter font-thin text-[#2b2b2b] text-base group-hover:text-white transition-colors duration-300">
              Contact Us
            </span>
            <div className="p-3 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] group-hover:bg-none group-hover:bg-white transition-all duration-300">
              <PhoneIcon className="w-6 h-6 fill-white group-hover:fill-[#984D95] transition-all duration-300" />
            </div>
          </Button>
        </header>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="pt-[100px] px-16 pb-20 flex relative overflow-hidden"
        >
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
            className="w-[50%] flex flex-col justify-center relative"
          >
            {/* Text gradient spots */}
            <div className="absolute bottom-[-10%] left-[-40%] w-[900px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(211,156,192,0.3)_0%,rgba(152,77,149,0.2)_40%,transparent_100%)] blur-xl pointer-events-none" />

            <h1 className="text-[58px] leading-[64px] font-inter font-semibold text-[#2b2b2b] relative z-10">
              Just your gynaec,
              <br />
              gone digital
            </h1>
            <p className="w-[559px] mt-6 font-inter font-light text-[#747474] text-base leading-relaxed relative z-10">
              Keep scrolling to know how I can help you.
            </p>
            <Button className="mt-8 w-fit pl-3 pr-1.5 py-2 relative overflow-hidden group rounded-[50px] transition-all duration-300">
              <div className="absolute inset-0 w-full bg-[#2B2B2B]" />
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
              <span className="font-inter font-light text-[#F5F5F5] text-base group-hover:text-white transition-colors duration-300 relative z-10">
                Book Appointment
              </span>
              <div className="p-2 bg-[#FFFFFF] group-hover:bg-white rounded-full transition-all duration-300 relative z-10 ml-[1px]">
                <img src="/arrow.svg" alt="Frame" className="w-2.5 h-2.5" />
              </div>
            </Button>
          </div>

          {/* Hero Images Grid */}
          <div className="w-[50%] relative h-[850px] overflow-visible z-10">
            {/* Animated HeroLine */}
            <svg
              viewBox="0 0 806 1011"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[-10%] right-[-12%] w-[850px] h-[1011px] z-0"
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

            <div className="absolute right-0 flex gap-6 z-10">
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

        <section ref={linesRef} className="mx-16 my-16 relative z-0">
          {/* Background lines */}
          <div className="absolute inset-0 overflow-visible">
            {/* Left Line */}
            <svg
              viewBox="0 0 831 252"
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute left-[-70px] top-20 w-[800px] h-[300px] ${
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
              className={`absolute right-[-90px] bottom-10 w-[800px] h-[300px] scale-y-[1] ${
                isLinesInView ? "animate-stroke-draw-reverse " : ""
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
            ref={aboutSectionRef as React.Ref<HTMLDivElement>}
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            data-aos-delay="700"
            data-aos-easing="ease-in-out"
            className="w-full h-[400px] lg:h-[660px] md:h-[500px] sm:h-[400px] bg-[#D6A0C229] rounded-[20px] lg:rounded-[30px] md:rounded-[25px] sm:rounded-[20px] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-[25px] backdrop-saturate-150"
          >
            <CardContent className="w-full lg:w-[969px] md:w-full sm:w-full text-center px-4 lg:px-0 md:px-4 sm:px-4 mt-[50px]">
              <motion.div
                animate={{ opacity: startSplitSlide ? 0 : 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div
                  data-aos="fade-up"
                  data-aos-duration="1200"
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
                  data-aos-duration="1100"
                  data-aos-delay="1250"
                  data-aos-easing="ease-in-out"
                  className="absolute inset-0 flex items-center justify-center mt-[40px]"
                >
                  <p className="text-[20px] lg:text-[38px] font-inter font-semibold text-[#2b2b2b]">
                    I created Potwar clinic out of a simple <br />
                  </p>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="2050"
                  data-aos-easing="ease-in-out"
                  className="absolute inset-0 flex items-center justify-center mt-[90px]"
                >
                  <p className="text-[20px] lg:text-[38px] font-inter font-semibold text-[#2b2b2b]">
                    idea: that{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)]">
                      women deserve care
                    </span>{" "}
                    that feels personal,
                  </p>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-duration="1200"
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
                      animate={startSplitSlide ? { x: -200 } : { x: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                      Hi, I'm
                    </motion.span>

                    <motion.span
                      animate={startSplitSlide ? { x: 160 } : { x: 0 }}
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
                  animate={{ width: "33%", opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
                  className="w-[380px] h-[450px] overflow-hidden rounded-[20px] ml-[180px] mt-[140px]"
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
                  className="absolute inset-0 flex items-center justify-center mt-[240px] mr-[-595px] px-4"
                >
                  <p className="font-inter text-[17px] font-thin text-[#000000] leading-relaxed text-left max-w-[620px]">
                    I’m an Obstetrician and Gynaecologist with over 14 years of{" "}
                    <br />
                    experience dedicated to women’s health, from adolescence to{" "}
                    <br />
                    motherhood and beyond. Whether it’s guiding a high-risk{" "}
                    <br />
                    pregnancy, performing advanced gynaecological surgeries, or{" "}
                    <br />
                    supporting couples on their fertility journey, I’m
                    passionate <br />
                    about providing compassionate and evidence-based care to{" "}
                    <br />
                    each patient.{" "}
                    <span className="text-blue-500 underline cursor-pointer">
                      Read more
                    </span>
                  </p>
                </div>
              )}
              {startSplitSlide && (
                <div
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="400"
                  data-aos-easing="ease-in-out"
                  className="absolute inset-0 flex items-center justify-center gap-6 mt-[500px]" // adjust mt and gap as needed
                >
                  {/* First Image */}
                  <div className="w-[260px] h-[150px]rounded-[20px] overflow-hidden ml-[-590px] mt-[-1000px]">
                    <img
                      src="/About(top).svg"
                      alt="Obstetrics Icon"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Second Image */}
                  <div className="w-[260px] h-[150px]rounded-[20px] overflow-hidden ml-[-600px] mt-[-100px]">
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
        <section ref={servicesRef} className="px-16 py-10">
          <h2 className="w-[969px] mx-auto text-[42px] text-center leading-[52px] font-inter font-bold text-[#2b2b2b] mb-12">
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
          ref={galleryRef}
          className="pt-[100px] px-16 pb-20 flex relative overflow-hidden"
        >
          {/* Background lines */}
          <div className="absolute inset-0 overflow-visible pointer-events-none">
            <img
              src="/Galleryline.svg"
              alt="Background line"
              className="absolute top-[70%] left-[0px] transform -translate-y-1/2 h-[270px] w-[1100px] object-cover"
            />
          </div>

          <Card
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-easing="ease-in-out"
            className="w-full h-[630px] bg-[#D6A0C229] rounded-[30px] flex items-center justify-start relative overflow-hidden backdrop-blur-[25px] backdrop-saturate-150 px-16 pt-12 pb-12"
          >
            <CardContent className="p-0 w-full h-full">
              <div className="flex flex-row w-full h-full gap-10">
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
                  <p className="font-inter font-light text-[#747474] text-base leading-relaxed mb-5">
                    Lorem ipsum dolor sit amet <br /> consectetur. Proin erat
                    nullam <br />
                    semper faucibus
                  </p>
                  <Button className="mt-4 w-fit pl-3 pr-1.5 py-2 relative overflow-hidden group rounded-[50px] transition-all duration-300">
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
                  </Button>
                </div>

                {/* RIGHT SIDE - Image gallery with scroll-triggered horizontal animation */}
                <div className="w-full overflow-x-auto overflow-y-hidden mt-8 ml-[-100px] pr-8 scrollbar-hide">
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
        </section>

        <section
          data-aos="fade-up"
          data-aos-duration="5500"
          data-aos-delay="800"
          data-aos-easing="ease-in-out"
          className="px-16 py-[-500px] bg-white"
          ref={testimonialsRef}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-16">
            <div>
              <h2 className="text-[40px] font-bold text-[#000000]">
                Hear from my patients
              </h2>
              <p className="text-[#747474] text-base font-light leading-6 mt-4 w-[475px]">
                Lorem ipsum dolor sit amet consectetur. Proin erat nullam semper
                faucibus et pharetra. Hendrerit.
              </p>
            </div>

            <Button className="mt-8 w-fit pl-3 pr-1.5 py-2 relative overflow-hidden group rounded-[50px] transition-all duration-300">
              <div className="absolute inset-0 w-full bg-[#2B2B2B]" />
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
              <span className="font-inter font-light text-[#F5F5F5] text-base group-hover:text-white transition-colors duration-300 relative z-10">
                Book Appointment
              </span>
              <div className="p-2 bg-[#FFFFFF] group-hover:bg-white rounded-full transition-all duration-300 relative z-10 ml-[1px]">
                <img src="/arrow.svg" alt="Frame" className="w-2.5 h-2.5" />
              </div>
            </Button>
          </div>

          <div className="w-full px-6 max-w-[1320px] mx-auto">
            <div className="grid grid-cols-4 gap-10 auto-rows-auto">
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
                  className="w-full] h-full object-cover"
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
            <button className="text-base text-[#000000] font-inter font-light inline-flex items-center gap-2 hover:underline">
              Explore All
              <img src="/arrow.svg" alt="Frame" className="w-3 h-3" />
            </button>
          </div>
        </section>

        {/* Clients/Backlinks/Companies Section */}
        <section className="w-full h-[140px] bg-[#e8e8e8] flex items-center overflow-hidden relative px-16 mt-12">
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
          ref={clinicRef}
          data-aos="fade-up"
          data-aos-duration="5000"
          data-aos-delay="800"
          data-aos-easing="ease-in-out"
          className="w-full h-[840px] bg-[#FFFFFF] mt-10"
        >
          <div className="px-16 py-16 flex justify-between">
            <div className="max-w-[475px] mt-[140px]">
              <h2 className="text-[38px] leading-[50px] font-inter font-bold text-[#2b2b2b]">
                Potwar Clinic
              </h2>
              <p className="mt-4 font-inter font-light text-[#747474] text-base leading-6">
                Address: Om Chambers, Room No. 208, Second <br /> Floor, 123,
                August Kranti Maidan, Kemps Corner, <br /> Mumbai - 400 026.
              </p>
              <button className="mt-4 text-blue-600 underline font-inter font-normal text-base inline-flex items-center gap-2 hover:text-blue-700 transition-colors">
                Get Directions
                <img
                  src="/arrow.svg"
                  alt="Arrow"
                  className="w-3 h-3 filter brightness-0 saturate-100 invert-[0.4] sepia-[0.5] saturate-[2.5] hue-rotate-[200deg]"
                />
              </button>
              {/* Affiliated Hospitals Section */}
              <div className="mt-[30px]">
                <h3 className="text-[#984D95] font-semibold text-base uppercase mb-4">
                  Affiliated Hospitals
                </h3>
                <div className="flex flex-wrap gap-3 max-w-[700px]">
                  {/* Highlighted Hospital - Sir HN Reliance hospital */}
                  <button className="px-3 py-2 rounded-[25px] bg-gradient-to-r from-[#984D95] to-[#D39CC0] text-[#FFFFFF] font-extralight text-sm inline-flex items-center gap-3 hover:shadow-lg transition-all duration-300">
                    Sir HN Reliance hospital
                    <div className="p-2 bg-white rounded-[50px]">
                      <img src="/arrow.svg" alt="Frame" className="w-3 h-3" />
                    </div>
                  </button>

                  {/* Other Hospitals */}
                  {[
                    "Breach Candy hospital",
                    "Saifee hospital",
                    "Babies and Us Fertility and IVF Centre",
                    "Wockhardt hospital",
                    "Saint Elizabeth Hospital",
                  ].map((hospital, index) => (
                    <button
                      key={index}
                      className="px-3 py-2 rounded-[25px] bg-[#EEEEEE] text-[#2b2b2b] font-extralight text-sm inline-flex items-center gap-3 hover:bg-gradient-to-r hover:from-[#984D95] hover:to-[#D39CC0] hover:text-white transition-all duration-300 group"
                    >
                      {hospital}
                      <img
                        src="/arrow.svg"
                        alt="Arrow"
                        className="w-3 h-3 group-hover:filter group-hover:invert transition-all duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="w-[755px] h-[600px] bg-white rounded-[30px] relative shadow-lg">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full rounded-[30px] overflow-hidden relative">
                  {/* Map Image */}
                  <img
                    src="/Map.svg"
                    alt="Location Map"
                    className="w-full h-full object-cover"
                  />

                  {/* Operating Hours Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#F5F5F5] rounded-b-[30px] px-6 py-10 flex justify-between items-center">
                    <div>
                      <div className="text-[#747474]">
                        <p className="font-inter font-light text-sm">
                          Monday to Saturday
                        </p>
                      </div>
                      <div className="text-[#1E1E1E]">
                        <p className="font-inter font-light text-sm">
                          3:00 pm - 6:00 pm
                        </p>
                      </div>
                    </div>
                    <Button className="inline-flex items-center gap-[11px] pl-3 pr-1.5 py-1.5 relative overflow-hidden group rounded-[50px] bg-[#2b2b2b] transition-all duration-300">
                      <div className="absolute inset-0 w-full bg-[#2b2b2b]" />
                      <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
                      <span className="font-inter font-light text-[#F5F5F5] text-base group-hover:text-white transition-colors duration-300 relative z-10">
                        Get Directions
                      </span>
                      <div className="p-2 bg-white rounded-[50px] relative z-10">
                        <img src="/arrow.svg" alt="Frame" className="w-3 h-3" />
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full px-14 py-1">
          <div className="max-w-8xl mx-auto">
            <Card className="bg-white rounded-[30px] shadow-lg overflow-hidden relative">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="/Footer.svg"
                  alt="Footer Background"
                  className="w-full h-full object-cover"
                />
              </div>

              <CardContent className="p-10 relative z-10">
                <div className="flex items-center justify-between">
                  {/* Address Section */}
                  <div className="flex items-center gap-4 mt-[100px]">
                    <div>
                      <p className="text-[#747474] font-inter font-light text-base leading-6 max-w-xs">
                        Address : Om Chambers, Room No. 208, Second Floor, 123,
                        August Kranti Maidan, Kemps Corner, Mumbai - 400 026.
                      </p>
                      <Button className="mt-8 w-fit pl-3 pr-1.5 py-2 relative overflow-hidden group rounded-[50px] transition-all duration-300">
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
