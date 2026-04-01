# Gemini CLI Context: Neil Majithia's Portfolio

This project is a personal portfolio and professional website for Neil Majithia, hosted on GitHub Pages (`nevadam.github.io`). It serves as a showcase for individual and organizational projects (case studies) and provides access to his professional resume/CV.

## Project Overview

*   **Type:** Static Website with dynamic content loading.
*   **Main Technologies:**
    *   **Frontend:** HTML5, CSS3 (Vanilla), Vanilla JavaScript.
    *   **Content Rendering:** [Marked.js](https://marked.js.org/) for client-side Markdown rendering.
    *   **Resume/CV:** LaTeX (`cv.tex`) for source, compiled to PDF.
*   **Architecture:**
    *   **State Management:** The site uses a simple "page" system managed via URL search parameters (e.g., `?page=1`).
    *   **Dynamic Loading:** Content for "Case Studies" and the landing page is stored in `.md` files within the `writeups/` directory and fetched asynchronously by `js/main.js`.
    *   **Responsive Design:** Uses a custom CSS grid system (`css/styles.css`) for layout.

## Building and Running

Since this is a static site, there is no build step for the frontend.

*   **Local Development:** Open `index.html` in any modern web browser. For features like fetching Markdown files (which may be blocked by CORS in some browsers when using `file://`), use a local development server (e.g., `npx serve`, `python -m http.server`, or the "Live Server" extension in VS Code).
*   **Compiling CV:** The `cv.tex` file requires a LaTeX distribution (like TeX Live or MiKTeX).
    *   Command: `latexmk -pdf cv.tex` (inferred from `.fdb_latexmk` and `.fls` files).
*   **Deployment:** Simply push changes to the `main` branch; GitHub Pages handles the hosting.

## Directory Structure

*   `index.html`: The main entry point and landing page.
*   `resume.html`: Web page for viewing the resume (embeds PDF).
*   `archive.html`: (Likely) An archive of older projects.
*   `js/main.js`: Contains all navigation logic, URL state handling, and Markdown rendering initialization.
*   `css/styles.css`: Main stylesheet containing grid layouts and animations.
*   `writeups/`:
    *   `landing-text.md`: Content for the home page.
    *   `case_studies/`: Individual Markdown files for each project showcase.
*   `assets/`:
    *   `fonts/`: Spectral font family files.
    *   `other_assets/`: PDF version of the CV.
*   `images/`:
    *   `case_study_images/`: Visuals for the project showcases.
    *   `other_images/`: Logos and personal photos.
*   `cv.tex`: The LaTeX source for the resume.

## Development Conventions

*   **Adding a Case Study:**
    1.  Add a new Markdown file to `writeups/case_studies/`.
    2.  Update `index.html` to include new containers (image and text) with corresponding IDs.
    3.  Update the `page_limit` variable in `js/main.js` to reflect the new number of pages.
*   **Content Updates:** Most text changes should be made in the Markdown files within the `writeups/` folder.
*   **Styling:** Adhere to the existing CSS grid and "fade-in/fade-out" animation patterns.
