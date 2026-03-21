// Terminal Commands Module
const TerminalCommands = {
  
  help: function() {
    return `
<span class="terminal-success">Available Commands:</span>

<span class="terminal-info">System Information:</span>
  whoami          - Display current user
  hostname        - Show hostname
  uname           - System information
  neofetch        - System info with ASCII art
  date            - Show current date and time
  uptime          - Show system uptime

<span class="terminal-info">File System:</span>
  ls              - List directory contents
  pwd             - Print working directory
  cd [dir]        - Change directory
  cat [file]      - Display file contents
  tree            - Display directory tree

<span class="terminal-info">About Shiwani:</span>
  about           - About Shiwani
  skills          - Technical skills
  projects        - View projects
  education       - Education background
  contact         - Contact information
  github          - GitHub profile
  linkedin        - LinkedIn profile
  email           - Email address

<span class="terminal-info">Utilities:</span>
  clear           - Clear terminal
  history         - Command history
  echo [text]     - Display text
  help            - Show this help message
`;
  },

  whoami: function() {
    return '<span class="terminal-success">shiwani</span>';
  },

  hostname: function() {
    return '<span class="terminal-success">debian-server</span>';
  },

  uname: function(args) {
    if (args.includes('-a')) {
      return 'Linux debian-server 6.1.0-13-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.55-1 (2023-09-29) x86_64 GNU/Linux';
    }
    return 'Linux';
  },


  neofetch: function() {
    return `
<span class="terminal-user">shiwani</span>@<span class="terminal-host">debian-server</span>
<span class="terminal-success">-------------------</span>
<span class="terminal-info">OS:</span> Debian GNU/Linux 12 (bookworm) x86_64
<span class="terminal-info">Host:</span> Shiwani's Portfolio Server
<span class="terminal-info">Kernel:</span> 6.1.0-13-amd64
<span class="terminal-info">Uptime:</span> 15 days, 23 hours, 44 mins
<span class="terminal-info">Shell:</span> bash 5.2.15
<span class="terminal-info">CPU:</span> Intel Core i7 (8) @ 3.50GHz
<span class="terminal-info">Memory:</span> 14.52GB / 17.18GB (85%)
<span class="terminal-info">Disk:</span> 229.95GB / 245.11GB (94%)
`;
  },

  date: function() {
    return new Date().toString();
  },

  uptime: function() {
    return '<span class="terminal-success">15 days, 23 hours, 44 minutes</span>';
  },

  pwd: function() {
    return `/home/shiwani`;
  },

  ls: function(args) {
    const files = [
      { name: 'projects', type: 'dir' },
      { name: 'skills', type: 'dir' },
      { name: 'education', type: 'dir' },
      { name: 'certificates', type: 'dir' },
      { name: 'about.txt', type: 'file' },
      { name: 'contact.txt', type: 'file' },
      { name: 'resume.pdf', type: 'file' },
    ];

    if (args.includes('-la') || args.includes('-l')) {
      let output = '<span class="terminal-info">total 7</span>\n';
      files.forEach(f => {
        const perms = f.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = f.type === 'dir' ? '4096' : '2048';
        const color = f.type === 'dir' ? 'dir-item' : 'file-item';
        output += `${perms}  2 shiwani shiwani ${size.padStart(5)} Dec 22 10:30 <span class="${color}">${f.name}</span>\n`;
      });
      return output;
    }

    return '<div class="file-list">' + 
      files.map(f => {
        const color = f.type === 'dir' ? 'dir-item' : 'file-item';
        return `<span class="${color}">${f.name}</span>`;
      }).join('') + 
      '</div>';
  },

  tree: function() {
    return `
<span class="terminal-path">.</span>
├── <span class="dir-item">projects/</span>
│   ├── menu-based-tool.md
│   ├── cicd-pipeline.md
│   ├── smart-book-tracker.md
│   └── user-management.md
├── <span class="dir-item">skills/</span>
│   ├── languages.txt
│   ├── cloud-devops.txt
│   └── frameworks.txt
├── <span class="dir-item">education/</span>
│   ├── lpu.txt
│   └── linuxworld.txt
├── <span class="dir-item">certificates/</span>
│   ├── nptel-iot.pdf
│   └── meta-python.pdf
├── <span class="file-item">about.txt</span>
├── <span class="file-item">contact.txt</span>
└── <span class="file-item">resume.pdf</span>
`;
  },


  cat: function(args) {
    if (!args.length) {
      return '<span class="terminal-error">cat: missing file operand</span>';
    }

    const file = args[0];
    const files = {
      'about.txt': `
<span class="terminal-success">About Shiwani Yaduka</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I am Shiwani Yaduka, a 3rd-year Computer Science student at Lovely Professional 
University (CGPA: 8.61), based in Bhilwara, Rajasthan.

My journey started with curiosity about how systems communicate — and led me to 
a deep passion for cloud infrastructure, DevOps pipelines, and agentic AI automation.

Currently undergoing intensive training in Agentic AI Platform Development at 
LinuxWorld Informatics, I'm building systems that bridge generative AI with 
cloud-native infrastructure.

<span class="terminal-info">Specializations:</span>
• Cloud Infrastructure (AWS EC2, S3, Lambda, RDS)
• DevOps & CI/CD (Docker, Kubernetes, Jenkins)
• Agentic AI Platform Development
• System Architecture & Automation
`,
      'contact.txt': `
<span class="terminal-success">Contact Information</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-info">Email:</span>      shiwaniyaduka123@gmail.com
<span class="terminal-info">GitHub:</span>     https://github.com/Shiwani-Yaduka
<span class="terminal-info">LinkedIn:</span>   https://www.linkedin.com/in/shiwani12
<span class="terminal-info">Location:</span>   Bhilwara, Rajasthan, India
<span class="terminal-info">University:</span> Lovely Professional University, Phagwara
`,
      'resume.pdf': '<span class="terminal-error">Error: Cannot display binary file. Use download command instead.</span>',
      
      // Projects directory files
      'projects/menu-based-tool.md': `
<span class="terminal-success">Menu-Based Remote Tool</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A centralized DevOps dashboard to manage remote Linux servers and multi-cloud 
infrastructure. Integrates ML processing, Docker/Kubernetes automation, SSH 
utilities, and real-time Twilio/WhatsApp messaging for non-technical users.

<span class="terminal-info">Tech Stack:</span> Python, Gradio, AWS, Docker, Kubernetes, OpenCV, Twilio
<span class="terminal-info">GitHub:</span> github.com/Shiwani-Yaduka/Menu-Based-Remote-Tool
`,
      'projects/cicd-pipeline.md': `
<span class="terminal-success">CI/CD Pipeline for Microservices</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Automated transition from local Flask development to production-ready Docker 
containers with integrated pytest suites. Implements event-driven triggers and 
container orchestration for seamless image updates.

<span class="terminal-info">Tech Stack:</span> Jenkins, Docker, GitHub, Flask, Pytest, Linux
<span class="terminal-info">GitHub:</span> github.com/Shiwani-Yaduka/CI-CD-Pipeline
`,
      'projects/smart-book-tracker.md': `
<span class="terminal-success">Smart Book Tracking</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A cloud-native AI assistant that monitors reading inactivity via CloudWatch and 
sends personalized SNS email reminders. Implements predictive completion 
algorithms and detailed monthly reading reports.

<span class="terminal-info">Tech Stack:</span> AWS EC2, RDS, Lambda, SNS, Python, Flask, MySQL
<span class="terminal-info">GitHub:</span> github.com/Shiwani-Yaduka/Smart-Book-Tracker
`,
      'projects/user-management.md': `
<span class="terminal-success">User-Staff Management System</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Role-based access control using class inheritance for Admin vs Staff privilege 
separation. Uses STL containers (vector, map, stack) for fast lookups and undo 
functionality, with JSON-based persistence and MongoDB integration.

<span class="terminal-info">Tech Stack:</span> C++, OOPs, STL, MongoDB
<span class="terminal-info">GitHub:</span> github.com/Shiwani-Yaduka/User-Management
`,
      
      // Skills directory files
      'skills/languages.txt': `
<span class="terminal-success">Programming Languages</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[*] C++          - Advanced OOP, STL, Data Structures
[*] Python       - Flask, Boto3, OpenAI, Automation
[*] SQL          - MySQL, Database Design, Queries
[*] HTML5        - Semantic markup, Accessibility
[*] CSS3         - Responsive design, Flexbox, Grid
`,
      'skills/cloud-devops.txt': `
<span class="terminal-success">Cloud & DevOps Technologies</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-info">[AWS Services]</span>
  >> EC2         - Virtual servers, Auto-scaling
  >> S3          - Object storage, Static hosting
  >> Lambda      - Serverless functions
  >> RDS         - Managed databases
  >> CloudWatch  - Monitoring & Logging
  >> SNS         - Notification service

<span class="terminal-info">[DevOps Tools]</span>
  >> Docker      - Containerization
  >> Kubernetes  - Container orchestration
  >> Jenkins     - CI/CD pipelines
  >> Git/GitHub  - Version control
  >> Linux       - System administration
`,
      'skills/frameworks.txt': `
<span class="terminal-success">Frameworks & Libraries</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[*] Flask       - Web framework, REST APIs
[*] OpenAI      - GPT integration, AI applications
[*] Boto3       - AWS SDK for Python
[*] Streamlit   - Data apps, Dashboards
[*] Gradio      - ML interfaces
[*] OpenCV      - Computer vision
[*] NumPy       - Numerical computing
[*] Pandas      - Data analysis
`,
      
      // Education directory files
      'education/lpu.txt': `
<span class="terminal-success">Lovely Professional University</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-info">Degree:</span>     B.Tech - Computer Science & Engineering
<span class="terminal-info">Duration:</span>   Aug 2023 - Present
<span class="terminal-info">Location:</span>   Phagwara, Punjab, India
<span class="terminal-info">CGPA:</span>       8.61 / 10.0

<span class="terminal-warning">Key Achievements:</span>
  [*] Maintained consistent academic excellence
  [*] Active participation in technical competitions
  [*] Winner of multiple project competitions
  [*] Focus on Cloud Computing and DevOps
`,
      'education/linuxworld.txt': `
<span class="terminal-success">LinuxWorld Informatics Pvt. Ltd.</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-info">Program:</span>    Agentic AI Platform Development
<span class="terminal-info">Duration:</span>   May 2025 - Aug 2025
<span class="terminal-info">Status:</span>     Certificate Awarded

<span class="terminal-warning">Training Focus:</span>
  [*] Agentic AI systems and automation
  [*] Cloud-native infrastructure
  [*] Multi-cloud platform development
  [*] AI-driven DevOps workflows
  [*] Production-grade system design
`,
      
      // Certificates directory files
      'certificates/nptel-iot.pdf': `
<span class="terminal-success">NPTEL - Introduction to Internet of Things</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-info">Issuer:</span>     National Programme on Technology Enhanced Learning
<span class="terminal-info">Grade:</span>      Elite Gold - 93%
<span class="terminal-info">Status:</span>     Verified Certificate

<span class="terminal-warning">Course Highlights:</span>
  [*] IoT architecture and protocols
  [*] Sensor networks and data collection
  [*] Cloud integration for IoT
  [*] Real-world IoT applications
  [*] Security in IoT systems
`,
      'certificates/meta-python.pdf': `
<span class="terminal-success">Meta - Programming in Python</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-info">Issuer:</span>     Meta via Coursera
<span class="terminal-info">Status:</span>     Verified Certificate

<span class="terminal-warning">Skills Covered:</span>
  [*] Python fundamentals and syntax
  [*] Object-oriented programming
  [*] Data structures and algorithms
  [*] File handling and exceptions
  [*] Testing and debugging
`
    };

    return files[file] || `<span class="terminal-error">cat: ${file}: No such file or directory</span>`;
  },

  about: function() {
    return `
<span class="terminal-success">╔═══════════════════════════════════════════════════════════════╗</span>
<span class="terminal-success">║              SHIWANI YADUKA - CLOUD ENGINEER                  ║</span>
<span class="terminal-success">╚═══════════════════════════════════════════════════════════════╝</span>

<span class="terminal-info">[Education]</span> B.Tech CSE, LPU (CGPA: 8.61)
<span class="terminal-info">[Location]</span> Bhilwara, Rajasthan
<span class="terminal-info">[Training]</span> Agentic AI Platform Development @ LinuxWorld

<span class="terminal-warning">Core Expertise:</span>
  >> Cloud Infrastructure (AWS)
  >> Container Orchestration (Docker, Kubernetes)
  >> CI/CD Pipelines (Jenkins)
  >> Agentic AI Systems
  >> DevOps Automation

<span class="terminal-success">Type 'skills' for detailed technical skills</span>
<span class="terminal-success">Type 'projects' to view my work</span>
`;
  },

  skills: function() {
    return `
<span class="terminal-success">═══════════════════════════════════════════════════════════════</span>
<span class="terminal-success">                    TECHNICAL SKILLS                           </span>
<span class="terminal-success">═══════════════════════════════════════════════════════════════</span>

<span class="terminal-info">[Languages]</span>
  • C++          • Python       • SQL
  • HTML5        • CSS3

<span class="terminal-info">[Cloud & DevOps]</span>
  • AWS (EC2, S3, Lambda, RDS, CloudWatch, SNS)
  • Docker       • Kubernetes   • Jenkins
  • Git/GitHub   • Linux

<span class="terminal-info">[Frameworks & Libraries]</span>
  • Flask        • OpenAI       • Boto3
  • Streamlit    • Gradio       • OpenCV
  • NumPy        • Pandas

<span class="terminal-info">[Core CS]</span>
  • Data Structures & Algorithms
  • Operating Systems
  • Database Management Systems
  • Agile Methodology
`;
  },


  projects: function() {
    return `
<span class="terminal-success">═══════════════════════════════════════════════════════════════</span>
<span class="terminal-success">                      MY PROJECTS                              </span>
<span class="terminal-success">═══════════════════════════════════════════════════════════════</span>

<span class="terminal-warning">[1] Menu-Based Remote Tool</span>
    A centralized DevOps dashboard to manage remote Linux servers and 
    multi-cloud infrastructure with ML processing and real-time messaging.
    <span class="terminal-info">Tech:</span> Python, Gradio, AWS, Docker, Kubernetes, OpenCV, Twilio
    <span class="terminal-info">GitHub:</span> github.com/Shiwani-Yaduka/Menu-Based-Remote-Tool

<span class="terminal-warning">[2] CI/CD Pipeline for Microservices</span>
    Automated transition from local Flask development to production-ready 
    Docker containers with integrated pytest suites.
    <span class="terminal-info">Tech:</span> Jenkins, Docker, GitHub, Flask, Pytest, Linux
    <span class="terminal-info">GitHub:</span> github.com/Shiwani-Yaduka/CI-CD-Pipeline

<span class="terminal-warning">[3] Smart Book Tracking</span>
    Cloud-native AI assistant that monitors reading inactivity via CloudWatch 
    and sends personalized SNS email reminders.
    <span class="terminal-info">Tech:</span> AWS EC2, RDS, Lambda, SNS, Python, Flask, MySQL
    <span class="terminal-info">GitHub:</span> github.com/Shiwani-Yaduka/Smart-Book-Tracker

<span class="terminal-warning">[4] User-Staff Management System</span>
    Role-based access control using class inheritance with STL containers 
    for fast lookups and undo functionality.
    <span class="terminal-info">Tech:</span> C++, OOPs, STL, MongoDB
    <span class="terminal-info">GitHub:</span> github.com/Shiwani-Yaduka/User-Management
`;
  },

  education: function() {
    return `
<span class="terminal-success">═══════════════════════════════════════════════════════════════</span>
<span class="terminal-success">                   EDUCATION & TRAINING                         </span>
<span class="terminal-success">═══════════════════════════════════════════════════════════════</span>

<span class="terminal-info">[University]</span> Lovely Professional University
   B.Tech - Computer Science & Engineering
   Aug 2023 - Present | Phagwara, India
   <span class="terminal-warning">CGPA: 8.61</span>

<span class="terminal-info">[Training]</span> LinuxWorld Informatics Pvt. Ltd.
   Training - Agentic AI Platform Development
   May 2025 - Aug 2025
   <span class="terminal-success">Certificate Awarded</span>

<span class="terminal-info">[School]</span> Sophia Girls' Senior Secondary School
   Intermediate (12th) | 2021-2022 | Bhilwara, Rajasthan
   <span class="terminal-warning">Score: 79.8%</span>

<span class="terminal-info">[School]</span> Sophia Girls' Senior Secondary School
   Matriculation (10th) | 2019-2020 | Bhilwara, Rajasthan
   <span class="terminal-warning">Score: 96.8%</span>

<span class="terminal-success">Certifications:</span>
  [*] NPTEL - Introduction to IoT (Elite Gold - 93%)
  [*] Meta - Programming in Python (Coursera)
  [*] Mind Merge Competition - 1st Place (Dec 2025)
  [*] Product Building Competition - Double Winner (Jun 2025)
`;
  },

  contact: function() {
    return `
<span class="terminal-success">╔═══════════════════════════════════════════════════════════════╗</span>
<span class="terminal-success">║                    CONTACT INFORMATION                        ║</span>
<span class="terminal-success">╚═══════════════════════════════════════════════════════════════╝</span>

<span class="terminal-info">[Email]</span>      shiwaniyaduka123@gmail.com
<span class="terminal-info">[GitHub]</span>     https://github.com/Shiwani-Yaduka
<span class="terminal-info">[LinkedIn]</span>   https://www.linkedin.com/in/shiwani12
<span class="terminal-info">[Location]</span>   Bhilwara, Rajasthan, India

<span class="terminal-warning">Quick Commands:</span>
  • Type 'github' to open GitHub profile
  • Type 'linkedin' to open LinkedIn profile
  • Type 'email' to copy email address
`;
  },

  github: function() {
    window.open('https://github.com/Shiwani-Yaduka', '_blank');
    return '<span class="terminal-success">[OK] Opening GitHub profile...</span>';
  },

  linkedin: function() {
    window.open('https://www.linkedin.com/in/shiwani12', '_blank');
    return '<span class="terminal-success">[OK] Opening LinkedIn profile...</span>';
  },

  email: function() {
    const email = 'shiwaniyaduka123@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      return '<span class="terminal-success">[OK] Email copied to clipboard!</span>';
    });
    return `<span class="terminal-success">[OK] Email: ${email}</span>`;
  },

  echo: function(args) {
    return args.join(' ');
  },

  clear: function() {
    return 'CLEAR';
  },

  history: function(terminal) {
    if (!terminal.commandHistory.length) {
      return '<span class="terminal-warning">No command history</span>';
    }
    return terminal.commandHistory.map((cmd, i) => 
      `<span class="terminal-info">${(i + 1).toString().padStart(4)}</span>  ${cmd}`
    ).join('\n');
  },

  cd: function(args) {
    if (!args.length || args[0] === '~') {
      return '<span class="terminal-success">Changed to home directory</span>';
    }
    return `<span class="terminal-error">bash: cd: ${args[0]}: Permission denied (restricted environment)</span>`;
  },

  // Restricted commands
  touch: function() {
    return '<span class="terminal-error">bash: touch: Permission denied - Not authorized</span>';
  },

  nano: function() {
    return '<span class="terminal-error">bash: nano: Permission denied - Not authorized</span>';
  },

  vim: function() {
    return '<span class="terminal-error">bash: vim: Permission denied - Not authorized</span>';
  },

  vi: function() {
    return '<span class="terminal-error">bash: vi: Permission denied - Not authorized</span>';
  },

  rm: function() {
    return '<span class="terminal-error">bash: rm: Permission denied - Not authorized</span>';
  },

  mkdir: function() {
    return '<span class="terminal-error">bash: mkdir: Permission denied - Not authorized</span>';
  },

  rmdir: function() {
    return '<span class="terminal-error">bash: rmdir: Permission denied - Not authorized</span>';
  },

  chmod: function() {
    return '<span class="terminal-error">bash: chmod: Permission denied - Not authorized</span>';
  },

  chown: function() {
    return '<span class="terminal-error">bash: chown: Permission denied - Not authorized</span>';
  },

  sudo: function() {
    return '<span class="terminal-error">bash: sudo: Permission denied - Not authorized</span>';
  },

  su: function() {
    return '<span class="terminal-error">bash: su: Permission denied - Not authorized</span>';
  }
};
