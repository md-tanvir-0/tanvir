import React, { useState, useEffect, useRef } from 'react';
import {
  SiReact,
  SiNodedotjs,
  SiTensorflow,
  SiDotnet,
  SiCsharp,
  SiPhp,
  SiCplusplus,
  SiNestjs,
  SiPython,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiBootstrap,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiSwagger,
  SiPostman,
  SiJira,
} from "react-icons/si";
import { FaLaptopCode, FaBrain, FaCode, FaLightbulb, FaUsers, FaRocket } from "react-icons/fa";
import * as THREE from 'three';
import {
  User,
  Code,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Phone,
  MapPin,
  Sun,
  Moon,
  Menu,
  X,
  MessageCircle,
  Send,
  ChevronUp,
  Download,
  ExternalLink,
  Database,
  Server,
  Palette,
  Calendar,
  Bot,
  Award,
  Target
} from 'lucide-react';
const ThreeScene = ({ darkMode }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Enhanced floating geometric shapes with interaction
    const geometries = [
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1),
      new THREE.IcosahedronGeometry(1),
      new THREE.DodecahedronGeometry(1),
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.ConeGeometry(0.7, 1.5, 8)
    ];

    const shapes = [];

    for (let i = 0; i < 25; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: darkMode ?
          [0x00ffff, 0xff00ff, 0xffff00, 0x00ff00, 0xff6600][Math.floor(Math.random() * 5)] :
          [0x0099cc, 0x9900cc, 0xcc9900, 0x00cc99, 0xcc4400][Math.floor(Math.random() * 5)],
        transparent: true,
        opacity: 0.8,
        emissive: darkMode ? 0x003333 : 0x001122,
        wireframe: Math.random() > 0.5
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.scale.setScalar(0.5 + Math.random() * 2);

      scene.add(mesh);
      shapes.push({
        mesh,
        initialPosition: { ...mesh.position },
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.03
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatRange: Math.random() * 8 + 3,
        interactionRange: Math.random() * 5 + 2
      });
    }

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(darkMode ? 0x404040 : 0x606060, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(darkMode ? 0x00ffff : 0x0099cc, 1);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(darkMode ? 0xff00ff : 0x9900cc, 0.5);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    camera.position.z = 35;

    // Mouse interaction
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      shapes.forEach((shape, index) => {
        // Enhanced rotation with mouse interaction
        shape.mesh.rotation.x += shape.rotationSpeed.x + mouseRef.current.x * 0.01;
        shape.mesh.rotation.y += shape.rotationSpeed.y + mouseRef.current.y * 0.01;
        shape.mesh.rotation.z += shape.rotationSpeed.z;

        // Enhanced floating motion
        shape.mesh.position.y = shape.initialPosition.y +
          Math.sin(time * shape.floatSpeed + index) * shape.floatRange;
        shape.mesh.position.x = shape.initialPosition.x +
          Math.cos(time * shape.floatSpeed * 0.7 + index) * (shape.floatRange * 0.5);

        // Mouse attraction effect
        const mouseInfluence = 0.02;
        shape.mesh.position.x += mouseRef.current.x * mouseInfluence * shape.interactionRange;
        shape.mesh.position.y += mouseRef.current.y * mouseInfluence * shape.interactionRange;

        // Pulsing scale effect
        const baseScale = 0.5 + Math.random() * 2;
        shape.mesh.scale.setScalar(baseScale + Math.sin(time * 2 + index) * 0.2);
      });

      // Camera gentle movement
      camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseRef.current.y * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [darkMode]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
};

// Custom cursor component
const CustomCursor = ({ darkMode }) => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e) => {
      if (cursor && cursorDot) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
      }
    };

    const addHoverEffect = () => {
      if (cursor) {
        cursor.classList.add('cursor-hover');
      }
    };

    const removeHoverEffect = () => {
      if (cursor) {
        cursor.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mousemove', moveCursor);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect);
      el.addEventListener('mouseleave', removeHoverEffect);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: '40px',
          height: '40px',
          border: `2px solid ${darkMode ? '#00ffff' : '#0099cc'}`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease'
        }}
      />
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot fixed pointer-events-none z-[9999]"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: darkMode ? '#00ffff' : '#0099cc',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.1s ease'
        }}
      />

      <style jsx>{`
        @media (max-width: 768px) {
          .custom-cursor,
          .custom-cursor-dot {
            display: none;
          }
        }
        
        .cursor-hover {
          width: 60px !important;
          height: 60px !important;
          background-color: rgba(0, 255, 255, 0.1) !important;
        }
      `}</style>
    </>
  );
};

// Animated text component
const AnimatedText = ({ text, className, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setShowCursor(false);
        }
      }, 100);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Section separator component
const SectionSeparator = ({ darkMode }) => (
  <div className="relative w-full h-px overflow-hidden">
    <div className={`absolute inset-0 ${darkMode ?
      'bg-gradient-to-r from-transparent via-cyan-400 to-transparent' :
      'bg-gradient-to-r from-transparent via-cyan-600 to-transparent'
      }`}></div>
    <div className="absolute inset-0">
      <div className={`h-full w-20 ${darkMode ? 'bg-cyan-400' : 'bg-cyan-600'} animate-pulse opacity-60 blur-sm`}
        style={{
          animation: 'slideAcross 3s ease-in-out infinite'
        }}></div>
    </div>
    <style jsx>{`
      @keyframes slideAcross {
        0% { transform: translateX(-100px); }
        50% { transform: translateX(calc(100vw + 100px)); }
        100% { transform: translateX(calc(100vw + 100px)); }
      }
    `}</style>
  </div>
);

export default function ModernPortfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m Demir, your portfolio guide! 🤖 Ask me anything about MD Tanvir Hossain!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const robotRef = useRef(null);
  const heroRef = useRef(null);
  const [robotPosition, setRobotPosition] = useState({ x: 50, y: 50 });

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effects and parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 500);

      // Parallax effect for hero section
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      // Update active section
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for smooth section animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, observerOptions);

    // Observe all sections except home
    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach((section) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px) scale(0.95)';
      section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [loading]);

  // Robot movement
  useEffect(() => {
    const moveRobot = () => {
      setRobotPosition(prev => ({
        x: Math.max(10, Math.min(90, prev.x + (Math.random() - 0.5) * 20)),
        y: Math.max(10, Math.min(90, prev.y + (Math.random() - 0.5) * 20))
      }));
    };

    const interval = setInterval(moveRobot, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...chatMessages, { type: 'user', message: inputMessage }];

    // Enhanced bot responses based on keywords
    const getResponse = (message) => {
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
        return "Tanvir is proficient in .NET Core, Angular v19, React, TypeScript, PostgreSQL, and many cutting-edge technologies! He specializes in full-stack development with expertise in both frontend and backend systems. 🚀";
      }

      if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
        return "He's currently a Jr. Software Engineer at Technohaven, where he leads frontend development and builds scalable applications. Previously interned at D2A2I working on R&D projects. Total experience: 2+ years! 💼";
      }

      if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('build')) {
        return "Check out his amazing projects: VATPrompt (tax automation), TPMS (AI-powered task management), RentEase, Hunger0 (NGO platform), and his thesis on Plant Disease Detection using ML/DL! 🎯";
      }

      if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('university')) {
        return "He graduated with a BSc in Computer Science from AIUB (2020-2024). His thesis focused on Plant Disease Detection using hybrid ML/DL models. Strong academic foundation! 🎓";
      }

      if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('available')) {
        return "Tanvir is available for new opportunities! Reach him at tanviraiub321@gmail.com or +880 1707 386142. Also active on LinkedIn and GitHub! 📧";
      }

      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello there! 👋 I'm Demir, your AI guide to Tanvir's professional journey. What would you like to know about his skills, projects, or experience?";
      }
      if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support')) {
        return "I'm here to assist you! Just ask about Tanvir's skills, projects, experience, or anything else related to his professional journey. How can I help you today? 🤖";
      }
     else{
        return "I'm not sure about that. Can you ask something else related to Tanvir's skills, projects, or experience? 🤔";
    }
      // Default responses
      const responses = [
        "Tanvir is a passionate Jr. Software Engineer with expertise in modern web technologies and a strong focus on innovation! 🌟",
        "He's skilled in full-stack development with .NET Core backend and Angular/React frontend technologies! ⚡",
        "His projects showcase AI/ML integration, clean architecture, and scalable solutions! 🤖",
        "Want to know more about his specific achievements or technical expertise? Just ask! 💡",
        "He's experienced in agile development, SOLID principles, and building enterprise-level applications! 🏗️"
      ];

      return responses[Math.floor(Math.random() * responses.length)];
    };

    setTimeout(() => {
      setChatMessages([...newMessages, {
        type: 'bot',
        message: getResponse(inputMessage)
      }]);
    }, 1200);

    setChatMessages(newMessages);
    setInputMessage('');
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🤖</span>
            </div>
          </div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Loading Portfolio...
          </h2>
          <div className="flex space-x-1 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const themeClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses} overflow-x-hidden`} style={{ cursor: 'none' }}>
      {/* Custom Cursor */}
      <CustomCursor darkMode={darkMode} />

      {/* Grid Pattern Background */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3e%3cpath d='m 40 0 l 0 0 0 40' fill='none' stroke='%2300ffff' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* PUBG-Style Floating Robot */}
      <div
        ref={robotRef}
        className="fixed z-40 transition-all duration-[3000ms] cursor-pointer group"
        style={{
          left: `${robotPosition.x}%`,
          top: `${robotPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={() => setChatOpen(!chatOpen)}
      >
        <div className="relative">
          {/* PUBG-Style Robot Head */}
          <div className="relative w-20 h-20 transform group-hover:scale-110 transition-all duration-300">
            {/* Main Head Structure */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 rounded-lg shadow-2xl border-2 border-cyan-400">
              {/* Visor/Screen */}
              <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-md opacity-80 flex items-center justify-center">
                <div className="text-xs text-black font-bold animate-pulse">AI</div>
              </div>

              {/* Side Panels */}
              <div className="absolute top-1 -left-1 w-2 h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-sm"></div>
              <div className="absolute top-1 -right-1 w-2 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded-sm"></div>

              {/* Bottom Mesh */}
              <div className="absolute bottom-2 left-2 right-2 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
                <div className="grid grid-cols-6 gap-px">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-cyan-400 rounded-full opacity-60"></div>
                  ))}
                </div>
              </div>

              {/* Antenna */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-cyan-400 rounded-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>

            {/* Floating Energy Ring */}
            <div className="absolute -inset-2 border-2 border-cyan-400 rounded-lg opacity-50 animate-ping"></div>
            <div className="absolute -inset-1 border border-cyan-300 rounded-lg opacity-30 animate-pulse"></div>
          </div>

          {/* Status Indicators */}
          <div className="absolute -bottom-1 -right-1 flex space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Floating Text */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Click to Chat! 💬
          </div>
        </div>
      </div>

      {/* Enhanced Chat Interface */}
      {chatOpen && (
        <div className={`fixed bottom-4 right-4 w-96 h-[500px] rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-md border-2 transition-all duration-300 ${darkMode
          ? 'bg-gray-900/90 border-cyan-400/50'
          : 'bg-white/90 border-cyan-400/50'
          }`}>
          {/* Enhanced Header */}
          <div className={`p-4 relative overflow-hidden ${darkMode
            ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600'
            : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500'
            }`}>
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center space-x-3">
                {/* Enhanced Mini Robot Head */}
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg border border-cyan-300 flex items-center justify-center shadow-lg">
                  <div className="w-6 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-sm opacity-90"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Demir Ai!</h3>
                  <div className="text-xs opacity-90 flex items-center text-gray-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Online • Enhanced AI Ready
                  </div>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:scale-110 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          </div>

          {/* Enhanced Messages */}
          <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'
            } backdrop-blur-sm`}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-xs px-4 py-3 rounded-2xl relative shadow-lg ${msg.type === 'user'
                  ? darkMode
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white ml-4'
                    : 'bg-gradient-to-br from-cyan-500 to-pink-600 text-white ml-4'
                  : darkMode
                    ? 'bg-gradient-to-br from-gray-700 to-gray-600 text-white border border-cyan-400/30 mr-4'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border border-cyan-400/30 mr-4'
                  }`}>
                  {msg.type === 'bot' && (
                    <div className="absolute -left-3 top-3 w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg border border-cyan-300 flex items-center justify-center shadow-lg">
                      <Bot size={14} className="text-cyan-400" />
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  <div className={`text-xs mt-2 opacity-70 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Input */}
          <form onSubmit={handleChatSubmit} className={`p-4 border-t backdrop-blur-sm ${darkMode
            ? 'bg-gray-800/80 border-cyan-400/30'
            : 'bg-white/80 border-cyan-400/30'
            }`}>
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Demir - anything..."
                className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-300 ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-400'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-cyan-400'
                  }`}
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg cursor-pointer ${darkMode
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
                  : 'bg-gradient-to-r from-cyan-500 to-cyan-500 hover:from-cyan-600 hover:to-cyan-600'
                  } text-white`}
              >
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-40px) translateY(-40px); }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full backdrop-blur-md border transition-all duration-300 ${darkMode
        ? 'bg-gray-800/80 border-gray-700'
        : 'bg-white/80 border-gray-200'
        }`}>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            {[
              { id: 'home', icon: User, label: 'Home' },
              { id: 'about', icon: User, label: 'About' },
              { id: 'skills', icon: Code, label: 'Skills' },
              { id: 'experience', icon: Briefcase, label: 'Experience' },
              { id: 'projects', icon: Target, label: 'Projects' },
              { id: 'contact', icon: Mail, label: 'Contact' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${activeSection === id
                  ? 'bg-cyan-400 text-white'
                  : darkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Icon size={16} />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-cyan-400 text-white hover:bg-cyan-500 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            className="md:hidden p-2 rounded-full bg-cyan-400 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={16} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-40 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {[
              { id: 'home', icon: User, label: 'Home' },
              { id: 'about', icon: User, label: 'About' },
              { id: 'skills', icon: Code, label: 'Skills' },
              { id: 'experience', icon: Briefcase, label: 'Experience' },
              { id: 'projects', icon: Target, label: 'Projects' },
              { id: 'contact', icon: Mail, label: 'Contact' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center space-x-3 text-2xl font-semibold hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <Icon size={24} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 p-3 bg-cyan-400 text-white rounded-full shadow-lg hover:bg-cyan-500 transition-all duration-300 z-30 cursor-pointer"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'
          }`}
      >
        {/* 3D Background with Three.js */}
        <ThreeScene darkMode={darkMode} />

        {/* Original Background with Grid Pattern */}
        <div className="absolute inset-0 z-10">
          <div className={`absolute inset-0 transition-colors duration-500 ${darkMode
            ? 'bg-gradient-to-br from-gray-800/20 via-black/20 to-gray-800/20'
            : 'bg-gradient-to-br from-gray-300/20 via-white/20 to-gray-300/20'
            }`}></div>

          {/* Particle System */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `particleFloat ${8 + Math.random() * 4}s linear infinite`,
                  animationDelay: `${Math.random() * 8}s`
                }}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes animate-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
          
          @keyframes particleFloat {
            0% { transform: translateY(100vh) scale(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) scale(1); opacity: 0; }
          }
        `}</style>

        <div className="relative z-20 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className={`text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-white via-cyan-400 to-cyan-600'
              : 'bg-gradient-to-r from-cyan-600 via-cyan-500 to-gray-700'
              }`}>
              <AnimatedText text="MD TANVIR" className="block" delay={500} />
            </h1>
            <h2 className="text-2xl lg:text-3xl text-cyan-400 mb-6 font-semibold">
              <AnimatedText text="Jr. Software Engineer" className="block" delay={2000} />
            </h2>
            <p className={`text-xl mb-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'
              } opacity-0 animate-fadeIn`} style={{ animationDelay: '4s', animationFillMode: 'forwards' }}>
              Passionate about building scalable web applications with .NET Core, Angular, and modern technologies.
              Specialized in creating robust, secure, and efficient solutions.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 opacity-0 animate-fadeIn" style={{ animationDelay: '4.5s', animationFillMode: 'forwards' }}>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-cyan-400 text-white rounded-full hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 cursor-pointer"
              >
                <Mail size={20} />
                <span>Get In Touch</span>
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`relative px-8 py-3 border-2 border-cyan-400 rounded-full flex items-center space-x-2 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 group cursor-pointer ${darkMode
                  ? 'border-2 border-cyan-400 text-white'
                  : 'border-2 border-cyan-400 text-cyan-600'
                  }`}
              >
                {/* Gradient overlay (acts like hover:linear-gradient) */}
                <span
                  className="absolute top-0 left-[-100%] w-full h-full transition-all duration-500 group-hover:left-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  }}
                ></span>

                {/* Button content */}
                <Download size={20} className="z-10" />
                <span className="z-10">View Resume</span>
              </button>
            </div>

            <div className="flex justify-center lg:justify-start space-x-6 opacity-0 animate-fadeIn" style={{ animationDelay: '5s', animationFillMode: 'forwards' }}>
              {[
                { icon: Github, href: 'https://github.com/md-tanvir-0', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/md-tanvir-0', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:tanviraiub321@gmail.com', label: 'Email' },
                { icon: Phone, href: 'tel:+8801707386142', label: 'Phone' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 cursor-pointer ${darkMode
                    ? 'bg-white/10 hover:bg-cyan-400'
                    : 'bg-gray-300 hover:bg-cyan-400'
                    }`}
                  title={label}
                >
                  <Icon size={24} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative opacity-0 animate-fadeIn" style={{ animationDelay: '3s', animationFillMode: 'forwards' }}>
            <div className="relative w-80 h-80 mx-auto group">
              {/* 3D Floating Profile Container */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 animate-spin-slow"></div>
              <div className={`absolute inset-2 rounded-full flex items-center justify-center transition-colors duration-500 ${darkMode
                ? 'bg-gradient-to-br from-gray-900 to-gray-800'
                : 'bg-gradient-to-br from-gray-200 to-gray-100'
                }`}>
                {/* Inner rotating ring */}
                <div className={`absolute inset-4 border-2 border-dashed rounded-full animate-spin-reverse opacity-50 ${darkMode ? 'border-cyan-400' : 'border-cyan-600'
                  }`}></div>

                {/* Profile Image */}
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 flex items-center justify-center text-6xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  {/* 3D Hologram Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 via-transparent to-cyan-600/10 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full border border-cyan-400/30"></div>

                  {/* Avatar */}
                  <img
                    src="/assets/tanvir_1.JPG"
                    alt="Profile"
                    className="relative z-10 w-full h-full object-cover rounded-full drop-shadow-2xl"
                  />

                  {/* Scanning Lines Effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 animate-scan"></div>
                  </div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0">
                  {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-full animate-orbit"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '8s'
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full opacity-60 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Tech Icons */}
              <div className="absolute -top-8 -left-8 text-3xl text-cyan-400 animate-bounce" style={{ animationDelay: '0s' }}>
                <FaLaptopCode />
              </div>

              {/* DSA */}
              <div className="absolute -top-8 -right-8 text-3xl text-cyan-400 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <FaCode />
              </div>

              {/* AI / Machine Learning */}
              <div className="absolute -bottom-8 -left-8 text-3xl text-pink-400 animate-bounce" style={{ animationDelay: '1s' }}>
                <FaBrain />
              </div>

              {/* Framework / Tech (React logo here as example) */}
              <div className="absolute -bottom-8 -right-8 text-3xl text-blue-400 animate-bounce" style={{ animationDelay: '1.5s' }}>
                <SiReact />
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin-reverse {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            @keyframes scan {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(400%); }
            }
            @keyframes orbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-spin-slow { animation: spin-slow 8s linear infinite; }
            .animate-spin-reverse { animation: spin-reverse 6s linear infinite; }
            .animate-scan { animation: scan 2s linear infinite; }
            .animate-orbit { animation: orbit 8s linear infinite; }
          `}</style>
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator darkMode={darkMode} />

      {/* About Section */}
      <section id="about" className={`py-20 relative ${darkMode ?
        'bg-gradient-to-br from-black/40 via-gray-900/60 to-black/40' :
        'bg-gradient-to-br from-white/40 via-gray-50/60 to-white/40'
        } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            About Me
          </h2>

          {/* About Section with Education */}
          <div className="relative overflow-hidden">
            {/* 3D Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="relative group">
                  {/* 3D Holographic Display */}
                  <div className="relative w-full h-96 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-400/30 overflow-hidden">
                    {/* Hologram Grid */}
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `
                        linear-gradient(cyan 1px, transparent 1px),
                        linear-gradient(90deg, cyan 1px, transparent 1px)
                      `,
                          backgroundSize: '20px 20px',
                          animation: 'hologramMove 3s linear infinite'
                        }}
                      />
                    </div>

                    {/* Central Avatar */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* 3D Avatar Container */}
                        <div className="w-48 h-48 relative group-hover:scale-110 transition-transform duration-500">
                          {/* Rotating Rings */}
                          <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-spin opacity-30"></div>
                          <div className="absolute inset-4 border border-cyan-300 rounded-full animate-spin-reverse opacity-20"></div>

                          {/* Avatar */}
                          <div className="absolute inset-8 bg-gradient-to-br from-cyan-400/30 to-cyan-400/30 rounded-full flex items-center justify-center text-6xl backdrop-blur-sm">
                            👨‍💻
                          </div>

                          {/* Data Points */}
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-cyan-400 text-xs font-mono opacity-80 animate-pulse">
                            {'<Developer />'}
                          </div>
                          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-cyan-400 text-xs font-mono opacity-80 animate-pulse">
                            {'{ experience: "2+ years" }'}
                          </div>
                        </div>

                        {/* Floating Data */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[
                            { text: 'C#', pos: '-top-8 -left-8', color: 'text-blue-400' },
                            { text: 'React', pos: '-top-8 -right-8', color: 'text-cyan-400' },
                            { text: '.NET', pos: '-bottom-8 -left-8', color: 'text-purple-400' },
                            { text: 'Angular', pos: '-bottom-8 -right-8', color: 'text-red-400' }
                          ].map((item, i) => (
                            <div
                              key={i}
                              className={`absolute ${item.pos} ${item.color} text-cyan-400 text-sm font-mono animate-bounce opacity-60`}
                              style={{ animationDelay: `${i * 0.5}s` }}
                            >
                              {item.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Scanning Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-4 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-scan"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                      <li className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} marker:text-cyan-400`}>
                        Jr. Software Engineer at Technohaven, building innovative applications that fuel business growth.
                      </li>
                      <li className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} marker:text-cyan-400`}>
                        Skilled in .NET Core, Angular, and modern web technologies with a passion for clean, scalable code.
                      </li>
                      <li className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} marker:text-cyan-400`}>
                        Outside coding: exploring new tools, open-source contributions, and mentoring fellow developers.
                      </li>
                    </ul>
                  </div>

                  {/* 3D Skills Showcase */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {[
                      { skill: 'Problem Solving', level: <FaLightbulb />, color: 'from-cyan-400 to-blue-500' },
                      { skill: 'Team Leadership', level: <FaUsers />, color: 'from-cyan-400 to-pink-500' },
                      { skill: 'Code Quality', level: <FaCode />, color: 'from-green-400 to-teal-500' },
                      { skill: 'Innovation', level: <FaRocket />, color: 'from-orange-400 to-red-500' }
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-white/50'} backdrop-blur-sm border border-cyan-400/20 hover:scale-105 transition-all duration-300 cursor-pointer`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold">{item.skill}</span>
                          <span className="text-xs text-cyan-400">{item.level}</span>
                        </div>
                        <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full animate-pulse`}
                            style={{
                              width: '90%',
                              animation: `fillBar 2s ease-in-out ${i * 0.2}s forwards`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="mt-20">
                <div className="flex flex-col items-center mb-12">
                  <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-500">
                    {/* 3D University Badge */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center">
                      <div className="text-4xl">🏛️</div>
                    </div>
                    <div className="absolute -inset-2 border-2 border-dashed border-cyan-400 rounded-full animate-spin opacity-50"></div>
                  </div>

                  <h3 className="mt-6 text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-cyan-400 bg-clip-text text-transparent">
                    Education Journey
                  </h3>
                </div>

                <div className="relative">
                  {/* 3D Education Card */}
                  <div className="max-w-4xl mx-auto">
                    <div className={`relative p-8 rounded-3xl ${darkMode ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/60' : 'bg-gradient-to-br from-white/60 to-gray-50/60'} backdrop-blur-sm shadow-2xl border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-500 transform hover:scale-[1.02] group cursor-pointer`}>

                      {/* Floating Graduation Elements */}
                      <div className="absolute -top-4 -right-4 text-4xl animate-bounce group-hover:animate-spin transition-all duration-500">🎓</div>
                      <div className="absolute -bottom-4 -left-4 text-3xl animate-bounce group-hover:animate-pulse" style={{ animationDelay: '0.5s' }}>📚</div>

                      {/* 3D Holographic Border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {/* University Logo/Icon */}
                        <img
                          src="/assets/tk4.JPG"
                          alt="University"
                          className="w-full h-full object-cover rounded-full drop-shadow-2xl"
                        />

                        {/* Education Details */}
                        <div className="lg:col-span-2 space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-2xl font-bold text-cyan-400">
                              Bachelor of Science in Computer Science and Engineering
                            </h4>
                            <p className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              American International University Bangladesh (AIUB)
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                              <Calendar size={16} className="mr-2 text-cyan-400" />
                              Academic Years: 2020-2024
                            </p>
                          </div>

                          {/* Thesis Highlight */}
                          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-cyan-50'} border-l-4 border-cyan-400 hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}>
                            <h5 className="font-bold text-cyan-400 mb-2 flex items-center">
                              🔬 Bachelor's Thesis
                            </h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              <strong>"Plant Disease Detection Learning with hybrid model using Machine Learning & Deep Learning"</strong>
                            </p>
                          </div>

                          {/* Relevant Coursework */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                            {[
                              'Data Structures & Algorithms',
                              'Advanced Programming with .NET',
                              'Advanced Programming in Web Technology (NestJS + NextJS)',
                              'Advanced Database Management Systems',
                              'Software Requirement Engineering',
                              'Artificial Intelligence and Expert System',
                              'Machine Learning',
                              'Software Engineering'
                            ].map((course, i) => (
                              <div
                                key={i}
                                className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/60' : 'bg-white/60'} backdrop-blur-sm border border-cyan-400/20 text-sm hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                              >
                                <span className="text-cyan-400 mr-2">▶</span>
                                {course}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { number: '2+', label: 'Years Experience', icon: Calendar, color: 'from-cyan-400 to-blue-500' },
                  { number: '10+', label: 'Projects Completed', icon: Target, color: 'from-cyan-400 to-pink-500' },
                  { number: '8+', label: 'Technologies Mastered', icon: Award, color: 'from-green-400 to-teal-500' }
                ].map(({ number, label, icon: Icon, color }, i) => (
                  <div
                    key={label}
                    className={`
        relative text-center p-8 rounded-3xl 
        ${darkMode ? 'bg-gray-700/50' : 'bg-white/50'} 
        backdrop-blur-sm border border-cyan-400/20 
        hover:border-cyan-400/50 shadow-lg 
        transition-all duration-500 transform 
        hover:scale-110 hover:rotate-3 group overflow-hidden cursor-pointer
      `}
                  >
                    {/* Gradient Glow Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>

                    <div className="relative z-10">
                      {/* Icon Circle */}
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${color} mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500`}>
                        <Icon size={32} className="text-white group-hover:animate-spin" />
                      </div>

                      {/* Number */}
                      <div className={`text-4xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500`}>
                        {number}
                      </div>

                      {/* Label */}
                      <div className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {label}
                      </div>
                    </div>

                    {/* Orbiting Decorative Dots */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style jsx>{`
          @keyframes hologramMove {
            0% { transform: translateY(0); }
            100% { transform: translateY(20px); }
          }
          @keyframes fillBar {
            from { width: 0; }
            to { width: 90%; }
          }
        `}</style>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator darkMode={darkMode} />

      {/* Skills Section */}
      <section id="skills" className={`py-20 relative ${darkMode ?
        'bg-gradient-to-br from-black/40 via-gray-900/60 to-black/40' :
        'bg-gradient-to-br from-white/40 via-gray-50/60 to-white/40'
        } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Backend Technologies',
                icon: Server,
                skills: [
                  { name: '.NET Core Web API', icon: SiDotnet },
                  { name: 'ASP.NET MVC', icon: SiDotnet },
                  { name: 'NestJS', icon: SiNestjs },
                  { name: 'Node', icon: SiNodedotjs },
                  // { name: 'C#', icon: SiCsharp },
                  { name: 'C++', icon: SiCplusplus },
                  { name: 'PHP', icon: SiPhp },
                  { name: 'Python', icon: SiPython },
                  // { name: 'SQL', icon: SiSql }
                ]
              },
              {
                title: 'Frontend Technologies',
                icon: Palette,
                skills: [
                  { name: 'Angular', icon: SiAngular },
                  { name: 'React', icon: SiReact },
                  { name: 'TypeScript', icon: SiTypescript },
                  { name: 'JavaScript', icon: SiJavascript },
                  { name: 'NextJS', icon: SiNextdotjs },
                  { name: 'Bootstrap', icon: SiBootstrap },
                  { name: 'Tailwind CSS', icon: SiTailwindcss }
                ]
              },
              {
                title: 'Tools & Technologies',
                icon: Database,
                skills: [
                  { name: 'PostgreSQL', icon: SiPostgresql },
                  { name: 'MySQL', icon: SiMysql },
                  { name: 'Git & GitHub', icon: SiGit },
                  { name: 'Docker', icon: SiDocker },
                  { name: 'Kubernetes', icon: SiKubernetes },
                  { name: 'Postman', icon: SiPostman },
                  { name: 'Jira', icon: SiJira },
                ]
              }
            ].map(({ title, icon: Icon, skills }) => (
              <div key={title} className={`relative p-6 rounded-2xl ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40 transform hover:scale-105 cursor-pointer group`}>
                {/* Cyan Glow Line - appears on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-cyan-400/50"></div>

                <div className="relative z-10 group-hover:pl-4 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-600 mr-4 shadow-lg">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">{title}</h3>
                  </div>

                  <div className="space-y-3">
                    {skills.map((skill) => (
                      <div key={skill.name} className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700/60' : 'bg-gray-50/60'} hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-600 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105 backdrop-blur-sm group/skill`}>
                        <skill.icon size={20} className="mr-3 group-hover/skill:animate-pulse" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator darkMode={darkMode} />

      {/* Experience Section */}
      <section id="experience" className={`py-20 relative ${darkMode ?
        'bg-gradient-to-br from-black/40 via-gray-900/60 to-black/40' :
        'bg-gradient-to-br from-white/40 via-gray-50/60 to-white/40'
        } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-cyan-600"></div>

            <div className="space-y-8">
              {[
                {
                  title: 'Jr. Software Engineer',
                  company: 'Technohaven',
                  duration: 'August 2024 – Present',
                  achievements: [
                    'Spearheaded frontend development using Angular v19 with reusable architecture',
                    'Developed scalable .NET Core backend APIs using N-Tier architecture and SOLID principles',
                    'Built TPMS with AI/ML integration for real-time activity monitoring and NLP-based summarization',
                    'Implemented JWT authorization, lazy loading and client-side caching for optimized performance'
                  ]
                },
                {
                  title: 'Intern',
                  company: 'Dr. Anwarul Abedin Institute of Innovation (D2A2I)',
                  duration: 'April 2024 – August 2024',
                  achievements: [
                    'Contributed to R&D for TRP System using ASP.NET Core and PostgreSQL',
                    'Enhanced UI/UX with responsive design using React and Tailwind CSS',
                    'Collaborated on joint initiative between BSCL & D2A2I for analytics system development'
                  ]
                }
              ].map((job, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div className={`ml-20 p-8 rounded-2xl ${darkMode ? 'bg-gray-700/60' : 'bg-white/60'} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40 transform hover:scale-[1.02] cursor-pointer w-full`}>
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-400 mb-2">{job.title}</h3>
                      <h4 className="text-xl font-semibold mb-2">{job.company}</h4>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Calendar size={16} className="inline mr-2" />
                        {job.duration}
                      </p>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, idx) => (
                          <li key={idx} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="text-cyan-400 mr-2 mt-1">▶</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator darkMode={darkMode} />

      {/* Projects Section */}
      <section id="projects" className={`py-20 relative ${darkMode ?
        'bg-gradient-to-br from-black/40 via-gray-900/60 to-black/40' :
        'bg-gradient-to-br from-white/40 via-gray-50/60 to-white/40'
        } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'VATPrompt',
                description: 'VAT TAX Automation Software with Angular v19 frontend and .NET Core backend',
                tech: ['Angular', '.NET Core', 'PostgreSQL', 'JWT'],
                icon: '📊'
              },
              {
                title: 'TPMS',
                description: 'Task Progress Management System with AI/ML integration for activity monitoring',
                tech: ['Angular', '.NET Core', 'AI/ML', 'NLP'],
                icon: '🤖'
              },
              {
                title: 'RentEase',
                description: 'Rental Management System using ASP.NET Web API with N-tier architecture',
                tech: ['ASP.NET', 'Web API', 'Entity Framework'],
                icon: '🏠',
                github: 'https://github.com/md-tanvir-0/HEMS--Final-Project--ASP.NET--Web-API'
              },
              {
                title: 'Hunger0',
                description: 'NGO Management Platform for food distribution with donor-recipient matching',
                tech: ['ASP.NET MVC', 'SQL Server', 'Bootstrap'],
                icon: '🍽️',
                github: 'https://github.com/md-tanvir-0/ASP.NET/tree/main/ZeroH'
              },
              {
                title: 'FinTech',
                description: 'Mobile Banking System with NestJS backend and NextJS frontend',
                tech: ['NestJS', 'NextJS', 'TypeScript', 'MongoDB'],
                icon: '💳',
                github: 'https://github.com/md-tanvir-0/Adv-WebTech/tree/main/mobile-banking-management-system'
              },
              {
                title: 'Plant Disease Detection',
                description: 'ML/DL hybrid model for plant disease detection (Bachelor\'s Thesis)',
                tech: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow'],
                icon: '🌱'
              }
            ].map((project, index) => (
              <div key={index} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-cyan-400/20 hover:border-cyan-400/40 cursor-pointer group`}>
                <div className="text-4xl mb-4 group-hover:animate-bounce">{project.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">{project.title}</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm hover:bg-cyan-400/30 transition-colors cursor-pointer">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-500 transition-colors cursor-pointer"
                  >
                    <Github size={16} />
                    <span>View Code</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator darkMode={darkMode} />

      {/* Contact Section */}
      <section id="contact" className={`py-20 relative ${darkMode ?
        'bg-gradient-to-br from-black/40 via-gray-900/60 to-black/40' :
        'bg-gradient-to-br from-white/40 via-gray-50/60 to-white/40'
        } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect!</h3>
                <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I'm always open to discussing new opportunities, interesting projects,
                  or just having a conversation about technology and software development.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'tanviraiub321@gmail.com', href: 'mailto:tanviraiub321@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+880 1707 386142', href: 'tel:+8801707386142' },
                  { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh', href: '#' },
                  { icon: Linkedin, label: 'LinkedIn', value: 'md-tanvir-0', href: 'https://linkedin.com/in/md-tanvir-0' },
                  { icon: Github, label: 'GitHub', value: 'md-tanvir-0', href: 'https://github.com/md-tanvir-0' }
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className={`flex items-center space-x-4 p-4 rounded-xl ${darkMode ? 'bg-gray-700/60 hover:bg-gray-600/60' : 'bg-white/60 hover:bg-gray-50/60'} backdrop-blur-sm transition-all duration-300 transform hover:scale-105 cursor-pointer border border-cyan-400/20 hover:border-cyan-400/40`}>
                    <div className="flex-shrink-0">
                      <Icon size={24} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-semibold">{label}</div>
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className={`${href === '#' ? 'cursor-default' : 'hover:text-cyan-400 transition-colors cursor-pointer'} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        {value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/60' : 'bg-white/60'} backdrop-blur-sm shadow-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300`}>
              <h3 className="text-2xl font-bold mb-6">Send Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 backdrop-blur-sm ${darkMode
                        ? 'bg-gray-600/60 border-gray-500/60 text-white placeholder-gray-400'
                        : 'bg-gray-50/60 border-gray-300/60 text-gray-900 placeholder-gray-500'
                        }`}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 backdrop-blur-sm ${darkMode
                        ? 'bg-gray-600/60 border-gray-500/60 text-white placeholder-gray-400'
                        : 'bg-gray-50/60 border-gray-300/60 text-gray-900 placeholder-gray-500'
                        }`}
                      required
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 backdrop-blur-sm ${darkMode
                      ? 'bg-gray-600/60 border-gray-500/60 text-white placeholder-gray-400'
                      : 'bg-gray-50/60 border-gray-300/60 text-gray-900 placeholder-gray-500'
                      }`}
                    required
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 resize-none backdrop-blur-sm ${darkMode
                      ? 'bg-gray-600/60 border-gray-500/60 text-white placeholder-gray-400'
                      : 'bg-gray-50/60 border-gray-300/60 text-gray-900 placeholder-gray-500'
                      }`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white rounded-lg hover:from-cyan-500 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold cursor-pointer"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t backdrop-blur-sm ${darkMode ? 'bg-gray-900/60 border-gray-800/60' : 'bg-white/60 border-gray-200/60'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                © 2025 MD Tanvir Hossain. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Available for work
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}