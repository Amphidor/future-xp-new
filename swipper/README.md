# Swiper.js Demo - Next.js

A beautiful Next.js application demonstrating various Swiper.js carousel implementations.

## Features

- ✨ Basic Swiper with navigation and pagination
- 📱 Responsive multi-slide carousel
- ⏯️ Autoplay carousel
- 🎭 Fade effect transitions
- 🎨 Modern, beautiful UI design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
swipper/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with Swiper implementations
│   ├── globals.css         # Global styles
│   └── swiper-page.css     # Swiper-specific styles
├── package.json
├── next.config.js
└── tsconfig.json
```

## Swiper Examples Included

1. **Basic Swiper**: Simple carousel with navigation arrows and pagination dots
2. **Multiple Slides**: Responsive carousel showing multiple slides per view
3. **Autoplay Swiper**: Automatically advancing carousel
4. **Fade Effect**: Smooth fade transitions between slides

## Customization

You can customize the Swiper components by modifying the props in `app/page.tsx`. Swiper.js offers many options:

- `spaceBetween`: Space between slides
- `slidesPerView`: Number of slides visible
- `navigation`: Enable/disable navigation arrows
- `pagination`: Enable/disable pagination dots
- `autoplay`: Configure autoplay behavior
- `effect`: Choose transition effects (fade, cube, coverflow, etc.)
- `breakpoints`: Responsive breakpoints

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Swiper.js Documentation](https://swiperjs.com/get-started)

## Build for Production

```bash
npm run build
npm start
```
