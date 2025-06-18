"use client";
import { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import { motion, useAnimation, useInView } from "framer-motion";

interface MultiDirectionSlideProps {
  textLeft?: string;
  textRight?: string;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
}

export const MultiDirectionSlide: React.FC<MultiDirectionSlideProps> = ({
  textLeft = "",
  textRight = "",
  className = "",
  leftClassName = "",
  rightClassName = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();

  useEffect(() => {
    if (isInView) {
      controlsLeft.start("visible");
      controlsRight.start("visible");
    } else {
      controlsLeft.start("hidden");
      controlsRight.start("right");
    }
  }, [isInView, controlsLeft, controlsRight]);

  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };

  return (
    <div className={clsx("overflow-hidden", className)} ref={ref}>
      <motion.h1
        initial="hidden"
        animate={controlsLeft}
        variants={MULTIDIRECTION_SLIDE_VARIANTS}
        transition={{ duration: 1 }}
        className={clsx(
          "text-center font-display font-bold drop-shadow-sm",
          "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
          "tracking-[-0.02em]",
          "md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]",
          leftClassName
        )}
      >
        {textLeft}
      </motion.h1>

      <motion.h1
        initial="right"
        animate={controlsRight}
        variants={MULTIDIRECTION_SLIDE_VARIANTS}
        transition={{ duration: 1 }}
        className={clsx(
          "text-center font-display font-bold drop-shadow-sm",
          "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
          "tracking-[-0.02em]",
          "md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]",
          rightClassName
        )}
      >
        {textRight}
      </motion.h1>
    </div>
  );
};
