import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const FRAME_COUNT = 90; // 0 to 89

export function ScrollytellingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress for smoother animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Convert scroll progress (0-1) to frame index (0-89)
  const currentFrame = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];

      for (let i = 0; i < FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          // Pad index with leading zeros: 0 -> 00, 5 -> 05
          const paddedIndex = i.toString().padStart(2, "0");
          img.src = `/sequence/frame_${paddedIndex}.webp`;
          img.onload = () => {
            loadedImages[i] = img;
            resolve();
          };
          img.onerror = () => {
            // Placeholder logic if image fails (for development without assets)
            // We just resolve so the app doesn't hang, logic in render handles missing imgs
            resolve();
          };
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFallback = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      progress: number
    ) => {
      // Cool generative placeholder
      const centerX = w / 2;
      const centerY = h / 2;
      const maxRadius = Math.min(w, h) * 0.4;
      
      // Dynamic background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, w);
      gradient.addColorStop(0, `hsla(250, 50%, ${10 + progress * 20}%, 1)`);
      gradient.addColorStop(1, "#121212");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Central orb that pulses/grows with scroll
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * progress, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(0, 0%, 100%, ${0.1 + progress * 0.4})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Orbital rings
      for(let i = 1; i <= 5; i++) {
        const ringProgress = (progress * i * 2) % 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * ringProgress, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(0, 0%, 100%, ${0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Text indicator
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "12px monospace";
      ctx.fillText(`SEQ: ${Math.floor(progress * 100)}%`, 20, h - 20);
    };

    const renderFrame = (index: number) => {
      if (!ctx || !canvas) return;
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(index))
      );

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#121212";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = images[frameIndex];

      if (img && img.complete && img.naturalHeight !== 0) {
        // Calculate "cover" fit
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        ctx.drawImage(
          img,
          x,
          y,
          img.width * scale,
          img.height * scale
        );
      } else {
        // Fallback visual if images are missing (e.g. dev mode)
        drawFallback(ctx, canvas.width, canvas.height, frameIndex / FRAME_COUNT);
      }
    };

    // Handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initial draw to clear/setup
      if (imagesLoaded) {
        renderFrame(currentFrame.get());
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size

    // Animation loop subscription
    const unsubscribe = currentFrame.on("change", (latest) => {
      renderFrame(latest);
    });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, imagesLoaded, currentFrame]);

  // Overlay Content Components
  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover touch-none"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
          <Section opacityRange={[0.05, 0.15, 0.25, 0.35]} progress={scrollYProgress}>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference">
              ANKITA<br/>GAUTAM
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-light tracking-widest text-white/80 uppercase mix-blend-difference">
              Shopify & WordPress Developer
            </p>
          </Section>

          <Section opacityRange={[0.4, 0.5, 0.6, 0.7]} progress={scrollYProgress}>
            <h2 className="text-4xl md:text-7xl font-bold text-center max-w-4xl leading-tight text-white mix-blend-difference">
              Crafting digital<br/>experiences that
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 block mt-2">
                 resonate.
              </span>
            </h2>
          </Section>

          <Section opacityRange={[0.75, 0.8, 0.9, 0.95]} progress={scrollYProgress}>
             <div className="text-center">
                <p className="text-sm font-mono text-white/60 mb-4">PHILOSOPHY</p>
                <h3 className="text-3xl md:text-6xl font-light text-white leading-tight max-w-3xl mix-blend-difference">
                  Where engineering meets<br/>
                  <span className="italic font-serif">artistic intent.</span>
                </h3>
             </div>
          </Section>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

function Section({ 
  children, 
  opacityRange, 
  progress 
}: { 
  children: React.ReactNode, 
  opacityRange: number[], 
  progress: any 
}) {
  const opacity = useTransform(
    progress,
    opacityRange,
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    progress,
    opacityRange,
    [50, 0, 0, -50]
  );
  
  const scale = useTransform(
    progress,
    opacityRange,
    [0.9, 1, 1, 1.1]
  );

  return (
    <motion.div 
      style={{ opacity, y, scale }}
      className="absolute w-full flex justify-center items-center px-4"
    >
      {children}
    </motion.div>
  );
}
