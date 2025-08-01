import { ChevronRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import React from "react";
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
    description: "We are here for",
  },
  {
    title: "Laparoscopic Surgery",
    description: "We are here for",
  },
  {
    title: "Infertility: IUI & IVF",
    description: "We are here for",
  },
  {
    title: "Cosmetic Gynaecology & Vaginal Aesthetics",
    description: "We are here for",
    multiline: true,
  },
  {
    title: "Arvati-ThermiVa",
    description: "We are here for",
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
  const [activeNav, setActiveNav] = React.useState("Home");

  return (
    <div className="bg-[#FFFFFF] flex flex-row justify-center w-full font-inter">
      <div className="bg-[#FFFFFF] w-full max-w-[1440px] relative">
        {/* Fixed Navigation */}
        <header className="fixed top-[30px] left-0 right-0 z-50 flex justify-center">
          <div className="flex w-[200px] h-[50px] items-center justify-center px-4 py-2 bg-[#F5F5F5] rounded-[50px] absolute left-16">
            <img 
              src="/Dr Devki Logo.png" 
              alt="Dr Devki Logo" 
              className="h-[30px] w-auto object-contain"
            />
            <span className="ml-2 font-inter font-normal text-[#2b2b2b] text-base">Dr. Devki Potwar</span>
          </div>

          <NavigationMenu className="h-[55px] px-4 py-5 bg-[#F5F5F5] rounded-[50px] backdrop-blur-[25px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(25px)_brightness(100%)] ml-[50px]">
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

          <Button className="inline-flex h-[53px] items-center gap-[15px] px-5 py-1.5 fixed top-[34px] right-12 rounded-[50px] bg-[#F5F5F5] hover:bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] group transition-all duration-300">
            <span className="font-inter font-thin text-[#2b2b2b] text-base group-hover:text-white transition-colors duration-300">
              Contact Us
            </span>
            <div className="p-2.5 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] group-hover:bg-none group-hover:bg-white transition-all duration-300">
            <PhoneIcon className="w-4 h-4 fill-white group-hover:fill-[#984D95] transition-all duration-300" />
            </div>
          </Button>

        </header>

        {/* Hero Section */}
        <section className="pt-[100px] px-16 pb-20 flex relative overflow-hidden">
          {/* Large gradient spot behind image grid */}
          <div className="absolute top-[30%] right-[-20%] w-[1100px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(211,156,192,0.3)_0%,rgba(152,77,149,0.2)_40%,transparent_80%)] blur-xl pointer-events-none" />
          
          <div className="w-[50%] flex flex-col justify-center relative">
            {/* Text gradient spots */}
            <div className="absolute bottom-[-10%] left-[-40%] w-[900px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(211,156,192,0.3)_0%,rgba(152,77,149,0.2)_40%,transparent_80%)] blur-xl pointer-events-none" />
            
            <h1 className="text-[58px] leading-[64px] font-inter font-semibold text-[#2b2b2b] relative z-10">
              Just your gyneac,<br/>gone digital
            </h1>
            <p className="w-[559px] mt-6 font-inter font-light text-[#747474] text-base leading-relaxed relative z-10">
              Keep scrolling to know how I can help you.
            </p>
            <Button className="mt-8 w-fit pl-6 pr-2 py-2 relative overflow-hidden group rounded-[50px] transition-all duration-300">
              <div className="absolute inset-0 w-full bg-[#2B2B2B]" />
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)] transition-all duration-300 ease-in-out group-hover:w-full" />
              <span className="font-inter font-light text-[#F5F5F5] text-base group-hover:text-white transition-colors duration-300 relative z-10">
                Book Appointment
              </span>
              <div className="p-1.5 bg-[#FFFFFF] group-hover:bg-white rounded-full transition-all duration-300 relative z-10 ml-[11px]">
                <img src="/arrow.svg" alt="Frame" className="w-3 h-3" />
              </div>
            </Button>
          </div>
          
          {/* Hero Images Grid */}
          <div className="w-[50%] relative h-[850px] overflow-visible z-10">
            {/* Animated HeroLine */}
            <img 
              src="/HeroLine.png" 
              alt="Decorative line" 
              className="absolute top-[28%] right-[-10%] w-[1000px] h-[600px] z-0 opacity-100 animate-slide-in"
            />
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
              src="public/Page2Line(left).svg" 
              alt="Left line" 
              className="absolute left-[-70px] top-20 h-[300px] w-[800px] object-cover"
            />
            <img 
              src="public/Page2Line(right).svg" 
              alt="Right line" 
              className="absolute right-[-70px] bottom-10 h-[300px] w-[800px] object-cover"
            />
          </div>
          
          <Card className="w-full h-[660px] bg-[#D6A0C229] rounded-[30px] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-[25px] backdrop-saturate-150">
            {/* Icons */}
            <div className="flex gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] flex items-center justify-center">
                <img src="public/phone.svg" alt="Phone" className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] flex items-center justify-center">
                <img src="public/message.svg" alt="Message" className="w-5 h-5" />
              </div>
            </div>

            <CardContent className="w-[969px] text-center">
              <div className="animate-fade-in-out">
                <p className="text-[38px] leading-[48px] font-inter font-bold text-[#2b2b2b]">
                  I created Potwar clinic out of a simple <br/> idea: that <span className="bg-clip-text text-transparent bg-gradient-to-r from-[rgba(152,77,149,1)] to-[rgba(211,156,192,1)]">women deserve care</span> that feels personal, safe, and never rushed.
                </p>
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
            {services.map((service, index) => (
              <div key={index} className="w-full h-[328px] flex justify-center">
                <Card className="w-[644px] h-[328px] bg-[#d6a0c2] rounded-[50px] flex flex-col items-center justify-center text-center">
                  <CardContent className="flex flex-col items-center justify-center">
                    <p className="w-[429px] font-inter font-light text-[#ffffffb2] text-xl">
                      {service.description}
                    </p>
                    <h3
                      className={`font-inter font-semibold text-white text-5xl mt-1 ${service.multiline ? "leading-[52px]" : "leading-normal"}`}
                    >
                      {service.title}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-16 py-10">
          <h2 className="w-[969px] mx-auto text-[42px] text-center leading-[52px] font-inter font-normal text-[#2b2b2b] mb-12">
            Trusted By People
          </h2>

          <Card className="w-full h-[577px] bg-[#f5eeed] rounded-[50px] relative">
            <CardContent className="p-0">
              <div className="absolute top-[238px] left-[34px] bg-[#eedae6] w-3.5 h-3.5 rounded-[7px] rotate-[177.50deg]" />
              <div className="absolute top-[260px] left-[34px] bg-[#eedae6] w-3.5 h-3.5 rounded-[7px] rotate-[177.50deg]" />
              <div className="absolute top-[282px] left-[34px] bg-[#eedae6] w-3.5 h-3.5 rounded-[7px] rotate-[177.50deg]" />
              <div className="absolute top-[304px] left-[34px] bg-[#eedae6] w-3.5 h-3.5 rounded-[7px] rotate-[177.50deg]" />
              <div className="absolute top-[326px] left-[33px] bg-[#964a94] w-3.5 h-3.5 rounded-[7px] rotate-[177.50deg]" />

              <div className="absolute w-[768px] h-[485px] top-[46px] right-16 bg-gray-300 rounded-[50px]" />
            </CardContent>
          </Card>
        </section>

        {/* Gallery Section */}
        <section className="px-16 py-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[42px] leading-[50px] font-inter font-normal text-[#2b2b2b]">
              Lorem ipsum dolor sit amet consectetur. Sit semper phasellus
            </h2>

            <Button variant="ghost" className="flex items-center gap-3">
              <span className="font-inter font-light text-black text-base">
                Explore All
              </span>
              <ChevronRightIcon className="w-[11.5px] h-[11.5px]" />
            </Button>
          </div>

          <div className="mt-4">
            <p className="w-[475px] ml-auto font-inter font-light text-[#747474] text-lg leading-6 mb-4">
              Lorem ipsum dolor sit amet consectetur. Proin erat nullam semper
              faucibus et pharetra. Hendrerit maecenas Lorem ipsum dolor sit
              amet.
            </p>

            <Button className="ml-auto block pl-3 pr-1.5 py-1.5 bg-[#2b2b2b] rounded-[50px] flex items-center gap-[11px] hover:bg-[#3a3a3a] transition-colors">
              <span className="font-inter font-normal text-white text-base">
                Book Appointment
              </span>
              <div className="p-2.5 bg-white rounded-[50px]">
                <ChevronRightIcon className="w-[11.5px] h-[11.5px]" />
              </div>
            </Button>
          </div>

          <div className="relative w-full h-[971px] mt-10">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className={`absolute bg-gray-300 rounded-[50px] ${item.className}`}
              />
            ))}

            <Button
              variant="outline"
              className="inline-flex items-center gap-[11px] pl-1.5 pr-3.5 py-1.5 absolute top-[378px] left-12 bg-white rounded-[50px] hover:bg-gray-50 transition-colors"
            >
              <img className="w-[30px] h-[30px]" alt="Frame" src="/frame.svg" />
              <span className="font-inter font-light text-black text-base">
                Leave us a review
              </span>
              <ChevronRightIcon className="w-[11.5px] h-[11.5px]" />
            </Button>
          </div>
        </section>

        {/* Location Section */}
        <section className="w-full h-[840px] bg-[#f5eeed] mt-16">
          <div className="h-[125px] bg-[#e8e8e8] w-full" />

          <div className="px-16 py-16 flex justify-between">
            <div className="max-w-[475px]">
              <h2 className="text-[42px] leading-[50px] font-inter font-normal text-[#2b2b2b]">
                Lorem ipsum dolor sit amet
              </h2>
              <p className="mt-6 font-inter font-light text-[#747474] text-lg leading-6">
                Lorem ipsum dolor sit amet consectetur. Proin erat nullam semper
                faucibus et pharetra. Hendrerit maecenas Lorem ipsum dolor sit
                amet.
              </p>
            </div>

            <Card className="w-[755px] h-[578px] bg-white rounded-[50px] relative">
              <CardContent className="p-0">
                <Button className="inline-flex items-center gap-[11px] pl-3 pr-1.5 py-1.5 absolute bottom-6 right-6 bg-[#2b2b2b] rounded-[50px] hover:bg-[#3a3a3a] transition-colors">
                  <span className="font-inter font-normal text-white text-base">
                    Get Directions
                  </span>
                  <div className="p-2.5 bg-white rounded-[50px]">
                    <ChevronRightIcon className="w-[11.5px] h-[11.5px]" />
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-16 py-10">
          <h2 className="text-[42px] leading-[50px] font-inter font-normal text-[#2b2b2b]">
            Dr. Devki Potwar
          </h2>

          <div className="mt-6">
            <p className="w-[434px] font-inter font-light text-[#747474] text-lg leading-6">
              Address: Om Chambers, Room No. 208, Second Floor, 123, August
              Kranti Maidan, Kemps Corner, Mumbai - 400 026.
            </p>

            <div className="flex mt-6 items-center">
              <Button className="inline-flex items-center gap-[11px] pl-3 pr-1.5 py-1.5 bg-[#2b2b2b] rounded-[50px] hover:bg-[#3a3a3a] transition-colors">
                <span className="font-inter font-normal text-white text-base">
                  Book Appointment
                </span>
                <div className="p-2.5 bg-white rounded-[50px]">
                  <ChevronRightIcon className="w-[11.5px] h-[11.5px]" />
                </div>
              </Button>

              <div className="flex items-center ml-16">
                <Button
                  variant="ghost"
                  className="rounded-[50px] p-2.5 bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] opacity-70 hover:opacity-90 transition-opacity"
                >
                  <PhoneIcon className="w-4 h-4 text-white" />
                </Button>
                <span className="ml-8 font-inter font-normal text-[#747474] text-lg">
                  + 91-9833646316
                </span>
              </div>

              <Separator orientation="vertical" className="h-[51px] mx-8" />

              <div className="flex flex-col">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    className="rounded-[50px] p-2.5 bg-[linear-gradient(90deg,rgba(152,77,149,1)_0%,rgba(211,156,192,1)_100%)] opacity-70 hover:opacity-90 transition-opacity"
                  >
                    <MailIcon className="w-4 h-4 text-white" />
                  </Button>
                  <span className="ml-8 font-inter font-light text-[#747474] text-lg">
                    devkidesai@gmail.com
                  </span>
                </div>
                <span className="ml-16 font-inter font-light text-[#747474] text-lg">
                  potwarclinic@gmail.com
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="font-inter font-light text-black text-sm leading-6">
              2025 by Dr. Devki Potwar powerd and secured by Regis Digital
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
