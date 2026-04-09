import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
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
    const words = ["I build APIs.", "I craft UIs.", "I design data flows.", "I engineer products."];
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(typingTimeout);
    };
  }, []);

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
            <li><a href="#about" className={activeTab === 'about' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>About</a></li>
            <li><a href="#skills" className={activeTab === 'skills' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>Skills</a></li>
            <li><a href="#projects" className={activeTab === 'projects' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>Work</a></li>
            <li><a href="#experience" className={activeTab === 'experience' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>Experience</a></li>
            <li><a href="#certifications" className={activeTab === 'certifications' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>Certifications</a></li>
            <li><a href="#contact" className={activeTab === 'contact' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} {...interactiveProps}>Contact</a></li>
          </ul>
          <button 
            className="hamburger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            {...interactiveProps}
          >
            {mobileMenuOpen ? <i className="ph ph-x"></i> : <i className="ph ph-list"></i>}
          </button>
        </div>
      </nav>

      <header id="hero" className="section">
        <div className="container">
          <div className="hero-content">
            <span className="greeting">Hi, my name is</span>
            <h1 className="name">LAKROUNI HATIM.</h1>
            <h2 className="title">Full Stack Developer.</h2>
            
            <div className="typing-container">
              <span className="typing-text">{typedText}</span>
            </div>
            
            <p className="hero-desc">
              I am a Software Engineering graduate specializing in designing performant, secure, and scalable cloud applications. I build robust backends, craft dynamic UIs, and engineer complete digital products.
            </p>
            
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary" {...interactiveProps}>Check out my work!</a>
              <a href="#contact" className="btn btn-outline" {...interactiveProps}>Let's Talk</a>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><span className="highlight">01.</span> About Me</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="about-grid">
            <div className="about-text">
              <p>
                Hello! I'm Hatim, a passionate Full Stack Developer based in <strong>Casablanca, Morocco</strong>. I hold a professional license in Software Engineering and possess deep expertise across modern web frameworks, DevOps methodologies, and cloud architectures.
              </p>
              <p>
                My journey in tech is driven by complex technical challenges and a constant desire for improvement. Whether it's architecting a scalable REST API, tailoring a custom Shopify storefront, or setting up robust Dockerized deployments on AWS, I thrive on turning ideas into functional, high-value realities.
              </p>
              <p>
                Here are a few metrics that define my journey so far:
              </p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card" {...interactiveProps}>
                <div className="stat-num">2+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-card" {...interactiveProps}>
                <div className="stat-num">15+</div>
                <div className="stat-label">Tech Skills Mastered</div>
              </div>
              <div className="stat-card" {...interactiveProps}>
                <div className="stat-num">4+</div>
                <div className="stat-label">Major Projects Shipped</div>
              </div>
              <div className="stat-card" {...interactiveProps}>
                <div className="stat-num">100%</div>
                <div className="stat-label">Commitment to Quality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><span className="highlight">02.</span> Technical Arsenal</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="skills-grid">
            <div className="skill-category" {...interactiveProps}>
              <h3><i className="ph ph-browser"></i> Frontend</h3>
              <div className="skill-tags">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">HTML5/CSS3</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">JavaFX</span>
              </div>
            </div>
            
            <div className="skill-category" {...interactiveProps}>
              <h3><i className="ph ph-terminal-window"></i> Backend</h3>
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
              <h3><i className="ph ph-database"></i> Database</h3>
              <div className="skill-tags">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">Firebase</span>
                <span className="skill-tag">Oracle</span>
                <span className="skill-tag">SQL Server</span>
                <span className="skill-tag">SQLite</span>
              </div>
            </div>
            
            <div className="skill-category" {...interactiveProps}>
              <h3><i className="ph ph-cloud"></i> Cloud & DevOps</h3>
              <div className="skill-tags">
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Git / GitHub</span>
                <span className="skill-tag">GitLab</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Shopify/WordPress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><span className="highlight">03.</span> Featured Projects</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="projects-grid">
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
                  <a href="https://github.com/Hatimlk/ClassConnect" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository"><i className="ph ph-github-logo"></i></a>
                  <a href="https://class-connect-sigma.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><i className="ph ph-arrow-square-out"></i></a>
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
            <h2 className="section-title"><span className="highlight">04.</span> Professional Experience</h2>
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
            <h2 className="section-title"><span className="highlight">05.</span> Certifications</h2>
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
            <h2 className="section-title"><span className="highlight">06.</span> Get In Touch</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="contact-content">
            <p>
              I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open. Let's build something amazing together!
            </p>
            
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent functionality requires backend! But looking good!'); }}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="form-group">
                <textarea className="form-control" placeholder="Message" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" {...interactiveProps}>Send Message</button>
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
          <p>Designed & Built by <span className="footer-logo">Hatim Lakrouni</span></p>
          <p style={{ marginTop: '5px', opacity: 0.6, fontSize: '0.8em' }}>&copy; 2026. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
