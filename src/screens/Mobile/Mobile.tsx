import "aos/dist/aos.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

// ---- CONTACT / WHATSAPP ----
const PHONE_NUMBER = "+919892954913"; // call target
const WHATSAPP_NUMBER = "+919892954913"; // WhatsApp target
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
    title: "Cosmetic Gynaecology \n & Vaginal Aesthetics",
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

export const Mobile = (): JSX.Element => {
  const [, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linesRef = useRef(null);
  const isLinesInView = useInView(linesRef, { once: true, margin: "-100px" });

  const quoteRef = useRef(null);
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.4 }); // ~40% visible

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
    }, 5000); // 3s (last delay) + 1.5s (animation) + buffer

    const finalTextTimer = setTimeout(() => {
      // Show final text 2s after fade-out (i.e., after 7s total)
      setShowFinalText(true);
    }, 5000);

    const slideTimer = setTimeout(() => {
      setStartSplitSlide(true);
    }, 7000); // 1s after final text is visible

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finalTextTimer);
      clearTimeout(slideTimer);
    };
  }, [quoteInView]);

  return (
    <div className="bg-[#FFFFFF] flex flex-row justify-center w-full font-inter overflow-x-clip">
      <div className="bg-[#FFFFFF] w-full max-w-[1440px] relative">
        {/* Hero Section - Reference Layout */}
        <section className="relative flex flex-col items-center justify-start pt-8 pb-12 px-3 bg-white min-h-[90vh] overflow-x-clip overflow-y-visible">
          {/* Top-left logo button */}
          <div
            data-aos="slide-down"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-easing="ease-in-out"
            className="absolute top-14 left-5 z-20 flex items-center bg-[#F5F5F5] rounded-full px-2 py-2 shadow-md gap-2"
          >
            <img
              src="/Dr Devki Logo.svg"
              alt="Dr Devki Logo"
              className="h-6 w-auto object-contain"
            />
            <span className="font-inter font-semibolds text-[#2b2b2b] text-sm">
              Dr. Devki Potwar
            </span>
          </div>
          {/* Top-right call button */}
          <Button
            data-aos="slide-down"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-easing="ease-in-out"
            className="inline-flex h-[52px] items-center gap-[10px] px-2 py-3 fixed top-[50px] right-2 rounded-[50px] bg-[#F5F5F5] hover:bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] group transition-all duration-300 z-30"
          >
            <a href={`tel:${PHONE_NUMBER}`} aria-label="Call Potwar Clinic">
              <div className="p-3 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] group-hover:bg-none group-hover:bg-white transition-all duration-300">
                <PhoneIcon className="w-6 h-6 fill-white group-hover:fill-[#984D95] transition-all duration-300" />
              </div>
            </a>
          </Button>

          {/* Decorative line behind images */}
          <svg
            viewBox="0 0 806 1011"
            xmlns="http://www.w3.org/2000/svg"
            className="
    pointer-events-none absolute top-[14%] right-0
    md:right-[-35%] xl:right-[-85%] 2xl:right-[-90%]
    translate-x-[100vw]            /* subtle nudge */
    w-[min(1000px,200vw)] h-auto z-0
  "
          >
            <path
              d="M-116.674 11.7329C-88.6493 5.34126 -1.554 5.37179 30.8898 49.8833C64.9312 96.5867 55.8406 131.132 106.69 223.683C157.878 316.85 307.179 355.005 347.139 364.77"
              stroke="#D39CC0" // <-- solid color for test
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
              className="animate-stroke-draw [animation-delay:1s]"
            />
          </svg>
          <div className="relative z-10 grid grid-cols-2 grid-rows-2 gap-3 mt-16 mb-8 w-[90vw] max-w-[340px]">
            {/* Top Left — from top */}
            <motion.img
              initial={{ y: -300, opacity: 0 }}
              animate={{
                y: [-1000, -900, 40, -10, 0],
                opacity: [0, 0.5, 1, 1, 1],
              }}
              transition={{
                duration: 6,
                times: [0.1, 0.4, 0.7, 0.85, 1],
                ease: "easeInOut",
              }}
              src="/FirstCol(1).jpg"
              alt="Clinic 1"
              className="rounded-[18px] object-cover w-full h-[175px] shadow-md mt-10"
            />

            {/* Top Right — from bottom */}
            <motion.img
              initial={{ y: 300, opacity: 0 }}
              animate={{
                y: [600, 550, -40, 10, 0],
                opacity: [0, 0, 1, 1, 1],
              }}
              transition={{
                duration: 6,
                times: [0.1, 0.4, 0.7, 0.85, 1],
                ease: "easeInOut",
              }}
              src="/SecondCol(2).jpg"
              alt="Clinic 2"
              className="rounded-[18px] object-cover w-full h-[185px] shadow-md mt-[-100px]"
            />

            {/* Bottom Left — from top */}
            <motion.img
              initial={{ y: -300, opacity: 0 }}
              animate={{
                y: [-1000, -900, 40, -10, 0],
                opacity: [0, 0.5, 1, 1, 1],
              }}
              transition={{
                duration: 6,
                times: [0.1, 0.4, 0.7, 0.85, 1],
                ease: "easeInOut",
              }}
              src="/FirstCol(2).jpg"
              alt="Clinic 3"
              className="rounded-[18px] object-cover w-full h-[175px] shadow-md mt-2"
            />

            {/* Bottom Right — from bottom */}
            <motion.img
              initial={{ y: 300, opacity: 0 }}
              animate={{
                y: [600, 550, -40, 10, 0],
                opacity: [0, 0, 1, 1, 1],
              }}
              transition={{
                duration: 6,
                times: [0.1, 0.4, 0.7, 0.85, 1],
                ease: "easeInOut",
              }}
              src="/SecondCol(1).jpg"
              alt="Clinic 4"
              className="rounded-[18px] object-cover w-full h-[175px] shadow-md mt-[-130px]"
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="4000"
            data-aos-delay="100"
            data-aos-easing="ease-in-out"
            className="relative z-10 flex flex-col w-full px-2 py-6"
          >
            <div className="absolute bottom-[-10%] left-[-40%] w-full h-[500px] rounded-full bg-[radial-gradient(circle,rgba(211,156,192,0.3)_0%,rgba(152,77,149,0.2)_40%,transparent_100%)] blur-xl pointer-events-none" />

            <h1 className="text-[35px] font-semibold text-[#2b2b2b] leading-tight mt-[-10px]">
              Just your gynaec,
              <br />
              gone digital
            </h1>
            <p className="w-[559px] mt-[-5px] font-inter font-light text-[#747474] text-sm leading-relaxed relative z-10">
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
        </section>

        {/* Quote Section (mobile-first, no horizontal overflow) */}
        <section
          ref={linesRef}
          className="relative z-0 px-4 sm:px-6 md:px-10 lg:px-16 py-10"
        >
          {/* Background lines */}
          <div className="pointer-events-none absolute inset-0 overflow-x-clip overflow-y-visible">
            {/* Left Line */}
            <svg
              viewBox="0 0 831 252"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[300px] left-0
               w-[70vw] sm:w-[120vw] md:w-[110vw] lg:w-[900px] h-auto
               -translate-x-[10vw] sm:-translate-x-[6vw] md:-translate-x-[8vw] lg:-translate-x-[18vw]"
            >
              <defs>
                <linearGradient
                  id="leftLineGradient_q"
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
                stroke="url(#leftLineGradient_q)"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                className={`[stroke-dasharray:1] [stroke-dashoffset:1] ${
                  isLinesInView
                    ? "animate-stroke-draw [animation-delay:800ms] [animation-duration:3s]"
                    : ""
                }`}
              />
            </svg>

            {/* Right Line */}
            <svg
              viewBox="0 0 868 322"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-40 right-0
               w-[70vw] sm:w-[120vw] md:w-[110vw] lg:w-[900px] h-auto
               translate-x-[10vw] sm:translate-x-[6vw] md:translate-x-[8vw] lg:translate-x-[18vw]"
            >
              <defs>
                <linearGradient
                  id="rightLineGradient_q"
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
                stroke="url(#rightLineGradient_q)"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                className={`[stroke-dasharray:1] [stroke-dashoffset:1] ${
                  isLinesInView
                    ? "animate-stroke-draw-reverse [animation-duration:2s]"
                    : ""
                }`}
              />
            </svg>
          </div>

          {/* Card */}
          <Card
            ref={quoteRef}
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="1800"
            data-aos-easing="ease-in-out"
            className="w-[92vw] max-w-[340px] sm:max-w-[560px] md:max-w-[720px] lg:max-w-[960px]
               h-[600px] sm:h-[620px] md:h-[680px] lg:h-[740px]
               bg-[#D6A0C229] rounded-[20px] sm:rounded-[24px] lg:rounded-[30px]
               mx-auto relative overflow-hidden backdrop-blur-[25px] backdrop-saturate-150"
          >
            <CardContent className="w-full h-full text-center px-3 sm:px-6 md:px-10 lg:px-12 mt-6 sm:mt-8">
              {/* Icons */}
              <motion.div
                animate={{ opacity: startSplitSlide ? 0 : 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div
                  data-aos="fade-up"
                  data-aos-duration="1800"
                  data-aos-delay="2500"
                  className="flex gap-3 sm:gap-4 justify-center mb-[-2px] sm:mb-2 mt-[200px]"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] flex items-center justify-center">
                    <img
                      src="/phone.svg"
                      alt="Phone"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] flex items-center justify-center">
                    <img
                      src="/message.svg"
                      alt="Message"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Three staged lines */}
              <div
                className={`relative transition-opacity duration-700 ${
                  fadeOut ? "opacity-0" : "opacity-100"
                }`}
              >
                <div
                  data-aos="fade-up"
                  data-aos-duration="1800"
                  data-aos-delay="2500"
                  className="absolute inset-0 flex items-center justify-center mt-[90px] sm:mt-[20px]"
                >
                  <p className="text-[23px] sm:text-[22px] md:text-[28px] lg:text-[38px] font-inter font-semibold text-[#2b2b2b]">
                    I created Potwar clinic <br /> out of a simple idea: that
                    <br />
                    <img
                      src="/womendeservecare.svg"
                      alt="Women Deserve Care"
                      className="w-auto h-[40px] lg:h-[60px]"
                    />
                    that feels personal, safe, and never rushed.
                  </p>
                </div>
              </div>

              {/* Center Name → float up (no split) */}
              {showFinalText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: startSplitSlide ? -170 : 0, // go higher when the old “split” would happen
                  }}
                  transition={{
                    duration: 1.1,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 flex items-center justify-center mt-[-50px] sm:mt-[10px]"
                >
                  <p className="text-[23px] sm:text-[28px] md:text-[36px] lg:text-[48px] leading-tight font-inter font-bold text-[#2b2b2b] px-4 text-center">
                    {/* plain text (no per-word x animations) */}
                    Hi, I’m <span>Dr. Devki Potwar</span>
                  </p>
                </motion.div>
              )}

              {/* Photo slide-in (shows after split) */}
              {startSplitSlide && (
                <div
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                  className="w-[180px] sm:w-[320px] md:w-[360px] h-[240px] sm:h-[380px] md:h-[420px]
                     overflow-hidden rounded-[16px] sm:rounded-[20px] mx-auto mt-[-100px] sm:mt-[160px]"
                >
                  <img
                    src="/DrDevki.svg"
                    alt="Dr. Devki Potwar"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Paragraph to the right on desktop; centered on mobile */}
              {startSplitSlide && (
                <div
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                  className="text-left max-w-[92%] sm:max-w-[560px] md:max-w-[680px] lg:max-w-[620px]
                     mt-6 sm:mt-8 lg:text-left"
                >
                  <p className="font-inter text-[12px] sm:text-[15px] md:text-[16px] text-[#000] font-thin leading-relaxed">
                    I’m an Obstetrician and Gynaecologist with over 14 years of
                    experience dedicated to women’s health, from adolescence to
                    motherhood and beyond. Whether it’s guiding a high-risk
                    pregnancy, performing advanced gynaecological surgeries, or
                    supporting couples on their fertility journey, I’m
                    passionate about providing compassionate and evidence-based
                    care to each patient.
                    <span className="text-blue-500 underline cursor-pointer">
                      {" "}
                      Read more
                    </span>
                  </p>
                </div>
              )}

              {startSplitSlide && (
                <div
                  data-aos="fade-"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                  className="relative ml-12 w-[220px] mt-[-525px] sm:mt-8 overflow-visible"
                >
                  <img
                    src="/About(top).svg"
                    alt="About A"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Services Section - Simple stacked cards */}
        <section
          data-aos="fade-up"
          data-aos-duration="5500"
          data-aos-delay="800"
          data-aos-easing="ease-in-out"
          className="px-4 lg:px-16 md:px-8 sm:px-4 py-6 lg:py-10 md:py-8 sm:py-6"
        >
          <h2 className="w-full lg:w-[969px] mx-auto text-[24px] lg:text-[42px] md:text-[32px] sm:text-[24px] text-center leading-[28px] lg:leading-[52px] md:leading-[38px] sm:leading-[28px] font-inter font-bold text-[#2b2b2b] mb-6 lg:mb-12">
            Our Services
          </h2>

          <div className="space-y-5 lg:space-y-8 md:space-y-6 sm:space-y-5">
            {services.map((service, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="w-full max-w-[720px]">
                  {/* Pink header (top) */}
                  <div className="bg-[#d6a0c2] rounded-[24px] px-6 lg:px-8 py-6 lg:py-9 text-center h-[100px]">
                    <h3 className="font-inter font-bold text-white text-[18px] lg:text-[28px] leading-tight whitespace-pre-line">
                      {service.title}
                    </h3>
                  </div>

                  {/* White card (bottom) — overlaps upward + slightly inset */}
                  <div className="-mt-8 lg:-mt-6">
                    <div className="mx-auto w-[100%] md:w-[80%]">
                      <div className="bg-[#F5F5F5] rounded-[20px] lg:rounded-[22px] shadow-[0_8px_16px_rgba(0,0,0,0.08)] flex items-center justify-center px-4 lg:px-6 py-5 lg:py-5 h-[120px]">
                        <div className="flex items-center gap-3 lg:gap-4">
                          {/* Icon */}
                          <div className="w-12 h-12 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-[#984D95] to-[#D39CC0] flex items-center justify-center flex-shrink-0">
                            <img
                              src={`/Service${index + 1}.svg`}
                              alt={`Service ${index + 1}`}
                              className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                            />
                          </div>

                          {/* Description */}
                          <p className="text-[#5C5C5C] text-left font-inter font-light text-sm lg:text-base leading-relaxed ">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section (mobile-first) */}
        <section className="pt-[60px] pb-20 px-6 sm:px-10 relative overflow-visible">
          {/* Background lines */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/Galleryline.svg"
              alt="Background line"
              className="absolute top-[60%] left-0 -translate-y-1/2 h-[200px] w-[1100px] object-cover"
            />
          </div>

          <Card
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-easing="ease-in-out"
            className="w-full bg-[#D6A0C229] rounded-[30px] flex flex-col lg:flex-row items-start lg:items-center relative overflow-hidden backdrop-blur-[25px] backdrop-saturate-150 p-6 sm:p-10 lg:px-16"
          >
            <CardContent className="p-0 w-full">
              {/* LEFT — text */}
              <div
                data-aos="fade-up"
                data-aos-duration="900"
                data-aos-delay="800"
                className="w-full lg:w-1/2 flex flex-col justify-center mb-6 lg:mb-0"
              >
                <h1 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-tight font-inter font-semibold text-[#2b2b2b] mb-10 mt-10">
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

              {/* RIGHT / BELOW on mobile — images */}
              <div className="w-full lg:w-1/2 overflow-x-auto overflow-y-hidden scrollbar-hide min-w-0 min-h-[220px]">
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  whileInView={{ x: [460, -50, 10, 0], opacity: [0, 1, 1, 1] }}
                  transition={{
                    duration: 3,
                    times: [0, 0.55, 0.8, 1], // fast in, quick bounce, settle
                    ease: ["easeOut", "easeInOut", "easeOut"],
                  }}
                  xs
                  viewport={{ once: true, amount: 0.15 }}
                  className="flex flex-row gap-4 w-max"
                >
                  {/* Gallery Image 1 */}
                  <div className="w-[250px] h-[350px] bg-gray-300 rounded-[30px] overflow-hidden shadow-lg shrink-0">
                    <img
                      src="/Gallerylarge(1).svg"
                      alt="Gallery Image 1"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Gallery Image 2 (small stacked) */}
                  <div className="flex flex-col gap-6 shrink-0">
                    <div className="w-[250px] h-[162px] bg-gray-200 rounded-[30px] overflow-hidden shadow-lg">
                      <img
                        src="/Gallerysmall(1).svg"
                        alt="Gallery Image 2"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="w-[250px] h-[162px] bg-gray-200 rounded-[30px] overflow-hidden shadow-lg">
                      <img
                        src="/Gallerysmall(2).svg"
                        alt="Gallery Image 2"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Gallery Image 3 */}
                  <div className="w-[230px] h-[350px] bg-gray-300 rounded-[30px] overflow-hidden shadow-lg shrink-0">
                    <img
                      src="/Gallerylarge(2).svg"
                      alt="Gallery Image 3"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Gallery Image 4 */}
                  <div className="w-[290px] h-[350px] bg-gray-300 rounded-[30px] overflow-hidden shadow-lg shrink-0">
                    <img
                      src="/Gallerylarge(3).svg"
                      alt="Gallery Image 4"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Gallery Image 5 */}
                  <div className="w-[290px] h-[350px] bg-gray-300 rounded-[30px] overflow-hidden shadow-lg shrink-0">
                    <img
                      src="/Gallerylarge(4).svg"
                      alt="Gallery Image 5"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="200"
          data-aos-easing="ease-in-out"
          className="px-6 sm:px-10 lg:px-16 py-12 bg-white"
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-12">
            <div className="text-left">
              <h2 className="text-[34px] sm:text-[36px] lg:text-[40px] font-bold text-[#000000]">
                Hear from my patients
              </h2>
              <p className="text-[#747474] text-base font-light leading-6 mt-4 max-w-[475px]">
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

          {/* Grid */}
          {/* Horizontal scroller */}
          <div className="w-full max-w-[1320px] mx-auto">
            <div className="overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory">
              <div className="flex gap-6 lg:gap-10 w-max  items-center justify-center">
                {[
                  {
                    src: "/Testimonial(1).svg",
                    w: "w-[220px]",
                    h: "h-[320px]",
                  },
                  {
                    src: "/Testimonial(3).jpg",
                    w: "w-[300px]",
                    h: "h-[450px]",
                  },
                  {
                    src: "/Testimonial(5).svg",
                    w: "w-[300px]",
                    h: "h-[320px]",
                  },
                  {
                    src: "/Testimonial(7).jpg",
                    w: "w-[300px]",
                    h: "h-[210px]",
                  },
                  {
                    src: "/Testimonial(2).jpg",
                    w: "w-[300px]",
                    h: "h-[300px]",
                  },
                  {
                    src: "/Testimonial(4).svg",
                    w: "w-[300px]",
                    h: "h-[300px]",
                  },
                  {
                    src: "/Testimonial(6).svg",
                    w: "w-[300px]",
                    h: "h-[300px]",
                  },
                  {
                    src: "/Testimonial(8).svg",
                    w: "w-[300px]",
                    h: "h-[570px]",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`snap-start shrink-0 ${item.w} ${item.h} rounded-[37px] overflow-hidden shadow-md`}
                  >
                    <img
                      src={item.src}
                      alt={`Testimonial ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clients/Backlinks/Companies Section - Responsive */}
        <section className="w-full h-[100px] lg:h-[140px] md:h-[100px] sm:h-[80px] bg-[#e8e8e8] flex items-center overflow-hidden relative px-4 lg:px-16 md:px-8 sm:px-4 mt-1 lg:mt-12 md:mt-10 sm:mt-8">
          <div className="w-full h-full flex items-center">
            <div className="flex whitespace-nowrap animate-marquee gap-8 lg:gap-16 md:gap-12 sm:gap-8">
              {/* Duplicate this group to ensure seamless loop */}
              {Array(100).fill(
                <>
                  <img
                    src="/RelianceBL1.svg"
                    alt="Client 1"
                    className="w-[150px] h-[150px] lg:w-[220px] lg:h-[220px] md:w-[165px] md:h-[165px] sm:w-[110px] sm:h-[110px] object-contain"
                  />
                  <img
                    src="/BCTrustBL2.svg"
                    alt="Client 2"
                    className="w-[150px] h-[150px] lg:w-[220px] lg:h-[220px] md:w-[165px] md:h-[165px] sm:w-[110px] sm:h-[110px] object-contain"
                  />
                  <img
                    src="/SaifeeBL3.svg"
                    alt="Client 3"
                    className="w-[150px] h-[150px] lg:w-[220px] lg:h-[220px] md:w-[165px] md:h-[165px] sm:w-[110px] sm:h-[110px] object-contain"
                  />
                  <img
                    src="/WorkhardBL4.svg"
                    alt="Client 4"
                    className="w-[150px] h-[150px] lg:w-[220px] lg:h-[220px] md:w-[165px] md:h-[165px] sm:w-[110px] sm:h-[110px] object-contain"
                  />
                  <img
                    src="/SEHBL5.svg"
                    alt="Client 5"
                    className="w-[150px] h-[150px] lg:w-[220px] lg:h-[220px] md:w-[165px] md:h-[165px] sm:w-[110px] sm:h-[110px] object-contain"
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Location Section - Responsive */}
        <section
          data-aos="fade-up"
          data-aos-duration="5000"
          data-aos-delay="800"
          data-aos-easing="ease-in-out"
          className="w-full h-[600px] lg:h-[840px] md:h-[700px] sm:h-[600px] bg-[#FFFFFF] mt-8 lg:mt-10 md:mt-9 sm:mt-8"
        >
          <div className="px-4 lg:px-16 md:px-8 sm:px-4 py-8 lg:py-16 md:py-12 sm:py-8 flex flex-col lg:flex-row justify-between gap-8 lg:gap-0 md:gap-6 sm:gap-8">
            <div className="w-full lg:max-w-[475px] md:w-full sm:w-full lg:mt-[140px] md:mt-[70px] sm:mt-[35px] text-left lg:text-left">
              <h2 className="text-[28px] lg:text-[38px] md:text-[32px] sm:text-[28px] leading-[32px] lg:leading-[50px] md:leading-[40px] sm:leading-[32px] font-inter font-bold text-[#2b2b2b]">
                Potwar Clinic
              </h2>
              <p className="mt-4 font-inter font-light text-[#747474] text-sm lg:text-base md:text-base sm:text-sm leading-6">
                Address: Om Chambers, Room No. 208, Second <br /> Floor, 123,
                August Kranti Maidan, Kemps Corner, <br /> Mumbai - 400 026.
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Om%20Chambers%2C%20Room%20No.%20208%2C%20Second%20Floor%2C%20123%2C%20August%20Kranti%20Maidan%2C%20Kemps%20Corner%2C%20Mumbai%20-%20400%20026"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-blue-600 underline font-inter font-normal text-sm lg:text-base md:text-base sm:text-sm inline-flex items-center gap-2 hover:text-blue-700 transition-colors mx-auto lg:mx-0"
              >
                Get Directions
                <img
                  src="/arrow.svg"
                  alt="Arrow"
                  className="w-3 h-3 filter brightness-0 saturate-100 invert-[0.4] sepia-[0.5] saturate-[2.5] hue-rotate-[200deg]"
                />
              </a>

              {/* Affiliated Hospitals Section */}
              <div className="mt-[40px] lg:mt-[30px] md:mt-[25px] sm:mt-[20px]">
                <h3 className="text-[#984D95] font-semibold text-base uppercase mb-4">
                  Affiliated Hospitals
                </h3>

                <div className="flex flex-wrap gap-3 max-w-[500px]">
                  {LOCATIONS.map((loc) => {
                    const isActive = selectedLocation.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc)}
                        className={[
                          "px-3 py-2 rounded-[25px] text-sm inline-flex items-center gap-3 transition-all duration-300",
                          isActive
                            ? "bg-gradient-to-r from-[#984D95] to-[#D39CC0] text-white shadow-lg"
                            : "bg-[#EEEEEE] text-[#2b2b2b] hover:bg-gradient-to-r hover:from-[#984D95] hover:to-[#D39CC0] hover:text-white",
                        ].join(" ")}
                        aria-pressed={isActive}
                        aria-label={`Show ${loc.label} on map`}
                      >
                        {loc.label}
                        <img src="/arrow.svg" alt="" className="w-3 h-3" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <Card className="w-full lg:w-[755px] md:w-full sm:w-full h-[300px] lg:h-[600px] md:h-[400px] sm:h-[300px] bg-white rounded-[20px] lg:rounded-[30px] md:rounded-[25px] sm:rounded-[20px] relative shadow-lg">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full rounded-[20px] lg:rounded-[30px] md:rounded-[25px] sm:rounded-[20px] overflow-hidden relative">
                  {/* Map Image */}
                  <iframe
                    title={`Map - ${selectedLocation.label}`}
                    src={selectedLocation.embedUrl}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Operating Hours Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#F5F5F5] rounded-b-[20px] lg:rounded-b-[30px] md:rounded-b-[25px] sm:rounded-b-[20px] px-3 lg:px-6 md:px-4 sm:px-3 py-5 lg:py-10 md:py-7 sm:py-5 flex flex-col lg:flex-row text-left gap-3 lg:gap-1 md:gap-3 sm:gap-4">
                    <div className="text-left lg:text-left">
                      <div className="text-[#747474]">
                        <p className="font-inter font-light text-xs lg:text-sm md:text-xs sm:text-xs">
                          Monday to Saturday
                        </p>
                      </div>
                      <div className="text-[#1E1E1E] mt-[5px]">
                        <p className="font-inter font-light text-xs lg:text-sm md:text-xs sm:text-xs">
                          3:00 pm - 6:00 pm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button
            asChild
            className="ml-[100px] -mt-4 inline-flex items-center gap-[11px] pl-3 pr-1.5 py-1.5 relative overflow-hidden group rounded-[50px] bg-[#2b2b2b] transition-all duration-300"
          >
            <a
              href={selectedLocation.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Directions to ${selectedLocation.label}`}
            >
              <div className="absolute inset-0 w-full bg-[#2b2b2b]" />
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
              <span className="font-inter font-light text-[#F5F5F5] text-base group-hover:text-white transition-colors duration-300 relative z-10">
                Get Directions
              </span>
              <div className="p-2 bg-white rounded-[50px] relative z-10">
                <img src="/arrow.svg" alt="Frame" className="w-3 h-3" />
              </div>
            </a>
          </Button>
        </section>

        {/* Footer - Responsive */}
        {/* Footer - Image only with overlayed button */}
        <footer className="mt-[400px] w-full px-4 lg:px-8">
          <div className="max-w-[1900px] mx-auto">
            <Card className="relative rounded-[30px] shadow-lg overflow-hidden">
              {/* Full-bleed image (replace with your uploaded filename) */}
              <img
                src="/Footer-mob.png" // <-- swap to your new image path if different
                alt="Footer"
                className="w-[390px] h-[490px] sm:h-[420px] lg:h-[520px] object-cover"
              />

              {/* Overlay button centered (sits ON TOP of the image) */}
              <div className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-10">
                <Button
                  asChild
                  className="mb-[43px] inline-flex items-center gap-2 px-2 pr-1 py-6 rounded-[50px] bg-[#2B2B2B] relative overflow-hidden group z-10"
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book WhatsApp appointment"
                  >
                    <div className="absolute inset-0 w-full bg-[#2B2B2B]" />
                    <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
                    <span className="font-inter font-light text-[#F5F5F5] text-[20px] group-hover:text-white transition-colors duration-300 relative z-10">
                      Book Appointment
                    </span>
                    <div className="p-3 bg-[#FFFFFF] group-hover:bg-white rounded-full transition-all duration-300 relative z-10 ml-[1px]">
                      <img src="/arrow.svg" alt="Frame" className="w-3 h-3" />
                    </div>
                  </a>
                </Button>
              </div>
            </Card>

            {/* Copyright (optional) */}
          </div>
        </footer>
      </div>
    </div>
  );
};
