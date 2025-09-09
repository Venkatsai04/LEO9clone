import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const textRef = useRef();
  const videoRef = useRef();
  const sectionRef = useRef();
  const clientsRef = useRef();
  const logoSliderRef = useRef();
  const mobileLogoSliderRef = useRef();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Desktop - keep existing animation
        "(min-width: 768px)": () => {
          gsap.fromTo(
            textRef.current,
            { y: 0 },
            {
              y: -50,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        },
        // Mobile - new animations
        "(max-width: 767px)": () => {
          // Pin the video during scroll
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom center",
            pin: videoRef.current,
            pinSpacing: false,
          });

          // Text fade up animation
          gsap.set(textRef.current, {
            y: 100,
            opacity: 0,
          });

          gsap.to(textRef.current, {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "center center",
              scrub: 1,
            },
          });

          // Move text to left as scroll continues
          gsap.to(textRef.current, {
            x: -50,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "center center",
              end: "bottom top",
              scrub: 1,
            },
          });
        },
      },
      sectionRef.current
    );

    // Client logos animation - smooth continuous movement
    const mm2 = gsap.matchMedia();

    // Animation for large screens (within hero viewport)
    mm2.add("(min-width: 1024px)", () => {
      if (logoSliderRef.current) {
        const logoSlider = logoSliderRef.current;
        const logoWidth = logoSlider.scrollWidth / 2;

        gsap.set(logoSlider, { x: 0 });

        gsap.to(logoSlider, {
          x: -logoWidth,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
    });

    // Animation for smaller screens (separate section)
    mm2.add("(max-width: 1023px)", () => {
      if (mobileLogoSliderRef.current) {
        const mobileLogoSlider = mobileLogoSliderRef.current;
        const logoWidth = mobileLogoSlider.scrollWidth / 2;

        gsap.set(mobileLogoSlider, { x: 0 });

        gsap.to(mobileLogoSlider, {
          x: -logoWidth,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
    });

    return () => {
      mm.revert();
      mm2.revert();
    };
  }, []);

  // Client logos data
  const clientLogos = [
    { src: "logo-light.svg", alt: "Client 1" },
    { src: "logo-light.svg", alt: "Client 2" },
    { src: "logo-light.svg", alt: "Client 3" },
    { src: "logo-light.svg", alt: "Client 4" },
    { src: "logo-light.svg", alt: "Client 5" },
    { src: "logo-light.svg", alt: "Client 6" },
    { src: "logo-light.svg", alt: "Client 7" },
    { src: "logo-light.svg", alt: "Client 8" },
    { src: "logo-light.svg", alt: "Client 9" },
    { src: "logo-light.svg", alt: "Client 10" },
    { src: "logo-light.svg", alt: "Client 11" },
    { src: "logo-light.svg", alt: "Client 12" },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full min-h-screen flex flex-col md:flex-row items-center justify-evenly bg-gray-50 px-6 md:px-20 relative"
      >
        {/* Video */}
        <div
          ref={videoRef}
          className="flex justify-center items-center w-full md:w-auto min-h-[60vh] md:min-h-0 mt-8 md:mt-0 max-sm:min-h-screen max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:z-10 z-0"
        >
          <video
            src="/hero-animation.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="max-w-sm md:max-w-md rounded-2xl -z-0"
          />
        </div>

        {/* Text */}
        <div
          ref={textRef}
          className="bg-white flex flex-col items-center justify-center md:items-start text-left md:text-left mt-8 md:mt-0 w-full md:w-auto px-4 md:px-0 z-50 max-sm:relative max-sm:top-[60vh]"
        >
          <h1 className="w-full text-[60px] md:text-[100px] font-bold leading-[1.1] md:leading-[0.95] flex flex-col space-y-[-10px] md:space-y-3">
            <span>Design</span>
            <span>Transform</span>
            <span>Accelerate</span>
          </h1>
          <p className="w-full md:w-[30vw] font-medium text-2xl mt-6">
            Redefining user experiences through Behavioural Science & AI
          </p>

          {/* Clients Section -medium and small screens */}
          <section
            ref={clientsRef}
            className="w-full py-16 md:py-24 bg-white overflow-hidden block lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16">
                <div className="mb-4 md:mb-0">
                  <p className="text-l md:text-xl font-medium text-left text-gray-900">
                    <strong>Your trusted UI UX design agency.</strong>
                  </p>
                </div>



                {/* Logo Slider for Medium/Small Screens */}
                <div className="w-full md:w-2/3 overflow-hidden mb-[120px]">
                  <div
                    ref={mobileLogoSliderRef}
                    className="flex items-center gap-8 md:gap-12"
                    style={{ width: 'fit-content' }}
                  >
                    {/* First set of logos */}
                    {clientLogos.map((logo, index) => (
                      <div
                        key={`mobile-first-${index}`}
                        className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {clientLogos.map((logo, index) => (
                      <div
                        key={`mobile-second-${index}`}
                        className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Clients Section -  large screens*/}
        <div className="absolute bottom-8 left-0 right-0 hidden lg:block z-40">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <p className="text-lg font-light text-gray-900">
                  <strong>Your trusted UI UX design agency.</strong>
                </p>
              </div>

              

              {/* Logo Slider for Large Screens */}
              <div className="flex-1 ml-12 overflow-hidden">
                <div
                  ref={logoSliderRef}
                  className="flex items-center gap-12"
                  style={{ width: 'fit-content' }}
                >
                  {/* First set of logos */}
                  {clientLogos.map((logo, index) => (
                    <div
                      key={`lg-first-${index}`}
                      className="flex-shrink-0 w-20 h-20 flex items-center justify-center"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {clientLogos.map((logo, index) => (
                    <div
                      key={`lg-second-${index}`}
                      className="flex-shrink-0 w-20 h-20 flex items-center justify-center"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default Hero;