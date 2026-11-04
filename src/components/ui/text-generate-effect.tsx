"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  textClassName,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  textClassName?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!isInView) return;

    animate(
      "span",
      {
        opacity: 1,
        filter: filter && !prefersReducedMotion ? "blur(0px)" : "none",
      },
      {
        duration: prefersReducedMotion ? 0 : duration || 1,
        delay: prefersReducedMotion ? 0 : stagger(0.12),
      }
    );
  }, [animate, duration, filter, isInView, prefersReducedMotion]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="opacity-0"
            style={{
              filter: filter && !prefersReducedMotion ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className={cn("text-2xl leading-snug tracking-wide text-foreground", textClassName)}>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
