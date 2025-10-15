// Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-10-15 09:56:42
// Current User's Login: debasish-sutradhar

const quizQuestions = [
  {
    "question": "Employees in the research and development business unit receive extensive training to ensure they understand how to best protect company data. Which of the following is the type of data these employees are most likely to use in day-to-day work activities?",
    "options": ["Encrypted", "Intellectual property", "Critical", "Data in transit"],
    "correctAnswer": 1,
    "explanation": "Intellectual property (IP) refers to creations of the mind, such as inventions, literary and artistic works, designs, symbols, names, and images used in commerce. Employees in a research and development (R&D) unit are directly involved with creating inventions, designs, and trade secrets, which are all forms of intellectual property. This data is often a company's most valuable asset and requires stringent protection."
  },
  {
    "question": "Which of the following is the best reason to complete an audit in a banking environment?",
    "options": ["Regulatory requirement", "Organizational change", "Self-assessment requirement", "Service-level requirement"],
    "correctAnswer": 0,
    "explanation": "The banking industry is heavily regulated by government entities to ensure financial stability, protect consumer data, and prevent fraud. Audits in a banking environment are most commonly required by regulations like GLBA and SOX to demonstrate compliance with these laws, making regulatory requirements the best reason to complete an audit in this context."
  },
  {
    "question": "Which of the following can best protect against an employee inadvertently installing malware on a company system?",
    "options": ["Host-based firewall", "System isolation", "Least privilege", "Application allow list"],
    "correctAnswer": 3,
    "explanation": "An application allow list is a security measure that explicitly defines which applications are permitted to run on a system. All other applications are blocked by default. This is highly effective against malware because even if an employee downloads a malicious program, it will be blocked from executing as it won't be on the allow list."
  },
  {
    "question": "Which of the following enables the use of an input field to run commands that can view or manipulate data?",
    "options": ["Cross-site scripting", "Side loading", "Buffer overflow", "SQL injection"],
    "correctAnswer": 3,
    "explanation": "A SQL injection (SQLi) attack occurs when an attacker inserts malicious Structured Query Language (SQL) code into a data input field (like a login form or search bar). If the application is vulnerable, it will execute these commands on its database, allowing an attacker to access, manipulate, or delete data."
  },
  {
    "question": "A company prevented direct access from the database administrators' workstations to the network segment that contains database servers. Which of the following should a database administrator use to access the database servers?",
    "options": ["Jump server", "RADIUS", "HSM", "Load balancer"],
    "correctAnswer": 0,
    "explanation": "A jump server (also known as a jump box or bastion host) is a hardened and monitored server used to access and manage devices in a separate, secure security zone. It acts as a single, controlled point of entry to a secure network segment. Database administrators would connect to the jump server first, then from there connect to the database servers, providing a secure and auditable access method."
  },
  {
    "question": "A client asked a security company to provide a document outlining the project, the cost, and the completion time frame. Which of the following documents should the company provide?",
    "options": ["MSA", "SLA", "BPA", "SOW"],
    "correctAnswer": 3,
    "explanation": "A Statement of Work (SOW) is a formal document that defines the specific scope of work for a project. It details the project deliverables, timelines, costs, and terms. This document serves as a detailed agreement between the client and the vendor about the work to be performed."
  },
  {
    "question": "Which of the following is the most likely to be used to document risks, responsible parties, and thresholds?",
    "options": ["Risk tolerance", "Risk transfer", "Risk register", "Risk analysis"],
    "correctAnswer": 2,
    "explanation": "A risk register is a centralized document used in risk management to track and monitor identified risks. It typically includes details for each risk, such as a description, impact, probability, responsible party (owner), and the planned response. It's the primary tool used to document risks and their associated information throughout the risk management process."
  },
  {
    "question": "Which of the following provides the details about the terms of a test with a third-party penetration tester?",
    "options": ["Rules of engagement", "Supply chain analysis", "Right to audit clause", "Due diligence"],
    "correctAnswer": 0,
    "explanation": "The Rules of Engagement (RoE) is a document established before a penetration test begins. It formally defines the scope, objectives, timeline, and boundaries of the test. It specifies what systems are in scope, what techniques are allowed, and the testing timeline to ensure the test is conducted legally and safely."
  },
  {
    "question": "An administrator notices that several users are logging in from suspicious IP addresses. After speaking with the users, the administrator determines that the employees were not logging in from those IP addresses and resets the affected users' passwords. Which of the following should the administrator implement to prevent this type of attack from succeeding in the future?",
    "options": ["Multifactor authentication", "Permissions assignment", "Access management", "Password complexity"],
    "correctAnswer": 0,
    "explanation": "This scenario indicates that user passwords have been compromised. While strong passwords help, a compromised password can still be used by an attacker. Multifactor Authentication (MFA) adds another layer of security by requiring something the user knows (password) plus something they have (e.g., a mobile device) or something they are (biometric). Even if an attacker has the password, they would be blocked without the second factor."
  },
  {
    "question": "A technician is opening ports on a firewall for a new system being deployed and supported by a SaaS provider. Which of the following is a risk in the new system?",
    "options": ["Default credentials", "Non-segmented network", "Supply chain vendor", "Vulnerable software"],
    "correctAnswer": 2,
    "explanation": "When using a third-party SaaS (Software as a Service) provider, the organization is introducing a supply chain vendor risk. The security of the organization's data and services now partially depends on the security practices of the vendor. A vulnerability or breach in the SaaS provider's systems could directly impact the organization, making this a significant risk factor when deploying such systems."
  },
  {
    "question": "A company is adding a clause to its AUP that states employees are not allowed to modify the operating system on mobile devices. Which of the following vulnerabilities is the organization addressing?",
    "options": ["Cross-site scripting", "Buffer overflow", "Jailbreaking", "Side loading"],
    "correctAnswer": 2,
    "explanation": "Jailbreaking (on iOS) or rooting (on Android) is the process of removing software restrictions imposed by the manufacturer on a mobile device's operating system. This allows users to gain elevated (root) privileges, install unauthorized applications, and modify system files. This action bypasses many of the device's built-in security features, making it highly vulnerable to malware and attacks."
  },
  {
    "question": "A security administrator needs a method to secure data in an environment that includes some form of checks so that the administrator can track any changes. Which of the following should the administrator set up to achieve this goal?",
    "options": ["SPF", "GPO", "NAC", "FIM"],
    "correctAnswer": 3,
    "explanation": "File Integrity Monitoring (FIM) is a security process that checks operating system and application software files for unauthorized changes. It works by creating a baseline of file attributes (like hashes) and then periodically scanning files to detect any deviations, alerting the administrator to any changes. This allows for tracking any modifications to important files and data."
  },
  {
    "question": "Which of the following exercises should an organization use to improve its incident response process?",
    "options": ["Tabletop", "Replication", "Failover", "Recovery"],
    "correctAnswer": 0,
    "explanation": "A tabletop exercise is a discussion-based session where team members meet to discuss their roles and responses during a simulated emergency or security incident. It's a low-stress, structured environment where the team walks through a hypothetical incident scenario to identify gaps in the response plan without affecting live systems. This helps improve preparedness and coordination for real incidents."
  },
  {
    "question": "A security consultant needs secure, remote access to a client environment. Which of the following should the security consultant most likely use to gain access?",
    "options": ["EAP", "DHCP", "IPSec", "NAT"],
    "correctAnswer": 2,
    "explanation": "IPSec (Internet Protocol Security) is a suite of protocols used to secure network communications at the IP layer. It is a common technology used to create a Virtual Private Network (VPN) that encrypts traffic between two endpoints. This allows the security consultant to securely connect to the client's network over the Internet, protecting the confidentiality and integrity of the data being transmitted."
  },
  {
    "question": "A systems administrator works for a local hospital and needs to ensure patient data is protected and secure. Which of the following data classifications should be used to secure patient data?",
    "options": ["Private", "Critical", "Sensitive", "Public"],
    "correctAnswer": 2,
    "explanation": "Patient data contains personally identifiable information (PII) and protected health information (PHI), which is legally protected under regulations such as HIPAA. This type of data is classified as sensitive because its unauthorized disclosure could cause significant harm to individuals. Sensitive data requires strict controls to ensure confidentiality, integrity, and availability, making it the appropriate classification for patient information."
  },
  {
    "question": "After a security awareness training session, a user called the IT help desk and reported a suspicious call. The suspicious caller stated that the Chief Financial Officer wanted credit card information in order to close an invoice. Which of the following topics did the user recognize from the training?",
    "options": ["Insider threat", "Email phishing", "Social engineering", "Executive whaling"],
    "correctAnswer": 2,
    "explanation": "Social engineering is the art of manipulating people into performing actions or divulging confidential information. In this case, the caller was impersonating an authority figure (the CFO) to create a sense of urgency and pressure the user into providing credit card information. The user correctly identified this classic social engineering tactic thanks to the security awareness training they received."
  },
  {
    "question": "A security analyst is reviewing logs that show multiple failed login attempts against different user accounts (admin, user1, user2) all using the same password (password123). Which of the following attacks is most likely occurring?",
    "options": ["Password spraying", "Account forgery", "Pass-the-hash", "Brute-force"],
    "correctAnswer": 0,
    "explanation": "Password spraying is a type of brute-force attack where an attacker tries a single, commonly used password against many different accounts. This \"low-and-slow\" method is designed to avoid account lockouts that might be triggered by multiple failed attempts on a single account. The pattern of the same password being tried against multiple accounts is a clear indicator of password spraying."
  },
  {
    "question": "Which of the following must be considered when designing a high-availability network? (Select two).",
    "options": ["Ease of recovery", "Ability to patch", "Physical isolation", "Responsiveness", "Attack surface", "Extensible authentication"],
    "correctAnswer": [0, 4],
    "explanation": "When designing for high availability, the primary goal is to minimize downtime.\n\nEase of recovery: The ability to restore service quickly after a failure is essential. This includes having robust backup systems, failover mechanisms, and clear recovery procedures.\n\nAttack surface: A larger attack surface increases the vulnerability points where failures can occur. Minimizing the attack surface reduces the potential for security incidents that could cause outages or downtime."
  },
  {
    "question": "A systems administrator is working on a solution with the following requirements:\n\nProvide a secure zone.\n\nEnforce a company-wide access control policy.\n\nReduce the scope of threats.\n\nWhich of the following is the systems administrator setting up?",
    "options": ["Zero Trust", "AAA", "Non-repudiation", "CIA"],
    "correctAnswer": 0,
    "explanation": "A Zero Trust architecture is a security model based on the principle of \"never trust, always verify.\" It treats all users and devices as untrusted, regardless of their location (inside or outside the network perimeter). Zero Trust achieves the requirements by: 1) Creating secure zones through micro-segmentation, 2) Enforcing strict access control policies based on least privilege, and 3) Reducing the scope of threats by limiting lateral movement within the network."
  },
  {
    "question": "An employee receives a text message that appears to have been sent by the payroll department and is asking for credential verification. Which of the following social engineering techniques are being attempted? (Select TWO).",
    "options": ["Typosquatting", "Phishing", "Impersonation", "Vishing", "Smishing", "Misinformation"],
    "correctAnswer": [2, 4],
    "explanation": "Smishing: This is a specific type of phishing attack that uses SMS (text messages) as the delivery method. The scenario explicitly describes a fraudulent text message.\n\nImpersonation: The attacker is pretending to be from the payroll department to gain the employee's trust. This technique involves assuming the identity of a trusted entity to manipulate the victim into disclosing sensitive information."
  },
  {
    "question": "After a security incident, a systems administrator asks the company to buy a NAC platform. Which of the following attack surfaces is the systems administrator trying to protect?",
    "options": ["Bluetooth", "Wired", "NFC", "SCADA"],
    "correctAnswer": 1,
    "explanation": "A Network Access Control (NAC) platform is a security solution that enforces policies on devices trying to access network resources. It is commonly used to secure both wired and wireless network access points, controlling which devices can connect based on compliance with security policies. In this context, the systems administrator is specifically trying to protect the wired network infrastructure from unauthorized or non-compliant devices connecting to it."
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
    "explanation": "A legal hold (or litigation hold) is a formal process that requires an organization to preserve all data that may be relevant to a legal case. The hold overrides normal data retention policies and applies to all potentially relevant information, including emails, documents, and other electronic records. The security team would need to retain any communications related to the breach until the legal department lifts the hold, as destroying potential evidence could result in severe legal penalties."
  },
  {
    "question": "A company's legal department drafted sensitive documents in a SaaS application and wants to ensure the documents cannot be accessed by individuals in high-risk countries. Which of the following is the most effective way to limit this access?",
    "options": ["Data masking", "Encryption", "Geolocation policy", "Data sovereignty regulation"],
    "correctAnswer": 2,
    "explanation": "A geolocation policy is the most direct and effective way to control access based on a user's physical location. These policies use the user's IP address to determine their country or region and can automatically block access attempts from designated high-risk locations. This provides a straightforward technical control to prevent document access from specific geographic areas without affecting legitimate users in approved regions."
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
    "explanation": "Business Email Compromise (BEC) is a type of attack where a cybercriminal impersonates a company executive or trusted partner to trick an employee into making unauthorized payments or divulging sensitive information. In this scenario, the attacker is spoofing an executive's name in the email display field to request gift cards, which is a classic BEC tactic. These attacks typically rely on authority and urgency rather than technical exploits, often targeting finance or HR departments."
  },
  {
    "question": "A company is expanding its threat surface program and allowing individuals to security test the company's internet-facing application. The company will compensate researchers based on the vulnerabilities discovered. Which of the following best describes the program the company is setting up?",
    "options": ["Open-source intelligence", "Bug bounty", "Red team", "Penetration testing"],
    "correctAnswer": 1,
    "explanation": "A bug bounty program is a crowdsourced security initiative that rewards individuals (often called security researchers or ethical hackers) for discovering and reporting software vulnerabilities. The key characteristics of bug bounty programs are: 1) Open invitation to external researchers, 2) Focus on finding vulnerabilities in specific targets, and 3) Monetary rewards based on the severity and impact of discovered vulnerabilities. This matches the description of the company's initiative."
  },
  {
    "question": "An enterprise has been experiencing attacks focused on exploiting vulnerabilities in older browser versions with well-known exploits. Which of the following security solutions should the security team configure to best provide the ability to monitor and block these known signature-based attacks?",
    "options": ["ACL", "DLP", "IDS", "IPS"],
    "correctAnswer": 3,
    "explanation": "An Intrusion Prevention System (IPS) is the best solution here because it can both monitor and actively block threats. Since the attacks are \"well-known exploits,\" an IPS can be configured with signatures to identify these specific attack patterns and automatically prevent them from reaching vulnerable browsers. Unlike an IDS (which only detects and alerts), an IPS actively stops the malicious traffic before it reaches the target system."
  },
  {
    "question": "A security analyst is reviewing alerts in the SIEM related to potential malicious network traffic coming from an employee's corporate laptop. The security analyst has determined that additional data about the executable running on the machine is necessary to continue the investigation. Which of the following logs should the analyst use as a data source?",
    "options": ["Application", "IPS/IDS", "Network", "Endpoint"],
    "correctAnswer": 3,
    "explanation": "To investigate an executable file running on a machine, the analyst needs data directly from that machine. Endpoint logs, typically collected by an Endpoint Detection and Response (EDR) solution, contain detailed information about processes, file system activities, registry changes, and other host-based events. This provides visibility into which executables are running, their behaviors, and system interactions - essential information for determining if the executable is malicious."
  },
  {
    "question": "While troubleshooting a firewall configuration, a technician determines that a \"deny any\" policy should be added to the bottom of the ACL. The technician updates the policy, but the new policy causes several company servers to become unreachable. Which of the following would prevent this issue?",
    "options": [
      "Documenting the new policy in a change request and submitting the request to change management",
      "Testing the policy in a non-production environment before enabling the policy in the production network",
      "Disabling any intrusion prevention signatures on the 'deny any' policy prior to enabling the new policy",
      "Including an 'allow any' policy above the 'deny any' policy"
    ],
    "correctAnswer": 1,
    "explanation": "A fundamental best practice in change management is to test changes in a non-production environment before implementing them in the live production network. By simulating the firewall change in a test environment first, the technician could have identified that the \"deny any\" rule would block legitimate traffic to company servers and adjusted the rule order or created specific allow rules for those servers before implementing the change in production."
  },
  {
    "question": "An organization wants a third-party vendor to do a penetration test that targets a specific device. The organization has provided basic information about the device. Which of the following best describes this kind of penetration test?",
    "options": ["Partially known environment", "Unknown environment", "Integrated", "Known environment"],
    "correctAnswer": 0,
    "explanation": "This type of test is commonly known as a gray-box test. The tester is given some, but not all, information about the target system. This corresponds to a partially known environment, where the tester has been provided with basic information about the target device but must still discover vulnerabilities through testing. This approach balances the realism of black-box testing with the efficiency of white-box testing."
  },
  {
    "question": "Which of the following should a systems administrator use to ensure an easy deployment of resources within the cloud provider?",
    "options": ["Software as a service", "Infrastructure as code", "Internet of Things", "Software-defined networking"],
    "correctAnswer": 1,
    "explanation": "Infrastructure as Code (IaC) is the practice of managing and provisioning IT infrastructure using machine-readable definition files (code), rather than manual processes. Tools like Terraform, AWS CloudFormation, or Azure Resource Manager templates allow administrators to define infrastructure configurations in code that can be version-controlled, tested, and automatically deployed. This ensures consistent, repeatable, and efficient resource deployments in cloud environments."
  },
  {
    "question": "Which of the following is used to validate a certificate when it is presented to a user?",
    "options": ["OCSP", "CSR", "CA", "CRC"],
    "correctAnswer": 0,
    "explanation": "The Online Certificate Status Protocol (OCSP) is used to check the revocation status of a digital certificate in real-time. When a browser receives a certificate, it can send an OCSP request to an OCSP responder (typically operated by the Certificate Authority) to verify that the certificate hasn't been revoked. This validation is essential to ensure that compromised or invalid certificates aren't accepted by client systems."
  },
  {
    "question": "Which of the following is the phase in the incident response process when a security analyst reviews roles and responsibilities?",
    "options": ["Preparation", "Recovery", "Lessons learned", "Analysis"],
    "correctAnswer": 0,
    "explanation": "The Preparation phase is the first and most crucial phase of the incident response lifecycle. It involves all the proactive steps taken before an incident occurs to ensure the organization is ready to respond effectively. This includes defining roles and responsibilities, creating response plans, establishing communication protocols, and ensuring necessary resources are available. By clearly defining who is responsible for what during an incident, the organization can respond more efficiently when a security event occurs."
  },
  {
    "question": "A security practitioner completes a vulnerability assessment on a company's network and finds several vulnerabilities, which the operations team remediates. Which of the following should be done next?",
    "options": ["Conduct an audit.", "Initiate a penetration test.", "Rescan the network.", "Submit a report."],
    "correctAnswer": 2,
    "explanation": "The vulnerability management process is cyclical: Scan -> Remediate -> Validate. After the operations team has applied patches or made configuration changes to fix the identified vulnerabilities, the next step should be to rescan the network to verify that the remediation efforts were successful. This validation step confirms that vulnerabilities have been properly addressed and ensures no new vulnerabilities were introduced during the remediation process."
  },
  {
    "question": "The marketing department set up its own project management software without telling the appropriate departments. Which of the following describes this scenario?",
    "options": ["Shadow IT", "Insider threat", "Data exfiltration", "Service disruption"],
    "correctAnswer": 0,
    "explanation": "Shadow IT is the term for IT hardware or software used within an organization without the approval or knowledge of the central IT or security department. The marketing department implementing their own project management software without proper authorization is a classic example of shadow IT. This practice creates security risks as these systems often lack proper security controls, may not be properly patched, and might not comply with organizational policies or regulatory requirements."
  },
  {
    "question": "A company's marketing department collects, modifies, and stores sensitive customer data. The infrastructure team is responsible for securing the data while in transit and at rest. Which of the following data roles describes the customer?",
    "options": ["Processor", "Custodian", "Subject", "Owner"],
    "correctAnswer": 2,
    "explanation": "In data privacy frameworks like GDPR, the data subject is the individual to whom the personal data relates. In this case, the customer whose data is being collected and processed by the marketing department is the data subject. The marketing department would be considered a data processor, while the company itself would likely be the data controller or owner. The infrastructure team acts as a data custodian, responsible for implementing technical security controls."
  },
  {
    "question": "An organization recently updated its security policy to include the following statement: Regular expressions are included in source code to remove special characters such as $, |, [...]... Which of the following best explains the security technique the organization adopted by making this addition to the policy?",
    "options": ["Identify embedded keys", "Code debugging", "Input validation", "Static code analysis"],
    "correctAnswer": 2,
    "explanation": "The practice of checking, filtering, or sanitizing data received from a user is known as input validation. By removing potentially malicious special characters, the organization is implementing input validation to prevent injection attacks like SQL injection or cross-site scripting (XSS). Regular expressions are commonly used to define patterns of acceptable input and filter out potentially dangerous characters that could be used in attacks."
  },
  {
    "question": "An organization's internet-facing website was compromised when an attacker exploited a buffer overflow. Which of the following should the organization deploy to best protect against similar attacks in the future?",
    "options": ["NGFW", "WAF", "TLS", "SD-WAN"],
    "correctAnswer": 1,
    "explanation": "A Web Application Firewall (WAF) is specifically designed to protect web applications from common application-layer attacks. It inspects HTTP/S traffic and can detect and block attacks like buffer overflows, SQL injection, cross-site scripting, and other OWASP Top 10 vulnerabilities. Unlike a Next-Generation Firewall (NGFW) which operates at lower network layers, a WAF is specialized for web application protection and can identify and block the specific types of malicious requests that could exploit buffer overflow vulnerabilities."
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
    "explanation": "Before a Data Loss Prevention (DLP) solution can effectively protect data, it must first know what data to protect. The foundational first step is to apply classifications to data (e.g., confidential, restricted, public) based on sensitivity and business value. This classification provides the context needed to create appropriate DLP policies. Without proper data classification, the DLP solution wouldn't know which data requires protection or what level of protection to apply, leading to either security gaps or excessive restrictions."
  },
  {
    "question": "Which of the following would be the best way to handle a critical business application that is running on a legacy server?",
    "options": ["Segmentation", "Isolation", "Hardening", "Decommissioning"],
    "correctAnswer": 2,
    "explanation": "Since the application is critical, it cannot simply be decommissioned. While segmentation and isolation are also excellent controls, hardening directly addresses the security weaknesses of the legacy server itself. Hardening involves removing unnecessary services, applying available patches, implementing compensating controls, and configuring the server to follow security best practices. This approach strengthens the server's security posture while allowing the critical application to continue operating."
  },
  {
    "question": "A company is discarding a classified storage array and hires an outside vendor to complete the disposal. Which of the following should the company request from the vendor?",
    "options": ["Certification", "Inventory list", "Classification", "Proof of ownership"],
    "correctAnswer": 0,
    "explanation": "When a third party handles the destruction of sensitive media, the company must obtain a Certificate of Destruction. This is a formal document that serves as an audit record, providing evidence that the data was properly destroyed according to required standards and procedures. This certificate is important for regulatory compliance and provides legal protection by documenting that the company fulfilled its obligation to properly dispose of classified data."
  },
  {
    "question": "During the onboarding process, an employee needs to create a password for an intranet account. The password must include ten characters, numbers, and letters, and two special characters. Once created, the company will grant the employee access to other company-owned websites based on the intranet profile. Which of the following access management concepts is the company most likely using? (Select two).",
    "options": ["Federation", "Identity proofing", "Password complexity", "Default password changes", "Password manager", "Open authentication"],
    "correctAnswer": [0, 2],
    "explanation": "Password complexity: The requirement for a specific length and mix of character types (letters, numbers, special characters) is a direct implementation of a password complexity policy.\n\nFederation: The scenario where a user logs into one system (the intranet) and then is granted access to other systems (company-owned websites) based on that authentication is a clear example of identity federation. This allows for single sign-on capabilities across multiple systems."
  },
  {
    "question": "A systems administrator wants to prevent users from being able to access data based on their responsibilities. The administrator also wants to apply the required access structure to all users in a simplified format. Which of the following should the administrator apply?",
    "options": ["RBAC", "ACL", "SAML", "GPO"],
    "correctAnswer": 0,
    "explanation": "Role-Based Access Control (RBAC) is an access control model that grants permissions based on a user's role within an organization (e.g., \"Database Administrator,\" \"Help Desk Technician,\" \"HR Manager\"). RBAC simplifies access management by assigning permissions to roles rather than individual users. When a user is assigned to a role, they automatically receive all permissions associated with that role. This allows administrators to efficiently manage access based on job responsibilities and makes it easier to adjust permissions when roles change."
  },
  {
    "question": "Which of the following roles, according to the shared responsibility model, is responsible for securing the company's database in an IaaS model for a cloud environment?",
    "options": ["Client", "Third-party vendor", "Cloud provider", "DBA"],
    "correctAnswer": 0,
    "explanation": "In an Infrastructure as a Service (IaaS) cloud model, the cloud provider is responsible for the security of the cloud (physical data centers, servers, networking). The client (customer) is responsible for security in the cloud, including operating systems, applications, and data. Since a database falls into the category of data and applications, securing it is the responsibility of the client, not the cloud provider. This division of security responsibilities is a fundamental aspect of the shared responsibility model in cloud computing."
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
    "explanation": "A key component of any effective security awareness program is teaching employees what to do when they encounter a threat. This includes clear instructions on reporting phishing attempts, suspicious emails, potential malware, or other security concerns. By encouraging and facilitating easy reporting, organizations can quickly respond to potential security incidents. The other options describe technical security functions or specific job duties, rather than general knowledge that all employees should possess as part of security awareness."
  },
  {
    "question": "Which of the following is the best way to consistently determine on a daily basis whether security settings on servers have been modified?",
    "options": ["Automation", "Compliance checklist", "Attestation", "Manual audit"],
    "correctAnswer": 0,
    "explanation": "Manually checking the security settings of multiple servers every day is impractical, time-consuming, and prone to error. Automation is the only feasible solution. Using automated tools (like scripts, configuration management systems, or security compliance tools) can consistently check server configurations against a defined baseline and alert on any deviations. This ensures consistent, reliable monitoring without the resource intensity and human error potential of manual processes."
  },
  {
    "question": "Which of the following vulnerabilities is associated with installing software outside of a manufacturer's approved software repository?",
    "options": ["Jailbreaking", "Memory injection", "Resource reuse", "Side loading"],
    "correctAnswer": 3,
    "explanation": "Side loading refers to the process of installing an application on a mobile device from an unofficial source, rather than the manufacturer's approved app store (like the Apple App Store or Google Play). This practice bypasses the security vetting process that official app stores use to screen for malware and vulnerabilities. Side-loaded apps may contain malicious code, excessive permissions, or security flaws that wouldn't pass the verification processes of official repositories."
  },
  {
    "question": "Several employees received a fraudulent text message from someone claiming to be the Chief Executive Officer (CEO). The message stated:\n\"I'm in an airport right now with no access to my corporate email, and I need you to buy gift cards for a client immediately.\"\n\nWhich of the following are the best responses to this situation? (Choose two).",
    "options": [
      "Cancel current employee recognition gift cards.",
      "Add a smishing exercise to the annual company training.",
      "Issue a general email warning to the company.",
      "Have the CEO change phone numbers.",
      "Conduct a forensic investigation on the CEO's phone.",
      "Implement mobile device management."
    ],
    "correctAnswer": [1, 2],
    "explanation": "The best responses address both the immediate threat and long-term prevention.\n\nIssue a general email warning to the company: This is the best immediate action to alert all employees about the active scam, preventing further victims from falling for the attack.\n\nAdd a smishing exercise to the annual company training: This addresses the long-term prevention by educating employees to recognize and properly respond to SMS-based phishing (smishing) attacks in the future, particularly those impersonating executives."
  },
  {
    "question": "An organization is struggling with scaling issues on its VPN concentrator and internet circuit due to remote work. The organization is looking for a software solution that will allow users to access some cloud services directly without going through the corporate VPN tunnel while still enforcing security policies. Which of the following will help achieve these objectives?",
    "options": [
      "Deploying a SASE solution to remote employees",
      "Building a load-balanced VPN solution with redundant internet",
      "Purchasing a low-cost SD-WAN solution for VPN traffic",
      "Using a cloud provider to create additional VPN concentrators"
    ],
    "correctAnswer": 0,
    "explanation": "A Secure Access Service Edge (SASE) solution combines networking and security functions into a single cloud-delivered service. It allows for intelligent traffic routing, where trusted cloud services can be accessed directly from the user's location (split tunneling) while corporate resources still go through security controls. SASE provides security policy enforcement regardless of user location, solving both the VPN scaling issue and maintaining security without requiring all traffic to flow through the corporate data center."
  },
  {
    "question": "An organization would like to store customer data on a separate part of the network that is not accessible to users on the main corporate network. Which of the following should the administrator use to accomplish this goal?",
    "options": ["Segmentation", "Isolation", "Patching", "Encryption"],
    "correctAnswer": 0,
    "explanation": "Network segmentation is the practice of dividing a network into smaller, isolated sub-networks or segments. By placing the customer data servers in a separate segment and implementing controls like firewalls between segments, the administrator can restrict access to those with a legitimate business need. This prevents users on the main corporate network from accessing the customer data while still allowing authorized systems or users to access it when necessary."
  },
  {
    "question": "The management team notices that new accounts that are set up manually do not always have correct access or permissions.\nWhich of the following automation techniques should a systems administrator use to streamline account creation?",
    "options": ["Guard rail script", "Ticketing workflow", "Escalation script", "User provisioning script"],
    "correctAnswer": 3,
    "explanation": "A user provisioning script is an automated script specifically designed to handle the creation, modification, and deletion of user accounts. Using a script ensures that every new account is created with a consistent and correct set of permissions, eliminating the human error associated with manual account creation. This type of automation can verify that all required steps are followed and appropriate access levels are granted based on the user's role or department."
  },
  {
    "question": "Which of the following security control types does an acceptable use policy best represent?",
    "options": ["Detective", "Compensating", "Corrective", "Preventive"],
    "correctAnswer": 3,
    "explanation": "An Acceptable Use Policy (AUP) is an administrative control that sets rules for user behavior before an incident occurs. Its purpose is to stop users from performing actions that could lead to security incidents in the first place, making it a preventive control. By clearly defining acceptable and unacceptable uses of company resources, an AUP aims to prevent security breaches from occurring rather than detecting or responding to them after the fact."
  },
  {
    "question": "A penetration tester begins an engagement by performing port and service scans against the client environment according to the rules of engagement. Which of the following reconnaissance types is the tester performing?",
    "options": ["Active", "Passive", "Defensive", "Offensive"],
    "correctAnswer": 0,
    "explanation": "Active reconnaissance involves directly interacting with the target to gather information. Port scanning and service scanning require sending packets to the target systems and analyzing the responses. This is considered active reconnaissance because the tester is actively sending traffic to the target systems, which could potentially be detected by security monitoring tools. Passive reconnaissance, in contrast, involves gathering information without directly interacting with the target systems."
  },
  {
    "question": "After a recent ransomware attack on a company's system, an administrator reviewed the log files. Which of the following control types did the administrator use?",
    "options": ["Compensating", "Detective", "Preventive", "Corrective"],
    "correctAnswer": 1,
    "explanation": "Log files are a prime example of a detective control. They do not prevent an attack from happening or correct the damage afterward. Instead, they record events as they occur, allowing an administrator to investigate an incident to understand how it happened, what was affected, and potentially who was responsible. Detective controls help identify that a security incident has occurred and provide information for the response and recovery process."
  },
  {
    "question": "Which of the following can be used to identify potential attacker activities without affecting production servers?",
    "options": ["Honeypot", "Video surveillance", "Zero Trust", "Geofencing"],
    "correctAnswer": 0,
    "explanation": "A honeypot is a decoy computer system designed to attract and trap cyberattackers. It mimics a real production system to lure attackers, allowing security teams to study their methods and gather intelligence on their activities without any risk to the actual production environment. Honeypots can provide early warning of new attack techniques and help organizations understand the tactics being used against them."
  },
  {
    "question": "An administrator is reviewing a single server's security logs and discovers multiple failed login attempts for the \"Administrator\" account in a very short period. Which of the following best describes the action captured in this log file?",
    "options": ["Brute-force attack", "Privilege escalation", "Failed password audit", "Forgotten password by the user"],
    "correctAnswer": 0,
    "explanation": "A brute-force attack is characterized by an attacker systematically trying a large number of possible passwords in rapid succession to gain unauthorized access. The log showing numerous failed login attempts for a single account within a short timeframe is a classic indicator of this type of attack. The pattern of repeated, rapid login failures for the high-value \"Administrator\" account strongly suggests a deliberate brute-force attempt rather than legitimate user activity."
  },
  {
    "question": "Which of the following would be best suited for constantly changing environments?",
    "options": ["RTOS", "Containers", "Embedded systems", "SCADA"],
    "correctAnswer": 1,
    "explanation": "Containers are lightweight, standalone, executable packages of software that include everything needed to run an application. Because they are portable and can be deployed quickly and consistently across different environments, they are ideal for dynamic, constantly changing development and operational workflows, such as in DevOps. Containers can be easily created, destroyed, and replaced, making them well-suited for environments that require frequent changes or updates."
  },
  {
    "question": "Which of the following allows for the attribution of messages to individuals?",
    "options": ["Adaptive identity", "Non-repudiation", "Authentication", "Access logs"],
    "correctAnswer": 1,
    "explanation": "Non-repudiation provides proof of the origin, integrity, and delivery of data. It ensures that a party cannot deny having sent a message or performed an action. This is typically achieved using digital signatures, which cryptographically link a message to a specific individual's private key, providing strong evidence of who created or sent the message and preventing them from later denying their involvement."
  },
  {
    "question": "Security controls in a data center are being reviewed to ensure data is properly protected and that human life considerations are included. Which of the following best describes how the controls should be set up?",
    "options": ["Remote access points should fail closed.", "Logging controls should fail open.", "Safety controls should fail open.", "Logical security controls should fail closed."],
    "correctAnswer": 2,
    "explanation": "Safety controls, such as fire suppression systems or emergency exit doors, are designed to protect human life. These systems should fail open, meaning in the event of a failure, they default to a state that prioritizes safety (e.g., doors unlock). In contrast, security controls should fail closed, meaning they default to a state that denies access. The principle is that human life and safety always take precedence over data security—people must be able to exit during emergencies, even if it potentially compromises security."
  },
  {
    "question": "A security operations center determines that the malicious activity detected on a server is normal. Which of the following activities describes the act of ignoring detected activity in the future?",
    "options": ["Tuning", "Aggregating", "Quarantining", "Archiving"],
    "correctAnswer": 0,
    "explanation": "Tuning is the process of adjusting the rules and thresholds of a security monitoring tool to reduce false positive alerts. When an alert is identified as normal activity, the system is \"tuned\" to ignore that specific pattern in the future. This helps focus security resources on genuine threats by reducing noise from benign activities that might otherwise trigger alerts, improving the efficiency and effectiveness of security monitoring."
  },
  {
    "question": "Malware spread across a company's network after an employee visited a compromised industry blog. Which of the following best describes this type of attack?",
    "options": ["Impersonation", "Disinformation", "Watering-hole", "Smishing"],
    "correctAnswer": 2,
    "explanation": "A watering-hole attack is a targeted attack where adversaries compromise a legitimate website that they know their target group frequently visits. They infect the site with malware, hoping that members of the target group will become infected when they visit the site. In this case, the industry blog was the \"watering hole\" where targets (company employees) were likely to visit, allowing the attackers to infect multiple systems within the organization through a single compromised site."
  },
  {
    "question": "A business received a small grant to migrate its infrastructure to an off-premises solution. Which of the following should be considered first?",
    "options": ["Security of cloud providers", "Cost of implementation", "Ability of engineers", "Security of architecture"],
    "correctAnswer": 3,
    "explanation": "Before evaluating specific providers or costs, the first step should be designing a secure architecture. This involves defining the security requirements, data flows, and access controls for the new cloud environment, which provides the foundation for all other decisions. A well-designed security architecture ensures that security is built into the migration from the beginning rather than added as an afterthought, leading to better protection and often lower costs in the long run."
  },
  {
    "question": "Which of the following vulnerabilities is exploited when an attacker overwrites a register with a malicious address?",
    "options": ["VM escape", "SQL injection", "Buffer overflow", "Race condition"],
    "correctAnswer": 2,
    "explanation": "A buffer overflow occurs when a program writes more data to a buffer than it can hold, overwriting adjacent memory. An attacker can exploit this by overwriting a return address register with the address of their own malicious code, causing the CPU to execute it. This is a common vulnerability in languages like C and C++ that don't automatically perform bounds checking on memory operations, allowing attackers to manipulate program execution by corrupting memory."
  },
  {
    "question": "An analyst is evaluating the implementation of Zero Trust principles within the data plane. Which of the following would be most relevant for the analyst to evaluate?",
    "options": ["Secured zones", "Subject role", "Adaptive identity", "Threat scope reduction"],
    "correctAnswer": 3,
    "explanation": "In a Zero Trust model, the data plane is secured through micro-segmentation. A primary goal of this is threat scope reduction. If an attacker compromises one segment, they are prevented from moving laterally to others, thus limiting the \"blast radius\" of a breach. This directly aligns with the Zero Trust principle of \"never trust, always verify\" by restricting access between segments and minimizing the potential damage from a compromise, making it the most relevant aspect when evaluating Zero Trust in the data plane."
  },
  {
    "question": "An organization disabled unneeded services and placed a firewall in front of a business-critical legacy system. Which of the following best describes the actions taken by the organization?",
    "options": ["Exception", "Segmentation", "Risk transfer", "Compensating controls"],
    "correctAnswer": 3,
    "explanation": "Compensating controls are alternative security measures implemented when a primary control is not feasible. Since the legacy system likely cannot be patched, the organization is implementing other controls—disabling services and using a firewall—to compensate for this weakness. These measures provide protection for the vulnerable system without requiring direct modification of the system itself, which is the essence of compensating controls."
  },
  {
    "question": "An administrator was notified that a user logged in remotely after hours and copied large amounts of data to a personal device. Which of the following best describes the user's activity?",
    "options": ["Penetration testing", "Phishing campaign", "External audit", "Insider threat"],
    "correctAnswer": 3,
    "explanation": "An insider threat is a security risk that originates from within the organization, such as from an employee with legitimate access. The user's suspicious after-hours activity and data exfiltration are clear indicators of a potential insider threat. The user is exploiting their legitimate access to company systems to potentially steal or misuse sensitive data, which is a classic example of an insider threat scenario."
  },
  {
    "question": "A company has begun labeling all laptops with asset inventory stickers and associating them with employee IDs. Which of the following security benefits do these actions provide? (Choose two.)",
    "options": ["If a security incident occurs on the device, the correct employee can be notified.",
      "The security team will be able to send user awareness training to the appropriate device.",
      "Users can be mapped to their devices when configuring software MFA tokens.",
      "User-based firewall policies can be correctly targeted to the appropriate laptops.",
      "When conducting penetration testing, the security team will be able to target the desired laptops.",
      "Company data can be accounted for when the employee leaves the organization."],
    "correctAnswer": [0, 5],
    "explanation": "By linking a physical asset tag to an employee, the security team can quickly identify the user responsible for a device involved in an incident.\n\nDuring offboarding, this association ensures all company assets, including the specific laptop and its data, are properly returned and accounted for. This helps prevent data loss when employees leave and ensures all company property is recovered."
  },
  {
    "question": "One of a company's vendors sent an analyst a security bulletin that recommends a BIOS update. Which of the following vulnerability types is being addressed by the patch?",
    "options": ["Virtualization", "Firmware", "Application", "Operating system"],
    "correctAnswer": 1,
    "explanation": "The BIOS (Basic Input/Output System) is a type of firmware—software embedded into a hardware device's memory. A BIOS update involves patching this low-level software to address security vulnerabilities at the hardware level. Firmware vulnerabilities can be particularly serious as they exist below the operating system layer and may persist even if the operating system is reinstalled, making them important to patch promptly."
  },
  {
    "question": "Which of the following would be the best ways to ensure only authorized personnel can access a secure facility? (Select two).",
    "options": ["Fencing", "Video surveillance", "Badge access", "Access control vestibule", "Sign-in sheet", "Sensor"],
    "correctAnswer": [2, 3],
    "explanation": "Badge access systems enforce authentication by requiring a valid credential to unlock a door. This ensures only individuals with proper authorization can enter the facility.\n\nAn access control vestibule (mantrap) is a highly effective control that prevents tailgating by allowing only one person to pass through at a time. This consists of two interlocking doors where the second door won't open until the first has closed, ensuring that each person must authenticate individually."
  },
  {
    "question": "Which of the following factors are the most important to address when formulating a training curriculum plan for a security awareness program? (Select two).",
    "options": ["Channels by which the organization communicates with customers",
      "The reporting mechanisms for ethics violations",
      "Threat vectors based on the industry in which the organization operates",
      "Secure software development training for all personnel",
      "Cadence and duration of training events",
      "Retraining requirements for individuals who fail phishing simulations"],
    "correctAnswer": [2, 4],
    "explanation": "Training must be relevant. Tailoring the curriculum to the specific threat vectors faced by the organization's industry makes it more effective. This ensures employees learn about the risks most likely to affect them.\n\nThe cadence and duration of training are critical for retention. Regular, bite-sized training is often more effective than a single, long annual session. Establishing an appropriate schedule with the right length and frequency ensures better knowledge retention without overwhelming employees."
  },
  {
    "question": "Which of the following would be the best way to block unknown programs from executing?",
    "options": ["Access control list", "Application allow list", "Host-based firewall", "DLP solution"],
    "correctAnswer": 1,
    "explanation": "An application allow list operates on a \"default deny\" principle. It contains a list of approved programs, and any program not on this list is automatically blocked from executing. This provides strong protection against malware and unauthorized software by preventing any unknown or unapproved programs from running, regardless of how they arrive on the system."
  },
  {
    "question": "Which of the following is used to protect a computer from viruses, malware, and Trojans being installed and moving laterally across the network?",
    "options": ["IDS", "ACL", "EDR", "NAC"],
    "correctAnswer": 2,
    "explanation": "Endpoint Detection and Response (EDR) solutions continuously monitor endpoints to detect malicious activity, block malware from being installed, and can identify and stop attempts at lateral movement. EDR tools provide real-time monitoring, advanced threat detection, and automated response capabilities specifically designed to protect endpoints from various forms of malware and prevent the spread of threats across the network."
  },
  {
    "question": "An organization is building a new backup data center with cost-benefit as the primary requirement and RTO and RPO values around two days. Which of the following types of sites is the best for this scenario?",
    "options": ["Real-time recovery", "Hot", "Cold", "Warm"],
    "correctAnswer": 2,
    "explanation": "A cold site is a basic facility with power and networking but no hardware. It is the least expensive option but has the longest Recovery Time Objective (RTO). An RTO of around two days is consistent with the time needed to activate a cold site. Given that cost-benefit is the primary requirement and the organization can tolerate a recovery time of around two days, a cold site provides the most economical solution that still meets the recovery time needs."
  },
  {
    "question": "A security analyst and the management team are reviewing the organizational performance of a recent phishing campaign. The user click-through rate exceeded the acceptable risk threshold, and the management team wants to reduce the impact when a user clicks on a link in a phishing message. Which of the following should the analyst do?",
    "options": ["Place posters around the office to raise awareness of common phishing activities.",
      "Implement email security filters to prevent phishing emails from being delivered.",
      "Update the EDR policies to block automatic execution of downloaded programs.",
      "Create additional training for users to recognize the signs of phishing attempts."],
    "correctAnswer": 2,
    "explanation": "The goal is to reduce the impact after a user has clicked a link. The most effective post-click control is to update the Endpoint Detection and Response (EDR) policies to block automatic execution. This way, even if a user downloads malware, the EDR system will prevent it from running. This directly addresses the management team's concern about reducing the impact of successful phishing clicks rather than just preventing the clicks themselves."
  },
  {
    "question": "Which of the following is the most likely outcome if a large bank fails an internal PCI DSS compliance assessment?",
    "options": ["Fines", "Audit findings", "Sanctions", "Reputation damage"],
    "correctAnswer": 0,
    "explanation": "The Payment Card Industry Data Security Standard (PCI DSS) is enforced by the major payment card brands. Non-compliance can result in significant monetary fines, which are levied by the card brands against the bank. These fines can vary based on factors like the bank's size, the volume of transactions processed, and the severity of the compliance issues. This makes fines the most immediate and likely outcome of failing an internal PCI DSS compliance assessment."
  },
  {
    "question": "A Chief Information Security Officer (CISO) wants to explicitly raise awareness about the increase of ransomware-as-a-service in a report to the management team. Which of the following best describes the threat actor in the CISO's report?",
    "options": ["Insider threat", "Hacktivist", "Nation-state", "Organized crime"],
    "correctAnswer": 3,
    "explanation": "Ransomware-as-a-Service (RaaS) is a business model run by sophisticated, profit-driven threat actors. This professional, financially motivated structure is a hallmark of organized crime. These criminal groups develop, maintain, and license ransomware toolkits to affiliates who conduct the attacks, with profits being shared between the developers and the attackers. The commercial nature and structure of RaaS operations clearly align with organized crime rather than the other threat actor types listed."
  },
  {
    "question": "Which of the following is a hardware-specific vulnerability?",
    "options": ["Firmware version", "Buffer overflow", "SQL injection", "Cross-site scripting"],
    "correctAnswer": 0,
    "explanation": "Firmware is software embedded directly into hardware. An outdated or unpatched firmware version can contain vulnerabilities that are specific to that hardware device. Unlike the other options, which are software programming vulnerabilities, firmware vulnerabilities exist at the hardware-software interface level and are tied directly to specific hardware components. Examples include vulnerabilities in BIOS/UEFI, device drivers, or embedded controllers."
  },
  {
    "question": "During an investigation, an incident response team attempts to understand the source of an incident. Which of the following incident response activities describes this process?",
    "options": ["Analysis", "Lessons learned", "Detection", "Containment"],
    "correctAnswer": 0,
    "explanation": "During the Analysis phase of incident response, the team investigates the incident to determine its root cause, the scope of the compromise, and the methods used by the attacker. This involves examining logs, network traffic, system images, and other evidence to understand what happened, how it happened, and the extent of the impact. This analytical process helps inform the subsequent containment, eradication, and recovery phases."
  },
  {
    "question": "Which of the following automation use cases would best enhance the security posture of an organization by rapidly updating permissions when employees leave a company?",
    "options": ["Provisioning resources", "Disabling access", "Reviewing change approvals", "Escalating permission requests"],
    "correctAnswer": 1,
    "explanation": "Automating the process of disabling access is critical for security. When an employee's status changes in the HR system, an automated workflow should be triggered immediately to revoke their access to all corporate systems. This reduces the risk window that exists between when an employee leaves and when their access is manually revoked, preventing potential unauthorized access during this gap period."
  },
  {
    "question": "An organization is leveraging a VPN between its headquarters and a branch location. Which of the following is the VPN protecting?",
    "options": ["Data in use", "Data in transit", "Geographic restrictions", "Data sovereignty"],
    "correctAnswer": 1,
    "explanation": "A VPN creates an encrypted tunnel between two endpoints over a public network. Its primary function is to protect data in transit, ensuring it remains confidential and cannot be intercepted or read while moving across the public internet. Data in transit refers to information that is actively moving from one location to another, such as between the headquarters and branch office in this scenario."
  },
  {
    "question": "Which of the following is the most common data loss path for an air-gapped network?",
    "options": ["Bastion host", "Unsecured Bluetooth", "Unpatched OS", "Removable devices"],
    "correctAnswer": 3,
    "explanation": "An air-gapped network is physically isolated from unsecured networks. The most common vector for introducing malware or exfiltrating data is through removable devices like USB drives, which can be carried across the \"air gap.\" Even with strict network isolation, users often need to transfer data in and out of the secure environment, and removable media provides that bridge. This is why strict controls on USB devices and other removable media are essential for truly secure air-gapped networks."
  },
  {
    "question": "Which of the following is required for an organization to properly manage its restore process in the event of system failure?",
    "options": ["IRP", "DRP", "RPO", "SDLC"],
    "correctAnswer": 1,
    "explanation": "A Disaster Recovery Plan (DRP) is the formal document that outlines the specific procedures an organization must take to recover its technology infrastructure and operations after a disaster. It includes detailed steps for system restoration, roles and responsibilities, required resources, and recovery priorities. This comprehensive plan is essential for ensuring that restoration processes are properly managed during a crisis when normal operations are disrupted."
  },
  {
    "question": "A network manager wants to protect the company's VPN by implementing multifactor authentication that uses: • Something you know • Something you have • Something you are. Which of the following would accomplish the manager's goal?",
    "options": ["Domain name, PKI, GeoIP lookup", "VPN IP address, company ID, facial structure", "Password, authentication token, thumbprint", "Company URL, TLS certificate, home address"],
    "correctAnswer": 2,
    "explanation": "This option perfectly matches the three required authentication factors:\n\nPassword: Something you know.\n\nAuthentication token: Something you have.\n\nThumbprint: Something you are (biometric)."
  },
  {
    "question": "Which of the following can be used to identify potential attacker activities without affecting production servers?",
    "options": ["Honeypot", "Video surveillance", "Zero Trust", "Geofencing"],
    "correctAnswer": 0,
    "explanation": "A honeypot is a decoy computer system designed to attract and trap cyberattackers. It mimics a real production system to lure attackers, allowing security teams to study their methods and gather intelligence on their activities without any risk to the actual production environment."
  },
  {
    "question": "An administrator is reviewing a single server's security logs and discovers multiple failed login attempts for the \"Administrator\" account in a very short period. Which of the following best describes the action captured in this log file?",
    "options": ["Brute-force attack", "Privilege escalation", "Failed password audit", "Forgotten password by the user"],
    "correctAnswer": 0,
    "explanation": "A brute-force attack is characterized by an attacker systematically trying a large number of possible passwords in rapid succession to gain unauthorized access. The log showing numerous failed login attempts for a single account within a short timeframe is a classic indicator of this type of attack."
  },
  {
    "question": "Which of the following would be best suited for constantly changing environments?",
    "options": ["RTOS", "Containers", "Embedded systems", "SCADA"],
    "correctAnswer": 1,
    "explanation": "Containers are lightweight, standalone, executable packages of software that include everything needed to run an application. Because they are portable and can be deployed quickly and consistently across different environments, they are ideal for dynamic, constantly changing development and operational workflows, such as in DevOps."
  },
  {
    "question": "Which of the following allows for the attribution of messages to individuals?",
    "options": ["Adaptive identity", "Non-repudiation", "Authentication", "Access logs"],
    "correctAnswer": 1,
    "explanation": "Non-repudiation provides proof of the origin, integrity, and delivery of data. It ensures that a party cannot deny having sent a message or performed an action. This is typically achieved using digital signatures, which cryptographically link a message to a specific individual."
  },
  {
    "question": "Security controls in a data center are being reviewed to ensure data is properly protected and that human life considerations are included. Which of the following best describes how the controls should be set up?",
    "options": ["Remote access points should fail closed.", "Logging controls should fail open.", "Safety controls should fail open.", "Logical security controls should fail closed."],
    "correctAnswer": 2,
    "explanation": "Safety controls, such as fire suppression systems or emergency exit doors, are designed to protect human life. These systems should fail open, meaning in the event of a failure, they default to a state that prioritizes safety (e.g., doors unlock). In contrast, security controls should fail closed, meaning they default to a state that denies access."
  },
  {
    "question": "A security operations center determines that the malicious activity detected on a server is normal. Which of the following activities describes the act of ignoring detected activity in the future?",
    "options": ["Tuning", "Aggregating", "Quarantining", "Archiving"],
    "correctAnswer": 0,
    "explanation": "Tuning is the process of adjusting the rules and thresholds of a security monitoring tool to reduce false positive alerts. When an alert is identified as normal activity, the system is \"tuned\" to ignore that specific pattern in the future."
  },
  {
    "question": "Malware spread across a company's network after an employee visited a compromised industry blog. Which of the following best describes this type of attack?",
    "options": ["Impersonation", "Disinformation", "Watering-hole", "Smishing"],
    "correctAnswer": 2,
    "explanation": "A watering-hole attack is a targeted attack where adversaries compromise a legitimate website that they know their target group frequently visits. They infect the site with malware, hoping that members of the target group will become infected."
  },
  {
    "question": "A business received a small grant to migrate its infrastructure to an off-premises solution. Which of the following should be considered first?",
    "options": ["Security of cloud providers", "Cost of implementation", "Ability of engineers", "Security of architecture"],
    "correctAnswer": 3,
    "explanation": "Before evaluating specific providers or costs, the first step should be designing a secure architecture. This involves defining the security requirements, data flows, and access controls for the new cloud environment, which provides the foundation for all other decisions."
  },
  {
    "question": "Which of the following vulnerabilities is exploited when an attacker overwrites a register with a malicious address?",
    "options": ["VM escape", "SQL injection", "Buffer overflow", "Race condition"],
    "correctAnswer": 2,
    "explanation": "A buffer overflow occurs when a program writes more data to a buffer than it can hold, overwriting adjacent memory. An attacker can exploit this by overwriting a return address register with the address of their own malicious code, causing the CPU to execute it."
  },
  {
    "question": "An analyst is evaluating the implementation of Zero Trust principles within the data plane. Which of the following would be most relevant for the analyst to evaluate?",
    "options": ["Secured zones", "Subject role", "Adaptive identity", "Threat scope reduction"],
    "correctAnswer": 3,
    "explanation": "In a Zero Trust model, the data plane is secured through micro-segmentation. A primary goal of this is threat scope reduction. If an attacker compromises one segment, they are prevented from moving laterally to others, thus limiting the \"blast radius\" of a breach."
  },
  {
    "question": "An organization disabled unneeded services and placed a firewall in front of a business-critical legacy system. Which of the following best describes the actions taken by the organization?",
    "options": ["Exception", "Segmentation", "Risk transfer", "Compensating controls"],
    "correctAnswer": 3,
    "explanation": "Compensating controls are alternative security measures implemented when a primary control is not feasible. Since the legacy system likely cannot be patched, the organization is implementing other controls—disabling services and using a firewall—to compensate for this weakness."
  },
  {
    "question": "An administrator was notified that a user logged in remotely after hours and copied large amounts of data to a personal device. Which of the following best describes the user's activity?",
    "options": ["Penetration testing", "Phishing campaign", "External audit",
