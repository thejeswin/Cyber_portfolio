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
    this.initMobileNav();
    this.initResumeDropdowns();
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

    container.innerHTML = this.data.projects.map(p => {
      const linksHtml = p.links && p.links.length > 0 ? `
        <div class="project-actions-bar">
          <div class="project-links-row">
            ${p.links.map(l => {
              const isGithub = l.icon === 'github' || (l.url && l.url.includes('github.com') && !l.url.includes('github.io'));
              const iconSvg = isGithub
                ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`
                : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
              const btnClass = isGithub ? 'proj-action-btn proj-btn-git' : 'proj-action-btn proj-btn-live';
              return `
                <a href="${l.url}" target="_blank" rel="noreferrer" class="${btnClass}">
                  ${iconSvg}
                  <span>${l.label}</span>
                  <svg class="proj-link-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      return `
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

          ${linksHtml}

          <div class="project-tags-row">
            ${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}
          </div>
        </article>
      `;
    }).join('');
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
          <div class="education-box tilt-target" style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 6px;">
              <div class="edu-tag-label" style="margin-bottom: 0;">${edu.type || 'Academic Education'}</div>
              <span class="edu-timeline-text" style="color: var(--accent-cyan); font-weight: 500;">${edu.timeline}</span>
            </div>
            <h3 class="edu-degree-title" style="font-size: 1.15rem; margin-bottom: 4px;">${edu.degree}</h3>
            <div class="edu-school" style="font-size: 0.9rem; color: var(--text-body);">${edu.institution} • <span style="color: var(--text-muted);">${edu.location}</span>${edu.cgpa ? ` • <span style="color: var(--accent-cyan); font-weight: 600;">${edu.cgpa}</span>` : ''}</div>
          </div>
        `).join('')}

        <div class="education-box tilt-target" style="background: rgba(14, 165, 233, 0.04); border-color: rgba(14, 165, 233, 0.25);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 8px;">
            <div class="edu-tag-label" style="margin-bottom: 0; color: var(--accent-cyan); border-color: rgba(56, 189, 248, 0.3);">Official Document</div>
            <span class="edu-timeline-text" style="color: var(--accent-emerald); font-weight: 500;">Updated Aug 2026</span>
          </div>
          <h3 class="edu-degree-title" style="font-size: 1.12rem; margin-bottom: 6px;">Executive SOC Resume</h3>
          <p style="font-size: 0.86rem; color: var(--text-body); margin-bottom: 14px;">Interactive web resume and official submitted PDF document.</p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="resume/Thejeswin_S_L_Resume.html" target="_blank" class="btn btn-secondary btn-sm" style="flex: 1; min-width: 120px; justify-content: center;">
              <span>👁️ View Resume</span>
            </a>
            <a href="resume/Thejeswin_S_L_Resume.pdf" download="Thejeswin_S_L_Resume.pdf" target="_blank" class="btn btn-primary btn-sm" style="flex: 1; min-width: 140px; justify-content: center;">
              <span>📥 Download PDF</span>
            </a>
          </div>
        </div>
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

  initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const closeBtn = document.getElementById('mobile-drawer-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-action-btn, .mobile-social-pill');

    if (!toggleBtn || !drawer || !backdrop) return;

    const openMenu = () => {
      toggleBtn.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.classList.add('is-open');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.classList.add('mobile-nav-active');
    };

    const closeMenu = () => {
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('mobile-nav-active');
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
      });
    }

    backdrop.addEventListener('click', () => {
      closeMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on ESC key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Automatically close on viewport resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080 && drawer.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const header = document.querySelector('.site-header');

    const updateActiveState = () => {
      let current = '';
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      sections.forEach(section => {
        const top = section.offsetTop - 140;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          current = section.getAttribute('id');
        }
      });

      // Bottom of page detection (activates contact)
      if ((window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 60)) {
        current = 'contact';
      }

      // If at the top of the page or in the hero section, activate 'about'
      if (!current || current === 'hero') {
        current = 'about';
      }

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });

      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });

      if (header) {
        if (scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', updateActiveState, { passive: true });
    // Trigger immediately on load so About is highlighted when page opens
    updateActiveState();
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

  initResumeDropdowns() {
    const dropdowns = document.querySelectorAll('.resume-dropdown');
    dropdowns.forEach(dd => {
      const toggle = dd.querySelector('.resume-dropdown-toggle');
      const items = dd.querySelectorAll('.resume-dropdown-item');
      if (!toggle) return;

      // Click / Tap toggle
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dd.classList.contains('is-open');
        
        // Close any other open dropdowns
        dropdowns.forEach(other => {
          if (other !== dd) {
            other.classList.remove('is-open');
            other.querySelector('.resume-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          dd.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          dd.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });

      // Mouse enter: open smoothly
      dd.addEventListener('mouseenter', () => {
        dd.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      });

      // Mouse leave: seamlessly close immediately when mouse moves away
      dd.addEventListener('mouseleave', () => {
        dd.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });

      // Click on any item: close dropdown
      items.forEach(item => {
        item.addEventListener('click', () => {
          dd.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      dropdowns.forEach(dd => {
        if (!dd.contains(e.target)) {
          dd.classList.remove('is-open');
          dd.querySelector('.resume-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdowns.forEach(dd => {
          dd.classList.remove('is-open');
          dd.querySelector('.resume-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        });
      }
    });
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
