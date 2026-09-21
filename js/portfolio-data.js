/**
 * ===================================================================
 * KISHORE NAIK - PORTFOLIO DATA CONFIGURATION
 * ===================================================================
 * Centralized single source of truth for all portfolio content.
 * Update any section, photo paths, social links, or project details
 * here without having to edit HTML or CSS.
 */

const PORTFOLIO_DATA = {
  // Personal Details
  personal: {
    fullName: "Kishore Naik",
    shortName: "Kishore",
    title: "KISHORE NAIK",
    role: "3rd Year B.Tech CSE Student",
    subtitle: "B.Tech CSE Student • Developer • Problem Solver • Tech Explorer",
    heroStatement: "Turning ideas into useful digital experiences.",
    shortBio: "I am Kishore Naik, a 3rd Year B.Tech Computer Science and Engineering student passionate about technology, software development, problem solving, and building useful digital experiences.",
    aboutDetailed: "I am Kishore Naik, currently pursuing my 3rd Year B.Tech in Computer Science and Engineering at Gokula Krishna College of Engineering. I enjoy learning new technologies, developing applications, solving problems, and exploring innovative ideas with a keen focus on practical impact and continuous growth.",
    
    // College & Academic Status
    college: "Gokula Krishna College of Engineering",
    degree: "B.Tech, Computer Science and Engineering",
    yearOfStudy: "3rd Year",
    department: "Computer Science and Engineering",

    // Native Place & Roots
    roots: {
      place: "Bommarajupalli Thanda",
      mandal: "Ipur Mandal",
      district: "Palnadu District",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: "16.14° N, 79.80° E (Approx)",
      quote: "Grounded in humble beginnings, driven by curiosity, and empowered by education to build meaningful solutions for the world."
    },

    // Contact Information
    email: "kishorenaik2k06@gmail.com",
    phone: "+91 7013741421",
    whatsappNumber: "917013741421",
    
    // Social Links (Editable Placeholders)
    socialLinks: {
      github: "https://github.com/your-kishorenaikb",
      linkedin: "https://linkedin.com/in/LINKEDIN_URL",
      instagram: "https://instagram.com/__1ts__k1shore__na1k___",
      facebook: "https://facebook.com/1tsk1shorena1k",
      whatsapp: "https://wa.me/917013741421?text=Hi%20Kishore,%20I%20came%20across%20your%20portfolio!",
      emailLink: "mailto:kishorenaik2k06@gmail.com"
    },

    // Quick Stats / Info Cards
    infoCards: [
      { label: "Current Status", value: "3rd Year B.Tech CSE", icon: "academic" },
      { label: "Location", value: "Palnadu District, Andhra Pradesh", icon: "location" },
      { label: "Field", value: "Computer Science & Engineering", icon: "code" },
      { label: "Focus", value: "Development • Problem Solving • Technology", icon: "sparkles" }
    ],

    // Focus Interests
    interestsList: [
      "Software Development",
      "Web Development",
      "Artificial Intelligence",
      "Programming",
      "Problem Solving",
      "Cybersecurity",
      "Modern Technology"
    ]
  },

  // Photo System (Preserves real identity - replaceable paths or browser local storage)
  photos: {
    heroProfile: "assets/images/profile.jpg",
    btechPhoto: "assets/images/btech.jpg",
    intermediatePhoto: "assets/images/intermediate.jpg",
    sscPhoto: "assets/images/ssc.jpg"
  },

  // Education Timeline (SSC -> Intermediate -> B.Tech)
  education: [
    {
      id: "btech",
      level: "B.Tech",
      badge: "Current Stage",
      period: "2023 - 2027 (Expected)",
      currentYear: "3rd Year",
      institution: "Gokula Krishna College of Engineering",
      course: "B.Tech in Computer Science and Engineering",
      medium: "English Medium",
      location: "Andhra Pradesh, India",
      photoSlot: "btechPhoto",
      photoLabel: "B.Tech Photo",
      description: "Currently mastering core computer science principles including Data Structures, Algorithms, Object-Oriented Programming, Database Systems, Computer Networks, and Modern Web Architectures. Actively collaborating with peers, participating in technical workshops, and building hands-on applications.",
      highlights: [
        "Specializing in Computer Science & Engineering",
        "Deepening knowledge in Java, Python, and Web Development",
        "Engaging in problem-solving practice and collaborative student projects",
        "Exploring emerging technology trends in software systems & AI"
      ],
      skillsLearned: ["Java", "Python", "Data Structures", "Database Management", "Web Technologies", "Software Engineering"]
    },
    {
      id: "intermediate",
      level: "Intermediate",
      badge: "Completed",
      period: "Senior Secondary",
      institution: "Andhra Pradesh Tribal Welfare Residential College of Excellence (Boys)",
      course: "Intermediate (MPC / Science)",
      medium: "English Medium",
      location: "Yerragondapalem, Prakasam District, Andhra Pradesh",
      photoSlot: "intermediatePhoto",
      photoLabel: "Intermediate Photo",
      description: "Studied at the prestigious College of Excellence in Yerragondapalem under the Tribal Welfare Department. Developed a rigorous foundation in Mathematics, Physics, and Chemistry, cultivating strong analytical and logical reasoning skills that prepared me for Engineering.",
      highlights: [
        "Selected to study at the state-recognized College of Excellence",
        "Developed solid mathematical logic and disciplined study habits",
        "Formative years fostering self-reliance, academic curiosity, and camaraderie"
      ],
      skillsLearned: ["Analytical Reasoning", "Mathematics & Physics", "Logical Thinking", "Problem Formulation"]
    },
    {
      id: "ssc",
      level: "SSC / School",
      badge: "Completed",
      period: "Secondary School Certificate",
      institution: "Andhra Pradesh Tribal Welfare Residential School (Boys)",
      course: "Class 10th (SSC)",
      medium: "English Medium",
      location: "Narasaraopet, Andhra Pradesh",
      photoSlot: "sscPhoto",
      photoLabel: "SSC / School Photo",
      description: "Completed secondary school education with distinction in English Medium at APTWR School (Boys), Narasaraopet. This foundational phase sparked my passion for science, computers, and problem solving, laying the bedrock for my academic journey.",
      highlights: [
        "Excellence in English Medium secondary curriculum",
        "Active involvement in school science clubs and academic competitions",
        "Instilled lifelong dedication to hard work and community values"
      ],
      skillsLearned: ["Foundational Mathematics", "Science Inquiry", "Communication Skills", "Teamwork"]
    }
  ],

  // Skills
  skills: {
    programming: [
      { name: "Python", level: 85, icon: "python", tag: "Core" },
      { name: "Java", level: 85, icon: "java", tag: "Core" },
      { name: "C", level: 78, icon: "c", tag: "Foundational" },
      { name: "C++", level: 75, icon: "cpp", tag: "OOP & DSA" },
      { name: "JavaScript", level: 82, icon: "javascript", tag: "Dynamic" }
    ],
    development: [
      { name: "HTML5", level: 90, icon: "html", tag: "Semantic Markup" },
      { name: "CSS3 / Glassmorphism", level: 88, icon: "css", tag: "Styling & Responsive" },
      { name: "JavaScript (ES6+)", level: 82, icon: "js", tag: "Interactive Client" },
      { name: "Frontend Development", level: 85, icon: "layout", tag: "UI / UX Systems" },
      { name: "Web Development", level: 82, icon: "globe", tag: "Full-cycle Websites" }
    ],
    core: [
      { name: "Problem Solving", level: 88, icon: "puzzle", tag: "Algorithms" },
      { name: "Logical Thinking", level: 90, icon: "cpu", tag: "Analytical" },
      { name: "Programming Fundamentals", level: 90, icon: "code", tag: "Architecture" },
      { name: "Debugging & Optimization", level: 80, icon: "bug", tag: "Diagnostics" }
    ],
    interests: [
      { name: "Artificial Intelligence", level: 75, icon: "sparkles", tag: "Exploration" },
      { name: "Modern Software Dev", level: 82, icon: "laptop", tag: "Engineering" },
      { name: "Cybersecurity Basics", level: 68, icon: "shield", tag: "Security Awareness" },
      { name: "Emerging Technologies", level: 75, icon: "rocket", tag: "Innovation" }
    ]
  },

  // Problem Solving Dedicated Section Data
  problemSolving: {
    title: "Problem Solver & Analytical Thinker",
    subtitle: "Deconstructing complexity into efficient, maintainable code",
    description: "For me, programming is not just about writing syntax; it is about formulating structured solutions to real problems. I enjoy dissecting complex logic, tracing corner cases, and optimizing time and space complexity across algorithms.",
    pillars: [
      {
        title: "Logical Thinking",
        desc: "Breaking down intricate requirements into unambiguous atomic steps and decision trees.",
        icon: "brain"
      },
      {
        title: "Algorithmic Thinking",
        desc: "Selecting the right data structures and algorithmic paradigms for efficiency and scale.",
        icon: "flow"
      },
      {
        title: "Hands-on Practice",
        desc: "Regular problem-solving across sorting, searching, array manipulations, and recursion.",
        icon: "terminal"
      },
      {
        title: "Debugging & Refinement",
        desc: "Methodically isolating root causes, verifying edge cases, and cleaning code architecture.",
        icon: "inspect"
      }
    ],
    codeSnippet: `// Example: Binary Search & Two-Pointer Paradigm
public int searchElement(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Target not found
}`
  },

  // Featured Project
  featuredProject: {
    id: "featured-1",
    title: "Liquid Glass Portfolio & Digital Identity System",
    category: "WEB",
    status: "Completed / Active",
    summary: "A high-performance, dark-mode personal developer website built with an Apple-inspired Liquid Glass UI, modular architecture, and instant local customization.",
    problem: "Most student portfolio websites rely on generic, cluttered templates that fail to convey authentic developer craftsmanship, clean visual hierarchy, and genuine academic journey.",
    solution: "Designed and engineered an ultra-smooth, responsive portfolio system using layered frosted glass, CSS hardware acceleration, centralized data modeling, and zero-bloat vanilla web standards.",
    features: [
      "Custom Frosted Liquid Glass UI design system with specular highlights",
      "Interactive 3-tier education timeline with dedicated photo slots",
      "Global Command Palette (Ctrl+K) with instant search indexing",
      "Real-time local photo manager allowing zero-friction image uploads",
      "Responsive bottom floating dock and sticky glass mega-menu navbar"
    ],
    technologies: ["HTML5", "CSS3 / Glassmorphism", "JavaScript (ES6+)", "Canvas 2D", "Responsive Web Design"],
    image: "assets/images/project-featured.svg",
    githubUrl: "https://github.com/your-kishorenaikb",
    liveDemoUrl: "#"
  },

  // Projects Grid
  projects: [
    {
      id: "proj-1",
      title: "Interactive Algorithm Visualizer",
      category: "PYTHON",
      tags: ["Python", "Algorithms", "DSA"],
      status: "Active Development",
      description: "Visual simulator demonstrating standard sorting, searching, and traversal algorithms step-by-step to deepen conceptual understanding.",
      problem: "Visualizing recursion, pointer movements, and sorting passes is challenging through static textbooks alone.",
      solution: "Built an interactive visual console and step-by-step tracer that illustrates comparisons, swaps, and state transitions in real time.",
      features: ["Step-by-step execution mode", "Comparison counter and complexity analysis", "Custom dataset inputs"],
      technologies: ["Python", "Tkinter / GUI", "Algorithms"],
      githubUrl: "https://github.com/your-kishorenaikb",
      liveDemoUrl: "#"
    },
    {
      id: "proj-2",
      title: "Student Academic & Grade Tracker",
      category: "JAVA",
      tags: ["Java", "OOP", "File I/O"],
      status: "Completed",
      description: "An object-oriented desktop application enabling students to manage courses, compute semester SGPA/CGPA, and track academic milestones.",
      problem: "Students frequently lose track of their academic credits and grading requirements across diverse semesters.",
      solution: "Engineered a clean Java application adhering to SOLID principles and robust input validation to streamline academic record-keeping.",
      features: ["Semester-wise SGPA & cumulative CGPA calculation", "Persistent file storage", "Target score projections"],
      technologies: ["Java", "OOP Architecture", "File Handling", "Data Validation"],
      githubUrl: "https://github.com/your-kishorenaikb",
      liveDemoUrl: "#"
    },
    {
      id: "proj-3",
      title: "Smart Task & Study Planner",
      category: "WEB",
      tags: ["Web", "JavaScript", "Frontend"],
      status: "Completed",
      description: "A sleek productivity tool crafted for CSE students to prioritize programming drills, assignments, and exam revision.",
      problem: "Context switching and lack of clear daily goals lead to procrastination in engineering coursework.",
      solution: "Created an intuitive, distraction-free productivity planner featuring Pomodoro focus cycles, priority matrices, and persistent browser storage.",
      features: ["Priority categorization (High / Medium / Low)", "Pomodoro study timer", "Local storage persistence"],
      technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage API"],
      githubUrl: "https://github.com/your-kishorenaikb",
      liveDemoUrl: "#"
    },
    {
      id: "proj-4",
      title: "AI Concepts & Tech Explorer Hub",
      category: "AI",
      tags: ["AI", "Tech Research", "Python"],
      status: "In Progress",
      description: "An exploratory repository cataloging experiments with prompt engineering, text processing heuristics, and introductory machine learning workflows.",
      problem: "Understanding modern AI architectures requires methodical hands-on exploration beyond theoretical readings.",
      solution: "Curating a structured playground of foundational AI scripts, heuristic search demonstrations, and data exploration notebooks.",
      features: ["Exploratory NLP scripts", "Model parameter comparison notes", "Interactive CLI utilities"],
      technologies: ["Python", "NumPy Basics", "AI Heuristics"],
      githubUrl: "https://github.com/your-kishorenaikb",
      liveDemoUrl: "#"
    },
    {
      id: "proj-5",
      title: "College Department Notice Board",
      category: "CSE",
      tags: ["CSE", "Web", "UI/UX"],
      status: "Prototype",
      description: "A centralized digital portal concept for streamlining departmental circulars, lab timetables, and technical event alerts.",
      problem: "Important circulars and workshop announcements are frequently scattered across various messaging groups.",
      solution: "Designed a responsive glassmorphic bulletin board dashboard with filterable tags and downloadable attachments.",
      features: ["Category-based circular filters", "Event calendar preview", "Mobile-optimized interface"],
      technologies: ["HTML5", "CSS Grid", "JavaScript"],
      githubUrl: "https://github.com/your-kishorenaikb",
      liveDemoUrl: "#"
    },
    {
      id: "proj-6",
      title: "C / C++ Memory & Pointer Playground",
      category: "OTHER",
      tags: ["C", "C++", "Systems"],
      status: "Educational Sandbox",
      description: "A suite of documented programs demonstrating dynamic memory allocation, pointer arithmetic, linked data structures, and memory safety.",
      problem: "Grasping pointer memory addresses and dynamic allocations in low-level languages can be error-prone for students.",
      solution: "Authored modular, thoroughly annotated C/C++ implementations illustrating stack vs heap mechanics with clean error guards.",
      features: ["Linked list & stack implementations", "Dynamic array resizing", "Address mapping demonstrations"],
      technologies: ["C", "C++", "Memory Management"],
      githubUrl: "https://github.com/your-kishorenaikb",
      liveDemoUrl: "#"
    }
  ],

  // My Journey Interactive Nodes
  journey: [
    {
      stage: "Schooling (SSC)",
      institution: "APTWR School (Boys), Narasaraopet",
      year: "Foundational Years",
      icon: "school",
      title: "Igniting the Spark of Science",
      details: "Discovered an innate love for mathematics, logic, and computers while studying in English Medium in Narasaraopet. Built strong academic discipline that set the trajectory for my higher studies."
    },
    {
      stage: "Intermediate",
      institution: "APTWR College of Excellence (Boys), Yerragondapalem",
      year: "Senior Secondary",
      icon: "academic",
      title: "Rigorous Analytical Foundation",
      details: "Selected for the state College of Excellence. Rigorous focus on Mathematics, Physics, and Chemistry sharpened my problem-solving instincts, preparing me to take on Computer Science and Engineering."
    },
    {
      stage: "B.Tech CSE",
      institution: "Gokula Krishna College of Engineering",
      year: "2023 - Present (3rd Year)",
      icon: "university",
      title: "Stepping into Computer Science",
      details: "Enrolled in B.Tech CSE. Transitioned from theoretical curiosity into hands-on code development, algorithmic foundations, database systems, and software engineering methodologies."
    },
    {
      stage: "Programming Mastery",
      institution: "Self-Driven & Coursework",
      year: "Continuous",
      icon: "code",
      title: "Commanding Languages & Core DSA",
      details: "Dedicated consistent hours to Python, Java, C, C++, and JavaScript. Practicing algorithmic problem solving and writing clean, modular code."
    },
    {
      stage: "Hands-on Projects",
      institution: "Practical Engineering",
      year: "Present",
      icon: "rocket",
      title: "Turning Ideas into Digital Reality",
      details: "Building real-world web applications, visualizers, and student tools. Focused on responsive design, modern UI/UX, and robust software architecture."
    },
    {
      stage: "Future Horizons",
      institution: "Career Aspirations",
      year: "Upcoming",
      icon: "target",
      title: "Professional Developer & Innovator",
      details: "Aiming to excel as a software engineer, contribute to impactful technology products, solve meaningful problems at scale, and continuously explore emerging tech and AI."
    }
  ],

  // Achievements
  achievements: [
    {
      title: "Selected for AP Tribal Welfare College of Excellence",
      category: "Academic",
      date: "Intermediate",
      organization: "Department of Tribal Welfare, AP",
      description: "Earned admission into the prestigious state-level College of Excellence (Boys) in Yerragondapalem based on competitive academic merit.",
      icon: "trophy"
    },
    {
      title: "Consistent Academic Progress in B.Tech CSE",
      category: "Technical",
      date: "3rd Year",
      organization: "Gokula Krishna College of Engineering",
      description: "Maintaining a focused trajectory across Computer Science core coursework including Object-Oriented Programming, DSA, and DBMS.",
      icon: "medal"
    },
    {
      title: "Technical Workshop & Coding Participation",
      category: "Workshops",
      date: "College Level",
      organization: "College & Tech Communities",
      description: "Active attendee of technical seminars and student workshops focusing on emerging technologies, software development, and programming practices.",
      icon: "badge"
    },
    {
      title: "Open for Upcoming Hackathons & Competitions",
      category: "Competitions",
      date: "2026",
      organization: "Engineering Forums",
      description: "Currently gearing up to represent Gokula Krishna College of Engineering in upcoming state and national student hackathons.",
      icon: "award"
    }
  ],

  // Certifications
  certifications: [
    {
      title: "Programming in Java & Object-Oriented Design",
      organization: "Technical Coursework / Online Learning",
      date: "2025",
      credentialId: "JAVA-CSE-KN-01",
      image: "assets/images/cert-placeholder.svg",
      description: "Covered encapsulation, inheritance, polymorphism, abstract classes, exception handling, and core Java collections."
    },
    {
      title: "Python Programming & Algorithmic Foundations",
      organization: "Academic Learning & Practical Drills",
      date: "2024",
      credentialId: "PY-DSA-KN-02",
      image: "assets/images/cert-placeholder.svg",
      description: "Comprehensive coverage of Python syntax, data structures, modular programming, and algorithmic problem-solving."
    },
    {
      title: "Responsive Web Development & Frontend Essentials",
      organization: "Web Development Sandbox",
      date: "2025",
      credentialId: "WEB-DEV-KN-03",
      image: "assets/images/cert-placeholder.svg",
      description: "Mastery of HTML5 semantic structure, modern CSS3 layout systems (Flexbox, Grid, Glassmorphism), and JavaScript DOM interactions."
    }
  ],

  // Experience Section
  experience: {
    statusNote: "Currently building experience through projects, learning and technical exploration.",
    roles: [
      {
        role: "B.Tech Computer Science Student & Project Developer",
        organization: "Gokula Krishna College of Engineering",
        period: "2023 - Present",
        type: "Academic & Practical",
        bullets: [
          "Developing modular web and software applications adhering to clean coding conventions.",
          "Engaging in peer code reviews, lab practicals, and collaborative technology exploration.",
          "Building a strong personal digital presence and technical portfolio."
        ]
      },
      {
        role: "Independent Technical Learner & Problem Solver",
        organization: "Self-Directed",
        period: "Ongoing",
        type: "Self-Initiated",
        bullets: [
          "Regularly practicing algorithmic reasoning and programming challenges in Java and Python.",
          "Exploring modern web technologies, glassmorphic UI design, and responsive design systems.",
          "Documenting code and preparing for software engineering internship opportunities."
        ]
      }
    ]
  },

  // Interests Section ("What I Enjoy")
  interests: {
    books: [
      { title: "Clean Code", author: "Robert C. Martin", note: "Principles of writing readable and maintainable software" },
      { title: "Algorithms Unlocked", author: "Thomas H. Cormen", note: "Demystifying fundamental computational thinking" },
      { title: "Wings of Fire", author: "Dr. A.P.J. Abdul Kalam", note: "Inspiring journey of resilience and scientific spirit" },
      { title: "Atomic Habits", author: "James Clear", note: "Building disciplined systems for incremental excellence" }
    ],
    music: {
      nowPlaying: "Ambient Focus Beats",
      genre: "Instrumental, Lo-Fi & Melodic Soundtracks",
      quote: "Music provides the rhythm that powers deep coding and calm problem solving."
    },
    gaming: {
      favoriteGenres: ["Strategy", "Puzzle & Logic", "Adventure", "Simulation"],
      focus: "Appreciating game design, spatial strategy, quick decision making, and real-time mechanics."
    },
    otherInterests: [
      { name: "Programming", desc: "Crafting structured logic from scratch in code.", icon: "terminal" },
      { name: "Problem Solving", desc: "Puzzling through algorithms and debugging edge cases.", icon: "puzzle" },
      { name: "Exploring Technology", desc: "Keeping tabs on breakthroughs across hardware and software.", icon: "cpu" },
      { name: "Exploring AI", desc: "Investigating how intelligent systems reshape modern computing.", icon: "sparkles" },
      { name: "Learning Development", desc: "Continuously mastering modern full-stack web technologies.", icon: "globe" }
    ]
  },

  // Family Section (Respectful, Warm, Professional - No private data invented)
  family: [
    { relationship: "Nanna", title: "Father", desc: "Pillar of guidance, hard work, and moral foundation.", icon: "shield" },
    { relationship: "Amma", title: "Mother", desc: "Endless love, encouragement, and the heartbeat of our home.", icon: "heart" },
    { relationship: "Annaiah", title: "Elder Brother", desc: "Supportive mentor, companionship, and constant encouragement.", icon: "users" },
    { relationship: "Thammudu", title: "Younger Brother", desc: "Joyful energy, shared dreams, and lifelong camaraderie.", icon: "smile" },
    { relationship: "Akka", title: "Elder Sister", desc: "Caring elder sister, warmth, and wise counsel.", icon: "star" },
    { relationship: "Nenu", title: "Kishore Naik", desc: "Striving every day to make my family and community proud.", icon: "user" }
  ],

  // Gallery
  gallery: [
    {
      id: "gal-1",
      title: "B.Tech Academic Environment",
      category: "B.Tech",
      caption: "Computer Science and Engineering learning journey at Gokula Krishna College of Engineering.",
      image: "assets/images/btech.jpg",
      isPhotoSlot: "btechPhoto"
    },
    {
      id: "gal-2",
      title: "Intermediate College of Excellence",
      category: "Intermediate",
      caption: "Cherished learning memories at APTWR College of Excellence (Boys), Yerragondapalem.",
      image: "assets/images/intermediate.jpg",
      isPhotoSlot: "intermediatePhoto"
    },
    {
      id: "gal-3",
      title: "School Days in Narasaraopet",
      category: "School",
      caption: "Foundational memories from APTWR School (Boys), Narasaraopet.",
      image: "assets/images/ssc.jpg",
      isPhotoSlot: "sscPhoto"
    },
    {
      id: "gal-4",
      title: "Developer Workspace & Coding Hours",
      category: "Projects",
      caption: "Late evening sessions crafting algorithms, debugging code, and designing interfaces.",
      image: "assets/images/profile.jpg",
      isPhotoSlot: "heroProfile"
    },
    {
      id: "gal-5",
      title: "Campus Engineering Life",
      category: "College Life",
      caption: "Collaborating with fellow classmates, discussions in labs, and academic milestones.",
      image: "assets/images/btech.jpg",
      isPhotoSlot: "btechPhoto"
    },
    {
      id: "gal-6",
      title: "Milestones & Future Aspiration",
      category: "Achievements",
      caption: "Each step of education representing perseverance, pride, and purposeful ambition.",
      image: "assets/images/profile.jpg",
      isPhotoSlot: "heroProfile"
    }
  ],

  // Resume Content Summary
  resume: {
    downloadFileName: "Kishore_Naik_Resume.pdf",
    filePath: "assets/documents/Kishore_Naik_Resume.pdf",
    summary: "Dedicated 3rd Year B.Tech Computer Science student with practical proficiency in Java, Python, C, C++, and Modern Web Development. Proven logical problem-solving aptitude, disciplined academic background, and keen enthusiasm for software engineering roles."
  }
};

// Freeze data to prevent accidental runtime mutation
if (typeof Object.freeze === "function") {
  Object.freeze(PORTFOLIO_DATA);
}
