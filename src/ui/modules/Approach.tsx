import { PortableText } from "@portabletext/react";
import ApproachCard from "../ApproachCard";

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
      <div className="approach-container grid grid-cols-4 gap-10 mt-10">
        {steps &&
          steps.map((step: any, index: number) => {
            const delay = 50 * (index + 1); // Increment delay for each step
            return (
              <div
                key={step._key}
                className="animation-container"
                data-animate="fade-in"
                data-animate-delay={delay}
              >
                <ApproachCard
                  title={step.title}
                  description={step.description}
                />
              </div>
            );
          })}
      </div>
    </section>
  );
}
