import { Link } from "wouter";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none"
    >
      <Link href="/" className="pointer-events-auto">
        <span className="text-xl font-bold tracking-tight text-white mix-blend-difference font-display cursor-pointer">
          AR<span className="text-accent">.</span>
        </span>
      </Link>

      <nav className="pointer-events-auto">
        <ul className="flex gap-8">
          {["Work", "About", "Contact"].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors uppercase tracking-widest relative group mix-blend-difference"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
