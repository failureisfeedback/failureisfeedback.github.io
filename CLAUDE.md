# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static academic project website for the VAP (Visual Attentive Prompting) research paper: "Bring My Cup! Personalizing Vision-Language-Action Models with Visual Attentive Prompting". The site showcases robotics research from POSTECH on enabling VLA models to manipulate user-specific objects.

The website is built as a single-page HTML site using the Bulma CSS framework and is based on the Nerfies website template.

## Repository Structure

```
.
├── index.html              # Main website (single HTML file with embedded styles)
├── static/
│   ├── css/               # Bulma CSS framework and custom styles
│   ├── js/                # JavaScript for carousels and interactions
│   ├── images/            # Research figures, tables, and diagrams
│   ├── videos/            # Demo videos (*.mp4) of robot tasks
│   └── interpolation/     # Image sequence for slider (if used)
└── README.md
```

## Key Technical Details

### Architecture

This is a **client-side only** static website with no build process:
- Single `index.html` file contains all content and embedded CSS
- No package.json, no build tools, no transpilation
- All dependencies (Bulma, FontAwesome, jQuery) loaded via CDN or local files
- Videos autoplay and loop for demonstration purposes

### Styling System

The site uses Bulma CSS framework with custom responsive overrides:
- Desktop: Hover effects with transform animations
- Mobile (≤768px): Extensive custom CSS for responsive layout
- Key mobile fixes handle carousel navigation, video sizing, and text readability
- Visual prompting demonstrated via red-tinted object overlays in demo videos

### JavaScript Components

- **Bulma Carousel** (`static/js/bulma-carousel.min.js`): Powers the results carousel showing 3 videos at once
- **Bulma Slider** (`static/js/bulma-slider.min.js`): Image interpolation slider functionality
- **Custom logic** (`static/js/index.js`): Initializes carousels, handles interpolation slider

The interpolation slider expects 240 frames in `static/interpolation/stacked/` (numbered 000000.jpg to 000239.jpg).

## Common Development Tasks

### Local Development

Since this is a static site with no build process, use any local HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server is installed)
npx http-server -p 8000
```

Then visit `http://localhost:8000`

### Deployment

The site can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.) by simply serving the repository root. No build step required.

### Adding New Videos

1. Place MP4 files in `static/videos/`
2. Add video elements to carousel in `index.html`:
   ```html
   <div class="item">
     <div class="carousel-item-container">
       <video poster="" autoplay controls muted loop playsinline class="carousel-video hover-effect">
         <source src="./static/videos/your-video.mp4" type="video/mp4">
       </video>
       <p class="is-size-6 has-text-weight-bold has-text-centered">"Task description"</p>
     </div>
   </div>
   ```

### Updating Research Content

All content lives in `index.html`:
- **Abstract**: Section with class `section` after hero
- **Method description**: Section titled "Method: Visual Attentive Prompting"
- **Results tables**: Images in `static/images/table*.png`
- **Benchmarks figure**: `static/images/benchmarks.png`
- **Pipeline diagram**: `static/images/pipeline.png`

### Mobile Responsiveness

Critical mobile fixes are in `<style>` tag (lines 66-174 in `index.html`):
- Force carousel navigation arrows to appear on mobile
- Adjust video aspect ratios and container widths
- Override Bulma's default touch device behavior
- All mobile-specific CSS uses `@media screen and (max-width: 768px)`

## Important Notes

- The site uses Korean comments in CSS (e.g., "가로 스크롤 방지" = "prevent horizontal scroll")
- Citation format follows standard academic BibTeX format in the BibTeX section
- The arXiv placeholder in BibTeX should be updated when paper is published
- Licensed under Creative Commons Attribution-ShareAlike 4.0 International License
- Template credit: Nerfies (https://github.com/nerfies/nerfies.github.io)

## Links in the Site

- **Paper PDF**: `./static/paper.pdf` (ensure this file exists)
- **GitHub repo**: https://github.com/vap-project/vap
- **HuggingFace dataset**: https://huggingface.co/leesangoh
- **arXiv**: Placeholder link (update when published)
