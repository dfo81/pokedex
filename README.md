# Pokédex 🔴

An interactive Pokémon encyclopedia built with vanilla JavaScript, powered by the [PokéAPI](https://pokeapi.co/). Search, browse, and explore detailed profiles for all 1,025 Pokémon — including stats, types, descriptions, and evolution chains.

🔗 **[Live Demo](https://pokedex.dieter-foos.de)**

---

## Features

- Loads 24 Pokémon on start with a **"Load More"** button for pagination
- **Search** by name — filters live from 3 characters onwards across all 1,025 Pokémon
- **Detail overlay** per Pokémon with profile view (stats, abilities, description)
- **Evolution chain** display
- Loading spinner with scroll-lock during API requests
- Client-side caching — full name list fetched once, details fetched on demand
- Responsive card grid layout

---

## Architecture

| File | Responsibility |
|---|---|
| `script.js` | Core app logic — fetch, render, search, pagination |
| `scripts/template.js` | HTML template functions for cards and profile |
| `scripts/profile.js` | Pokémon detail view & stats rendering |
| `scripts/evolution.js` | Evolution chain fetching & display |
| `style.css` | Global styles |

### Data flow

```
PokéAPI
  ├── /pokemon?limit=1025     → full name list (cached for search)
  ├── /pokemon/{id}           → stats, types, sprites
  └── /pokemon-species/{id}   → description, evolution chain URL
```

---

## Getting Started

No build step required. Clone and open directly in the browser:

```bash
git clone https://github.com/dfo81/pokedex.git
cd pokedex
open index.html
```

Or visit the **[Live Demo](https://pokedex.dieter-foos.de)**.

---

## Technologies

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![PokéAPI](https://img.shields.io/badge/PokéAPI-EF5350?style=flat&logo=pokemon&logoColor=white)

---

## Author

**Dieter Foos** — [Portfolio](https://dieter-foos.de) · [GitHub](https://github.com/dfo81) · [LinkedIn](https://www.linkedin.com/in/dieter-foos-7a13a63ba/)
