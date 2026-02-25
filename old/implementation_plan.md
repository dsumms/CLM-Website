# Chili Line Media Website Implementation Plan

## Goal Description
The objective is to rebuild the Chili Line Media website to reflect the brand of a "collective of young filmmakers". Building on the previous plan for a high-end, cinematic web app, we are supercharging the design with **custom interactive 3D WebGL elements**.

The design will feature:
*   **Immersive edge-to-edge interactive point cloud** in the hero section that reacts to the user's mouse in real-time, built from a reference image (`TWWCW - FINAL COLOR (Resolve)_02_25_04_22.jpg`).
*   **Bold typography** interplaying with the 3D canvas and video content.
*   **Smooth parallax scrolling** and page transitions via Framer Motion.
*   **Interactive project grids** with high-quality video previews.

## User Review Required
None at this time. The tech stack and design direction (React Three Fiber point cloud) are approved!

> [!NOTE]
> **Tech Stack:** We will use **Next.js (App Router)**, **Vanilla CSS**, **Framer Motion**, and **React Three Fiber (Three.js)** for the custom WebGL particle systems. 

## Proposed Changes

We will initialize a new Next.js project in `e:\CLM\WEBSITE` (backing up old files to `old/`).

### Core Setup & Configuration

#### [NEW] `package.json` and `next.config.js`
Initialize the Next.js app with React, Framer Motion, `three`, `@react-three/fiber`, `@react-three/drei`, and basic setup.

#### [NEW] `app/layout.tsx` & `app/globals.css`
Establish the base layout, import fonts (e.g. Outfit, Inter, or Playfair Display), and set CSS variables.

### Pages & 3D Integration Points

#### [NEW] `app/page.tsx` (Home Page)
*   **Hero Section:** Replaced the static video background with an **interactive WebGL Point Cloud**. We will use React Three Fiber to parse the provided `TWWCW` image into a dense field of thousands of particles. A custom shader will handle mouse repulsion physics.
*   **Featured Projects Grid:** Asymmetrical grid showcasing top projects like *The Way We Carry Water (2025)*, *Nick - A Comedy Short Film (2023)*, and *Filming in New Mexico (2024)*.
*   **Footer:** Contact CTA and socials.

#### [NEW] `app/about/page.tsx` (About Page)
*   **About Us Section:** Deep, poetic storytelling based on the provided copy ("Chile Line Media is a New Mexico based production company founded by filmmaker Makaio Frazier..."). The layout will reflect this visual poetry with parallax scrolling text that reveals the landscape and humanity of the Southwest.
*   **Mission & Debuts:** Highlighting *The Way We Carry Water (2025)* and the core mantra: "storytelling is stewardship" with elegant typography and subtle scroll animations.

#### [NEW] `app/work/page.tsx` & `app/work/[slug]/page.tsx`
*   Horizontal scrolling "filmstrip" layout or masonry grid with video thumbnails.
*   Project detail pages with immersive trailers and credits.

### Components

#### [NEW] `components/PointCloudParticles.tsx`
A custom React Three Fiber component that loads the reference image texture, samples its pixel data to create a `BufferGeometry` of points, and uses a custom `ShaderMaterial` to animate the particles and react to mouse coordinates (swirling/repulsion effect).

#### [NEW] `components/Navbar.tsx` & `components/ProjectCard.tsx`
Standard navigation and reusable portfolio cards.

## Verification Plan

### Automated / Build Verification
*   **Build the Next.js app:** Run `npm run build`.
*   **Lighthouse Performance:** Run local Lighthouse audits. Ensure the WebGL canvas doesn't negatively impact main thread performance.

### Visual & Interactive Manual Verification
Using the browser agent, we will:
1.  Navigate to `localhost:3000`.
2.  Verify the customized Point Cloud hero scene loads and the particles form the reference image.
3.  Test mouse tracking/hover events to ensure the particles scatter and spring back correctly.
4.  Navigate between pages to verify Framer Motion exit/enter transitions.
5.  Generate WebP recordings of the animations to present via `walkthrough.md`.
