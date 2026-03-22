// Principles Section Animations
(function() {
  // Wait for GSAP and fonts to be ready
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, principles animations disabled');
    return;
  }

  // Register plugins if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Ghost parallax
  gsap.to(".principles__header-ghost", {
    x: "-12%",
    ease: "none",
    scrollTrigger: {
      trigger: ".principles__header",
      start: "top bottom",
      end: "bottom top",
      scrub: 2
    }
  });

  gsap.to(".manifesto__ghost", {
    y: "-18%",
    ease: "none",
    scrollTrigger: {
      trigger: ".manifesto",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    }
  });

  gsap.to(".cta__ghost", {
    rotation: 8,
    scale: 1.08,
    ease: "none",
    scrollTrigger: {
      trigger: ".cta",
      start: "top bottom",
      end: "bottom top",
      scrub: 2
    }
  });

  // IntersectionObserver reveal helper
  function reveal(selector, fromVars, toVars, threshold) {
    threshold = threshold || 0.15;
    const els = typeof selector === "string" ? document.querySelectorAll(selector) : [selector];
    
    els.forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0 });
      
      new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.fromTo(el,
          { opacity: 0, ...fromVars },
          { opacity: 1, duration: 0.85, ease: "power3.out", ...toVars }
        );
      }, { threshold }).observe(el);
    });
  }

  reveal("#headerTitle", { x: -60 }, { x: 0 });
  reveal("#manifestoLabel", { y: 30 }, { y: 0, duration: 0.7 });
  reveal("#beliefsTitle", { x: -60 }, { x: 0 });
  reveal("#beliefsBox1", { y: 40 }, { y: 0, duration: 0.7 });
  reveal("#beliefsBox2", { y: 40 }, { y: 0, duration: 0.7, delay: 0.15 });
  reveal("#ctaKicker", { y: 30 }, { y: 0, duration: 0.7 });
  reveal("#ctaBtn", { scale: 0.8 }, { scale: 1, duration: 0.75, ease: "elastic.out(1,0.6)" }, 0.5);
  reveal("#footerSymbols", { y: 16 }, { y: 0, duration: 0.65, ease: "back.out(2)" }, 0.5);

  // Cards: stagger by column + tilt on hover
  const cards = gsap.utils.toArray(".card");
  cards.forEach((card) => gsap.set(card, { opacity: 0, y: 36, scale: 0.96 }));

  const cardIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const i = cards.indexOf(card);
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: "power2.out",
        delay: (i % 3) * 0.1
      });
      cardIO.unobserve(card);
    });
  }, { threshold: 0.1 });

  cards.forEach((card) => cardIO.observe(card));

  // Card tilt effect
  cards.forEach((card) => {
    const setX = gsap.quickTo(card, "rotationY", { duration: 0.45, ease: "power1.out" });
    const setY = gsap.quickTo(card, "rotationX", { duration: 0.45, ease: "power1.out" });
    
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      setX(((e.clientX - r.left) / r.width - 0.5) * 7);
      setY(((e.clientY - r.top) / r.height - 0.5) * -7);
    });
    
    card.addEventListener("mouseleave", () => {
      setX(0);
      setY(0);
    });
  });

  // SplitText animations (if available)
  if (typeof SplitText !== 'undefined') {
    document.fonts.ready.then(() => {
      // Manifesto quote animation
      const manifestoQuote = document.querySelector("#manifestoQuote");
      if (manifestoQuote) {
        gsap.set(manifestoQuote, { opacity: 0 });
        new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.set(manifestoQuote, { opacity: 1 });
          SplitText.create(manifestoQuote, {
            type: "words",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.words, {
                opacity: 0,
                y: 30,
                rotationX: -40,
                stagger: 0.055,
                duration: 0.7,
                ease: "power3.out"
              });
            }
          });
        }, { threshold: 0.2 }).observe(manifestoQuote);
      }

      // CTA title animation
      const ctaTitle = document.querySelector("#ctaTitle");
      if (ctaTitle) {
        gsap.set(ctaTitle, { opacity: 0 });
        new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.set(ctaTitle, { opacity: 1 });
          SplitText.create(ctaTitle, {
            type: "chars",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.chars, {
                opacity: 0,
                scale: 0.3,
                stagger: { each: 0.035, from: "center" },
                duration: 0.6,
                ease: "back.out(2.5)"
              });
            }
          });
        }, { threshold: 0.2 }).observe(ctaTitle);
      }
    });
  }
})();
