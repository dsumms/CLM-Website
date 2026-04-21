import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import Image from "next/image";

// Client-side wrapper isolates the WebGL SplatHero (ssr:false is inside the wrapper)
const SplatHeroWrapper = dynamic(
  () => import("@/components/SplatHeroWrapper")
);

// Lazy-load ProjectCard so it doesn't block initial HTML
const ProjectCard = dynamic(() => import("@/components/ProjectCard"));

const partners = [
  { src: "/logos/media__1776718766123.png", name: "Apaluma" },
  { src: "/logos/media__1776718766127.png", name: "The New Mexico Environment Department" },
  { src: "/logos/media__1776718884197.png", name: "The Santa Fe Film Institute" },
  { src: "/logos/media__1776718884198.png", name: "The New Mexico Film Office" },
  { src: "/logos/media__1776720924256.png", name: "Los Luceros Historic Site / NM Historic Sites" },
  { src: "/logos/media__1776719321756.png", name: "Hands Across Cultures" },
  { src: "/logos/media__1776719502962.png", name: "Santa Fe International Film Festival" },
];

export default function Home() {
  const narrativeProjects = projects.filter((p) => p.category === "narrative");
  const commercialProjects = projects.filter(
    (p) => p.category === "commercial"
  );

  return (
    <main className={styles.main}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.canvasContainer}>
          <SplatHeroWrapper />
        </div>

        <div className={styles.heroContent}>
          <div>
            <h1 className={styles.headline}>CHILE LINE MEDIA</h1>
            <p className={styles.subheadline}>Independent narrative and branded storytelling company</p>
          </div>
        </div>
      </section>

      {/* Partner Logo Scroll */}
      <section className={styles.partnerStrip}>
        <div className={styles.partnerTrack}>
          {/* Duplicate the list for seamless infinite scroll */}
          {[...partners, ...partners].map((partner, i) => (
            <div key={`${partner.src}-${i}`} className={styles.partnerLogoWrapper}>
              <Image 
                src={partner.src} 
                alt={partner.name} 
                fill 
                style={{ objectFit: 'contain' }} 
              />
              <span className={styles.partnerName}>{partner.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Works */}
      <section className={styles.projects}>
        <div className={styles.projectsHeader}>
          <h2>NARRATIVE WORKS</h2>
        </div>

        <div className={styles.grid}>
          {narrativeProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              year={project.year}
              youtubeId={project.youtubeId}
              slug={project.slug}
            />
          ))}
        </div>
      </section>

      {/* Commercial Works */}
      <section className={styles.projects}>
        <div className={styles.projectsHeader}>
          <h2>COMMERCIAL WORKS</h2>
        </div>

        <div className={styles.grid}>
          {commercialProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              year={project.year}
              youtubeId={project.youtubeId}
              slug={project.slug}
            />
          ))}
        </div>
      </section>

    </main>
  );
}
