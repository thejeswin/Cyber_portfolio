/**
 * Thejeswin S L - Executive Portfolio Main Logic
 * Smooth Interactions, Mouse Spotlight, 3D Card Tilts, UI Rendering
 */

class ExecutivePortfolio {
  constructor() {
    this.data = window.PORTFOLIO_DATA || {};
    this.spotlight = document.getElementById('mouse-spotlight');
    this.init();
  }

  init() {
    this.renderStats();
    this.renderCompetencies();
    this.renderProjects();
    this.renderSkills();
    this.renderCertifications();
    this.renderEducation();
    this.bindEvents();
    this.initMouseSpotlight();
    this.init3DCardParallax();
    this.initScrollSpy();
  }

  renderStats() {
    const container = document.getElementById('stats-grid-container');
    if (!container || !this.data.profile?.stats) return;

    container.innerHTML = this.data.profile.stats.map(s => `
      <div class="stat-item-card tilt-target">
        <div class="stat-number">${s.value}</div>
        <div class="stat-title">${s.label}</div>
        <div class="stat-sub">${s.detail}</div>
      </div>
    `).join('');
  }

  renderCompetencies() {
    const container = document.getElementById('competencies-grid-container');
    if (!container || !this.data.coreCompetencies) return;

    const icons = [
      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.25 16.25L16 19"/></svg>`,
      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>`,
      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`
    ];

    container.innerHTML = this.data.coreCompetencies.map((c, i) => `
      <div class="comp-card tilt-target">
        <div class="comp-icon-box">${icons[i % icons.length]}</div>
        <h4 class="comp-title">${c.title}</h4>
        <p class="comp-desc">${c.desc}</p>
      </div>
    `).join('');
  }

  renderProjects() {
    const container = document.getElementById('projects-stack-container');
    if (!container || !this.data.projects) return;

    container.innerHTML = this.data.projects.map(p => `
      <article class="project-card tilt-target">
        <div class="project-card-header">
          <div>
            <div class="project-meta-badges">
              <span class="proj-type-badge">${p.type}</span>
              <span class="proj-period">${p.period}</span>
            </div>
            <h3 class="project-title">${p.title}</h3>
          </div>
          <div class="proj-env-pill">${p.environment}</div>
        </div>

        <p class="project-desc">${p.description}</p>

        <ul class="project-bullets-list">
          ${p.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>

        <div class="project-tags-row">
          ${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }

  renderSkills() {
    const container = document.getElementById('skills-categories-container');
    if (!container || !this.data.technicalSkills) return;

    container.innerHTML = this.data.technicalSkills.map(cat => `
      <div class="skill-category-box tilt-target">
        <h4 class="skill-cat-title">${cat.category}</h4>
        <div class="skills-items-list">
          ${cat.items.map(it => `
            <div class="skill-item-row">
              <span class="skill-item-name">${it.name}</span>
              <span class="skill-item-note">${it.note}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  renderCertifications() {
    const container = document.getElementById('certifications-list-container');
    if (!container || !this.data.certifications) return;

    container.innerHTML = this.data.certifications.map(c => `
      <div class="cert-entry-card tilt-target">
        <div class="cert-main-info">
          <div class="cert-name">${c.title}</div>
          <div class="cert-issuer-text">${c.issuer}</div>
        </div>
        <span class="cert-tag-type">${c.type}</span>
      </div>
    `).join('');
  }

  renderEducation() {
    const container = document.getElementById('education-box-container');
    if (!container || !this.data.education) return;

    const list = Array.isArray(this.data.education) ? this.data.education : [this.data.education];
    
    container.innerHTML = `
      <div class="education-stack">
        ${list.map(edu => `
          <div class="education-box tilt-target" style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 6px;">
              <div class="edu-tag-label" style="margin-bottom: 0;">${edu.type || 'Academic Education'}</div>
              <span class="edu-timeline-text" style="color: var(--accent-cyan); font-weight: 500;">${edu.timeline}</span>
            </div>
            <h3 class="edu-degree-title" style="font-size: 1.15rem; margin-bottom: 4px;">${edu.degree}</h3>
            <div class="edu-school" style="font-size: 0.9rem; color: var(--text-body);">${edu.institution} • <span style="color: var(--text-muted);">${edu.location}</span>${edu.cgpa ? ` • <span style="color: var(--accent-cyan); font-weight: 600;">${edu.cgpa}</span>` : ''}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  initMouseSpotlight() {
    if (!this.spotlight) return;

    window.addEventListener('mousemove', (e) => {
      this.spotlight.style.left = `${e.clientX}px`;
      this.spotlight.style.top = `${e.clientY}px`;
    });
  }

  init3DCardParallax() {
    const cards = document.querySelectorAll('.tilt-target');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });

      const header = document.querySelector('.site-header');
      if (header) {
        if (scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });
  }

  bindEvents() {
    // Copy buttons
    document.querySelectorAll('[data-copy-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-copy-val');
        navigator.clipboard.writeText(val).then(() => {
          this.showToast(`Copied to clipboard: ${val}`);
        });
      });
    });

    // Contact Form with Web3Forms Integration
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const feedback = document.getElementById('form-feedback');

        const name = document.getElementById('contact-name')?.value?.trim() || '';
        const email = document.getElementById('contact-email')?.value?.trim() || '';
        const subject = document.getElementById('contact-subject')?.value?.trim() || 'Portfolio Inquiry';
        const message = document.getElementById('contact-message')?.value?.trim() || '';

        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending Message... ⏳</span>';

        if (feedback) {
          feedback.style.display = 'none';
          feedback.className = 'form-feedback-box';
          feedback.innerHTML = '';
        }

        try {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: window.SITE_CONFIG?.web3Forms?.accessKey || '06a8c47c-49b5-40d8-85ef-0ed4fd9f8ac6',
              name: name,
              email: email,
              subject: `[Portfolio Inquiry] ${subject}`,
              message: message,
              from_name: `${name} (Portfolio Contact)`
            })
          });

          const result = await response.json();

          if (response.status === 200 && result.success) {
            if (feedback) {
              feedback.innerHTML = `
                <div style="line-height: 1.65;">
                  <div style="font-weight: 700; font-size: 1rem; margin-bottom: 8px; color: #34d399;">✓ Thanks for Reaching Out! 🎯</div>
                  <p style="margin-bottom: 6px; font-size: 0.88rem;">Your message has been successfully delivered to my inbox. 📩</p>
                  <p style="margin-bottom: 6px; font-size: 0.88rem;">I’m excited to connect and will get back to you shortly.</p>
                  <p style="margin-bottom: 6px; font-size: 0.85rem; color: #cbd5e1; font-style: italic;">Good conversations start with a simple hello.</p>
                  <p style="margin-bottom: 0; font-size: 0.88rem; font-weight: 500;">Thanks for making yours happen! 😊</p>
                </div>
              `;
              feedback.className = 'form-feedback-box form-feedback-success';
              feedback.style.display = 'block';
            }
            form.reset();
            this.showToast('Thanks for reaching out! Message delivered 😊');
          } else {
            throw new Error(result.message || 'Submission failed');
          }
        } catch (error) {
          console.error('Web3Forms Error:', error);
          if (feedback) {
            feedback.innerHTML = `
              <div style="line-height: 1.6;">
                <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 4px;">❌ Could not send message directly</div>
                <p style="margin-bottom: 8px; font-size: 0.85rem;">${error.message || 'Please check your connection or send via direct email.'}</p>
                <a href="mailto:thejes0611@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(message)}" class="btn btn-sm btn-secondary" style="margin-top: 4px;">
                  ✉️ Open in Email Client
                </a>
              </div>
            `;
            feedback.className = 'form-feedback-box form-feedback-error';
            feedback.style.display = 'block';
          }
          this.showToast('Failed to send message. Please try emailing directly.');
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }
  }

  showToast(msg) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new ExecutivePortfolio();
});
