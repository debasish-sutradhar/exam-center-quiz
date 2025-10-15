// Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-10-15 03:56:42
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
  },
  {
    "question": "Which of the following provides the details about the terms of a test with a third-party penetration tester?",
    "options": ["Rules of engagement", "Supply chain analysis", "Right to audit clause", "Due diligence"],
    "correctAnswer": 0,
    "explanation": "The Rules of Engagement (RoE) is a document established before a penetration test begins. It formally defines the scope, objectives, timeline, and boundaries of the test. It specifies what is in scope (e.g., target IP addresses), what is out of scope, what techniques are allowed, and the communication plan, ensuring the test is conducted legally and effectively."
  },
  {
    "question": "An administrator notices that several users are logging in from suspicious IP addresses. After speaking with the users, the administrator determines that the employees were not logging in from those IP addresses and resets the affected users' passwords. Which of the following should the administrator implement to prevent this type of attack from succeeding in the future?",
    "options": ["Multifactor authentication", "Permissions assignment", "Access management", "Password complexity"],
    "correctAnswer": 0,
    "explanation": "This scenario indicates that user passwords have been compromised. While strong passwords help, a compromised password can still be used by an attacker. Multifactor Authentication (MFA) adds another layer of security by requiring a second factor for verification (e.g., a code from a mobile app, a fingerprint). Even if an attacker has the password, they cannot log in without the second factor, thus preventing this type of unauthorized access."
  },
  {
    "question": "A technician is opening ports on a firewall for a new system being deployed and supported by a SaaS provider. Which of the following is a risk in the new system?",
    "options": ["Default credentials", "Non-segmented network", "Supply chain vendor", "Vulnerable software"],
    "correctAnswer": 2,
    "explanation": "When using a third-party SaaS (Software as a Service) provider, the organization is introducing a supply chain vendor risk. The security of the organization's data and services now partially depends on the security practices of that SaaS provider. A vulnerability or breach at the vendor could directly impact the organization."
  },
  {
    "question": "A company is adding a clause to its AUP that states employees are not allowed to modify the operating system on mobile devices. Which of the following vulnerabilities is the organization addressing?",
    "options": ["Cross-site scripting", "Buffer overflow", "Jailbreaking", "Side loading"],
    "correctAnswer": 2,
    "explanation": "Jailbreaking (on iOS) or rooting (on Android) is the process of removing software restrictions imposed by the manufacturer on a mobile device's operating system. This allows users to install unauthorized apps and make deep system modifications. However, it also bypasses many of the built-in security features, making the device highly vulnerable to malware. The policy is designed to prevent this vulnerability."
  },
  {
    "question": "A security administrator needs a method to secure data in an environment that includes some form of checks so that the administrator can track any changes. Which of the following should the administrator set up to achieve this goal?",
    "options": ["SPF", "GPO", "NAC", "FIM"],
    "correctAnswer": 3,
    "explanation": "File Integrity Monitoring (FIM) is a security control that checks operating system files, application files, and configuration files for unauthorized changes. It works by creating a baseline of file attributes (like hashes, sizes, and permissions) and then regularly scanning to detect any deviations from that baseline. This allows an administrator to track changes and identify potential security breaches."
  },
  {
    "question": "Which of the following exercises should an organization use to improve its incident response process?",
    "options": ["Tabletop", "Replication", "Failover", "Recovery"],
    "correctAnswer": 0,
    "explanation": "A tabletop exercise is a discussion-based session where team members meet to discuss their roles and responses during a simulated emergency or security incident. It's a low-stress way to walk through an incident response plan, identify gaps, clarify responsibilities, and improve the overall process without affecting live systems."
  },
  {
    "question": "A security consultant needs secure, remote access to a client environment. Which of the following should the security consultant most likely use to gain access?",
    "options": ["EAP", "DHCP", "IPSec", "NAT"],
    "correctAnswer": 2,
    "explanation": "IPSec (Internet Protocol Security) is a suite of protocols used to secure network communications at the IP layer. It is a common technology used to create a Virtual Private Network (VPN), which establishes an encrypted tunnel over an untrusted network (like the internet). This provides a secure, confidential, and authenticated connection for remote access to a client's environment."
  },
  {
    "question": "A systems administrator works for a local hospital and needs to ensure patient data is protected and secure. Which of the following data classifications should be used to secure patient data?",
    "options": ["Private", "Critical", "Sensitive", "Public"],
    "correctAnswer": 2,
    "explanation": "Patient data, also known as Protected Health Information (PHI), is highly regulated (e.g., by HIPAA) and its unauthorized disclosure can cause significant harm to individuals. This type of data is classified as Sensitive. Sensitive data requires the highest level of security controls to ensure its confidentiality and integrity."
  },
  {
    "question": "After a security awareness training session, a user called the IT help desk and reported a suspicious call. The suspicious caller stated that the Chief Financial Officer wanted credit card information in order to close an invoice. Which of the following topics did the user recognize from the training?",
    "options": ["Insider threat", "Email phishing", "Social engineering", "Executive whaling"],
    "correctAnswer": 2,
    "explanation": "Social engineering is the art of manipulating people to divulge confidential information or perform actions they shouldn't. In this case, the attacker used impersonation (pretending to be the CFO) and urgency to try to trick the user. The user correctly recognized these manipulation tactics, which are core concepts taught in security awareness training."
  },
  {
    "question": "A security analyst is reviewing logs that show multiple failed login attempts against different user accounts (admin, user1, user2) all using the same password (password123). Which of the following attacks is most likely occurring?",
    "options": ["Password spraying", "Account forgery", "Pass-the-hash", "Brute-force"],
    "correctAnswer": 0,
    "explanation": "Password spraying is a type of brute-force attack where an attacker tries a single, commonly used password against many different accounts. This \"low-and-slow\" method is designed to avoid triggering account lockout policies that typically activate after multiple failed attempts on a single account. The log activity described is a classic indicator of a password spraying attack."
  },
  {
    "question": "Which of the following must be considered when designing a high-availability network? (Select two).",
    "options": ["Ease of recovery", "Ability to patch", "Physical isolation", "Responsiveness", "Attack surface", "Extensible authentication"],
    "correctAnswer": [0, 4],
    "explanation": "When designing for high availability, the primary goal is to minimize downtime.\n\nEase of recovery: The ability to restore service quickly after a failure is essential. This is achieved through mechanisms like redundancy, failover, and backups.\n\nAttack surface: A large attack surface presents more opportunities for attackers to cause a disruption or outage. Reducing the attack surface (e.g., by disabling unused ports and services) improves the overall security and resilience of the network, contributing to higher availability."
  },
  {
    "question": "A systems administrator is working on a solution with the following requirements:\n\nProvide a secure zone.\n\nEnforce a company-wide access control policy.\n\nReduce the scope of threats.\n\nWhich of the following is the systems administrator setting up?",
    "options": ["Zero Trust", "AAA", "Non-repudiation", "CIA"],
    "correctAnswer": 0,
    "explanation": "A Zero Trust architecture is a security model based on the principle of \"never trust, always verify.\" It treats all users and devices as untrusted, regardless of their location. It meets the requirements by:\n\nProviding secure zones through micro-segmentation.\n\nEnforcing strict, granular access control policies for every request.\n\nReducing the scope of threats by preventing lateral movement within the network."
  },
  {
    "question": "An employee receives a text message that appears to have been sent by the payroll department and is asking for credential verification. Which of the following social engineering techniques are being attempted? (Choose two.)",
    "options": ["Typosquatting", "Phishing", "Impersonation", "Vishing", "Smishing", "Misinformation"],
    "correctAnswer": [2, 4],
    "explanation": "Smishing: This is a specific type of phishing attack that uses SMS (text messages) as the delivery method. The scenario explicitly describes a fraudulent text message.\n\nImpersonation: The attacker is pretending to be someone they are not—in this case, the payroll department—to gain the employee's trust and trick them into providing information."
  },
  {
    "question": "After a security incident, a systems administrator asks the company to buy a NAC platform. Which of the following attack surfaces is the systems administrator trying to protect?",
    "options": ["Bluetooth", "Wired", "NFC", "SCADA"],
    "correctAnswer": 1,
    "explanation": "A Network Access Control (NAC) platform is a security solution that enforces policies on devices trying to access network resources. It is commonly used to secure both wired and wireless network ports. By requiring authentication and health checks before a device can connect, NAC protects the network entry points from unauthorized or non-compliant devices, effectively reducing the attack surface of the physical wired network."
  },
  {
    "question": "After a company was compromised, customers initiated a lawsuit. The company's attorneys have requested that the security team initiate a legal hold in response to the lawsuit. Which of the following describes the action the security team will most likely be required to take?",
    "options": [
      "Retain the emails between the security team and affected customers for 30 days.",
      "Retain any communications related to the security breach until further notice.",
      "Retain any communications between security members during the breach response.",
      "Retain all emails from the company to affected customers for an indefinite period of time."
    ],
    "correctAnswer": 1,
    "explanation": "A legal hold (or litigation hold) is a formal process that requires an organization to preserve all data that may be relevant to a legal case. The hold overrides normal data retention and deletion policies. Therefore, the security team must retain any communications related to the security breach until further notice from the legal department, which will lift the hold when it is no longer necessary."
  },
  {
    "question": "A company's legal department drafted sensitive documents in a SaaS application and wants to ensure the documents cannot be accessed by individuals in high-risk countries. Which of the following is the most effective way to limit this access?",
    "options": ["Data masking", "Encryption", "Geolocation policy", "Data sovereignty regulation"],
    "correctAnswer": 2,
    "explanation": "A geolocation policy is the most direct and effective way to control access based on a user's physical location. These policies use the user's IP address to determine their country of origin and can be configured to block access attempts from specified high-risk countries, thereby preventing individuals in those locations from accessing the sensitive documents."
  },
  {
    "question": "Which of the following scenarios describes a possible business email compromise attack?",
    "options": [
      "An employee receives a gift card request in an email that has an executive's name in the display field of the email.",
      "Employees who open an email attachment receive messages demanding payment in order to access files.",
      "A service desk employee receives an email from the HR director asking for log-in credentials to a cloud administrator account.",
      "An employee receives an email with a link to a phishing site that is designed to look like the company's email portal."
    ],
    "correctAnswer": 0,
    "explanation": "Business Email Compromise (BEC) is a type of attack where a cybercriminal impersonates a company executive or trusted partner to trick an employee into making unauthorized payments or providing sensitive information. The scenario involving an email that appears to be from an executive requesting gift cards is a classic example of a BEC attack. Option B is ransomware, while C and D are other forms of phishing."
  },
  {
    "question": "A company is expanding its threat surface program and allowing individuals to security test the company's internet-facing application. The company will compensate researchers based on the vulnerabilities discovered. Which of the following best describes the program the company is setting up?",
    "options": ["Open-source intelligence", "Bug bounty", "Red team", "Penetration testing"],
    "correctAnswer": 1,
    "explanation": "A bug bounty program is a crowdsourced security initiative that rewards individuals (often called security researchers or ethical hackers) for discovering and reporting software vulnerabilities. This perfectly describes the scenario where a company compensates researchers for finding vulnerabilities in its application."
  },
  {
    "question": "An enterprise has been experiencing attacks focused on exploiting vulnerabilities in older browser versions with well-known exploits. Which of the following security solutions should be configured to best provide the ability to monitor and block these known signature-based attacks?",
    "options": ["ACL", "DLP", "IDS", "IPS"],
    "correctAnswer": 3,
    "explanation": "An Intrusion Prevention System (IPS) is the best solution here because it can both monitor and actively block threats. Since the attacks are \"well-known exploits,\" an IPS can use predefined signatures to identify the malicious traffic patterns associated with these exploits and drop the packets in real-time before they can harm the target systems. An IDS would only detect and alert, not block."
  },
  {
    "question": "A security analyst is reviewing alerts in the SIEM related to potential malicious network traffic coming from an employee's corporate laptop. The security analyst has determined that additional data about the executable running on the machine is necessary to continue the investigation. Which of the following logs should the analyst use as a data source?",
    "options": ["Application", "IPS/IDS", "Network", "Endpoint"],
    "correctAnswer": 3,
    "explanation": "To investigate an executable file running on a machine, the analyst needs data directly from that machine. Endpoint logs, typically collected by an Endpoint Detection and Response (EDR) tool, provide rich, detailed context about processes, file modifications, registry changes, and network connections originating from the device itself. This is the most direct source for investigating the behavior of a specific executable."
  },
  {
    "question": "While troubleshooting a firewall configuration, a technician determines that a \"deny any\" policy should be added to the bottom of the ACL. The technician updates the policy, but the new policy causes several company servers to become unreachable. Which of the following actions would prevent this issue?",
    "options": [
      "Documenting the new policy in a change request and submitting the request to change management",
      "Testing the policy in a non-production environment before enabling the policy in the production network",
      "Disabling any intrusion prevention signatures on the 'deny any' policy prior to enabling the new policy",
      "Including an 'allow any' policy above the 'deny any' policy"
    ],
    "correctAnswer": 1,
    "explanation": "A fundamental best practice in change management is to test changes in a non-production environment before implementing them in the live production network. By simulating the change in a lab or staging environment that mimics production, the technician would have discovered that the new rule blocked legitimate traffic, allowing them to correct the firewall ruleset without causing an actual outage."
  },
  {
    "question": "An organization wants a third-party vendor to do a penetration test that targets a specific device. The organization has provided basic information about the device. Which of the following best describes this kind of penetration test?",
    "options": ["Partially known environment", "Unknown environment", "Integrated", "Known environment"],
    "correctAnswer": 0,
    "explanation": "This type of test is commonly known as a gray-box test. The tester is given some, but not all, information about the target system. This corresponds to a partially known environment. It sits between a black-box test (unknown environment, no prior knowledge) and a white-box test (known environment, full knowledge)."
  },
  {
    "question": "Which of the following should a systems administrator use to ensure an easy deployment of resources within the cloud provider?",
    "options": ["Software as a service", "Infrastructure as code", "Internet of Things", "Software-defined networking"],
    "correctAnswer": 1,
    "explanation": "Infrastructure as Code (IaC) is the practice of managing and provisioning IT infrastructure using machine-readable definition files (code), rather than manual processes. Tools like Terraform or AWS CloudFormation allow administrators to define their cloud resources in code, enabling automated, repeatable, and consistent deployments. This makes it easy to quickly spin up, modify, or replicate entire environments."
  },
  {
    "question": "Which of the following is used to validate a certificate when it is presented to a user?",
    "options": ["OCSP", "CSR", "CA", "CRC"],
    "correctAnswer": 0,
    "explanation": "The Online Certificate Status Protocol (OCSP) is used to check the revocation status of a digital certificate in real-time. When a browser receives a certificate, it can send a query to an OCSP responder (a server managed by the Certificate Authority) to ask if the certificate is still valid or if it has been revoked. This is a more modern alternative to checking a Certificate Revocation List (CRL)."
  },
  {
    "question": "Which of the following is the phase in the incident response process when a security analyst reviews roles and responsibilities?",
    "options": ["Preparation", "Recovery", "Lessons learned", "Analysis"],
    "correctAnswer": 0,
    "explanation": "The Preparation phase is the first and most crucial phase of the incident response lifecycle. It involves all the proactive steps taken before an incident occurs to ensure the team is ready. This includes creating the incident response plan, assembling the team, providing training, and clearly defining the roles and responsibilities of each team member."
  },
  {
    "question": "A security practitioner completes a vulnerability assessment on a company's network and finds several vulnerabilities, which the operations team remediates. Which of the following should be done next?",
    "options": ["Conduct an audit.", "Initiate a penetration test.", "Rescan the network.", "Submit a report."],
    "correctAnswer": 2,
    "explanation": "The vulnerability management process is cyclical: Scan -> Remediate -> Validate. After the operations team has applied patches or made configuration changes to fix the identified vulnerabilities, the next logical step is to rescan the network. This validation scan confirms that the remediation was successful and that no new vulnerabilities were introduced during the process."
  },
  {
    "question": "The marketing department set up its own project management software without telling the appropriate departments. Which of the following describes this scenario?",
    "options": ["Shadow IT", "Insider threat", "Data exfiltration", "Service disruption"],
    "correctAnswer": 0,
    "explanation": "Shadow IT is the term for IT hardware or software used within an organization without the approval or knowledge of the central IT or security department. The marketing department deploying its own software is a classic example of Shadow IT, which can introduce significant security and compliance risks."
  },
  {
    "question": "A company's marketing department collects, modifies, and stores sensitive customer data. The infrastructure team is responsible for securing the data while in transit and at rest. Which of the following data roles describes the customer?",
    "options": ["Processor", "Custodian", "Subject", "Owner"],
    "correctAnswer": 2,
    "explanation": "In data privacy frameworks like GDPR, the data subject is the individual to whom the personal data relates. In this case, the customer whose data is being collected and processed is the data subject.\n\nData Owner/Controller: The company that determines the purpose of the data processing.\n\nData Processor: The marketing department, which processes data on behalf of the company.\n\nData Custodian: The infrastructure team, responsible for the technical security of the data."
  },
  {
    "question": "An organization recently updated its security policy to include the following statement: Regular expressions are included in source code to remove special characters such as $, |, ;, &, \\, and ? from variables set by forms in a web application. Which of the following best explains the security technique the organization adopted by making this addition to the policy?",
    "options": ["Identify embedded keys", "Code debugging", "Input validation", "Static code analysis"],
    "correctAnswer": 2,
    "explanation": "The practice of checking, filtering, or sanitizing data received from a user is known as input validation. By removing potentially malicious special characters, the organization is cleaning the input to prevent various types of injection attacks, such as SQL injection or command injection, where these characters could be used to alter backend commands."
  },
  {
    "question": "An organization's internet-facing website was compromised when an attacker exploited a buffer overflow. Which of the following should the organization deploy to best protect against similar attacks in the future?",
    "options": ["NGFW", "WAF", "TLS", "SD-WAN"],
    "correctAnswer": 1,
    "explanation": "A Web Application Firewall (WAF) is specifically designed to protect web applications from common application-layer attacks. It inspects HTTP/S traffic and can detect and block attacks like buffer overflows, SQL injection, and cross-site scripting (XSS) before they reach the web server, making it the best defense for this scenario."
  },
  {
    "question": "An enterprise is trying to limit outbound DNS traffic originating from its internal network. Outbound DNS requests will only be allowed from one device with the IP address 10.50.10.25. Which of the following firewall ACLs will accomplish this goal?",
    "options": [
      "Access list outbound permit 0.0.0.0 0 0.0.0.0/0 port 53\nAccess list outbound deny 10.50.10.25 32 0.0.0.0/0 port 53",
      "Access list outbound permit 0.0.0.0/0 10.50.10.25 32 port 53\nAccess list outbound deny 0.0.0.0 0 0.0.0.0/0 port 53",
      "Access list outbound permit 0.0.0.0 0 0.0.0.0/0 port 53\nAccess list outbound deny 0.0.0.0/0 10.50.10.25 32 port 53",
      "Access list outbound permit 10.50.10.25 32 0.0.0.0/0 port 53\nAccess list outbound deny 0.0.0.0/0 0.0.0.0/0 port 53"
    ],
    "correctAnswer": 3,
    "explanation": "Firewall Access Control Lists (ACLs) are processed from top to bottom. To achieve the goal, you need two rules:\n\nAn explicit rule to permit DNS traffic from the specific server.\n\nA rule to deny DNS traffic from all other internal sources.\n\nOption D correctly implements this logic:\n\nAccess list outbound permit 10.50.10.25 32 0.0.0.0/0 port 53: This rule allows traffic with a source IP of 10.50.10.25 (the /32 specifies a single host) to any destination on port 53 (DNS).\n\nAccess list outbound deny 0.0.0.0/0 0.0.0.0/0 port 53: This rule, placed after the permit rule, denies all other traffic from any source (0.0.0.0/0) to any destination on port 53."
  },
  {
    "question": "A security administrator is deploying a DLP solution to prevent the exfiltration of sensitive customer data. Which of the following should the administrator do first?",
    "options": [
      "Block access to cloud storage websites.",
      "Create a rule to block outgoing email attachments.",
      "Apply classifications to the data.",
      "Remove all user permissions from shares on the file server."
    ],
    "correctAnswer": 2,
    "explanation": "Before a Data Loss Prevention (DLP) solution can effectively protect data, it must first know what data to protect. The foundational first step is to apply classifications to the data. This involves identifying and tagging data based on its sensitivity level (e.g., Public, Internal, Confidential, Sensitive). Once data is classified, the administrator can create specific DLP rules to control how that data is handled."
  },
  {
    "question": "Which of the following would be the best way to handle a critical business application that is running on a legacy server?",
    "options": ["Segmentation", "Isolation", "Hardening", "Decommissioning"],
    "correctAnswer": 2,
    "explanation": "Since the application is critical, it cannot simply be decommissioned. While segmentation and isolation are also excellent controls, hardening directly addresses the security of the server itself. Hardening is the process of reducing a system's vulnerability by removing unnecessary software, disabling unused services, applying all possible patches, and tightening security configurations. This is a critical first step to securing a legacy system that cannot be easily replaced."
  },
  {
    "question": "A company is discarding a classified storage array and hires an outside vendor to complete the disposal. Which of the following should the company request from the vendor?",
    "options": ["Certification", "Inventory list", "Classification", "Proof of ownership"],
    "correctAnswer": 0,
    "explanation": "When a third party handles the destruction of sensitive media, the company must obtain a Certificate of Destruction. This is a formal document that serves as an audit record, providing proof that the media was destroyed in a secure and compliant manner. It typically details what was destroyed, the method used, the date, and who performed the destruction."
  },
  {
    "question": "During the onboarding process, an employee needs to create a password for an intranet account. The password must include ten characters, numbers, and letters, and two special characters. Once the password is created, the company will grant the employee access to other company-owned websites based on the intranet profile. Which of the following access management concepts is the company most likely using to safeguard intranet accounts and grant access to multiple sites based on a user's intranet account? (Select two).",
    "options": ["Federation", "Identity proofing", "Password complexity", "Default password changes", "Password manager", "Open authentication"],
    "correctAnswer": [0, 2],
    "explanation": "Password complexity: The requirement for a specific length and mix of character types (letters, numbers, special characters) is a direct implementation of a password complexity policy.\n\nFederation: The concept of using a single identity (the intranet account) to access multiple different services (other company websites) is known as identity federation, often implemented through Single Sign-On (SSO). It establishes a trust relationship between the systems, allowing one to handle authentication for the others."
  },
  {
    "question": "A systems administrator wants to prevent users from being able to access data based on their responsibilities. The administrator also wants to apply the required access structure via a simplified format. Which of the following should the administrator apply to the site recovery resource group?",
    "options": ["RBAC", "ACL", "SAML", "GPO"],
    "correctAnswer": 0,
    "explanation": "Role-Based Access Control (RBAC) is an access control model that grants permissions based on a user's role within an organization (e.g., \"Database Administrator,\" \"Help Desk Analyst,\" \"Sales Manager\"). This directly aligns with assigning access based on responsibilities and simplifies administration, as permissions are managed for roles rather than for individual users."
  },
  {
    "question": "Which of the following roles, according to the shared responsibility model, is responsible for securing the company's database in an IaaS model for a cloud environment?",
    "options": ["Client", "Third-party vendor", "Cloud provider", "DBA"],
    "correctAnswer": 0,
    "explanation": "In an Infrastructure as a Service (IaaS) cloud model, the cloud provider is responsible for the security of the cloud (physical data centers, servers, networking). The client (customer) is responsible for security in the cloud. This includes securing the operating systems, applications, and data they deploy. Since the database is part of the application and data stack, its security is the responsibility of the client."
  },
  {
    "question": "Which of the following is the most likely to be included as an element of communication in a security awareness program?",
    "options": [
      "Reporting phishing attempts or other suspicious activities",
      "Detecting insider threats using anomalous behavior recognition",
      "Verifying information when modifying wire transfer data",
      "Performing social engineering as part of third-party penetration testing"
    ],
    "correctAnswer": 0,
    "explanation": "A key component of any effective security awareness program is teaching employees what to do when they encounter a threat. This includes clear instructions on reporting phishing attempts or other suspicious activities to the appropriate security team. This empowers users to become an active part of the organization's defense. The other options are functions performed by the security or finance teams, not general awareness training topics."
  },
  {
    "question": "Which of the following is the best way to consistently determine on a daily basis whether security settings on servers have been modified?",
    "options": ["Automation", "Compliance checklist", "Attestation", "Manual audit"],
    "correctAnswer": 0,
    "explanation": "Manually checking the security settings of multiple servers every day is impractical, time-consuming, and prone to error. Automation is the only feasible solution. Using automated tools such as configuration management systems (e.g., Puppet, Ansible) or File Integrity Monitoring (FIM) allows for consistent, daily checks against a secure baseline, with automatic alerts for any unauthorized modifications."
  },
  {
    "question": "Which of the following vulnerabilities is associated with installing software outside of a manufacturer's approved software repository?",
    "options": ["Jailbreaking", "Memory injection", "Resource reuse", "Side loading"],
    "correctAnswer": 3,
    "explanation": "Side loading refers to the process of installing an application on a mobile device from an unofficial source, rather than the manufacturer's approved app store (like the Apple App Store or Google Play Store). This practice bypasses the security vetting process of the official stores, increasing the risk of installing malware or vulnerable applications."
  },
  {
    "question": "Several employees received a fraudulent text message from someone claiming to be the Chief Executive Officer (CEO). The message stated:\n\"I'm in an airport right now with no access to email. I need you to buy gift cards for employee recognition awards. Please send the gift cards to following email address.\"\nWhich of the following are the best responses to this situation? (Choose two).",
    "options": [
      "Cancel current employee recognition gift cards.",
      "Add a smishing exercise to the annual company training.",
      "Issue a general email warning to the company.",
      "Have the CEO change phone numbers.",
      "Conduct a forensic investigation on the CEO's phone.",
      "Implement mobile device management."
    ],
    "correctAnswer": [1, 2],
    "explanation": "The best responses address both the immediate threat and long-term prevention.\n\nIssue a general email warning to the company: This is the best immediate action to alert all employees about the ongoing scam, preventing others from falling victim.\n\nAdd a smishing exercise to the annual company training: This is the best long-term response. Since the attack was successful (or attempted), it highlights a gap in employee awareness. Training will help employees recognize and respond correctly to similar attacks in the future."
  },
  {
    "question": "An organization is struggling with scaling issues on its VPN concentrator and internet circuit due to remote work. The organization is looking for a software solution that will allow it to reduce traffic on the VPN and internet circuit, while still providing encrypted tunnel access to the data center and monitoring of remote employee internet traffic. Which of the following will help achieve these objectives?",
    "options": [
      "Deploying a SASE solution to remote employees",
      "Building a load-balanced VPN solution with redundant internet",
      "Purchasing a low-cost SD-WAN solution for VPN traffic",
      "Using a cloud provider to create additional VPN concentrators"
    ],
    "correctAnswer": 0,
    "explanation": "A Secure Access Service Edge (SASE) solution is ideal for this scenario. SASE combines networking and security functions into a single cloud-delivered service. It allows for intelligent \"split-tunneling\" where only traffic destined for the corporate data center goes through the VPN tunnel, while general internet and SaaS traffic is routed directly to the internet. This significantly reduces the load on the VPN and corporate internet circuit. SASE also includes security services (like a Secure Web Gateway) to monitor and protect that direct-to-internet traffic."
  },
  {
    "question": "An organization would like to store customer data on a separate part of the network that is not accessible to users on the main corporate network. Which of the following should the administrator use to accomplish this goal?",
    "options": ["Segmentation", "Isolation", "Patching", "Encryption"],
    "correctAnswer": 0,
    "explanation": "Network segmentation is the practice of dividing a network into smaller, isolated sub-networks or segments. By placing the customer data servers in a separate segment and implementing firewall rules between that segment and the main corporate network, the administrator can strictly control traffic and prevent unauthorized access from corporate users."
  },
  {
    "question": "The management team notices that new accounts that are set up manually do not always have correct access or permissions.\nWhich of the following automation techniques should a systems administrator use to streamline account creation?",
    "options": ["Guard rail script", "Ticketing workflow", "Escalation script", "User provisioning script"],
    "correctAnswer": 3,
    "explanation": "A user provisioning script is an automated script specifically designed to handle the creation, modification, and deletion of user accounts. Using a script ensures that every new account is created consistently with the correct permissions, group memberships, and settings based on the user's role, eliminating the manual errors and inconsistencies described in the scenario."
  },
  {
    "question": "Which of the following security control types does an acceptable use policy best represent?",
    "options": ["Detective", "Compensating", "Corrective", "Preventive"],
    "correctAnswer": 3,
    "explanation": "An Acceptable Use Policy (AUP) is an administrative control that sets rules for user behavior before an incident occurs. Its purpose is to stop users from performing actions that could introduce security risks. Because it is designed to prevent incidents from happening in the first place, it is a preventive control."
  },
  {
    "question": "A penetration tester begins an engagement by performing port and service scans against the client environment according to the rules of engagement. Which of the following reconnaissance types is the tester performing?",
    "options": ["Active", "Passive", "Defensive", "Offensive"],
    "correctAnswer": 0,
    "explanation": "Active reconnaissance involves directly interacting with the target to gather information. Port scanning and service scanning require sending packets to the target systems and analyzing the responses. This direct interaction distinguishes it from passive reconnaissance, which involves gathering information from publicly available sources without touching the target's systems."
  },
  {
    "question": "After a recent ransomware attack on a company's system, an administrator reviewed the log files. Which of the following control types did the administrator use?",
    "options": ["Compensating", "Detective", "Preventive", "Corrective"],
    "correctAnswer": 1,
    "explanation": "Log files are a prime example of a detective control. They do not prevent an attack from happening or correct the damage afterward. Instead, they record events as they occur, allowing an administrator to detect that an incident happened and investigate the details (like the source, timeline, and scope of the attack) after the fact."
  }
];
