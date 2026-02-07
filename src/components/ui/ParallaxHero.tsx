import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "./utils";

interface ParallaxHeroProps {
  image: string;
  className?: string;
  height?: string; // e.g. "h-[80vh]"
  children?: React.ReactNode;
  overlay?: boolean; // Add a dark overlay?
}

export function ParallaxHero({ 
  image, 
  className, 
  height = "h-[60vh] md:h-[80vh]", 
  children,
  overlay = false
}: ParallaxHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Moves the image down slightly slower than scroll (parallax effect)
  // We start at 0% and move to 30% positive Y (downwards)
  // Since the container scrolls up, the image moving down appears to stay in place or move slower.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden bg-gray-100", height, className)}>
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center"
        style={{ y, backgroundImage: `url(${image})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }} // We combine initial scale anim with scroll scale? 
        // Wait, motion handles multiple transforms. But we need to be careful.
        // We can use style={{ y, scale }} but then the initial animation might conflict if not handled.
        // Let's just use y for parallax and ignore scale on scroll for now to preserve the initial zoom-out effect.
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-black/20" />
      )}

      {children && (
        <div className="relative z-10 h-full w-full pointer-events-none">
            {/* Enable pointer events for children if needed, but usually hero text is overlay */}
            <div className="pointer-events-auto h-full">
                {children}
            </div>
        </div>
      )}
    </div>
  );
}
