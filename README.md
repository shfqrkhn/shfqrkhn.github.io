# My Portfolio

**Version:** v1.2.13

Welcome! This repository contains the source code for my personal portfolio page, which is designed to be a live, dynamic showcase of all my public GitHub projects.

### [**➡️ View My Live Portfolio Here**](https://shfqrkhn.github.io/)

*(Note: You might need to adjust this link to the final URL where you host the page, for example, if you use a custom domain or a different repository name for GitHub Pages.)*

---

## ✨ About This Portfolio

Instead of a static site that requires manual updates, this portfolio automatically links to and highlights all of my other repositories.

The `index.html` file uses the GitHub API to:

* **Fetch All Repos**: It dynamically pulls in all of my public projects.
* **Stay Current**: Whenever I create or update a public repository on GitHub, it automatically appears here. There's no need for me to edit this page manually.
* **Highlight Key Projects**: My projects are automatically sorted to feature my most-starred work first.

The goal of this repository is to provide a clean, simple, and always up-to-date hub for anyone interested in my work.

---

## 🛠️ How It's Built

The page is built with simple and modern web technologies, requiring no backend or databases:

* **HTML**: For the basic structure.
* **Tailwind CSS**: For all styling and creating a responsive layout.
* **Vanilla JavaScript**: To communicate with the GitHub API and dynamically generate the project list.
* **GitHub API**: Serves as the live data source for all content.

---

## ⚡ Performance & Caching

To ensure a fast user experience and respect GitHub's API rate limits, this application employs a **Cache-First** strategy:

* **LocalStorage Caching**: API responses are cached in the browser's `localStorage` for 24 hours.
* **Smart Invalidation**: The cache includes a version tag (`v4`). If the application structure changes, the version is incremented to automatically invalidate old data and fetch fresh content.
* **Parallel Fetching**: User profile and repository data are fetched simultaneously to minimize load times.
* **Preconnection**: Critical domains (`api.github.com`, `avatars.githubusercontent.com`) are preconnected to reduce latency.
