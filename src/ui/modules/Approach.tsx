import { PortableText } from "@portabletext/react";
import ApproachCard from "../ApproachCard";
import { Swiper, SwiperSlide } from "swiper/react";

interface SpacingSettings {
  paddingTop?: number; // Optional paddingTop property
  paddingBottom?: number; // Optional paddingBottom property
}

export default function Approach({
  spacingSettings,
  introText,
  steps,
}: Partial<{
  spacingSettings: SpacingSettings;
  introText: any;
  steps: any;
}>) {
  return (
    <section
      className="approach-module container-xl-width"
      style={{
        paddingTop: spacingSettings?.paddingTop || 0,
        paddingBottom: spacingSettings?.paddingBottom || 0,
      }}
    >
      <div
        className="intro-text max-w-xl"
        data-animate="fade-up"
        data-animation-delay="150"
      >
        {introText && <PortableText value={introText} />}
      </div>
      <div className="approach-container mt-10">
        <Swiper
          spaceBetween={16}
          slidesPerView={3}
          breakpoints={{
            960: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1.4,
            },
          }}
        >
          {steps &&
            steps.map((step: any, index: number) => {
              const delay = 100 * (index + 1); // Increment delay for each step
              return (
                    
                    <SwiperSlide key={step._key}>
                  <div
                    className="animation-container"
                    data-animate="fade-in"
                    data-animate-delay={delay}
                  >
                    <ApproachCard
                      title={step.title}
                      description={step.description}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
}
