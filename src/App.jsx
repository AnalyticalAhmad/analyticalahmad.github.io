import { useEffect, useRef, useState } from 'react';
import { SiInstagram, SiWhatsapp } from 'react-icons/si';
import FloatingField from './FloatingField.jsx';
import { links, projectImages, projects, sections, services } from './content.js';
import { useSiteMotion } from './motion.js';

function Navigation() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.38;
      let current = 'home';
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const item = nav?.querySelector(`[data-nav-id="${active}"]`);
    if (!nav || !indicator || !item) return;
    indicator.style.width = `${item.offsetWidth}px`;
    indicator.style.transform = `translateX(${item.offsetLeft}px)`;
  }, [active]);

  const navigate = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <a className="nav-brand" href="#home" onClick={(event) => navigate(event, 'home')} aria-label="novaaacode, go to Home">
        novaaacode<span className="brand-dot">.</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation" ref={navRef}>
        <span className="nav-indicator" aria-hidden="true" ref={indicatorRef} />
        {sections.map(({ id, label }) => (
          <a
            className={`nav-link ${active === id ? 'is-active' : ''} ${id === 'start' ? 'nav-link-cta' : ''}`}
            data-nav-id={id}
            href={`#${id}`}
            onClick={(event) => navigate(event, id)}
            aria-current={active === id ? 'location' : undefined}
            key={id}
          >
            {label}{id === 'start' && <span aria-hidden="true"> ↗</span>}
          </a>
        ))}
      </nav>
      <button
        className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span />
      </button>
      <nav className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} id="mobile-nav" aria-label="Mobile navigation" inert={!menuOpen}>
        {sections.map(({ id, label }) => (
          <a href={`#${id}`} onClick={(event) => navigate(event, id)} key={id}>{label}</a>
        ))}
      </nav>
    </header>
  );
}

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><span className="section-label-line" />{children}</div>;
}

function Hero() {
  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <SectionLabel number="00 / 06">CREATIVE DEVELOPMENT STUDIO</SectionLabel>
          <h1 id="hero-title" className="hero-title">novaaa<span>code</span><b>.</b></h1>
          <p className="hero-subtitle">WE BUILD DIGITAL EXPERIENCES.</p>
          <a className="text-link hero-discover" href="#work">DISCOVER THE WORK <span aria-hidden="true">↘</span></a>
        </div>
        <div className="hero-logo-wrap">
          <div className="hero-logo-halo" aria-hidden="true" />
          <img className="hero-logo" src="/novaaacode-logo.jpg" alt="novaaacode logo" />
          <span className="hero-logo-caption">DESIGN / DEVELOPMENT / INTERACTION</span>
        </div>
      </div>
      <div className="scroll-cue"><span className="scroll-cue-line" />SCROLL TO EXPLORE <span aria-hidden="true">↓</span></div>
    </section>
  );
}

function StatementBridge() {
  return (
    <section className="statement-section section" aria-label="What we do">
      <div className="statement-pin">
        <p className="eyebrow">NOVAAACODE</p>
        <div className="statement-stack">
          <p className="statement-line">WE DESIGN<span>.</span></p>
          <p className="statement-line">WE DEVELOP<span>.</span></p>
          <p className="statement-line">WE SHIP<span>.</span></p>
        </div>
        <div className="statement-progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="work-section section" id="work" aria-labelledby="work-title">
      <div className="work-intro section-shell">
        <SectionLabel number="01 / 06">WORK</SectionLabel>
        <h2 id="work-title" className="section-title">Selected <em>work.</em></h2>
      </div>
      <div className="overview">
        <div className="overview-pin">
          <div className="overview-topline"><span>AN OVERVIEW</span><span>SCROLL TO EXPLORE →</span></div>
          <div className="overview-window">
            <div className="overview-track">
              {projects.map((project, index) => (
                <div className="overview-item" key={project}>
                  <div className="overview-media" aria-hidden="true"><img src={projectImages[index].src} alt="" loading="lazy" decoding="async" /></div>
                  <span className="overview-number">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                  <span className="overview-name">{project}</span>
                  <span className="overview-mark" aria-hidden="true">↗</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="work-stories" aria-label="Project cards">
        {projects.map((project, index) => (
          <div className="project-story" data-project-index={index} key={project}>
            <div className="project-pin">
              <article className={`project-card project-card-${index + 1}`}>
                <div className="project-card-grid" aria-hidden="true" />
                <div className="project-card-top"><span>NOVAAACODE / SELECTED WORK</span><span>{String(index + 1).padStart(2, '0')} — {String(projects.length).padStart(2, '0')}</span></div>
                <div className="project-card-content">
                  <h3 className="project-name">{project}</h3>
                  <figure className="project-visual"><img src={projectImages[index].src} alt={projectImages[index].alt} loading="lazy" decoding="async" /></figure>
                </div>
                <div className="project-card-bottom"><span>SCROLL TO ENTER / EXIT</span><span className="card-symbol" aria-hidden="true">✳</span></div>
              </article>
              <div className="story-progress" aria-hidden="true"><span /></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section section-shell" id="about" aria-labelledby="about-title">
      <SectionLabel number="02 / 06">ABOUT US</SectionLabel>
      <h2 id="about-title" className="about-title">
        <span className="about-reveal">WE DON'T JUST BUILD SOFTWARE.</span>
        <span className="about-reveal about-accent">WE BUILD EXPERIENCES.</span>
      </h2>
      <div className="about-copy">
        <p>novaaacode is a creative development studio focused on turning ideas into polished digital products.</p>
        <p>From modern web applications and mobile apps to AI-powered experiences, we combine thoughtful design, clean development, and purposeful interaction to create products that feel as good as they function.</p>
        <p>Every project starts with an idea. We shape it, build it, refine it — and turn it into something people can actually use.</p>
        <strong>WEB APPLICATIONS · MOBILE APPS · AI EXPERIENCES</strong>
        <p className="about-question">Have an idea worth building?</p>
        <a className="text-link" href="#start">LET'S BUILD IT <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services-section section section-shell" id="services" aria-labelledby="services-title">
      <SectionLabel number="03 / 06">SERVICES</SectionLabel>
      <h2 id="services-title" className="section-title">What we <em>build.</em></h2>
      <div className="service-list">
        {services.map((service, index) => (
          <div className="service-row" tabIndex="0" key={service}>
            <span className="service-index">0{index + 1}</span>
            <h3>{service}</h3>
            <span className="service-arrow" aria-hidden="true">↗</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function LetterMask() {
  return (
    <div className="mask-transition" aria-hidden="true">
      <div className="mask-pin">
        <div className="mask-preview"><span>HAVE SOMETHING IN MIND?</span><strong>LET'S BUILD IT.</strong></div>
        <svg className="mask-curtain" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="word-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="700">
              <rect x="0" y="0" width="1200" height="700" fill="white" />
              <text id="mask-text" x="600" y="370" textAnchor="middle" fill="black" fontFamily="Arial, sans-serif" fontSize="140" fontWeight="900" letterSpacing="-7">NOVAAACODE</text>
            </mask>
          </defs>
          <rect x="0" y="0" width="1200" height="700" fill="#03020A" mask="url(#word-cutout)" />
        </svg>
      </div>
    </div>
  );
}

function StartProject() {
  return (
    <section className="start-section section section-shell" id="start" aria-labelledby="start-title">
      <SectionLabel number="04 / 06">START A PROJECT</SectionLabel>
      <div className="start-copy">
        <p>HAVE SOMETHING IN MIND?</p>
        <h2 id="start-title">LET'S<br /><em>BUILD IT.</em></h2>
        <a className="magnetic-cta" href={links.email}>
          <span>START A CONVERSATION</span><span className="cta-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <span className="start-background-word" aria-hidden="true">NOVAAACODE</span>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact-section section" id="contact">
      <div className="section-shell contact-inner">
        <SectionLabel number="05 / 06">CONTACT</SectionLabel>
        <div className="contact-heading"><h2>Get in <em>touch.</em></h2></div>
        <div className="contact-links">
          <a href={links.email} className="contact-email">itzahmad687@gmail.com <span aria-hidden="true">↗</span></a>
          <div className="social-links">
            <a href={links.instagram} target="_blank" rel="noreferrer" aria-label="novaaacode on Instagram"><SiInstagram aria-hidden="true" /><span>INSTAGRAM</span><span aria-hidden="true">↗</span></a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with novaaacode on WhatsApp"><SiWhatsapp aria-hidden="true" /><span>WHATSAPP</span><span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">NOVAAACODE</div>
        <div className="footer-bottom"><span>© 2026 Ahmad. All rights reserved.</span><a href="#home">BACK TO TOP ↑</a></div>
      </div>
    </footer>
  );
}

export default function App() {
  useSiteMotion();

  return (
    <>
      <a className="skip-link" href="#work">Skip to content</a>
      <FloatingField />
      <Navigation />
      <main>
        <Hero />
        <StatementBridge />
        <Work />
        <About />
        <Services />
        <LetterMask />
        <StartProject />
      </main>
      <Contact />
    </>
  );
}
