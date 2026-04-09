import React, { useState, useEffect } from 'react';
import './App.css';
import profileImage from './assets/profile.png';
import classConnectImg from './assets/ClassConnect.png';
import nestyImg from './assets/Nesty Webiste.png';
import tilmideImg from './assets/Tilmide-Orientation Plateforme.png';
import { translations } from './translations';

function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [typedText, setTypedText] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  
  useEffect(() => {
    // Scroll events
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('.section');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveTab(current);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Typing effect logic
    const words = t.hero.typing;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typingSpeed = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }

      typingTimeout = setTimeout(type, typingSpeed);
    };

    typingTimeout = setTimeout(type, 1000);

    // Scroll reveal observer
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px', threshold: 0.15 });

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });

    // Timeline items observer
    const timelineObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { rootMargin: '0px', threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(item => {
      timelineObserver.observe(item);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(typingTimeout);
      observer.disconnect();
      timelineObserver.disconnect();
    };
  }, [lang]);

  useEffect(() => {
    // Cursor events (only for devices with fine pointer like mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
      const moveCursor = (e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', moveCursor);
      return () => window.removeEventListener('mousemove', moveCursor);
    }
  }, []);

  const handleInteractEnter = () => setCursorHover(true);
  const handleInteractLeave = () => setCursorHover(false);

  // Common interactive props
  const interactiveProps = {
    onMouseEnter: handleInteractEnter,
    onMouseLeave: handleInteractLeave
  };

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ left: cursorPos.x, top: cursorPos.y }}
      ></div>
      <div 
        className={`cursor-outline ${cursorHover ? 'cursor-hover' : ''}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      ></div>

      <nav id="navbar" className={navScrolled ? 'scrolled' : ''}>
        <div className="container nav-container">
          <a href="#hero" className="logo" {...interactiveProps}>Hatim<span>.</span></a>
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" className={activeTab === 'about' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>{t.nav.about}</a></li>
            <li><a href="#skills" className={activeTab === 'skills' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>{t.nav.skills}</a></li>
            <li><a href="#projects" className={activeTab === 'projects' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>{t.nav.work}</a></li>
            <li><a href="#experience" className={activeTab === 'experience' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>{t.nav.experience}</a></li>
            <li><a href="#certifications" className={activeTab === 'certifications' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>{t.nav.certifications}</a></li>
            <li><a href="#contact" className={activeTab === 'contact' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>{t.nav.contact}</a></li>
          </ul>
          <div className="nav-right">
            <button className="lang-toggle" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} {...interactiveProps}>
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button 
              className="hamburger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              {...interactiveProps}
            >
              {mobileMenuOpen ? <i className="ph ph-x"></i> : <i className="ph ph-list"></i>}
            </button>
          </div>
        </div>
      </nav>

      <header id="hero" className="section">
        <div className="container">
          <div className="hero-content">
            <span className="greeting">{t.hero.greeting}</span>
            <h1 className="name">LAKROUNI HATIM.</h1>
            <h2 className="title">{t.hero.title}</h2>
            
            <div className="typing-container">
              <span className="typing-text">{typedText}</span>
            </div>
            
            <p className="hero-desc">{t.hero.desc}</p>
            
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary" {...interactiveProps}>{t.hero.cta1}</a>
              <a href="#contact" className="btn btn-outline" {...interactiveProps}>{t.hero.cta2}</a>
            </div>
          </div>
          <div className="hero-image">
            <img src={profileImage} alt="Hatim Lakrouni" />
          </div>
        </div>
      </header>

      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><span className="highlight">01.</span> {t.about.title}</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="about-grid">
            <div className="about-text">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card" {...interactiveProps}>
                <div className="stat-num">4+</div>
                <div className="stat-label">{t.about.stats.experience}</div>
              </div>
              <div className="stat-card" {...interactiveProps}>
                <div className="stat-num">15+</div>
                <div className="stat-label">{t.about.stats.skills}</div>
              </div>
              <div className="stat-card" {...interactiveProps}>
                <div className="stat-num">20+</div>
                <div className="stat-label">{t.about.stats.projects}</div>
              </div>
              <div className="stat-card" {...interactiveProps}>
                <div className="stat-num">100%</div>
                <div className="stat-label">{t.about.stats.quality}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><span className="highlight">02.</span> {t.skills.title}</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="skills-grid">
            <div className="skill-category" {...interactiveProps}>
              <h3><i className="ph ph-brands-logo"></i> {t.skills.frontend}</h3>
              <div className="skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">HTML5/CSS3</span>
              </div>
            </div>
            
            <div className="skill-category" {...interactiveProps}>
              <h3><i className="ph ph-code"></i> {t.skills.backend}</h3>
              <div className="skill-tags">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express.js</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">Spring Boot</span>
                <span className="skill-tag">C# / .NET</span>
                <span className="skill-tag">PHP</span>
              </div>
            </div>
            
            <div className="skill-category" {...interactiveProps}>
              <h3><i className="ph ph-database"></i> {t.skills.database}</h3>
              <div className="skill-tags">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">Firebase</span>
                <span className="skill-tag">Oracle</span>
                <span className="skill-tag">SQL Server</span>
              </div>
            </div>
            
            <div className="skill-category" {...interactiveProps}>
              <h3><i className="ph ph-cloud"></i> {t.skills.cloud}</h3>
              <div className="skill-tags">
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Shopify</span>
                <span className="skill-tag">WordPress</span>
              </div>
            </div>

            <div className="skill-category" {...interactiveProps}>
              <h3><i className="ph ph-globe"></i> {t.skills.networking}</h3>
              <div className="skill-tags">
                <span className="skill-tag">TCP/IP</span>
                <span className="skill-tag">DNS</span>
                <span className="skill-tag">HTTP/HTTPS</span>
                <span className="skill-tag">VPN</span>
                <span className="skill-tag">REST APIs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><span className="highlight">03.</span> {t.projects.title}</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="projects-grid">
            <div className="project-card" {...interactiveProps}>
              <div className="project-image">
                <img src={classConnectImg} alt="ClassConnect" />
              </div>
              <div className="project-header">
                <div className="project-icon"><i className="ph ph-folder-notch-open"></i></div>
                <div className="project-links">
                  <a href="https://github.com/Hatimlk/ClassConnect" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository"><i className="ph ph-github-logo"></i></a>
                  <a href="https://class-connect-six.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><i className="ph ph-arrow-square-out"></i></a>
                </div>
              </div>
              <h3 className="project-title">ClassConnect</h3>
              <p className="project-desc">
                A comprehensive classroom management platform enabling teachers to create courses, manage students, share resources, and track attendance with real-time updates.
              </p>
              <div className="project-tech">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>REST API</span>
                <span>JWT</span>
              </div>
            </div>

            <div className="project-card" {...interactiveProps}>
              <div className="project-image">
                <img src={tilmideImg} alt="Tilmid Student Portal" />
              </div>
              <div className="project-header">
                <div className="project-icon"><i className="ph ph-folder-notch-open"></i></div>
                <div className="project-links">
                  <a href="https://tilmide.ma/" target="_blank" rel="noopener noreferrer" aria-label="External Link"><i className="ph ph-arrow-square-out"></i></a>
                </div>
              </div>
              <h3 className="project-title">Tilmid Student Portal</h3>
              <p className="project-desc">
                A dedicated web application providing pedagogical resources and student profile management. Designed using a highly scalable and maintainable two-tier architecture.
              </p>
              <div className="project-tech">
                <span>TypeScript</span>
                <span>React</span>
                <span>Node.js</span>
                <span>REST API</span>
              </div>
            </div>

            <div className="project-card" {...interactiveProps}>
              <div className="project-image">
                <img src={nestyImg} alt="Nesty Real Estate" />
              </div>
              <div className="project-header">
                <div className="project-icon"><i className="ph ph-folder-notch-open"></i></div>
                <div className="project-links">
                  <a href="https://nesty-website-self.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="External Link"><i className="ph ph-arrow-square-out"></i></a>
                </div>
              </div>
              <h3 className="project-title">Nesty - Real Estate App</h3>
              <p className="project-desc">
                A dynamic web application built for managing real estate listings, tracking reservations, and optimizing the holistic property tracking experience for end-users.
              </p>
              <div className="project-tech">
                <span>TypeScript</span>
                <span>React</span>
                <span>Node.js</span>
                <span>REST API</span>
              </div>
            </div>
            
            <div className="project-card" {...interactiveProps}>
              <div className="project-header">
                <div className="project-icon"><i className="ph ph-folder-notch-open"></i></div>
                <div className="project-links">
                </div>
              </div>
              <h3 className="project-title">Orieneduca Platform</h3>
              <p className="project-desc">
                An interactive educational orientation platform integrating a customized recommendation engine based on user profiles. Features a modern, highly optimized, and responsive interface.
              </p>
              <div className="project-tech">
                <span>TypeScript</span>
                <span>React</span>
                <span>Next.js</span>
                <span>Node.js</span>
                <span>REST API</span>
              </div>
            </div>

            <div className="project-card" {...interactiveProps}>
              <div className="project-header">
                <div className="project-icon"><i className="ph ph-folder-notch-open"></i></div>
                <div className="project-links">
                </div>
              </div>
              <h3 className="project-title">Autocar Tickets Manager</h3>
              <p className="project-desc">
                A desktop CRUD application geared towards creating, modifying, and tracking transportation lines and ticketing data leveraging MySQL storage.
              </p>
              <div className="project-tech">
                <span>JavaFX</span>
                <span>Java</span>
                <span>WPF</span>
                <span>MySQL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><span className="highlight">04.</span> {t.experience.title}</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="timeline">
            <div className="timeline-item" {...interactiveProps}>
              <div className="timeline-dot"></div>
              <span className="timeline-date">February 2025 - Present</span>
              <h3 className="timeline-role">Full Stack Developer</h3>
              <h4 className="timeline-company">Onedustry Technologies, Casablanca</h4>
              <div className="timeline-content">
                <ul>
                  <li>Integration and deployment of cutting-edge cloud applications leveraging AWS and Docker.</li>
                  <li>Architecting secure, highly scalable, and easily maintainable backend infrastructures.</li>
                  <li>Designing ultra-performant and responsive user interface modules.</li>
                  <li>Active collaboration within Agile engineering teams to enforce best practices.</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-item" {...interactiveProps}>
              <div className="timeline-dot"></div>
              <span className="timeline-date">April 2024 - June 2024</span>
              <h3 className="timeline-role">Web Developer Intern</h3>
              <h4 className="timeline-company">DevopsCrowd, Canada (Remote)</h4>
              <div className="timeline-content">
                <ul>
                  <li>Spearheaded modern interface development using React.js and Next.js.</li>
                  <li>Designed high-fidelity UX/UI wireframes utilizing Figma and Adobe Illustrator.</li>
                  <li>Developed, styled, and optimized performant Shopify eCommerce storefronts.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item" {...interactiveProps}>
              <div className="timeline-dot"></div>
              <span className="timeline-date">October 2023 - March 2024</span>
              <h3 className="timeline-role">ERP Solutions Intern</h3>
              <h4 className="timeline-company">Omegasoft, Agadir</h4>
              <div className="timeline-content">
                <ul>
                  <li>Participated directly in the development and deep integration of enterprise ERP solutions.</li>
                  <li>Custom-tailored client web projects within the WordPress ecosystem.</li>
                  <li>Spearheaded from-scratch conception for tailored web applications.</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-item" {...interactiveProps}>
              <div className="timeline-dot"></div>
              <span className="timeline-date">April 2023 - May 2023</span>
              <h3 className="timeline-role">End-of-Studies Intern</h3>
              <h4 className="timeline-company">Irondev, Agadir</h4>
              <div className="timeline-content">
                <ul>
                  <li>Conceptualized and brought to life an IPTV user management web portal.</li>
                  <li>Implemented frontend structures tightly coupled with React.js and Vanilla JS.</li>
                  <li>Engineered and documented a secure RESTful API layer.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="certifications" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><span className="highlight">05.</span> {t.certifications.title}</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="certs-grid">
            <div className="cert-card" {...interactiveProps}>
              <h3 className="cert-title">Certification Google UX Design</h3>
              <p className="cert-issuer">Coursera</p>
            </div>
            <div className="cert-card" {...interactiveProps}>
              <h3 className="cert-title">Meta Front-End Developer</h3>
              <p className="cert-issuer">Meta</p>
            </div>
            <div className="cert-card" {...interactiveProps}>
              <h3 className="cert-title">AWS Certified Cloud Practitioner</h3>
              <p className="cert-issuer">Amazon Web Services</p>
            </div>
            <div className="cert-card" {...interactiveProps}>
              <h3 className="cert-title">Certification Introduction to Design Thinking</h3>
              <p className="cert-issuer">Great Learning</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><span className="highlight">06.</span> {t.contact.title}</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="contact-content">
            <p>{t.contact.desc}</p>
            
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent functionality requires backend! But looking good!'); }}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder={t.contact.name} required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder={t.contact.email} required />
              </div>
              <div className="form-group">
                <textarea className="form-control" placeholder={t.contact.message} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" {...interactiveProps}>{t.contact.send}</button>
            </form>
            
            <div className="social-links">
              <a href="mailto:hatimlakrouni@gmail.com" className="social-link" title="Email" {...interactiveProps}><i className="ph ph-envelope-simple"></i></a>
              <a href="https://github.com/Hatimlk" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub" {...interactiveProps}><i className="ph ph-github-logo"></i></a>
              <a href="https://www.linkedin.com/in/hatim-lakrouni-3684a9183/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn" {...interactiveProps}><i className="ph ph-linkedin-logo"></i></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>{t.footer.designed} <span className="footer-logo">{t.footer.name}</span></p>
          <p style={{ marginTop: '5px', opacity: 0.6, fontSize: '0.8em' }}>&copy; 2026. {t.footer.rights}</p>
        </div>
      </footer>
    </>
  );
}

export default App;
