"use client";

import React from "react";
import Image from "next/image";
import Button from "../ui/Buttons";

interface HeroSecProps {
  title: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  centered?: boolean;
  children?: React.ReactNode;
  userAvatar?: React.ReactNode;
}

const HeroSec: React.FC<HeroSecProps> = ({
  title,
  subtitle,
  description,
  buttonLabel,
  onButtonClick,
  centered = false,
  children,
  userAvatar,
}) => {
  return (
    <section className={`relative px-12 min-h-[80vh] h-[80vh] flex flex-col justify-center text-white bg-transparent ${centered ? 'items-center' : ''}`}>
      {/* User Avatar in top right */}
      {userAvatar && (
        <div className="absolute top-8 right-12">
          {userAvatar}
        </div>
      )}
      {/* Text Container */}
      <div className={`max-w-5xl ${centered ? 'text-center flex flex-col items-center' : ''}`}>
        {/* Logo / Tagline */}
        {subtitle && (
          subtitle.toLowerCase() === "aplite" ? (
            <div className="mb-4">
              <Image 
                src="/brand/Aplite-logo.svg"
                alt="Aplite Logo" 
                width={120} 
                height={32}
                className="h-8 w-auto"
                priority
                unoptimized
              />
            </div>
          ) : (
            <p className="text-lg md:text-2xl font-semibold mb-4 text-white/80">
              {subtitle}
            </p>
          )
        )}

        {/* Main Title */}
        <h1 className="text-5xl md:text-8xl font-light leading-tight tracking-tight mb-6">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-lg md:text-2xl text-white max-w-3xl mb-10">
            {description}
          </p>
        )}

        {/* Custom Content (e.g., search input) */}
        {children && (
          <div className="w-full max-w-lg mb-6">
            {children}
          </div>
        )}

        {/* Button */}
        {buttonLabel && (
          <Button
            label={buttonLabel}
            onClick={onButtonClick}
            variant="primary"
            size="lg"
          />
        )}
      </div>
    </section>
  );
};

export default HeroSec;