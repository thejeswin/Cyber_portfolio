# Thejeswin S L — Cybersecurity Analyst & SOC Portfolio

A modern, high-performance portfolio and executive SOC resume showcasing detection engineering, SIEM operations (Wazuh, Splunk, ELK Stack, Security Onion), threat hunting, and incident response projects.

---

## 🛡️ Key Features

- **Interactive 3D Cybersecurity Grid**: Canvas background powered by Three.js with dynamic spotlight tracking.
- **Dedicated SOC Resume View & PDF Download**: Single-click access to the official resume and PDF document.
- **Direct Message Dispatch (Web3Forms)**: Async form dispatch integrated directly with Web3Forms.
- **Interactive SOC Terminal**: Simulated interactive terminal for exploring commands, tools, and certifications.
- **Responsive & Dark Mode Aesthetic**: Built with clean semantic HTML5, vanilla CSS, and modular JavaScript.

---

## 📁 Project Structure

```text
├── assets/
│   ├── favicon.svg          # Sharp, vector cybersecurity shield favicon
│   ├── profile.jpg          # Profile portrait
│   └── ...
├── css/
│   ├── style.css            # Core design system & component styles
│   └── terminal.css         # SOC Terminal styling
├── js/
│   ├── config.js            # Central site configuration & public tokens
│   ├── data.js              # Portfolio data (projects, skills, certs)
│   ├── main.js              # UI rendering & Web3Forms logic
│   ├── terminal.js          # SOC terminal emulator logic
│   └── three-scene.js       # Interactive 3D Three.js canvas
├── resume/
│   ├── Thejeswin_S_L_Resume.html  # Clean HTML resume with print styles
│   └── Thejeswin_S_L_Resume.pdf   # Official downloadable PDF resume
├── .gitignore               # Excludes OS, cache, and sensitive local files
├── index.html               # Main executive portfolio entry point
└── README.md
```

---

## 🚀 Deployment to GitHub Pages

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Cybersecurity portfolio & resume"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub (`Settings` -> `Pages`).
   - Under **Source**, choose `Deploy from a branch`.
   - Set the branch to `main` and folder to `/ (root)`.
   - Click **Save**. Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.

---

## 🔒 Security Best Practices

- **Web3Forms Access Key**: The `access_key` in `js/config.js` is a public client-side routing token used to forward emails to the designated inbox.
- **Domain Restriction**: To prevent unauthorized use of your form key from third-party websites, log into the [Web3Forms Dashboard](https://app.web3forms.com) and add your GitHub Pages domain (e.g. `yourusername.github.io`) under **Domain Whitelist**.
- **Sensitive Secrets**: Never store private API secrets, database passwords, or private keys in frontend client repositories. All local development/OS cache files are excluded via `.gitignore`.

---

## 📄 License
Created by [Thejeswin S L](https://linkedin.com/in/thejeswin). All rights reserved.
