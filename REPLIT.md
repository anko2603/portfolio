# Scrollytelling Portfolio

A high-performance personal portfolio website featuring a cinematic scroll-linked animation using HTML5 Canvas and Framer Motion.

## Features

- **Sticky Scroller**: A 500vh tall section where scrolling scrubs through an image sequence rendered on an HTML5 Canvas.
- **Parallax Overlay**: Text elements that fade in and out with parallax effects over the canvas.
- **Work Grid**: A glass-morphism style grid showcasing project case studies, fetched from a PostgreSQL database.
- **Responsive Design**: Optimized for both desktop and mobile.

## Tech Stack

- **Frontend**: React, Vite, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express, Drizzle ORM, PostgreSQL
- **Rendering**: HTML5 Canvas for image sequence

## Setup

1.  **Database**: The app uses a PostgreSQL database. The schema is managed via Drizzle ORM.
2.  **Environment Variables**: `DATABASE_URL` must be set.
3.  **Assets**: The image sequence for the scrollytelling section should be placed in `client/public/sequence/`.
    *   Naming convention: `frame_[index].webp` (e.g., `frame_00.webp`, `frame_01.webp`).
    *   A script `scripts/generate_placeholders.ts` is provided to generate placeholder frames if real images are missing.

## Commands

-   `npm run dev`: Start the development server (frontend + backend).
-   `npm run db:push`: Push schema changes to the database.
-   `npx tsx scripts/generate_placeholders.ts`: Generate placeholder images for the sequence.
