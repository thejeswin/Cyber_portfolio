/**
 * Interactive SOC Command Terminal & Log Triage Engine
 * Thejeswin S L - Cybersecurity Portfolio
 */

class SOCTerminal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.outputElement = this.container.querySelector('.terminal-output');
    this.inputElement = this.container.querySelector('.terminal-input');
    this.history = [];
    this.historyIndex = -1;
    this.data = window.PORTFOLIO_DATA || {};

    this.commands = {
      help: () => this.cmdHelp(),
      whoami: () => this.cmdWhoami(),
      summary: () => this.cmdSummary(),
      stats: () => this.cmdStats(),
      skills: (args) => this.cmdSkills(args),
      projects: (args) => this.cmdProjects(args),
      mitre: (args) => this.cmdMitre(args),
      rules: (args) => this.cmdRules(args),
      spl: () => this.cmdRules(['spl']),
      kql: () => this.cmdRules(['kql']),
      triage: (args) => this.cmdTriage(args),
      certs: () => this.cmdCerts(),
      education: () => this.cmdEducation(),
      contact: () => this.cmdContact(),
      download: () => this.cmdDownload(),
      clear: () => this.cmdClear(),
      cls: () => this.cmdClear(),
      banner: () => this.cmdBanner(),
      matrix: () => this.cmdMatrix(),
      sysmon: () => this.cmdSysmon()
    };

    this.init();
  }

  init() {
    this.cmdBanner();
    this.printLine('Type <span class="term-highlight">help</span> or click quick actions below to inspect detection telemetry, live triage simulations, and analyst credentials.', 'system-msg');
    this.printLine('------------------------------------------------------------------------------------------------');

    if (this.inputElement) {
      this.inputElement.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    // Quick Command Buttons delegation
    const quickChips = document.querySelectorAll('[data-term-cmd]');
    quickChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const cmd = chip.getAttribute('data-term-cmd');
        if (cmd) {
          this.executeCommand(cmd);
          if (window.cyberAudio) window.cyberAudio.playClick();
        }
      });
    });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const rawInput = this.inputElement.value.trim();
      if (rawInput) {
        this.history.push(rawInput);
        this.historyIndex = this.history.length;
        this.executeCommand(rawInput);
      }
      this.inputElement.value = '';
    } else if (e.key === 'ArrowUp') {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.inputElement.value = this.history[this.historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.inputElement.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.inputElement.value = '';
      }
      e.preventDefault();
    }
  }

  executeCommand(raw) {
    this.printLine(`<span class="term-prompt">thejeswin@soc-station:~$</span> <span class="term-user-cmd">${this.escapeHTML(raw)}</span>`);
    
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (this.commands[cmd]) {
      this.commands[cmd](args);
    } else {
      this.printLine(`<span class="term-error">Command not recognized: "${cmd}". Type <span class="term-highlight">help</span> to view available SOC commands.</span>`);
    }

    this.scrollToBottom();
  }

  printLine(html, customClass = '') {
    const line = document.createElement('div');
    line.className = `term-line ${customClass}`;
    line.innerHTML = html;
    this.outputElement.appendChild(line);
  }

  scrollToBottom() {
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  cmdBanner() {
    const bannerText = `
<pre class="term-ascii">
███████╗ ██████╗  ██████╗    ███████╗████████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
██╔════╝██╔═══██╗██╔════╝    ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
███████╗██║   ██║██║         ███████╗   ██║   ███████║   ██║   ██║██║   ██║██╔██╗ ██║
╚════██║██║   ██║██║         ╚════██║   ██║   ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
███████║╚██████╔╝╚██████╗    ███████║   ██║   ██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
╚══════╝ ╚═════╝  ╚═════╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
</pre>
<div class="term-meta-grid">
  <span><strong>ANALYST:</strong> Thejeswin S L</span>
  <span><strong>ROLE:</strong> SOC Analyst L1 • Blue Team</span>
  <span><strong>STATUS:</strong> Active • Ready for Dispatch</span>
  <span><strong>SECURITY NODE:</strong> Krishnagiri / Coimbatore (IN)</span>
</div>`;
    this.printLine(bannerText);
  }

  cmdHelp() {
    const helpOutput = `
<div class="term-table">
  <div class="term-row"><span class="term-key">triage [id]</span><span class="term-val">Simulate live SOC incident triage (e.g. <code>triage 1</code>, <code>triage list</code>)</span></div>
  <div class="term-row"><span class="term-key">rules / spl / kql</span><span class="term-val">Inspect custom correlation detection rules for Event IDs 4625, 4104, Sysmon</span></div>
  <div class="term-row"><span class="term-key">mitre</span><span class="term-val">Display MITRE ATT&CK tactical mappings (T1078, T1021, T1055, T1059)</span></div>
  <div class="term-row"><span class="term-key">sysmon</span><span class="term-val">View Sysmon event ID cheat-sheet & blue team correlation logic</span></div>
  <div class="term-row"><span class="term-key">projects</span><span class="term-val">Review hands-on SOC projects (Wazuh, Splunk, ELK, TryHackMe)</span></div>
  <div class="term-row"><span class="term-key">skills</span><span class="term-val">Inspect technical skills across SIEMs, Logs, OS, Network & Scripting</span></div>
  <div class="term-row"><span class="term-key">stats</span><span class="term-val">View key metrics (Alerts triaged, THM labs, FP reduction rate)</span></div>
  <div class="term-row"><span class="term-key">certs</span><span class="term-val">List industry certifications (Prompt InfoTech SOC L1, Cisco CEH, etc.)</span></div>
  <div class="term-row"><span class="term-key">education</span><span class="term-val">View B.E. Cybersecurity degree & academic details</span></div>
  <div class="term-row"><span class="term-key">whoami</span><span class="term-val">Print analyst identity & professional summary</span></div>
  <div class="term-row"><span class="term-key">contact</span><span class="term-val">Get phone, direct email, LinkedIn, and TryHackMe profile links</span></div>
  <div class="term-row"><span class="term-key">download</span><span class="term-val">Open clean printable resume sheet</span></div>
  <div class="term-row"><span class="term-key">clear</span><span class="term-val">Clear terminal console buffer</span></div>
</div>`;
    this.printLine(helpOutput);
  }

  cmdWhoami() {
    const prof = this.data.profile || {};
    const rolesStr = prof.roles ? prof.roles.join(' • ') : (prof.title || 'Cybersecurity Analyst');
    const edu = Array.isArray(this.data.education) ? this.data.education[0] : (this.data.education || {});
    this.printLine(`
<div class="term-box">
  <div class="term-box-title">ANALYST PROFILE: ${prof.name}</div>
  <p><strong>Roles:</strong> ${rolesStr}</p>
  <p><strong>Education:</strong> ${edu.degree || 'B.E. Computer Science & Engineering (Cyber Security)'} (${edu.timeline || '2022 – 2026'})</p>
  <p><strong>Location:</strong> ${prof.location}</p>
  <p><strong>Core Focus:</strong> 24/7 SIEM monitoring, log correlation, IOC extraction, MITRE ATT&CK mapping, and false positive reduction.</p>
</div>`);
  }

  cmdSummary() {
    const prof = this.data.profile || {};
    this.printLine(`
<div class="term-box">
  <div class="term-box-title">PROFESSIONAL SUMMARY</div>
  <p>${prof.summary}</p>
</div>`);
  }

  cmdStats() {
    const stats = this.data.profile?.stats || [];
    let html = '<div class="term-stats-grid">';
    stats.forEach(s => {
      html += `
      <div class="term-stat-card">
        <div class="term-stat-num">${s.value}</div>
        <div class="term-stat-label">${s.label}</div>
        <div class="term-stat-sub">${s.detail}</div>
      </div>`;
    });
    html += '</div>';
    this.printLine(html);
  }

  cmdProjects() {
    const projects = this.data.projects || [];
    let html = '<div class="term-box-title">SOC HANDS-ON PROJECTS</div>';
    projects.forEach((p, idx) => {
      const linksHtml = p.links && p.links.length > 0
        ? `<div class="term-proj-links" style="margin-top: 6px; font-size: 0.85em;">${p.links.map(l => `<a href="${l.url}" target="_blank" rel="noreferrer" style="color: var(--accent-cyan, #38bdf8); text-decoration: underline; margin-right: 14px;">🔗 ${l.label} ↗</a>`).join('')}</div>`
        : '';

      const tags = p.tags || p.techStack || [];
      html += `
      <div class="term-proj-card">
        <div class="term-proj-head">
          <span class="term-highlight">#${idx + 1} ${p.title}</span>
          <span class="term-badge">${p.period || p.year || ''}</span>
        </div>
        <div class="term-proj-role">${p.type || p.role || ''} | <em>${p.environment || ''}</em></div>
        <p class="term-proj-desc">${p.description || p.highlight || ''}</p>
        ${linksHtml}
        <div class="term-tag-row" style="margin-top: 8px;">
          ${tags.map(t => `<span class="term-tag">${t}</span>`).join(' ')}
        </div>
      </div>`;
    });
    this.printLine(html);
  }

  cmdSkills(args) {
    const skills = this.data.technicalSkills || [];
    let html = '<div class="term-box-title">TECHNICAL SKILLS & COMPETENCIES</div>';
    
    if (Array.isArray(skills)) {
      skills.forEach(cat => {
        html += `<div class="term-cat-title">> ${cat.category.toUpperCase()}</div>`;
        html += '<div class="term-skills-grid">';
        (cat.items || []).forEach(s => {
          html += `
          <div class="term-skill-item">
            <div class="term-skill-header">
              <span><strong>${s.name}</strong></span>
              <span style="color: var(--text-muted); font-size: 0.82em;">${s.note || ''}</span>
            </div>
          </div>`;
        });
        html += '</div>';
      });
    }
    this.printLine(html);
  }

  cmdMitre() {
    this.printLine(`
<div class="term-box">
  <div class="term-box-title">MITRE ATT&CK TTP CORRELATION MATRIX</div>
  <table class="term-table-raw">
    <thead>
      <tr><th>Technique ID</th><th>Name</th><th>Tactic</th><th>Detection Trigger / Telemetry</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="term-badge">T1078</span></td><td>Valid Accounts</td><td>Initial Access / Persistence</td><td>Wazuh agent auth anomaly, abnormal login hours</td></tr>
      <tr><td><span class="term-badge">T1021.002</span></td><td>Remote Services: SMB/Admin Shares</td><td>Lateral Movement</td><td>Sysmon Event 3 (Port 445) + Event 7045 Service Install</td></tr>
      <tr><td><span class="term-badge">T1055</span></td><td>Process Injection</td><td>Defense Evasion / Privilege Escalation</td><td>Sysmon Event 10 / 8, CreateRemoteThread, Memory hook</td></tr>
      <tr><td><span class="term-badge">T1059.001</span></td><td>Command & Scripting: PowerShell</td><td>Execution</td><td>WinEvent 4104 (ScriptBlock) + Sysmon 1 (Office parent)</td></tr>
      <tr><td><span class="term-badge">T1110.001</span></td><td>Brute Force: Password Guessing</td><td>Credential Access</td><td>WinEvent 4625 burst (>10 failed attempts / 60s)</td></tr>
      <tr><td><span class="term-badge">T1003.001</span></td><td>OS Credential Dumping: LSASS</td><td>Credential Access</td><td>Sysmon Event 10 (GrantedAccess 0x1FFFFF / 0x1010)</td></tr>
    </tbody>
  </table>
</div>`);
  }

  cmdSysmon() {
    this.printLine(`
<div class="term-box">
  <div class="term-box-title">SYSMON CRITICAL EVENT ID REFERENCE</div>
  <ul class="term-list">
    <li><strong class="term-highlight">Event ID 1:</strong> Process Creation (ParentImage, CommandLine, Hashes, User)</li>
    <li><strong class="term-highlight">Event ID 3:</strong> Network Connection Detected (Src/Dst IP, Port, Initiating Process)</li>
    <li><strong class="term-highlight">Event ID 7:</strong> Image Loaded (DLL injection, unsigned module monitoring)</li>
    <li><strong class="term-highlight">Event ID 10:</strong> ProcessAccess (LSASS memory handles, GrantedAccess rights)</li>
    <li><strong class="term-highlight">Event ID 11:</strong> FileCreate (Malware drops, ransomware extension renaming)</li>
    <li><strong class="term-highlight">Event ID 12/13/14:</strong> Registry Events (Autorun persistence, security policy modifications)</li>
  </ul>
</div>`);
  }

  cmdRules(args) {
    const rules = this.data.detectionRules || [];
    let html = '<div class="term-box-title">CUSTOM DETECTION RULES (SPL & KQL)</div>';
    
    rules.forEach((r, idx) => {
      html += `
      <div class="term-rule-block">
        <div class="term-rule-head">
          <span class="term-highlight">#${idx + 1} ${r.title}</span>
          <span class="term-badge term-badge-${r.severity.toLowerCase()}">${r.severity}</span>
        </div>
        <div class="term-rule-meta">
          <span><strong>Engine:</strong> ${r.category}</span> | 
          <span><strong>Target:</strong> ${r.target}</span> | 
          <span><strong>MITRE:</strong> ${r.mitre}</span>
        </div>
        <pre class="term-code"><code>${this.escapeHTML(r.code)}</code></pre>
        <div class="term-rule-notes"><em>Analyst Note:</em> ${r.notes}</div>
      </div>`;
    });
    this.printLine(html);
  }

  cmdTriage(args) {
    const alerts = this.data.simulatedAlerts || [];
    
    if (!args || args.length === 0 || args[0] === 'list') {
      let html = '<div class="term-box-title">LIVE SOC TRIAGE QUEUE (SIMULATED)</div>';
      html += '<p>Type <code>triage 1</code>, <code>triage 2</code>, or <code>triage 3</code> to open full incident triage work card:</p>';
      alerts.forEach((alt, idx) => {
        html += `
        <div class="term-triage-item" onclick="if(window.socTerminal) window.socTerminal.executeCommand('triage ${idx + 1}')">
          <span class="term-badge term-badge-${alt.severity.toLowerCase()}">${alt.severity}</span>
          <strong>[#${idx + 1}] ${alt.id}</strong> - ${alt.type} | Host: ${alt.host}
        </div>`;
      });
      this.printLine(html);
      return;
    }

    const index = parseInt(args[0], 10) - 1;
    if (index >= 0 && index < alerts.length) {
      const a = alerts[index];
      this.printLine(`
<div class="term-box">
  <div class="term-box-title">INCIDENT INVESTIGATION: ${a.id}</div>
  <div class="term-grid-2">
    <div><strong>Severity:</strong> <span class="term-badge term-badge-${a.severity.toLowerCase()}">${a.severity}</span></div>
    <div><strong>Timestamp:</strong> ${a.timestamp}</div>
    <div><strong>Affected Host:</strong> <code>${a.host}</code></div>
    <div><strong>Target Account:</strong> <code>${a.user}</code></div>
    <div><strong>MITRE Technique:</strong> <span class="term-highlight">${a.mitre}</span></div>
    <div><strong>Current Status:</strong> <span class="term-status-badge">${a.status}</span></div>
  </div>
  <div class="term-ioc-block">
    <strong>Observed IOC / Telemetry:</strong>
    <pre class="term-code"><code>${this.escapeHTML(a.ioc)}</code></pre>
  </div>
  <div class="term-analysis-block">
    <strong>Analyst Triage & Containment Action:</strong>
    <p>${a.analysis}</p>
  </div>
</div>`);
    } else {
      this.printLine(`<span class="term-error">Alert #${args[0]} not found. Available alerts: 1 to ${alerts.length}.</span>`);
    }
  }

  cmdCerts() {
    const certs = this.data.certifications || [];
    let html = '<div class="term-box-title">CERTIFICATIONS & TRAININGS</div>';
    certs.forEach(c => {
      const badgeHtml = c.badge ? `<span class="term-badge">${c.badge}</span>` : '';
      const skillsHtml = c.skills && Array.isArray(c.skills)
        ? `<div class="term-tag-row">${c.skills.map(s => `<span class="term-tag">${s}</span>`).join(' ')}</div>`
        : '';
      html += `
      <div class="term-cert-card">
        <div class="term-cert-title"><strong>${c.title}</strong> — <span class="term-highlight">${c.issuer}</span></div>
        <div class="term-cert-sub">${c.type} ${badgeHtml}</div>
        ${skillsHtml}
      </div>`;
    });
    this.printLine(html);
  }

  cmdEducation() {
    const eduList = Array.isArray(this.data.education) ? this.data.education : [this.data.education];
    let html = '<div class="term-box-title">ACADEMIC CREDENTIALS</div>';
    eduList.forEach(e => {
      html += `
      <div class="term-edu-item" style="margin-bottom: 8px;">
        <p><strong>${e.degree}</strong> (${e.timeline})</p>
        <p style="color: #94a3b8;">${e.institution}, ${e.location}</p>
      </div>`;
    });
    this.printLine(`<div class="term-box">${html}</div>`);
  }

  cmdContact() {
    const p = this.data.profile || {};
    this.printLine(`
<div class="term-box">
  <div class="term-box-title">CONNECT WITH ANALYST</div>
  <p>📧 <strong>Direct Email:</strong> <a href="mailto:${p.email}" class="term-link">${p.email}</a></p>
  <p>📱 <strong>Direct Phone:</strong> <a href="tel:${p.phone}" class="term-link">${p.phone}</a></p>
  <p>🔗 <strong>LinkedIn:</strong> <a href="${p.linkedin}" target="_blank" class="term-link">${p.linkedinDisplay}</a></p>
  <p>🛡️ <strong>TryHackMe:</strong> <a href="${p.tryhackme}" target="_blank" class="term-link">${p.tryhackmeDisplay}</a></p>
  <p>📍 <strong>Base:</strong> ${p.location}</p>
</div>`);
  }

  cmdDownload() {
    this.printLine('<span class="term-highlight">Triggering printable resume sheet...</span>');
    window.print();
  }

  cmdClear() {
    this.outputElement.innerHTML = '';
  }
}

// Auto-initialize terminal
window.addEventListener('DOMContentLoaded', () => {
  window.socTerminal = new SOCTerminal('soc-terminal-container');
});
