(function () {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const heroWords = Array.from(document.querySelectorAll("[data-hero-word]"));
  const architectureLayers = Array.from(document.querySelectorAll("[data-architecture-layer]"));
  const architectureStage = document.querySelector("[data-architecture-stage]");
  const architectureMark = document.querySelector("[data-architecture-mark]");
  const clientMarquee = document.querySelector("[data-client-marquee]");
  const clientTrack = document.querySelector("[data-client-track]");
  const processSteps = Array.from(document.querySelectorAll("[data-process-step]"));
  const processArtifact = document.querySelector("[data-process-artifact]");
  const artifactPaths = Array.from(document.querySelectorAll("[data-artifact-path]"));
  const artifactNodes = Array.from(document.querySelectorAll("[data-artifact-node]"));
  const artifactScan = document.querySelector("[data-artifact-scan]");
  const processCode = document.querySelector("[data-process-code]");
  const processProgress = document.querySelector("[data-process-progress]");
  const processAtmosphere = document.querySelector("[data-process-atmosphere]");
  const processMeter = document.querySelector("[data-process-meter]");

  const setHeaderState = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();

  function setMenu(open) {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    mobileMenu.classList.toggle("is-open", open);
  }

  menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  mobileMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const initialHash = window.location.hash;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  // A native hash jump can run before ScrollTrigger adds pin spacing. Reset that
  // premature position, build the scroll layout, then resolve the anchor once.
  if (initialHash) {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
  }

  const getAnchorTarget = (hash) => {
    if (!hash || hash === "#") return null;
    try {
      return document.querySelector(hash);
    } catch {
      return null;
    }
  };

  const scrollToAnchor = (hash, behavior = "auto") => {
    const target = getAnchorTarget(hash);
    if (!target) return;

    const headerOffset = header.getBoundingClientRect().height + 20;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
    window.scrollTo({ top, behavior });
    setHeaderState();
  };

  const mm = gsap.matchMedia();
  mm.add(
    {
      mobile: "(max-width: 760px)",
      desktop: "(min-width: 761px)",
      wide: "(min-width: 1021px)",
      finePointer: "(hover: hover) and (pointer: fine)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { mobile, desktop, wide, finePointer, reduceMotion } = context.conditions;
      if (reduceMotion) {
        gsap.set("[data-reveal], [data-hero-item], .hero-line > span, [data-architecture-layer], [data-architecture-mark], [data-artifact-path], [data-artifact-node], [data-artifact-scan]", { clearProps: "all" });
        return;
      }
      const cleanup = [];

      // Hero: the three product capabilities assemble into one RenderByte system.
      const heroTimeline = gsap.timeline({ defaults: { ease: "expo.out" } });
      heroTimeline
        .fromTo(".hero-line > span", { yPercent: 115, autoAlpha: 0, filter: "blur(8px)" }, { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.78, stagger: 0.1, clearProps: "filter" })
        .fromTo("[data-hero-word].is-active", { yPercent: 70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.68 }, "-=0.44")
        .fromTo("[data-hero-item]", { x: -28, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.64, stagger: 0.08 }, "-=0.48")
        .fromTo("[data-architecture-layer]", { y: 84, autoAlpha: 0, scale: 0.9 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.82, stagger: 0.09 }, "-=0.78")
        .fromTo("[data-architecture-mark]", { scale: 0.64, autoAlpha: 0, rotation: -12 }, { scale: 1, autoAlpha: 1, rotation: 0, duration: 0.72 }, "-=0.56")
        .fromTo(".hero-rail span", { scaleX: 0 }, { scaleX: 0.08, duration: 0.7 }, "-=0.54");

      if (wide) {
        ScrollTrigger.create({
          id: "renderbyte-hero",
          trigger: "#inicio",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const index = Math.min(heroWords.length - 1, Math.floor(self.progress * heroWords.length));
            heroWords.forEach((word, wordIndex) => word.classList.toggle("is-active", wordIndex === index));
            architectureLayers.forEach((layer, layerIndex) => layer.classList.toggle("is-active", layerIndex === index));
            gsap.set(architectureStage, { y: self.progress * -18 });
            gsap.set(architectureMark, { rotation: self.progress * 8, scale: 1 + self.progress * 0.04 });
            gsap.set(".hero-rail span", { scaleX: Math.max(0.08, self.progress) });
          }
        });
      }

      // Mobile: replace the desktop pinned hero with a short scroll-led transition.
      if (mobile) {
        ScrollTrigger.create({
          id: "renderbyte-mobile-hero",
          trigger: "#inicio",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const index = self.progress <= 0
              ? 0
              : Math.min(heroWords.length - 1, Math.ceil(self.progress * (heroWords.length - 1)));
            heroWords.forEach((word, wordIndex) => word.classList.toggle("is-active", wordIndex === index));
            architectureLayers.forEach((layer, layerIndex) => layer.classList.toggle("is-active", layerIndex === index));
            gsap.set(architectureStage, { y: self.progress * -12 });
            gsap.set(architectureMark, { rotation: self.progress * 6, scale: 1 + self.progress * 0.03 });
            gsap.set(".hero-rail span", { scaleX: Math.max(0.08, self.progress) });
          }
        });
      }

      if (clientMarquee && clientTrack) {
        const marqueeTween = gsap.to(clientTrack, { xPercent: -50, duration: 30, ease: "none", repeat: -1, paused: true });
        const marqueeTrigger = ScrollTrigger.create({
          trigger: clientMarquee,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => self.isActive ? marqueeTween.play() : marqueeTween.pause()
        });
        const handleVisibility = () => document.hidden ? marqueeTween.pause() : marqueeTrigger.isActive && marqueeTween.play();
        document.addEventListener("visibilitychange", handleVisibility);
        cleanup.push(() => document.removeEventListener("visibilitychange", handleVisibility));
      }

      // Process: pin only on wide desktops; tablets keep a readable static flow.
      if (wide) {
        gsap.set(artifactPaths, { strokeDashoffset: 1 });
        gsap.set(artifactNodes, { scale: 0.72, autoAlpha: 0.22 });
        ScrollTrigger.create({
          id: "renderbyte-process",
          trigger: "#proceso",
          start: "top top",
          end: "+=2400",
          pin: "[data-process-pin]",
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const index = Math.min(processSteps.length - 1, Math.floor(self.progress * processSteps.length));
            processSteps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
            processArtifact.dataset.stage = String(index);
            processCode.textContent = processSteps[index].dataset.code;
            processProgress.textContent = `${String(index + 1).padStart(2, "0")} / 04`;
            const drawingProgress = self.progress * (artifactPaths.length + 2);
            artifactPaths.forEach((path, pathIndex) => {
              gsap.set(path, { strokeDashoffset: 1 - gsap.utils.clamp(0, 1, drawingProgress - pathIndex) });
            });
            artifactNodes.forEach((node, nodeIndex) => {
              const nodeProgress = gsap.utils.clamp(0, 1, self.progress * 4 - nodeIndex * 0.72);
              gsap.set(node, { scale: 0.72 + nodeProgress * 0.28, autoAlpha: 0.22 + nodeProgress * 0.78 });
            });
            gsap.set(artifactScan, { y: self.progress * 278 });
            gsap.set(processAtmosphere, { y: 160 - self.progress * 320 });
            gsap.set(processMeter, { scaleX: Math.max(0.05, self.progress) });
          }
        });
      }

      if (mobile && processSteps.length) {
        gsap.set(artifactPaths, { strokeDashoffset: 1 });
        gsap.set(artifactNodes, { scale: 0.72, autoAlpha: 0.22 });
        ScrollTrigger.batch(processSteps, {
          start: "top 68%",
          end: "bottom 38%",
          interval: 0.05,
          batchMax: 1,
          onEnter: (steps) => activateMobileProcessStep(steps[0]),
          onEnterBack: (steps) => activateMobileProcessStep(steps[0])
        });

        function activateMobileProcessStep(step) {
          const index = processSteps.indexOf(step);
          if (index < 0) return;
          processSteps.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === index));
          processArtifact.dataset.stage = String(index);
          processCode.textContent = step.dataset.code;
          processProgress.textContent = `${String(index + 1).padStart(2, "0")} / 04`;
          const drawingProgress = ((index + 1) / processSteps.length) * (artifactPaths.length + 2);
          artifactPaths.forEach((path, pathIndex) => gsap.to(path, { strokeDashoffset: 1 - gsap.utils.clamp(0, 1, drawingProgress - pathIndex), duration: 0.35, overwrite: true }));
          artifactNodes.forEach((node, nodeIndex) => {
            const progress = gsap.utils.clamp(0, 1, (index + 1) / processSteps.length * 4 - nodeIndex * 0.72);
            gsap.to(node, { scale: 0.72 + progress * 0.28, autoAlpha: 0.22 + progress * 0.78, duration: 0.3, overwrite: true });
          });
          gsap.to(processMeter, { scaleX: (index + 1) / processSteps.length, duration: 0.3, overwrite: true });
        }
      }

      // Portfolio reveals are batched to avoid many simultaneous scroll callbacks.
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 34 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        interval: 0.08,
        batchMax: desktop ? 3 : 1,
        onEnter: (items) => gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.08, ease: "expo.out", overwrite: true })
      });

      // Pointer response reuses quickTo tweens instead of allocating on every move.
      if (finePointer) {
        const architecturePanel = document.querySelector("[data-hero-architecture]");
        const rotateX = gsap.quickTo(architectureStage, "rotationX", { duration: 0.45, ease: "power3.out" });
        const rotateY = gsap.quickTo(architectureStage, "rotationY", { duration: 0.45, ease: "power3.out" });
        gsap.set(architectureStage, { transformPerspective: 1000, transformOrigin: "center" });

        const onPointerMove = (event) => {
          const bounds = architecturePanel.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          rotateY(x * 4);
          rotateX(y * -3);
        };
        const onPointerLeave = () => { rotateX(0); rotateY(0); };
        architecturePanel.addEventListener("pointermove", onPointerMove);
        architecturePanel.addEventListener("pointerleave", onPointerLeave);

        cleanup.push(() => {
          architecturePanel.removeEventListener("pointermove", onPointerMove);
          architecturePanel.removeEventListener("pointerleave", onPointerLeave);
        });
      }

      return () => cleanup.forEach((dispose) => dispose());
    }
  );

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link) return;

    const hash = link.getAttribute("href");
    const target = getAnchorTarget(hash);
    if (!target) return;

    event.preventDefault();
    setMenu(false);
    history.pushState(null, "", hash);
    ScrollTrigger.refresh();
    requestAnimationFrame(() => {
      scrollToAnchor(hash, reducedMotionQuery.matches ? "auto" : "smooth");
    });
  });

  window.addEventListener("popstate", () => {
    ScrollTrigger.refresh();
    requestAnimationFrame(() => {
      if (window.location.hash) scrollToAnchor(window.location.hash, "auto");
      else window.scrollTo({ top: 0, behavior: "auto" });
    });
  });

  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const pageLoaded = document.readyState === "complete"
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

  Promise.all([fontsReady, pageLoaded]).then(() => {
    ScrollTrigger.refresh();
    if (!initialHash) return;
    requestAnimationFrame(() => {
      scrollToAnchor(initialHash, "auto");
      requestAnimationFrame(() => ScrollTrigger.update());
    });
  });

  window.addEventListener("beforeunload", () => mm.revert(), { once: true });

})();
