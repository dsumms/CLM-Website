import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import { formerClients, partners } from "@/data/partners";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Chile Line Media | New Mexico Video Production",
  description:
    "Chile Line Media is an independent production studio based in New Mexico, creating narrative films, documentaries, and commercial work.",
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
  const organizations: {
    name: string;
    href: string;
    logo?: string;
    relationship?: string;
  }[] = [...partners, ...formerClients];
  const organizationSlots = [
    ...organizations.map((organization) => ({ organization, duplicate: false })),
    ...organizations.map((organization) => ({ organization, duplicate: true })),
  ];

  return (
    <main className={styles.main} id="main-content">
      <div className={styles.announcementBanner}>
        <Link href="/events/the-show-must-go-on">The Show Must Go On!</Link>
        <a
          href="https://tickets.holdmyticket.com/tickets/467199"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get your tickets here
        </a>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.canvasContainer}>
          <SplatHeroWrapper />
        </div>

        <div className={styles.heroContent}>
          <div>
            <h1 className={styles.headline}>CHILE LINE MEDIA</h1>
            <p className={styles.subheadline}>Narrative films, documentaries, and commercial work</p>
            <div className={styles.heroActions}>
              <Link href="/work" className={styles.heroActionPrimary}>
                View Our Work
              </Link>
              <Link href="/contact" className={styles.heroActionSecondary}>
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logo Scroll */}
      <section className={styles.partnerStrip} aria-labelledby="organizations-heading">
        <h2 id="organizations-heading" className={styles.organizationHeading}>Clients &amp; Collaborators</h2>
        <div className={styles.partnerTrack}>
          {organizationSlots.map(({ organization, duplicate }, i) => {
            const content = (
              <>
                {organization.logo ? (
                  <div className={styles.partnerLogoImage}>
                    <Image
                      src={organization.logo}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 140px, 250px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  <div className={styles.clientTextTile}>{organization.name}</div>
                )}
                <span className={styles.partnerName}>{organization.name}</span>
              </>
            );

            return duplicate ? (
              <div
                key={`${organization.name}-${i}`}
                className={styles.partnerLogoWrapper}
                data-duplicate="true"
                aria-hidden="true"
              >
                {content}
              </div>
            ) : (
              <a
                key={`${organization.name}-${i}`}
                className={styles.partnerLogoWrapper}
                href={organization.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${organization.name}${organization.relationship ? `, ${organization.relationship}` : ""}`}
              >
                {content}
              </a>
            );
          })}
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
