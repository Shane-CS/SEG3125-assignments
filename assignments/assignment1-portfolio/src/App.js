/**
 * Portfolio App main component
 * @author Shane Stock
 */

import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import '../css/theme.css';
import './App.css';
import { contactConfig, resumeLink, socialConfig } from './config';


// Typing Animation
const TypingAnimation = ({ words = [], typingSpeed = 150, deletingSpeed = 50, delayBetweenWords = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      const shouldDelete = isDeleting;

      // Set the text based on deleting or typing
      setCurrentText(prev => {
        if (shouldDelete) {
          return prev.substring(0, prev.length - 1);
        } else {
          return currentWord.substring(0, prev.length + 1);
        }
      });

      // Determine switch to deleting or move to next word
      if (!shouldDelete && currentText === currentWord) {
        // Start deleting after a delay
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      } else if (shouldDelete && currentText === '') {
        setIsDeleting(false);
        // Move to next word
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }
    };

    // Set up timer for typing/deleting
    const timer = setTimeout(
      handleTyping, 
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span>
      <span className="typing-text">{currentText}</span>
      <span className="typing-cursor"></span>
    </span>
  );
};

const imageUrl = new URL(
    './assets/profile-picture-shane-stock-2025.jpg',
    import.meta.url
).href;

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);

    // refs for each section
    const sectionRefs = {
      home: useRef(null),
      about: useRef(null),
      work: useRef(null),
      projects: useRef(null),
      contact: useRef(null)
    };

    // check user's preferred color scheme
    useEffect(() => {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }, []);

    //  update the document theme when darkMode changes
    useEffect(() => {
      document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    //  handle scroll events
    useEffect(() => {
      const handleScroll = () => {
        // Update sticky header state
        setIsScrolled(window.scrollY > 50);

        // Check if at the bottom of the page
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

        if (isAtBottom) {
          // If at bottom, activate contact section
          setActiveSection('contact');
          return;
        }

        // which section is currently in view
        const currentPosition = window.scrollY + window.innerHeight / 3;

        for (const section in sectionRefs) {
          const element = sectionRefs[section].current;
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (
              currentPosition >= offsetTop && 
              currentPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section);
              break;
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionRefs]);

    const toggleTheme = () => {
      setDarkMode(!darkMode);
    };

    const scrollToSection = (sectionId) => {
      const section = sectionRefs[sectionId].current;
      if (section) {
        window.scrollTo({
          top: section.offsetTop - ((document.querySelector('.sticky-header')?.offsetHeight)/2),
          behavior: 'smooth'
        });
      }
    };

    return (
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        {/* Sticky Header */}
        <header className={`sticky-header ${isScrolled ? 'scrolled' : ''}`}>
          <Container>
            <Nav className="code-nav py-3 d-flex align-items-center">
              <Nav.Item className={isScrolled ? "me-auto" : "d-none"}>
                <h4 className="mb-0 d-flex align-items-center">
                  <span className="material-icons me-2 text-magenta">code</span>
                  Shane Stock
                </h4>
              </Nav.Item>
              <div className={`nav-links ${isScrolled ? 'd-none' : ''}`}>
                <Nav.Item>
                  <Nav.Link 
                    onClick={() => scrollToSection('home')}
                    className={activeSection === 'home' ? 'active' : ''}
                  >
                    <span className="material-icons me-1 text-yellow">home</span> home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    onClick={() => scrollToSection('about')}
                    className={activeSection === 'about' ? 'active' : ''}
                  >
                    <span className="material-icons me-1 text-orange">person</span> about
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    onClick={() => scrollToSection('work')}
                    className={activeSection === 'work' ? 'active' : ''}
                  >
                    <span className="material-icons me-1 text-green">code</span> how I work
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    onClick={() => scrollToSection('projects')}
                    className={activeSection === 'projects' ? 'active' : ''}
                  >
                    <span className="material-icons me-1 text-violet">work</span> projects
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    onClick={() => scrollToSection('contact')}
                    className={activeSection === 'contact' ? 'active' : ''}
                  >
                    <span className="material-icons me-1 text-cyan">email</span> contact
                  </Nav.Link>
                </Nav.Item>
              </div>
              <Nav.Item className="ms-auto">
                <Button 
                  variant="outline-secondary" 
                  onClick={toggleTheme}
                  className="theme-toggle d-flex align-items-center"
                >
                  <span className="material-icons me-1">
                    {darkMode ? 'light_mode' : 'dark_mode'}
                  </span>{darkMode ? 'Light' : 'Dark'}
                </Button>
              </Nav.Item>
            </Nav>
          </Container>
        </header>

        {/* Scroll Indicator */}
        <div className={`scroll-indicator ${isScrolled ? '' : 'hidden'}`}>
          <div 
            className={`scroll-indicator-item ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            <div className="scroll-indicator-dot bg-yellow"></div>
            <div className="scroll-indicator-text">home</div>
          </div>
          <div 
            className={`scroll-indicator-item ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            <div className="scroll-indicator-dot bg-orange"></div>
            <div className="scroll-indicator-text">about</div>
          </div>
          <div 
            className={`scroll-indicator-item ${activeSection === 'work' ? 'active' : ''}`}
            onClick={() => scrollToSection('work')}
          >
            <div className="scroll-indicator-dot bg-green"></div>
            <div className="scroll-indicator-text">work</div>
          </div>
          <div 
            className={`scroll-indicator-item ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => scrollToSection('projects')}
          >
            <div className="scroll-indicator-dot bg-violet"></div>
            <div className="scroll-indicator-text">projects</div>
          </div>
          <div 
            className={`scroll-indicator-item ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => scrollToSection('contact')}
          >
            <div className="scroll-indicator-dot bg-cyan"></div>
            <div className="scroll-indicator-text">contact</div>
          </div>
        </div>

        <main className="main-content">
          <section 
            id="home" 
            className="hero" 
            ref={sectionRefs.home}
          >
            <Container>
              <Row className="align-items-center">
                <Col md={8}>
                  <div className="hero-content">
                    <h1 className="display-2 fw-bold">
                      Shane Stock
                    </h1>
                    <h2 className="h4 mb-4">
                      <span className="text-yellow">I am </span>
                      <span className="text-cyan">
                        <TypingAnimation 
                          words={["a student", "a developer", "a Canadian", "an inventor"]}
                          typingSpeed={100} 
                          deletingSpeed={50} 
                          delayBetweenWords={1500} 
                        />
                      </span>
                    </h2>
                    <p className="lead text-base01">
                      Software Engineering Intern at the Bank of Canada | B.Eng. (Software) candidate, University of Ottawa
                    </p>
                    <div className="mt-4">
                      <Button variant="primary" onClick={() => scrollToSection('projects')} className="me-3">
                        <span className="material-icons me-1">visibility</span> View Projects
                      </Button>
                      <Button variant="outline-secondary" onClick={() => scrollToSection('contact')}>
                        <span className="material-icons me-1">send</span> Get in Touch
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="hero-scroll-indicator" onClick={() => scrollToSection('about')}>
              <span className="material-icons" style={{ fontSize: '2rem' }}>keyboard_arrow_down</span>
            </div>
          </section>

          <section id="about" className="py-5" ref={sectionRefs.about}>
            <Container>
              <h2 className="section-title mb-4">
                <span className="material-icons me-2 text-orange">person</span> about me
              </h2>
              <Row>
                <Col md={8}>
                  <div className="bg-base02 p-4 rounded shadow-sm mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <span className="material-icons text-yellow me-3" style={{ fontSize: '2rem' }}>emoji_objects</span>
                      <p className="text-base1 mb-0">
                        Hey! I’m Shane—a <span className="text-yellow">Software Engineering</span> student at the University of Ottawa and current
                        Software Engineering Intern at the <span className="text-cyan">Bank of Canada</span>. I love designing and building scalable
                        web applications, automating infrastructure in my homelab, and contributing to open-source
                        projects.
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p>
                      Currently pursuing a degree in <span className="text-violet">Software Engineering</span> with a focus on Human-Computer Interaction.
                    </p>
                  </div>

                  <div className="mb-4">
                    <p>
                      Passionate about <span className="text-green">user-centered design</span> and creating experiences that are both functional and delightful.
                    </p>
                  </div>

                  <div>
                    <p>
                      Outside of code, you’ll find me skiing or tinkering with the next homelab setup.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="d-flex justify-content-center align-items-center">
                  <div className="text-center p-0 bg-base01 rounded-circle" style={{ width: '200px', height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img
                        src={imageUrl}
                        alt="Shane Stock"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="work" className="py-5" ref={sectionRefs.work}>
            <Container>
              <h2 className="section-title mb-4">
                <span className="material-icons me-2 text-green">code</span> how I work
              </h2>

              {/* Introduction Card */}
              <div className="bg-base02 p-4 rounded shadow-sm mb-5">
                <div className="d-flex align-items-center">
                  <span className="material-icons text-magenta me-3" style={{ fontSize: '2rem' }}>school</span>
                  <p className="text-base1 mb-0">
                    I'm currently taking a UI design course (SEG3125) at the University of Ottawa, where I'm learning
                    design elements and principles of visual communication.
                  </p>
                </div>
              </div>

              {/* Resume Section */}
              <div className="resume-section mb-5">
                <Row>
                  {/* Left Column - Experience */}
                  <Col lg={7} className="mb-4 mb-lg-0">
                    <div className="resume-card bg-base02 p-4 rounded shadow-sm">
                      <div className="d-flex align-items-center mb-4">
                        <span className="material-icons text-blue me-2" style={{ fontSize: '1.5rem' }}>work</span>
                        <h3 className="text-blue mb-0">Professional Experience</h3>
                      </div>

                      {/* Timeline */}
                      <div className="timeline">
                        {/* Experience Item 1 */}
                        <div className="timeline-item mb-4">
                          <div className="d-flex justify-content-between mb-2 align-items-center">
                            <h4 className="text-cyan mb-0">Software Engineering Intern</h4>
                            <span className="badge bg-cyan">May 2024 – Present</span>
                          </div>
                          <h5 className="text-base1 mb-2">Bank of Canada</h5>
                          <div className="timeline-content bg-base02 p-3 rounded">
                            <ul className="text-base1 mb-0">
                              <li>Built and maintained WordPress-based web services with MySQL backends</li>
                              <li>Developed FastAPI pipelines moving data from Azure Data Lake into web APIs</li>
                              <li>Maintained Kubernetes-based AWS infrastructure and a K3s air-gapped lab</li>
                              <li>Participated in cross-datacenter DR drills and prototyped RAG database workflows</li>
                            </ul>
                          </div>
                        </div>

                        {/* Experience Item 2 */}
                        <div className="timeline-item">
                          <div className="d-flex justify-content-between mb-2 align-items-center">
                            <h4 className="text-violet mb-0">Web, E-Learning and E-Commerce Consultant</h4>
                            <span className="badge bg-violet">2023 - As needed</span>
                          </div>
                          <h5 className="text-base1 mb-2">Canada Classroom</h5>
                          <div className="timeline-content bg-base02 p-3 rounded">
                            <ul className="text-base1 mb-0">
                              <li>Launched and optimized a WooCommerce site to drive user growth</li>
                              <li>Converted legacy slide decks into engaging e-learning modules</li>
                              <li>Advised on digital strategy and managed budgets for platform upgrades</li>
                              <li>Integrated WordPress, cPanel, and LearnWorlds for seamless UX</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* Right Column - Education and Skills */}
                  <Col lg={5}>
                    {/* Education */}
                    <div className="resume-card bg-base02 p-4 rounded shadow-sm mb-4">
                      <div className="d-flex align-items-center mb-4">
                        <span className="material-icons text-yellow me-2" style={{ fontSize: '1.5rem' }}>school</span>
                        <h3 className="text-yellow mb-0">Education</h3>
                      </div>

                      <div className="education-item mb-3">
                        <div className="d-flex justify-content-between mb-1 align-items-center">
                          <h4 className="text-blue mb-0">Bachelor of Software Engineering</h4>
                          <span className="badge bg-blue">2023 – Expected 2028</span>
                        </div>
                        <h5 className="text-base1 mb-1">University of Ottawa</h5>
                        <p className="text-base1 mb-0">Notable Project: SEG2900 Pitch Competition Winner (2023)</p>
                        <p className="text-base1 mb-0">Current CGPA: 7.18 / 10.0</p>
                      </div>

                      <div className="education-item">
                        <div className="d-flex justify-content-between mb-1 align-items-center">
                          <h4 className="text-orange mb-0">High School Diploma</h4>
                          <span className="badge bg-orange">Class of 2023</span>
                        </div>
                        <h5 className="text-base1 mb-1">St. Mark High School</h5>
                        <p className="text-base1 mb-0">Manotick, Ontario</p>
                      </div>
                    </div>

                    {/* Design Process */}
                    <div className="resume-card bg-base02 p-4 rounded shadow-sm">
                      <div className="d-flex align-items-center mb-4">
                        <span className="material-icons text-green me-2" style={{ fontSize: '1.5rem' }}>cyclone</span>
                        <h3 className="text-green mb-0">My Design Process</h3>
                      </div>

                      <div className="process-steps">
                        <div className="process-step p-3 mb-3 bg-base02 rounded shadow-sm">
                          <div className="d-flex align-items-center">
                            <div className="process-icon me-3 bg-yellow p-2 rounded-circle">
                              <span className="material-icons text-base03">search</span>
                            </div>
                            <div>
                              <h5 className="text-yellow mb-1">Research</h5>
                              <p className="mb-0 text-base1">Understanding user needs through interviews and analysis</p>
                            </div>
                          </div>
                        </div>

                        <div className="process-step p-3 mb-3 bg-base02 rounded shadow-sm">
                          <div className="d-flex align-items-center">
                            <div className="process-icon me-3 bg-orange p-2 rounded-circle">
                              <span className="material-icons text-base03">brush</span>
                            </div>
                            <div>
                              <h5 className="text-orange mb-1">Design</h5>
                              <p className="mb-0 text-base1">Creating wireframes and interactive prototypes</p>
                            </div>
                          </div>
                        </div>

                        <div className="process-step p-3 mb-3 bg-base02 rounded shadow-sm">
                          <div className="d-flex align-items-center">
                            <div className="process-icon me-3 bg-violet p-2 rounded-circle">
                              <span className="material-icons text-base03">code</span>
                            </div>
                            <div>
                              <h5 className="text-violet mb-1">Develop</h5>
                              <p className="mb-0 text-base1">Implementing designs with modern web technologies</p>
                            </div>
                          </div>
                        </div>

                        <div className="process-step p-3 mb-3 bg-base02 rounded shadow-sm">
                          <div className="d-flex align-items-center">
                            <div className="process-icon me-3 bg-cyan p-2 rounded-circle">
                              <span className="material-icons text-base03">analytics</span>
                            </div>
                            <div>
                              <h5 className="text-cyan mb-1">Test</h5>
                              <p className="mb-0 text-base1">Testing with users and iterating based on feedback</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Skills Section */}
              <div className="skills-section">
                <h3 className="text-magenta mb-4">
                  <span className="material-icons me-2 align-middle">build</span>
                  Skills & Tools
                </h3>

                <Row>
                  <Col md={3} sm={6} className="mb-4">
                    <div className="skill-category bg-base02 p-3 rounded shadow-sm h-100">
                      <h4 className="text-blue mb-3">Design</h4>
                      <ul className="text-base1 mb-0">
                        <li>UI/UX Design</li>
                        <li>Wireframing</li>
                        <li>Prototyping</li>
                        <li>Figma</li>
                        <li>Adobe XD</li>
                      </ul>
                    </div>
                  </Col>

                  <Col md={3} sm={6} className="mb-4">
                    <div className="skill-category bg-base02 p-3 rounded shadow-sm h-100">
                      <h4 className="text-green mb-3">Frontend</h4>
                      <ul className="text-base1 mb-0">
                        <li>HTML/CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Bootstrap</li>
                        <li>Responsive Design</li>
                      </ul>
                    </div>
                  </Col>

                  <Col md={3} sm={6} className="mb-4">
                    <div className="skill-category bg-base02 p-3 rounded shadow-sm h-100">
                      <h4 className="text-violet mb-3">Backend</h4>
                      <ul className="text-base1 mb-0">
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>MongoDB</li>
                        <li>RESTful APIs</li>
                        <li>Firebase</li>
                      </ul>
                    </div>
                  </Col>

                  <Col md={3} sm={6} className="mb-4">
                    <div className="skill-category bg-base02 p-3 rounded shadow-sm h-100">
                      <h4 className="text-yellow mb-3">Other</h4>
                      <ul className="text-base1 mb-0">
                        <li>Git/GitHub</li>
                        <li>Agile/Scrum</li>
                        <li>User Testing</li>
                        <li>Accessibility</li>
                        <li>SEO Basics</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>

          <section id="projects" className="py-5" ref={sectionRefs.projects}>
            <Container>
              <h2 className="section-title mb-4">
                <span className="material-icons me-2 text-violet">work</span> projects
              </h2>

              <div className="text-center mb-5">
                <p className="lead bg-base02 p-3 rounded shadow-sm d-inline-block">
                  <span className="material-icons align-middle me-2 text-yellow">lightbulb</span>
                  Check out some of my recent and upcoming projects
                </p>
              </div>

              <Row>
                <Col md={6} lg={3} className="mb-4">
                  <div className="project-card p-0 shadow-sm">
                    <div className="project-image" style={{ 
                      height: '200px', 
                      backgroundColor: 'var(--bs-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px'
                    }}>
                      <div className="project-icon-bg" style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }}></div>
                      <span className="material-icons" style={{ fontSize: '4rem', color: 'white', position: 'relative', zIndex: 2 }}>medical_services</span>
                    </div>
                    <div className="p-3">
                      <h3 className="h5 mb-2 text-blue">Service Website</h3>
                      <p>A website for a service business (e.g., dentist, bike repair).</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="link" className="p-0 text-blue" disabled>
                          <span className="material-icons me-1">hourglass_empty</span> Coming Soon
                        </Button>
                        <span className="badge bg-blue text-white">Assignment 2</span>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={6} lg={3} className="mb-4">
                  <div className="project-card p-0 shadow-sm">
                    <div className="project-image" style={{ 
                      height: '200px', 
                      backgroundColor: 'var(--bs-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px'
                    }}>
                      <div className="project-icon-bg" style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }}></div>
                      <span className="material-icons" style={{ fontSize: '4rem', color: 'white', position: 'relative', zIndex: 2 }}>sports_esports</span>
                    </div>
                    <div className="p-3">
                      <h3 className="h5 mb-2 text-cyan">Interactive Game</h3>
                      <p>A small interactive game with engaging user experience.</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="link" className="p-0 text-cyan" disabled>
                          <span className="material-icons me-1">hourglass_empty</span> Coming Soon
                        </Button>
                        <span className="badge bg-cyan text-white">Assignment 3</span>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={6} lg={3} className="mb-4">
                  <div className="project-card p-0 shadow-sm">
                    <div className="project-image" style={{ 
                      height: '200px', 
                      backgroundColor: 'var(--bs-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px'
                    }}>
                      <div className="project-icon-bg" style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }}></div>
                      <span className="material-icons" style={{ fontSize: '4rem', color: 'white', position: 'relative', zIndex: 2 }}>shopping_cart</span>
                    </div>
                    <div className="p-3">
                      <h3 className="h5 mb-2 text-green">E-commerce Site</h3>
                      <p>An online shopping experience with intuitive navigation and checkout.</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="link" className="p-0 text-green" disabled>
                          <span className="material-icons me-1">hourglass_empty</span> Coming Soon
                        </Button>
                        <span className="badge bg-green text-white">Assignment 4</span>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={6} lg={3} className="mb-4">
                  <div className="project-card p-0 shadow-sm">
                    <div className="project-image" style={{ 
                      height: '200px',
                      backgroundColor: `rgb(var(--bs-violet-rgb))`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px'
                    }}>
                      <div className="project-icon-bg" style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }}></div>
                      <span className="material-icons" style={{ fontSize: '4rem', color: 'white', position: 'relative', zIndex: 2 }}>analytics</span>
                    </div>
                    <div className="p-3">
                      <h3 className="h5 mb-2 text-violet">Analytics Dashboard</h3>
                      <p>A data visualization and analytics platform with interactive charts.</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="link" className="p-0 text-violet" disabled>
                          <span className="material-icons me-1">hourglass_empty</span> Coming Soon
                        </Button>
                        <span className="badge bg-violet text-white">Final Project</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="contact" className="py-5" ref={sectionRefs.contact}>
            <Container>
              <h2 className="section-title mb-4">
                <span className="material-icons me-2 text-cyan">email</span> contact
              </h2>
              <Row className="align-items-center">
                <Col md={6}>
                  <div className="bg-base02 p-4 rounded shadow-sm mb-4">
                    <div className="d-flex align-items-center">
                      <span className="material-icons text-magenta me-3" style={{ fontSize: '2rem' }}>handshake</span>
                      <p className="lead mb-0 text-base1">Interested in working together? Let's connect!</p>
                    </div>
                  </div>

                  <div className="contact-methods">
                    <div className="contact-method p-3 mb-3 bg-base03 rounded shadow-sm">
                      <div className="d-flex align-items-center">
                        <div className="contact-icon me-3 bg-cyan p-2 rounded-circle">
                          <span className="material-icons text-base03">email</span>
                        </div>
                        <div>
                          <h5 className="text-cyan mb-1">Email</h5>
                          <a href={`mailto:${contactConfig.email}`} className="contact-link text-base1">
                            {contactConfig.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="contact-method p-3 mb-3 bg-base03 rounded shadow-sm">
                      <div className="d-flex align-items-center">
                        <div className="contact-icon me-3 bg-yellow p-2 rounded-circle">
                          <span className="material-icons text-base03">location_on</span>
                        </div>
                        <div>
                          <h5 className="text-yellow mb-1">Location</h5>
                          <p className="mb-0 text-base1">{contactConfig.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="text-center">
                  <h4 className="mb-4 text-cyan">
                    Connect with me
                  </h4>

                  <div className="social-links d-flex flex-wrap justify-content-center">
                    {Object.entries(socialConfig).map(([platform, config]) => (
                      <a 
                        key={platform}
                        href={config.url} 
                        className="social-link p-3 rounded me-3 mb-3 d-flex align-items-center justify-content-center" 
                        style={{ backgroundColor: config.backgroundColor }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`${config.icon} fa-2x`}></i>
                      </a>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Button variant="outline-secondary" onClick={() => window.open(resumeLink, '_blank')}>
                      Download Resume
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          <div 
            className={`mobile-nav-item ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            <span className="material-icons text-yellow">home</span>
            <span>Home</span>
          </div>
          <div 
            className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            <span className="material-icons text-orange">person</span>
            <span>About</span>
          </div>
          <div 
            className={`mobile-nav-item ${activeSection === 'work' ? 'active' : ''}`}
            onClick={() => scrollToSection('work')}
          >
            <span className="material-icons text-green">code</span>
            <span>Work</span>
          </div>
          <div 
            className={`mobile-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => scrollToSection('projects')}
          >
            <span className="material-icons text-violet">work</span>
            <span>Projects</span>
          </div>
          <div 
            className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => scrollToSection('contact')}
          >
            <span className="material-icons text-cyan">email</span>
            <span>Contact</span>
          </div>
        </div>

        <footer className="py-4 mt-5 bg-base02">
          <Container>
            <Row className="align-items-center">
              <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
                <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <h5 className="mb-0 text-base1">Shane Stock</h5>
                </div>
              </Col>

              <Col md={4} className="text-center mb-3 mb-md-0">
                <div className="d-flex justify-content-center">
                  <Button 
                    variant="link" 
                    className="mx-2 p-0 text-yellow" 
                    onClick={() => scrollToSection('home')}
                  >
                    Home
                  </Button>
                  <Button 
                    variant="link" 
                    className="mx-2 p-0 text-orange" 
                    onClick={() => scrollToSection('about')}
                  >
                    About
                  </Button>
                  <Button 
                    variant="link" 
                    className="mx-2 p-0 text-green" 
                    onClick={() => scrollToSection('work')}
                  >
                    Work
                  </Button>
                  <Button 
                    variant="link" 
                    className="mx-2 p-0 text-violet" 
                    onClick={() => scrollToSection('projects')}
                  >
                    Projects
                  </Button>
                  <Button 
                    variant="link" 
                    className="mx-2 p-0 text-cyan" 
                    onClick={() => scrollToSection('contact')}
                  >
                    Contact
                  </Button>
                </div>
              </Col>

              <Col md={4} className="text-center text-md-end">
                <p className="mb-0 text-base1">
                  © {new Date().getFullYear()} Shane Stock. All rights reserved.
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    );
};

export default App;
