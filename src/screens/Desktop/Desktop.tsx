import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import React, { useState } from "react";
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

// Define gallery grid items
const galleryItems = [
  { className: "w-[417px] h-[310px] top-[89px] left-[-53px]" },
  { className: "w-[301px] h-[310px] top-[477px] left-[5px]" },
  { className: "w-[322px] h-[310px] top-[89px] left-[328px]" },
  { className: "w-[417px] h-[310px] top-[491px] left-[281px]" },
  { className: "w-[417px] h-[310px] top-[251px] left-[614px]" },
  { className: "w-[325px] h-[310px] top-[654px] left-[661px]" },
  { className: "w-[417px] h-[310px] top-[54px] left-[947px]" },
  { className: "w-[345px] h-[310px] top-[467px] left-[981px]" },
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

export const Desktop = (): JSX.Element => {
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeNav, setActiveNav] = React.useState("Home");

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
              src="/Dr Devki Logo.png"
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
                    onClick={() => setActiveNav(item.label)}
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
        <section className="pt-[100px] px-16 pb-20 flex relative overflow-hidden">
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
              Just your gyneac,
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
              viewBox="0 0 1440 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[-10%] right-[-10%] w-[1000px] h-[600px] z-0"
            >
              <path
                d="/HeroLine.svg" // replace with your actual path
                stroke="#984D95"
                strokeWidth="3"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className="animate-stroke-draw"
              />
            </svg>

            <div className="absolute right-0 flex gap-6 z-10">
              {/* First Column */}
              <div className="flex flex-col gap-6 mt-[50px]">
                <div className="w-[300px] h-[430px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/FirstCol(1).jpg"
                    alt="Clinic Interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-[300px] h-[430px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/FirstCol(2).jpg"
                    alt="Clinic Consultation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Second Column */}
              <div className="flex flex-col gap-6 -mt-[465px]">
                <div className="w-[312px] h-[414px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/SecondCol(1).jpg"
                    alt="Medical Equipment"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-[312px] h-[415px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/SecondCol(2).jpg"
                    alt="Clinic Reception"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-[312px] h-[414px] bg-gray-100 rounded-[30px] overflow-hidden shadow-lg">
                  <img
                    src="/SecondCol(3).jpg"
                    alt="Clinic Reception"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="mx-16 my-16 relative z-0">
          {/* Background lines */}
          <div className="absolute inset-0 overflow-visible">
            <img
              src="/Page2line(left).svg"
              alt="Left line"
              className="absolute left-[-70px] top-20 h-[300px] w-[800px] object-cover"
            />
            <img
              src="/Page2line(right).svg"
              alt="Right line"
              className="absolute right-[-70px] bottom-10 h-[300px] w-[800px] object-cover"
            />
          </div>

          <Card className="w-full h-[660px] bg-[#D6A0C229] rounded-[30px] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-[25px] backdrop-saturate-150">
            <CardContent className="w-[969px] text-center">
              {/* Icons */}
              <div className="icons-animation icons-fade-out">
                <div className="flex gap-4 mb-8 justify-center">
                  <div className="w-12 h-12 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] flex items-center justify-center">
                    <img src="/phone.svg" alt="Phone" className="w-5 h-5" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] flex items-center justify-center">
                    <img src="/message.svg" alt="Message" className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Content container with relative positioning */}
              <div className="relative">
                {/* First slide - "I created Potwar clinic out of a simple <br/> " */}
                <div className="quote-animation-1 quote-fade-out-1 absolute inset-0 flex items-center justify-center">
                  <p className="text-[38px] leading-[48px] font-inter font-bold text-[#2b2b2b]">
                    I created Potwar clinic out of a simple <br />
                  </p>
                </div>

                {/* Second slide - "idea: that women deserve care that feels " */}
                <div className="quote-animation-2 quote-fade-out-2 absolute inset-0 flex items-center justify-center">
                  <p className="text-[38px] leading-[48px] font-inter font-bold text-[#2b2b2b]">
                    idea: that{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)]">
                      women deserve care
                    </span>{" "}
                    that feels
                  </p>
                </div>

                {/* Third slide - "personal, safe, and never rushed." */}
                <div className="quote-animation-3 quote-fade-out-3 absolute inset-0 flex items-center justify-center">
                  <p className="text-[38px] leading-[48px] font-inter font-bold text-[#2b2b2b]">
                    personal, safe, and never rushed.
                  </p>
                </div>

                {/* Stage 4: "Hi, I am Dr. Devki" as one block */}
                <div className="quote-animation-4 absolute inset-0 flex items-center justify-center">
                  <p className="text-[38px] leading-[48px] font-inter font-bold text-[#2b2b2b]">
                    Hi, I am Dr. Devki
                  </p>
                </div>

                {/* Final layout - The SAME text splits into left, center, right */}
                <div className="quote-animation-5 quote-animation-6 quote-animation-7 flex justify-center items-center gap-8">
                  {/* Left text - SAME text as above */}
                  <div>
                    <p className="text-[38px] leading-[48px] font-inter font-bold text-[#2b2b2b]">
                      Hi, I am
                    </p>
                  </div>

                  {/* Center photo */}
                  <div>
                    <div className="w-[320px] h-[400px] bg-gray-200 rounded-[20px] overflow-hidden">
                      <img
                        src="/DrDevki.svg"
                        alt="Dr. Devki Potwar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right text - SAME text as above */}
                  <div>
                    <p className="text-[38px] leading-[48px] font-inter font-bold text-[#2b2b2b]">
                      Dr. Devki
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Services Section */}
        <section className="px-16 py-10">
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
                      <div className="flex items-center gap-8 w-full justify-center">
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
                          <p className="text-[#5C5C5C] text-lg leading-tight font-light whitespace-pre-line">
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
        <section className="pt-[100px] px-16 pb-20 flex relative overflow-hidden">
          {/* Background lines */}
          <div className="absolute inset-0 overflow-visible pointer-events-none">
            <img
              src="public/Galleryline.svg"
              alt="Background line"
              className="absolute top-[70%] left-[0px] transform -translate-y-1/2 h-[270px] w-[1100px] object-cover"
            />
          </div>

          <Card className="w-full h-[630px] bg-[#D6A0C229] rounded-[30px] flex items-center justify-start relative overflow-hidden backdrop-blur-[25px] backdrop-saturate-150 px-16 pt-12 pb-12">
            <CardContent className="p-0 w-full h-full">
              <div className="flex flex-row w-full h-full gap-10">
                {/* LEFT SIDE - Text content */}
                <div className="w-[50%] max-w-[600px] relative z-10 ml-4 flex flex-col justify-center mt-[-100px]">
                  <h1 className="text-[44px] leading-[64px] font-inter font-semibold text-[#2b2b2b] mb-4">
                    Gallery
                  </h1>
                  <p className="font-inter font-light text-[#747474] text-base leading-relaxed mb-5">
                    Lorem ipsum dolor sit amet <br /> consectetur. Proin erat
                    nullam <br />
                    semper faucibus
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

                {/* RIGHT SIDE - Image gallery */}
                <div className="w-full overflow-x-auto scrollbar-hide ml-[-100px] mt-14 pr-8">
                  <div className="flex gap-6 w-max">
                    {[1, 2, 3].map((group) => (
                      <div
                        key={group}
                        className="flex flex-col sm:flex-row gap-6 min-w-[640px] snap-start"
                      >
                        {/* Large Image */}
                        <div className="w-[330px] h-[440px] bg-gray-300 rounded-2xl overflow-hidden">
                          <img
                            src="/Gallerylarge(1).svg"
                            alt="Clinic Big1"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Two stacked small images */}
                        <div className="flex flex-col gap-6">
                          <div className="w-[350px] h-[205px] bg-gray-200 rounded-2xl overflow-hidden">
                            <img
                              src="/Gallerysmall(1).svg"
                              alt="Clinic small1"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-[350px] h-[205px] bg-gray-200 rounded-2xl overflow-hidden">
                            <img
                              src="/Gallerysmall(2).svg"
                              alt="Clinic small2"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="px-16 py-[-500px] bg-white">
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
                  src="/Testimonial(3).svg"
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
                  src="/Testimonial(7).svg"
                  alt="Column 4 Row 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 5. Sonali Bansode */}
              <div className="rounded-[50px] overflow-hidden shadow-sm w-[300px] h-[300px] mt-[-190px] ml-[-24px]">
                <img
                  src="/Testimonial(2).svg"
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
        <section className="w-full h-[840px] bg-[#FFFFFF] mt-10">
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
                    <Button className="inline-flex items-center gap-[11px] pl-3 pr-1.5 py-1.5 bg-[#2b2b2b] rounded-[50px] hover:bg-[#3a3a3a] transition-colors">
                      <span className="font-inter font-light text-white text-base">
                        Get Directions
                      </span>
                      <div className="p-2 bg-white rounded-[50px]">
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
        <footer className="w-full px-16 py-16">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-white rounded-[30px] shadow-lg overflow-hidden relative">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="/Footer.svg"
                  alt="Footer Background"
                  className="w-full h-full object-cover"
                />
              </div>

              <CardContent className="p-12 relative z-10">
                <div className="flex items-center justify-between">
                  {/* Address Section */}
                  <div className="flex items-center gap-4 mt-[100px]">
                    <div>
                      <p className="text-[#747474] font-inter font-light text-base leading-6 max-w-xs">
                        Address:Om Chambers, Room No. 208, Second Floor, 123,
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
                  <div className="w-px h-16 bg-gray-300 mx-8"></div>

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
                  <div className="w-px h-16 bg-gray-300 mx-8"></div>

                  {/* Email Section */}
                  <div className="flex items-center gap-4">
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
