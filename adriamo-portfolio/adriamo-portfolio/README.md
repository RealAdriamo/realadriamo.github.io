# Adriamo Han Portfolio

A static, deployable portfolio site built with plain HTML, CSS, and JavaScript.

## Run locally

Open `index.html` directly, or serve the folder with any static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before deploying

Edit `site-config.js` and add:
- email
- GitHub URL
- LinkedIn URL
- résumé URL
- optional screenshot paths

The site works without these, but the contact button intentionally remains a setup reminder until an email is provided.

## Deploy

This is static-hosting friendly and can be deployed to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any normal web host.

## Project structure

- `index.html` — home page
- `project.html?id=...` — reusable case-study page
- `projects.js` — portfolio content
- `styles.css` — responsive visual system
- `script.js` — cards, project rendering, theme, reveal effects
- `site-config.js` — personal links / deployment config
