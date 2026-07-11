"use client";

import { useEffect } from "react";

/**
 * Scripts da apresentação /comercial.
 *
 * Cobre:
 * 1. Reveal/stagger — igual ao JourneyScripts, observa [data-reveal-group].
 * 2. Progress nav lateral — observa .cm-section e .module (Módulos reusa o
 *    JourneyModule, que renderiza .module com id próprio, então precisa dos dois).
 * 3. Navegação por teclado — ←/PageUp/Shift+Espaço volta, →/PageDown/Espaço avança.
 *    Ancora nos ids do comercialNav pra respeitar a ordem oficial das partes.
 * 4. Sticky-device (troca de tela nos módulos) — mesmo padrão do JourneyScripts.
 * 5. Parallax do bgnum — fallback quando não há animation-timeline nativo.
 * 6. Dica flutuante das setas — aparece por 4s no load.
 */
export function ComercialScripts() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    if (!reduce) html.style.scrollBehavior = "smooth";
    cleanups.push(() => {
      html.style.scrollBehavior = prevScrollBehavior;
    });

    // 1) Reveal com stagger.
    const timeouts: number[] = [];
    const revIO = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const items = e.target.querySelectorAll<HTMLElement>(".reveal");
          items.forEach((el, i) => {
            const t = window.setTimeout(() => el.classList.add("in"), reduce ? 0 : i * 90);
            timeouts.push(t);
          });
          revIO.unobserve(e.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal-group]").forEach((g) => revIO.observe(g));
    cleanups.push(() => {
      revIO.disconnect();
      timeouts.forEach((t) => clearTimeout(t));
    });

    // 2) Progress nav — .cm-section (seções da apresentação) + .module (Modulos reusa JourneyModule).
    //    Reflete o tom do fundo da seção ativa no .progress via data-tone, pra
    //    paleta escura/clara do próprio nav responder ao contexto sem piscar.
    const progressEl = document.querySelector<HTMLElement>(".progress");
    const navIO = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const section = e.target as HTMLElement;
          const id = section.id;
          document.querySelectorAll(".progress a").forEach((a) => {
            a.classList.toggle("on", (a as HTMLElement).dataset.t === id);
          });
          const tone = section.dataset.tone === "dark" ? "dark" : "light";
          progressEl?.setAttribute("data-tone", tone);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    document.querySelectorAll(".cm-section, .module").forEach((s) => navIO.observe(s));
    cleanups.push(() => navIO.disconnect());

    // 3) Navegação por teclado — deriva a lista walkable do DOM em runtime
    // (todos os `.cm-section` com id, na ordem em que aparecem). Isso permite
    // que seções como `#planner-demo` (que NÃO existem em comercialNav) sejam
    // navegáveis por seta ← → mas continuem invisíveis no progress-nav lateral.
    // comercialNav segue sendo a fonte da verdade só do progress-nav.
    const getWalkableIds = (): string[] => {
      const nodes = document.querySelectorAll<HTMLElement>(".cm-section, .module");
      const ids: string[] = [];
      nodes.forEach((el) => {
        if (el.id) ids.push(el.id);
      });
      return ids;
    };
    const currentPartIndex = (partIds: string[]) => {
      const mid = window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      partIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - mid);
        if (d < closestDist) {
          closestDist = d;
          closest = i;
        }
      });
      return closest;
    };
    const goToPart = (i: number, partIds: string[]) => {
      const clamped = Math.max(0, Math.min(partIds.length - 1, i));
      const el = document.getElementById(partIds[clamped]);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };
    const isTypingTarget = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };

    // Demo lock — quando um `.modulo-demo-slide` fica ≥ 70% no viewport, o
    // usuário só pode sair via botão × ou tecla ESC. Setas, espaço, PageUp/Down,
    // Home/End e scroll (via `html.demo-locked` no CSS) ficam bloqueados. Isso
    // evita "sair sem querer" enquanto o prospect explora o produto real.
    const demoLockState: { active: boolean; backTarget: string | null } = {
      active: false,
      backTarget: null,
    };
    const exitDemoLock = () => {
      if (!demoLockState.backTarget) return;
      const el = document.getElementById(demoLockState.backTarget);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };
    const demoIO = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          const target = (e.target as HTMLElement).dataset.backTarget || null;
          if (e.isIntersecting && e.intersectionRatio >= 0.7) {
            demoLockState.active = true;
            demoLockState.backTarget = target;
            document.documentElement.classList.add("demo-locked");
          } else if (e.intersectionRatio < 0.3) {
            // Desativa só se este era o demo ativo — evita conflito quando
            // (no futuro) mais de um demo existir na página.
            if (demoLockState.backTarget === target || !e.isIntersecting) {
              demoLockState.active = false;
              demoLockState.backTarget = null;
              document.documentElement.classList.remove("demo-locked");
            }
          }
        });
      },
      { threshold: [0, 0.3, 0.7, 1] },
    );
    document.querySelectorAll(".modulo-demo-slide").forEach((s) => demoIO.observe(s));
    cleanups.push(() => {
      demoIO.disconnect();
      document.documentElement.classList.remove("demo-locked");
    });

    // Bridge de ESC vindo de DENTRO do iframe do Planner. O HTML injeta um
    // keydown listener com { capture: true } que faz postMessage({type:'nuki-demo:esc'})
    // pro parent. Isso resolve o "ESC não funciona quando foco está no iframe"
    // sem precisar de auto-scroll pro parent ou tricks de blur.
    const onMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "nuki-demo:esc" && demoLockState.active) {
        exitDemoLock();
      }
    };
    window.addEventListener("message", onMessage);
    cleanups.push(() => window.removeEventListener("message", onMessage));

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      // Bonus quando demo está em foco: ESC também volta pro descritivo (além
      // dos botões e da seta esquerda). Não bloqueia mais setas — nav global
      // funciona normalmente inclusive dentro do demo. O scroll lock (via
      // html.demo-locked no CSS) segue prevenindo saída por wheel/touch.
      if (demoLockState.active && e.key === "Escape") {
        e.preventDefault();
        exitDemoLock();
        return;
      }

      const partIds = getWalkableIds();
      const cur = currentPartIndex(partIds);
      if (e.key === "ArrowRight" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        goToPart(cur + 1, partIds);
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "PageUp" ||
        (e.key === " " && e.shiftKey)
      ) {
        e.preventDefault();
        goToPart(cur - 1, partIds);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToPart(0, partIds);
      } else if (e.key === "End") {
        e.preventDefault();
        goToPart(partIds.length - 1, partIds);
      }
    };
    window.addEventListener("keydown", onKey);
    cleanups.push(() => window.removeEventListener("keydown", onKey));

    // 4) Sticky device (Planner/Personaliza/Inspetor) — troca a tela ativa por passo.
    document.querySelectorAll<HTMLElement>(".device-grid").forEach((grid) => {
      const stepEls = grid.querySelectorAll<HTMLElement>(".device-step");
      if (!stepEls.length) return;
      const screens = grid.querySelectorAll<HTMLElement>(".device-screen");
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
    });

    // 5) Parallax do bgnum (fallback).
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

    // 6) Dica flutuante ← →. Aparece 800ms após o load, some após 4s.
    const hint = document.querySelector<HTMLElement>(".cm-hint");
    if (hint && !reduce) {
      const t1 = window.setTimeout(() => hint.classList.add("show"), 800);
      const t2 = window.setTimeout(() => hint.classList.remove("show"), 5000);
      cleanups.push(() => {
        clearTimeout(t1);
        clearTimeout(t2);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
