import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import { partners } from "@/data/partners";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Chile Line Media | New Mexico Video Production",
  description:
    "Chile Line Media is a New Mexico production company creating cinematic narrative films and branded storytelling rooted in the Southwest.",
  path: "/",
  absoluteTitle: true,
});

// Client-side wrapper isolates the WebGL SplatHero (ssr:false is inside the wrapper)
const SplatHeroWrapper = dynamic(
  () => import("@/components/SplatHeroWrapper")
);

// Lazy-load ProjectCard so it doesn't block initial HTML
const ProjectCard = dynamic(() => import("@/components/ProjectCard"));

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
            <a
              key={`${partner.logo}-${i}`}
              className={styles.partnerLogoWrapper}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${partner.name}`}
            >
              <div className={styles.partnerLogoImage}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 140px, 250px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span className={styles.partnerName}>{partner.name}</span>
            </a>
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

      {/* CTA Section — internal links */}
      <section className={styles.projects}>
        <div className={styles.projectsHeader}>
          <h2>GET IN TOUCH</h2>
        </div>
        <div style={{ textAlign: "center", padding: "2rem 1rem 4rem" }}>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#bbb", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Have a story to tell? We'd love to hear it. Chile Line Media is a New Mexico-based
            production company creating cinematic narrative films and branded storytelling rooted in the Southwest.
          </p>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ color: "#ff4500", textDecoration: "underline", fontSize: "1.1rem" }}>
              Start a project
            </Link>
            <Link href="/work" style={{ color: "#fff", textDecoration: "underline", fontSize: "1.1rem" }}>
              See our work
            </Link>
            <Link href="/process" style={{ color: "#fff", textDecoration: "underline", fontSize: "1.1rem" }}>
              Our process
            </Link>
            <Link href="/about" style={{ color: "#fff", textDecoration: "underline", fontSize: "1.1rem" }}>
              About us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
