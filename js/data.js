// Updated Portfolio Data for Thejeswin S L
const PORTFOLIO_DATA = {
  profile: {
    name: "Thejeswin S L",
    roles: ["Cybersecurity Analyst", "SOC Analyst L1", "Blue Team Security", "Incident Response"],
    tagline: "Specializing in SIEM Engineering, Incident Response & MITRE ATT&CK Threat Hunting",
    graduation: "Graduated 2026",
    status: "Available for Full-Time Roles & Opportunities",
    location: "Krishnagiri, India",
    phone: "+91 88255 71099",
    email: "thejes0611@gmail.com",
    linkedin: "https://linkedin.com/in/thejeswin",
    linkedinDisplay: "linkedin.com/in/thejeswin",
    github: "https://github.com/thejeswin",
    githubDisplay: "github.com/thejeswin",
    tryhackme: "https://tryhackme.com/p/Thejes",
    tryhackmeDisplay: "tryhackme.com/p/Thejes",
    resumeUrl: "resume/Thejeswin_S_L_Resume.pdf",
    summary: `Cybersecurity Engineering graduate (2026) with hands-on SOC L1 experience across Wazuh, Splunk, and ELK Stack, specializing in real-time alert triage, Windows Event Log and Sysmon analysis, IOC identification, and structured incident response. Skilled in building SIEM correlation rules mapped to MITRE ATT&CK, reducing false positives through threshold tuning, and reconstructing attack timelines by correlating endpoint, network, and authentication telemetry. Completed the TryHackMe SOC Level 1 path (80+ rooms) with strong grounding in TCP/IP networking, firewall/IDS-IPS fundamentals, and the NIST incident-response lifecycle. Seeking a SOC/Cybersecurity Analyst role to bring production-grade detection engineering and investigation skills to a live security operations environment.`,
    stats: [
      { value: "100+", label: "Alerts Triaged", detail: "Simulated in Wazuh & Splunk" },
      { value: "80+", label: "TryHackMe Rooms", detail: "SOC Level 1 Learning Path" },
      { value: "35%", label: "FP Reduction", detail: "Correlation Rule Tuning" },
      { value: "6", label: "Custom Dashboards", detail: "Engineered in Splunk" }
    ]
  },

  coreCompetencies: [
    { title: "SIEM Monitoring & Triage", desc: "Real-time monitoring, multi-feed alert classification, and false positive elimination." },
    { title: "Log Analysis & IOC Detection", desc: "Host and network telemetry correlation across Sysmon, Windows Events, and Zeek." },
    { title: "Incident Response", desc: "Structured execution of end-to-end incident handling lifecycle following NIST guidelines." },
    { title: "False Positive Reduction", desc: "Baseline behavioral profiling and threshold optimization to enhance detection fidelity." },
    { title: "Threat Hunting", desc: "Proactive hypothesis-driven hunting using SPL & KQL to detect stealthy adversary activity." }
  ],

  projects: [
    {
      id: "splunk-siem",
      title: "Splunk SIEM — Custom Detection Rules & Dashboard Engineering",
      period: "Apr 2026",
      type: "Log Analysis & Correlation Alert Development",
      environment: "Home Lab",
      description: "Advanced detection engineering using Splunk SPL and Windows Event Logs to identify brute-force logons and macro-based malware.",
      bullets: [
        "Ingested Windows Event Logs (Security, System, PowerShell) and Sysmon data into Splunk; parsed and normalized multi-source log fields to enable cross-source correlation for endpoint threat detection.",
        "Built SPL correlation rules for brute-force logon detection (Event ID 4625, 10+ unsuccessful login attempts within 60 seconds) and macro-malware indicators (Event ID 4104 via Office parent processes).",
        "Engineered 6 dashboards tracking unsuccessful authentications, outbound anomalies, and process execution chains; tuned thresholds against known administrative activity to cut false positives by ~35%."
      ],
      links: [
        {
          label: "Live Lab Documentation",
          url: "https://thejeswin.github.io/splunk-siem-soc-lab/",
          icon: "site",
          type: "primary"
        },
        {
          label: "GitHub Repository",
          url: "https://github.com/thejeswin/splunk-siem-soc-lab",
          icon: "github",
          type: "secondary"
        }
      ],
      tags: ["Splunk Enterprise", "SPL", "Event ID 4625", "Event ID 4104", "Sysmon", "Detection Engineering", "Dashboard Design"]
    },
    {
      id: "wazuh-siem",
      title: "Wazuh SIEM — SOC L1 Simulation & Incident Response",
      period: "Jan 2026",
      type: "Security Monitoring & Alert Triage",
      environment: "Home Lab / Academic Environment",
      description: "Comprehensive SOC L1 operations simulation focused on endpoint telemetry correlation, threat detection, and structured escalation.",
      bullets: [
        "Triaged 100+ simulated alerts in Wazuh; classified severity, validated true/false positives, and documented findings using an SOC L1 escalation framework.",
        "Correlated Wazuh agent, system, and authentication logs across multiple Windows and Linux endpoints to detect unauthorized access, lateral movement, and privilege escalation; mapped findings to MITRE ATT&CK (T1078, T1021, T1055).",
        "Executed the full incident-response lifecycle — alert receipt, triage, severity classification, documentation, and escalation reporting — aligned with the NIST incident-handling lifecycle."
      ],
      tags: ["Wazuh SIEM", "MITRE ATT&CK", "NIST Framework", "Linux/Windows Endpoints", "Alert Triage", "Escalation"]
    },
    {
      id: "elk-security-onion",
      title: "ELK Stack & Security Onion — Proactive Threat Hunting",
      period: "Dec 2025",
      type: "Threat Detection & Log Correlation",
      environment: "Academic Project",
      description: "Multi-layered network and endpoint telemetry fusion using Elasticsearch, Kibana, Zeek, and Suricata IDS.",
      bullets: [
        "Hunted across Elasticsearch/Kibana with custom KQL queries, surfacing low-and-slow credential stuffing and abnormal process parent-child chains across multiple endpoints that automated rules missed.",
        "Correlated Sysmon Event IDs 1/3/10/11 with Zeek and Suricata data in Security Onion to reconstruct full attack timelines and investigate PowerShell/LSASS abuse.",
        "Deployed Security Onion for full-packet capture and network-level monitoring, combining IDS alerts, connection logs, and endpoint telemetry into a single detection pipeline."
      ],
      tags: ["Elasticsearch", "Logstash", "Kibana (KQL)", "Security Onion", "Zeek", "Suricata IDS", "Sysmon 1/3/10/11", "PCAP Forensics"]
    }
  ],

  technicalSkills: [
    {
      category: "Programming & Query Languages",
      items: [
        { name: "SQL", note: "Log & database querying" },
        { name: "SPL", note: "Splunk search processing language" },
        { name: "KQL", note: "Kibana query language" },
        { name: "Python, C, PHP", note: "Working knowledge & fundamentals" }
      ]
    },
    {
      category: "SIEM Platforms",
      items: [
        { name: "Wazuh", note: "Agent config, alert triage" },
        { name: "Splunk", note: "Correlation rules, dashboards" },
        { name: "ELK Stack", note: "Elasticsearch, Logstash, Kibana" },
        { name: "Security Onion", note: "Zeek & Suricata integration" }
      ]
    },
    {
      category: "Detection & Analysis",
      items: [
        { name: "Windows Event Logs", note: "Security, System, PowerShell" },
        { name: "Sysmon", note: "Process, Network, LSASS handles" },
        { name: "Zeek & Suricata", note: "Network metadata & IDS alerts" },
        { name: "Wireshark & Nmap", note: "Packet inspection & port scanning" },
        { name: "IOC Analysis", note: "Threat indicators & triage" }
      ]
    },
    {
      category: "Frameworks & Methodologies",
      items: [
        { name: "MITRE ATT&CK", note: "Adversary TTP mapping" },
        { name: "Cyber Kill Chain", note: "Multi-stage attack defense" },
        { name: "NIST IR Lifecycle", note: "SP 800-61 incident response" }
      ]
    },
    {
      category: "Networking & Systems",
      items: [
        { name: "TCP/IP, DNS, HTTP/S", note: "Core network protocols" },
        { name: "SMTP & Firewalls", note: "Mail & perimeter defense" },
        { name: "IDS / IPS", note: "Intrusion detection & prevention" },
        { name: "Windows Server", note: "Fluency & log inspection" },
        { name: "Linux (Ubuntu, Kali)", note: "CLI proficiency & tools" }
      ]
    },
    {
      category: "Cloud Platforms",
      items: [
        { name: "AWS", note: "Cloud security fundamentals" },
        { name: "Microsoft Azure", note: "Cloud infrastructure basics" }
      ]
    },
    {
      category: "Core Competencies",
      items: [
        { name: "SIEM Monitoring & Triage", note: "Real-time alert operations" },
        { name: "Log Analysis & IOC Detection", note: "Multi-source correlation" },
        { name: "Incident Response", note: "NIST lifecycle containment" },
        { name: "False Positive Reduction", note: "Threshold & rule tuning" },
        { name: "Threat Hunting", note: "Proactive hypothesis-driven" }
      ]
    }
  ],

  certifications: [
    {
      title: "Security Operations Center (SOC) L1 Training",
      issuer: "Prompt InfoTech",
      type: "Professional Certification"
    },
    {
      title: "Ethical Hacker",
      issuer: "Cisco Networking Academy",
      type: "Cybersecurity Certification"
    },
    {
      title: "C Programming",
      issuer: "Selfmade Ninja Academy",
      type: "Programming Training"
    },
    {
      title: "Deloitte Australia Cyber Job Simulation",
      issuer: "Forage",
      type: "Industry Practical Simulation"
    },
    {
      title: "Mastercard Cybersecurity Job Simulation",
      issuer: "Forage",
      type: "Industry Practical Simulation"
    },
    {
      title: "Ethical Hacking Fundamentals",
      issuer: "Udemy",
      type: "Course Credential"
    },
    {
      title: "TryHackMe SOC Level 1 Path (80+ Rooms)",
      issuer: "TryHackMe",
      type: "Hands-on Practical Training"
    }
  ],

  education: [
    {
      degree: "B.E. Computer Science & Engineering (Cyber Security)",
      institution: "Karpagam College of Engineering",
      location: "Coimbatore, India",
      timeline: "2022 – 2026",
      type: "Undergraduate Degree"
    }
  ]
};

window.PORTFOLIO_DATA = PORTFOLIO_DATA;
