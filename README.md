<div align="center">

# SET222 Algorithms Visualizer
### Interactive learning platform for searching and sorting algorithms

[![Live Website](https://img.shields.io/badge/Live%20Website-set222.ecus.dev-0ea5e9?style=for-the-badge&logo=googlechrome&logoColor=white)](https://set222.ecus.dev)
[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

## Project Idea
This project is an educational visualizer for **Algorithms (SET222)**. It demonstrates how each algorithm works step by step using smooth animations, state-based colors, and contextual messages during execution.

The main goal is to make algorithm concepts easier to understand through visual interaction instead of theory alone.

## Website
- Official URL: **https://set222.ecus.dev**
- Direct link: [Go to Website](https://set222.ecus.dev)

## Available Algorithms
### Searching
- Linear Search
- Binary Search
- Interpolation Search

### Sorting
- Bubble Sort
- Selection Sort
- Insertion Sort
- Quick Sort
- Merge Sort

## UI and Controls Highlights
- Modern UI with `glass effect` styling and `framer-motion` transitions.
- Clear control buttons for running algorithm simulations.
- `Start / Pause` using the standout `hero` button variant.
- `Reset` using the `outline` button variant.
- `Random` using the glowing `glow` button variant.
- Animation speed slider from `0.5x` to `4x`.
- Manual array input with optional predefined sample arrays.
- Visual state feedback (compare, swap, pivot, found, discarded).
- Live messages that explain what is happening at each step.

## Run Locally
### Prerequisites
- Node.js 18 or newer
- npm (or Bun)

### Using npm
```bash
npm install
npm run dev
```

Then open:
```text
http://localhost:5173
```

### Additional Scripts
```bash
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run test       # Run tests once
npm run test:watch # Run tests in watch mode
```

### Using Bun (Optional)
```bash
bun install
bun run dev
```

## Screenshots Placeholder
Add your screenshots in:
```text
docs/images/
```

Suggested image names:

### Home Page
![Home](https://raw.githubusercontent.com/ahmedelbrazany1/algorithms-visualizer/main/public/showcase_1.png)

### Searching Page
![Searching](https://raw.githubusercontent.com/ahmedelbrazany1/algorithms-visualizer/main/public/showcase_2.png)

### Sorting Page
![Sorting](https://raw.githubusercontent.com/ahmedelbrazany1/algorithms-visualizer/main/public/showcase_3.png)

### Controls and Buttons
![Controls](https://raw.githubusercontent.com/ahmedelbrazany1/algorithms-visualizer/main/public/showcase_4.png)

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- Framer Motion
- Vitest + Testing Library
