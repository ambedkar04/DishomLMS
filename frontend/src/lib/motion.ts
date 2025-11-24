// Placeholder motion.ts for framer-motion helpers
import type { Variants, Transition } from "framer-motion";

export function staggerContainer(
  delayChildren = 0.1,
  staggerChildren = 0.1
): Variants {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };
}

type Direction = "up" | "down" | "left" | "right";
type Timing = Transition["type"]; // e.g., 'tween' | 'spring'

export function fadeIn(
  direction: Direction = "up",
  type: Timing = "tween",
  delay = 0,
  duration = 0.5
): Variants {
  const distance = 40;

  const offset = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }[direction];

  return {
    hidden: {
      opacity: 0,
      ...offset,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
}
