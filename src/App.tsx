import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink, 
  Code, 
  Cpu, 
  Database, 
  Layers, 
  Terminal, 
  ChevronRight, 
  Menu, 
  X, 
  GraduationCap, 
  Award, 
  Send,
  MapPin,
  Phone,
  Monitor,
  Smartphone,
  CircuitBoard,
  Activity
} from 'lucide-react';
import profileImage from './assets/profile.jpg';

// --- Components ---

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}

const GlassCard = ({ children, className = "", delay = 0 }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`glass-card p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold font-display mb-4 text-[#1A1A1A]"
    >
      {children}
      <div className="h-1 w-24 bg-linear-to-r from-primary-orange to-deep-orange mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(255,140,0,0.3)]" />
    </motion.h2>
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const TypingAnimation = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = isDeleting ? 50 : 100;

  useEffect(() => {
    const currentText = texts[index % texts.length];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setIndex(index + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, typingSpeed]);

  return (
    <span className="text-primary-orange font-mono min-h-[1.5em] inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.name.toLowerCase());
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-mesh overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="orb w-[500px] h-[500px] bg-primary-orange/10 top-[-10%] left-[-10%] animate-float" />
        <div className="orb w-[400px] h-[400px] bg-deep-orange/10 bottom-[10%] right-[-5%] animate-float" style={{ animationDelay: '-2s' }} />
        <div className="orb w-[300px] h-[300px] bg-accent-gold/10 top-[40%] left-[60%] animate-float" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary-orange via-deep-orange to-accent-gold z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b-0 m-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-display text-gradient"
          >
            SANGEM SAIKUMAR
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-orange ${
                  activeSection === link.name.toLowerCase() ? 'text-primary-orange' : 'text-gray-700'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#1A1A1A] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-6 flex flex-col gap-4 shadow-xl"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-primary-orange"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section id="home" className="min-h-[90vh] flex items-center justify-center px-6">
          <div className="max-w-4xl w-full text-center">
            <GlassCard className="py-16 px-8 md:px-12">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-primary-orange font-medium mb-4 tracking-widest uppercase text-sm"
              >
                Hello, I'm
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-7xl font-bold font-display mb-6 text-[#1A1A1A]"
              >
                SANGEM <span className="text-gradient">SAIKUMAR</span>
              </motion.h1>
              <div className="text-2xl md:text-3xl font-medium text-gray-700 mb-8 h-12">
                <TypingAnimation texts={[
                  'Web Developer',
                  'Python Programmer',
                  'DSA Enthusiast',
                  'MATLAB Specialist',
                  'Embedded Systems Engineer'
                ]} />
              </div>
              <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                ECE Student | Building the Future with Code & Circuits. 
                Passionate about creating seamless digital experiences and innovative hardware solutions.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a href="#contact" className="px-8 py-3 rounded-full bg-linear-to-r from-primary-orange to-deep-orange text-white font-bold hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] transition-all">
                  Get In Touch
                </a>
                <a href="/resume.pdf" download="Sangem_Saikumar_Resume.pdf" rel="noopener noreferrer" className="px-8 py-3 rounded-full border border-black/5 glass hover:bg-white/50 transition-all flex items-center gap-2 text-gray-800">
                  <Download size={18} /> Download Resume
                </a>
              </div>

              <div className="flex justify-center gap-6">
                {[
                  { icon: <Github />, href: "https://github.com" },
                  { icon: <Linkedin />, href: "https://linkedin.com" },
                  { icon: <Mail />, href: "mailto:saikumarsangem6@gmail.com" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="p-3 rounded-full glass hover:text-primary-orange transition-colors text-gray-700"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionHeading>About Me</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-full rounded-3xl overflow-hidden glass">
                <img 
                  src={profileImage}
                  alt="Sangem Saikumar" 
                  className="w-full h-full object-cover object-top rounded-3xl transition-all duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden md:block shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-gradient">5+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">Core<br/>Skills</div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <GlassCard>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Electronics and Communication Engineering student passionate about Embedded Systems, Digital Electronics, Python Programming, and MERN Stack Development. Actively involved in technical clubs and continuously exploring new technologies through hands-on projects.
                </p>
              </GlassCard>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <GraduationCap className="text-primary-orange" />, label: "Branch", value: "ECE" },
                  { icon: <Monitor className="text-deep-orange" />, label: "University", value: "SR University" },
                  { icon: <MapPin className="text-accent-gold" />, label: "Location", value: "Warangal, TS" },
                  { icon: <Mail className="text-primary-orange" />, label: "Email", value: "saikumarsangem6@gmail.com" }
                ].map((info, i) => (
                  <GlassCard key={i} className="p-4 flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-black/5">{info.icon}</div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase">{info.label}</div>
                      <div className="text-sm font-medium text-gray-800">{info.value}</div>
                    </div>
                  </GlassCard>
                ))}
              </div>

              <a href="https://leetcode.com/u/saikumarsangemss/" target="_blank" rel="noopener noreferrer" className="block">
                <GlassCard className="p-4 flex items-center justify-between hover:border-primary-orange hover:shadow-lg transition-all cursor-pointer border-2 border-transparent">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary-orange/10">
                      <Code className="text-primary-orange" size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-bold">LeetCode Problems</div>
                      <div className="text-lg font-bold text-gray-800">Solved 250+</div>
                    </div>
                  </div>
                  <ExternalLink className="text-primary-orange" size={20} />
                </GlassCard>
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 bg-black/2">
          <div className="max-w-7xl mx-auto">
            <SectionHeading subtitle="My technical expertise across various domains">My Skills</SectionHeading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Web Development",
                  icon: <Code className="text-primary-orange" />,
                  skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Responsive Design"],
                  color: "from-primary-orange/10"
                },
                {
                  title: "Python Programming",
                  icon: <Terminal className="text-deep-orange" />,
                  skills: ["Core Python", "OOP", "NumPy", "Pandas", "Automation", "Scripting"],
                  color: "from-deep-orange/10"
                },
                {
                  title: "DSA",
                  icon: <Database className="text-accent-gold" />,
                  skills: ["Arrays & Lists", "Stacks & Queues", "Trees & Graphs", "Dynamic Programming", "Algorithms"],
                  color: "from-accent-gold/10"
                },
                {
                  title: "MATLAB",
                  icon: <Activity className="text-primary-orange" />,
                  skills: ["Signal Processing", "Simulink", "Circuit Simulation", "Mathematical Modeling"],
                  color: "from-primary-orange/10"
                },
                {
                  title: "Embedded Systems",
                  icon: <CircuitBoard className="text-deep-orange" />,
                  skills: ["Arduino", "Microcontrollers", "IoT", "Sensor Interfacing", "Embedded C"],
                  color: "from-deep-orange/10"
                },
                {
                  title: "Tools & Others",
                  icon: <Layers className="text-accent-gold" />,
                  skills: ["Git & GitHub", "VS Code", "Problem Solving", "Teamwork", "Communication"],
                  color: "from-accent-gold/10"
                }
              ].map((category, i) => (
                <GlassCard key={i} className={`h-full bg-linear-to-br ${category.color} to-transparent`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl glass text-gray-800">{category.icon}</div>
                    <h3 className="text-xl font-bold font-display text-gray-800">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, j) => (
                      <span key={j} className="px-3 py-1 rounded-full glass text-xs font-medium text-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionHeading subtitle="Innovative AI-powered solution for hostel food management">Featured Project</SectionHeading>
          
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              {[
                {
                  title: "Food Waste Analysis",
                  desc: "A sophisticated Hotel Food management system that analyzes food wastage patterns and creates intelligent suggestions with student reviews for better hostel food management. Powered by Gemini AI for accurate food detection.",
                  tags: ["Python", "Gemini AI", "Backend", "Analysis", "Machine Learning"],
                  img: "https://dummyimage.com/600x400/FF6B6B/ffffff&text=Food+Waste+Analysis",
                  repo: "https://github.com/saikumarsangem6-rgb/FOOD-WASTE-ANALYSIS"
                }
              ].map((project, i) => (
                <GlassCard key={i} className="group overflow-hidden p-0 shadow-lg border-2 border-primary-orange/30 hover:border-primary-orange transition-all">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#FAFAFA] to-transparent opacity-40" />
                    <div className="absolute top-4 right-4 px-4 py-2 glass rounded-full bg-primary-orange/20 text-primary-orange font-bold text-sm">Featured</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold mb-4 text-primary-orange">{project.title}</h3>
                    <p className="text-base text-gray-700 mb-6 leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="text-xs uppercase tracking-wider px-3 py-2 rounded-full glass text-primary-orange font-bold bg-primary-orange/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-4 rounded-lg glass text-sm font-bold hover:bg-primary-orange hover:text-white transition-all flex items-center justify-center gap-2 text-gray-800 bg-primary-orange/5 border-2 border-primary-orange/30">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-4 rounded-lg text-sm font-bold hover:bg-deep-orange hover:text-white transition-all flex items-center justify-center gap-2 text-white bg-linear-to-r from-primary-orange to-deep-orange">
                        <Github size={16} /> View Code
                      </a>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 px-6 bg-black/2">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Education</SectionHeading>
            
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary-orange before:via-deep-orange before:to-accent-gold">
              {[
                {
                  title: "B.Tech in Electronics & Communication Engineering",
                  inst: "SR University, Warangal, Telangana",
                  date: "2023 - 2027",
                  desc: "Electronics and Communication Engineering student passionate about Embedded Systems, Digital Electronics, Python Programming, and MERN Stack Development. Actively involved in technical clubs and continuously exploring new technologies through hands-on projects."
                },
                {
                  title: "Intermediate Education (MPC)",
                  inst: "MJPTBWCREIS",
                  date: "2021 - 2023",
                  desc: "Completed with excellence in Mathematics, Physics, and Chemistry."
                },
                {
                  title: "Secondary School Certificate",
                  inst: "MJPTBCWREIS",
                  date: "2020 - 2021",
                  desc: "Foundational education with strong focus on science and mathematics."
                }
              ].map((edu, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black/5 glass absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 group-hover:scale-125 group-hover:border-primary-orange transition-all">
                    <GraduationCap size={18} className="text-primary-orange" />
                  </div>
                  <GlassCard className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                      <h3 className="text-lg font-bold text-primary-orange">{edu.title}</h3>
                      <span className="text-xs font-mono text-gray-500">{edu.date}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">{edu.inst}</div>
                    <p className="text-sm text-gray-600">{edu.desc}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionHeading subtitle="Let's build something amazing together">Get In Touch</SectionHeading>
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-6">
              <GlassCard className="h-full flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
                  <div className="space-y-6">
                    {[
                      { icon: <Mail />, text: "saikumarsangem6@gmail.com", href: "mailto:saikumarsangem6@gmail.com" },
                      { icon: <MapPin />, text: "Warangal, Telangana, India", href: "#" },
                      { icon: <Linkedin />, text: "LinkedIn Profile", href: "https://linkedin.com" },
                      { icon: <Github />, text: "GitHub Profile", href: "https://github.com" }
                    ].map((item, i) => (
                      <a key={i} href={item.href} className="flex items-center gap-4 text-gray-600 hover:text-primary-orange transition-colors group">
                        <div className="p-3 rounded-xl glass group-hover:bg-primary-orange/10 text-gray-800">{item.icon}</div>
                        <span className="text-sm font-medium">{item.text}</span>
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="mt-12">
                  <div className="text-sm text-gray-500 uppercase tracking-widest mb-4">Social Connect</div>
                  <div className="flex gap-4">
                    {[<Github />, <Linkedin />, <Mail />].map((icon, i) => (
                      <button key={i} className="p-3 rounded-xl glass hover:text-primary-orange transition-all text-gray-700">
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="md:col-span-3">
              <GlassCard className="shadow-sm">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full px-4 py-3 rounded-xl glass border-black/5 focus:border-primary-orange focus:ring-1 focus:ring-primary-orange outline-hidden transition-all text-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full px-4 py-3 rounded-xl glass border-black/5 focus:border-primary-orange focus:ring-1 focus:ring-primary-orange outline-hidden transition-all text-gray-800"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Subject</label>
                    <input 
                      type="text" 
                      placeholder="Project Inquiry" 
                      className="w-full px-4 py-3 rounded-xl glass border-black/5 focus:border-primary-orange focus:ring-1 focus:ring-primary-orange outline-hidden transition-all text-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                    <textarea 
                      rows={4}
                      placeholder="Your message here..." 
                      className="w-full px-4 py-3 rounded-xl glass border-black/5 focus:border-primary-orange focus:ring-1 focus:ring-primary-orange outline-hidden transition-all resize-none text-gray-800"
                    />
                  </div>
                  <button className="w-full py-4 rounded-xl bg-linear-to-r from-primary-orange to-deep-orange text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] transition-all">
                    <Send size={18} /> Send Message
                  </button>
                </form>
              </GlassCard>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 glass rounded-t-[3rem] mt-24 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold font-display text-gradient mb-2">SANGEM SAIKUMAR</div>
            <p className="text-gray-600 text-sm">Building the future with code & circuits.</p>
          </div>
          
          <div className="flex gap-6">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary-orange transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs mb-4">© 2025 Sangem Saikumar. All rights reserved.</p>
            <div className="flex justify-center md:justify-end gap-4">
              {[<Github size={16} />, <Linkedin size={16} />, <Mail size={16} />].map((icon, i) => (
                <button key={i} className="p-2 rounded-lg glass hover:text-primary-orange transition-all text-gray-700">
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-black/5 text-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-4 rounded-full glass hover:bg-primary-orange hover:text-white transition-all animate-bounce text-gray-800"
          >
            <ChevronRight className="-rotate-90" />
          </button>
        </div>
      </footer>
    </div>
  );
}
