"use client";

import { useEffect } from "react";

/**
 * Port fiel de nk-lp-animation/script.js para React.
 * Replica os 5 IntersectionObservers (reveal/stagger, troca de imagem por beat,
 * nav de progresso, count-up) + o fallback de parallax e o smooth-scroll,
 * respeitando prefers-reduced-motion. Roda uma vez após o mount e limpa tudo
 * no unmount (importante para o StrictMode em dev rodar duas vezes sem vazar).
 */
export function JourneyScripts() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // Smooth scroll só enquanto a jornada está montada (restaurado no unmount).
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    if (!reduce) html.style.scrollBehavior = "smooth";
    cleanups.push(() => {
      html.style.scrollBehavior = prevScrollBehavior;
    });

    // 1) Reveal com stagger por grupo.
    const timeouts: number[] = [];
    const revIO = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const items = e.target.querySelectorAll<HTMLElement>(".reveal");
          items.forEach((el, i) => {
            const t = window.setTimeout(() => el.classList.add("in"), reduce ? 0 : i * 100);
            timeouts.push(t);
          });
          revIO.unobserve(e.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal-group]").forEach((g) => revIO.observe(g));
    cleanups.push(() => {
      revIO.disconnect();
      timeouts.forEach((t) => clearTimeout(t));
    });

    // 2) Indicador de progresso lateral.
    const navIO = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = (e.target as HTMLElement).id;
          document.querySelectorAll(".progress a").forEach((a) => {
            a.classList.toggle("on", (a as HTMLElement).dataset.t === id);
          });
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    document.querySelectorAll(".module").forEach((m) => navIO.observe(m));
    cleanups.push(() => navIO.disconnect());

    // 3) Números contando.
    const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
    const countUp = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.target || "0");
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      if (reduce) {
        el.textContent = prefix + target + suffix;
        return;
      }
      const dur = 1300;
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = prefix + Math.round(target * easeOut(p)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const nio = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          countUp(e.target as HTMLElement);
          nio.unobserve(e.target);
        });
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll<HTMLElement>(".num").forEach((n) => nio.observe(n));
    cleanups.push(() => nio.disconnect());

    // 4) Inspetor — celular sticky: troca a tela ativa conforme o passo cruza o centro.
    const stepEls = document.querySelectorAll<HTMLElement>(".device-step");
    if (stepEls.length) {
      const screens = document.querySelectorAll<HTMLElement>(".device-screen");
      const stepIO = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            const idx = (e.target as HTMLElement).dataset.step;
            screens.forEach((s) => s.classList.toggle("show", s.dataset.screen === idx));
          });
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
      );
      stepEls.forEach((s) => stepIO.observe(s));
      cleanups.push(() => stepIO.disconnect());
    }

    // 5) Parallax leve (fallback): só quando não há scroll-driven animation nativa.
    const nativeTimeline = !!(
      window.CSS &&
      CSS.supports &&
      CSS.supports("animation-timeline", "view()")
    );
    if (!reduce && !nativeTimeline) {
      const px = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const vh = window.innerHeight;
          px.forEach((el) => {
            const r = el.getBoundingClientRect();
            const center = r.top + r.height / 2;
            const off = (center - vh / 2) / vh;
            el.style.transform = `translateY(${off * parseFloat(el.dataset.parallax || "0")}px)`;
          });
          ticking = false;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
