import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const floatIds = ['sphere', 'diamond', 'star', 'tile', 'curve', 'grid'];

const journeys = {
  sphere: [[.78, .16], [.67, .28], [.50, .11], [.50, .11], [.79, .43], [.25, .71], [.72, .38]],
  diamond: [[.17, .79], [.31, .57], [.77, .37], [.26, .42], [.22, .69], [.76, .31], [.40, .58]],
  star: [[.68, .78], [.76, .51], [.42, .65], [.29, .26], [.72, .72], [.41, .42], [.84, .60]],
  tile: [[.55, .18], [.20, .46], [.46, .75], [.50, .25], [.37, .45], [.15, .58], [.69, .69]],
  curve: [[.48, .80], [.58, .67], [.17, .55], [.69, .55], [.77, .26], [.36, .69], [.20, .36]],
  grid: [[.15, .13], [.20, .20], [.67, .20], [.35, .70], [.13, .45], [.75, .65], [.15, .73]],
};

function revealHero() {
  const mobile = window.innerWidth < 768;
  gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })
    .to('.hero-title', { scale: mobile ? 1.05 : 1.12, y: -28, ...(!mobile && { letterSpacing: '-.085em' }), ease: 'none' }, 0)
    .to('.hero-logo-wrap', { y: -100, rotation: 5, ease: 'none' }, 0)
    .to('.hero-subtitle', { y: 55, autoAlpha: 0, ease: 'none' }, 0);
}

function buildStatement() {
  const mobile = window.innerWidth < 768;
  const lines = gsap.utils.toArray('.statement-line');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.statement-section',
      pin: true,
      start: 'top top',
      end: mobile ? '+=130%' : '+=230%',
      scrub: true,
      anticipatePin: 1,
    },
  });
  lines.forEach((line, index) => {
    tl.fromTo(line,
      { autoAlpha: 0, y: 70, ...(!mobile && { filter: 'blur(12px)' }) },
      { autoAlpha: 1, y: 0, ...(!mobile && { filter: 'blur(0px)' }), duration: .28, ease: 'none' },
      index * .33,
    );
    if (index < lines.length - 1) {
      tl.to(line, { autoAlpha: 0, y: -70, ...(!mobile && { filter: 'blur(12px)' }), duration: .22, ease: 'none' }, index * .33 + .24);
    }
  });
  tl.to('.statement-progress span', { scaleX: 1, duration: 1, ease: 'none' }, 0);
}

function buildOverview() {
  const section = document.querySelector('.overview');
  const pin = section?.querySelector('.overview-pin');
  const track = section?.querySelector('.overview-track');
  const viewport = section?.querySelector('.overview-window');
  if (!section || !pin || !track || !viewport) return;
  const distance = () => Math.max(1, track.scrollWidth - viewport.clientWidth);
  gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: 'top top',
      end: () => `+=${Math.max(window.innerHeight, distance() * 1.15)}`,
      scrub: true,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
}

function buildCards() {
  const mobile = window.innerWidth < 768;
  const baseX = mobile ? .82 : .57;
  const baseY = mobile ? .60 : .54;
  const reactors = gsap.utils.toArray(mobile
    ? '[data-float-react="sphere"], [data-float-react="diamond"], [data-float-react="star"]'
    : '[data-float-react]');
  gsap.utils.toArray('.project-story').forEach((story, projectIndex) => {
    const pin = story.querySelector('.project-pin');
    const card = story.querySelector('.project-card');
    const name = story.querySelector('.project-name');
    const progress = story.querySelector('.story-progress span');
    gsap.set(card, { scaleX: baseX, scaleY: baseY, borderRadius: mobile ? 28 : 36 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: story,
        pin: true,
        start: 'top top',
        end: mobile ? '+=105%' : '+=175%',
        scrub: true,
        anticipatePin: 1,
      },
    });
    tl.to(card, { scaleX: 1, scaleY: 1, borderRadius: 0, duration: .35, ease: 'none' }, .08)
      .to(card, { scaleX: baseX, scaleY: baseY, borderRadius: mobile ? 28 : 36, duration: .35, ease: 'none' }, .62)
      .fromTo(name, { scale: .84 }, { scale: 1.05, duration: .35, ease: 'none' }, .08)
      .to(name, { scale: .84, duration: .35, ease: 'none' }, .62)
      .to(progress, { scaleX: 1, duration: 1, ease: 'none' }, 0);

    reactors.forEach((node, objectIndex) => {
      const direction = objectIndex % 2 === 0 ? 1 : -1;
      const spread = (objectIndex % 3) + 1;
      const x = direction * (34 + spread * 16 + projectIndex * 4);
      const y = (objectIndex % 2 ? -1 : 1) * (28 + spread * 13);
      tl.to(node, { x, y, scale: 1 + spread * .1, rotation: direction * 18, duration: .35, ease: 'none' }, .08)
        .to(node, { x: 0, y: 0, scale: 1, rotation: 0, duration: .35, ease: 'none' }, .62);
    });
  });
}

function buildTextAndMask() {
  const mobile = window.innerWidth < 768;
  gsap.fromTo('.about-reveal',
    { autoAlpha: .16, y: 65, filter: 'blur(8px)' },
    {
      autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: .18, ease: 'none',
      scrollTrigger: { trigger: '.about-title', start: 'top 95%', end: 'top 60%', scrub: true },
    },
  );
  gsap.utils.toArray('.service-row').forEach((row) => {
    gsap.fromTo(row, { autoAlpha: .4, x: -36 }, {
      autoAlpha: 1, x: 0, ease: 'none',
      scrollTrigger: { trigger: row, start: 'top 96%', end: 'top 75%', scrub: true },
    });
  });
  if (!mobile) {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.mask-transition',
        pin: true,
        start: 'top top',
        end: '+=150%',
        scrub: true,
        anticipatePin: 1,
      },
    })
      .fromTo('#mask-text', { scale: 1 }, { scale: 15, transformOrigin: '50% 50%', duration: .82, ease: 'none' }, 0)
      .to('.mask-curtain', { autoAlpha: 0, duration: .22, ease: 'none' }, .78);
  }
  gsap.fromTo('.contact-inner', { y: 90 }, {
    y: 0, ease: 'none',
    scrollTrigger: { trigger: '.contact-section', start: 'top bottom', end: 'top top', scrub: true },
  });
}

function buildFloatingJourney() {
  const mobile = window.innerWidth < 768;
  const activeFloatIds = mobile ? floatIds.slice(0, 3) : floatIds;
  const nodes = Object.fromEntries(floatIds.map((id) => [id, document.querySelector(`[data-float-path="${id}"]`)]));
  const milestones = ['home', 'statement-section', 'work', 'about', 'services', 'start', 'contact'].map((id) => (
    id === 'statement-section' ? document.querySelector('.statement-section') : document.getElementById(id)
  ));
  const max = Math.max(1, ScrollTrigger.maxScroll(window));
  const positions = milestones.map((node) => Math.max(0, node.getBoundingClientRect().top + window.scrollY));
  positions[0] = 0;
  positions[positions.length - 1] = max;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const mobileSphereOverrides = { 0: [.04, .16], 2: [.40, -.05], 3: [.40, -.05], 6: [.72, .08] };

  activeFloatIds.forEach((id) => {
    const node = nodes[id];
    if (!node) return;
    const waypoints = journeys[id].map(([x, y], index) => {
      const mobileSphere = id === 'sphere' && width < 768;
      const [pointX, pointY] = mobileSphere ? (mobileSphereOverrides[index] ?? [x, y]) : [x, y];
      return { x: pointX * width, y: (mobileSphere ? Math.min(.86, pointY + .2) : pointY) * height };
    });
    gsap.set(node, waypoints[0]);
    const tl = gsap.timeline({
      scrollTrigger: { start: 0, end: () => ScrollTrigger.maxScroll(window), scrub: true, invalidateOnRefresh: true },
    });
    for (let index = 1; index < waypoints.length; index += 1) {
      const start = positions[index - 1] / max;
      const duration = Math.max(.001, (positions[index] - positions[index - 1]) / max);
      const from = waypoints[index - 1];
      const to = waypoints[index];
      const bend = { x: (from.x + to.x) / 2 + (index % 2 ? 38 : -38), y: (from.y + to.y) / 2 };
      tl.to(node, { motionPath: { path: [bend, to] }, ease: 'none', duration }, start);
    }
  });

  activeFloatIds.forEach((id, index) => {
    const node = document.querySelector(`[data-float-idle="${id}"]`);
    if (!node) return;
    gsap.to(node, {
      x: (index % 2 ? -1 : 1) * (6 + index),
      y: (index % 2 ? 1 : -1) * (10 + index * 2),
      rotation: (index % 2 ? -1 : 1) * (5 + index),
      duration: 3.5 + index * .55,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
  gsap.to('.floating-field', { autoAlpha: 1, duration: .6 });
}

function bindPointer(cleanups) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const nodes = floatIds.map((id) => document.querySelector(`[data-float-pointer="${id}"]`));
  const paths = floatIds.map((id) => document.querySelector(`[data-float-path="${id}"]`));
  const onMove = (event) => {
    nodes.forEach((node, index) => {
      if (!node || !paths[index]) return;
      const rect = paths[index].getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const range = 310;
      const strength = Math.max(0, 1 - Math.hypot(dx, dy) / range);
      gsap.to(node, { x: dx * .08 * strength, y: dy * .08 * strength, duration: .5, ease: 'power2.out', overwrite: true });
    });
  };
  const onLeave = () => nodes.forEach((node) => node && gsap.to(node, { x: 0, y: 0, duration: .6, overwrite: true }));
  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave);
  cleanups.push(() => {
    window.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerleave', onLeave);
  });

  const button = document.querySelector('.magnetic-cta');
  if (button) {
    const onButtonMove = (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(button, { x: x * .12, y: y * .16, duration: .45, overwrite: true });
    };
    const onButtonLeave = () => gsap.to(button, { x: 0, y: 0, duration: .6, overwrite: true });
    button.addEventListener('pointermove', onButtonMove);
    button.addEventListener('pointerleave', onButtonLeave);
    cleanups.push(() => {
      button.removeEventListener('pointermove', onButtonMove);
      button.removeEventListener('pointerleave', onButtonLeave);
    });
  }
}

export function useSiteMotion() {
  const [viewportVersion, setViewportVersion] = useState(0);
  const restoredInitialHash = useRef(false);
  const layoutWidth = useRef(window.innerWidth);

  useEffect(() => {
    let timer;
    const onResize = () => {
      // Mobile browser chrome changes the viewport height while scrolling. Rebuilding
      // pinned timelines for that height-only change can reset the scroll position.
      const nextWidth = window.innerWidth;
      if (Math.abs(nextWidth - layoutWidth.current) < 2) return;
      layoutWidth.current = nextWidth;
      clearTimeout(timer);
      timer = setTimeout(() => setViewportVersion((version) => version + 1), 220);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useLayoutEffect(() => {
    const cleanups = [];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const mobile = window.innerWidth < 768;
    ScrollTrigger.config({
      autoRefreshEvents: mobile
        ? 'visibilitychange,DOMContentLoaded,load'
        : 'visibilitychange,DOMContentLoaded,load,resize',
    });
    const context = gsap.context(() => {
      revealHero();
      buildStatement();
      buildOverview();
      buildCards();
      buildTextAndMask();
      ScrollTrigger.refresh();
      buildFloatingJourney();
      bindPointer(cleanups);
      if (!restoredInitialHash.current) {
        let restoreFrame = 0;
        const restore = () => {
          restoreFrame = window.requestAnimationFrame(() => {
            if (restoredInitialHash.current) return;
            restoredInitialHash.current = true;
            const targetId = decodeURIComponent(window.location.hash.slice(1));
            const target = document.getElementById(targetId);
            if (!target) return;
            ScrollTrigger.refresh();
            target.scrollIntoView({ behavior: 'instant', block: 'start' });
            ScrollTrigger.update();
          });
        };
        if (document.readyState === 'complete') restore();
        else window.addEventListener('load', restore, { once: true });
        cleanups.push(() => {
          window.removeEventListener('load', restore);
          window.cancelAnimationFrame(restoreFrame);
        });
      }
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, [viewportVersion]);
}
