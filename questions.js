// Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-10-15 03:47:12
// Current User's Login: debasish-sutradhar

const quizQuestions = [
  {
    "question": "Employees in the research and development business unit receive extensive training to ensure they understand how to best protect company data. Which of the following is the type of data these employees are most likely to use in day-to-day work activities?",
    "options": ["Encrypted", "Intellectual property", "Critical", "Data in transit"],
    "correctAnswer": 1,
    "explanation": "Intellectual property (IP) refers to creations of the mind, such as inventions, literary and artistic works, designs, symbols, names, and images used in commerce. Employees in a research and development (R&D) unit are directly involved in creating new products, designs, and inventions, which are the core of a company's IP. This type of data is extremely valuable and requires extensive training to protect against theft or unauthorized disclosure, as it provides a competitive advantage."
  },
  {
    "question": "Which of the following is the best reason to complete an audit in a banking environment?",
    "options": ["Regulatory requirement", "Organizational change", "Self-assessment requirement", "Service-level requirement"],
    "correctAnswer": 0,
    "explanation": "The banking industry is heavily regulated by government entities to ensure financial stability, protect consumer data, and prevent fraud. Audits in a banking environment are most often driven by regulatory requirements from laws and standards such as the Gramm-Leach-Bliley Act (GLBA), Sarbanes-Oxley (SOX), and the Payment Card Industry Data Security Standard (PCI DSS). These audits are mandatory to prove compliance and avoid severe financial penalties."
  },
  {
    "question": "Which of the following can best protect against an employee inadvertently installing malware on a company system?",
    "options": ["Host-based firewall", "System isolation", "Least privilege", "Application allow list"],
    "correctAnswer": 3,
    "explanation": "An application allow list is a security measure that explicitly defines which applications are permitted to run on a system. All other applications are blocked by default. This is highly effective at preventing employees from installing unauthorized software, including malware, because the malicious program will not be on the pre-approved list and will be blocked from executing."
  },
  {
    "question": "Which of the following enables the use of an input field to run commands that can view or manipulate data?",
    "options": ["Cross-site scripting", "Side loading", "Buffer overflow", "SQL injection"],
    "correctAnswer": 3,
    "explanation": "A SQL injection (SQLi) attack occurs when an attacker inserts malicious Structured Query Language (SQL) code into a data input field (like a login form or search bar). If the application does not properly validate or sanitize this input, the malicious code is executed by the backend database, allowing the attacker to view, modify, delete, or manipulate sensitive data."
  },
  {
    "question": "A company prevented direct access from the database administrators' workstations to the network segment that contains database servers. Which of the following should a database administrator use to access the database servers?",
    "options": ["Jump server", "RADIUS", "HSM", "Load balancer"],
    "correctAnswer": 0,
    "explanation": "A jump server (also known as a jump box or bastion host) is a hardened and monitored server used to access and manage devices in a separate, secure security zone. It acts as a controlled intermediary, preventing direct access from less secure networks to critical assets like database servers. The administrator connects to the jump server first, and from there, connects to the database servers."
  },
  {
    "question": "A client asked a security company to provide a document outlining the project, the cost, and the completion time frame. Which of the following documents should the company provide to the client?",
    "options": ["MSA", "SLA", "BPA", "SOW"],
    "correctAnswer": 3,
    "explanation": "A Statement of Work (SOW) is a formal document that defines the specific scope of work for a project. It details the project deliverables, timelines, costs, and terms. This document ensures that both the client and the security company have a clear, mutual understanding of the project's objectives and requirements."
  },
  {
    "question": "Which of the following is the most likely to be used to document risks, responsible parties, and thresholds?",
    "options": ["Risk tolerance", "Risk transfer", "Risk register", "Risk analysis"],
    "correctAnswer": 2,
    "explanation": "A risk register is a centralized document used in risk management to track and monitor identified risks. It typically includes details for each risk, such as a description, impact, probability, a designated owner (responsible party), the mitigation plan, and risk thresholds."
  }
];
