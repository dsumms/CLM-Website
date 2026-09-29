"use client";

/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getProjectImageSources } from "@/lib/projectImages";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import { useState } from "react";
import Link from "next/link";

function ProjectVisual({ imageSrc, youtubeId, className }: {
    imageSrc?: string;
    youtubeId?: string;
    className: string;
}) {
    const sources = getProjectImageSources(imageSrc, youtubeId);
    const [sourceIndex, setSourceIndex] = useState(0);
    const source = sources[sourceIndex];

    if (!source) {
        return <div className={`${className} ${styles.imageFallback}`} aria-hidden="true" />;
    }

    return (
        <img
            className={className}
            src={source}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setSourceIndex((index) => index + 1)}
            onLoad={(event) => {
                if (event.currentTarget.naturalWidth <= 120) {
                    setSourceIndex((index) => index + 1);
                }
            }}
        />
    );
}

export default function Work() {
    const prefersReducedMotion = useReducedMotion();
    const noMotion = { duration: 0 };
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    // Only load the desktop background for the active project.
    const activeSlug = hoveredProject;
    const activeProject = projects.find((p) => p.slug === activeSlug);

    return (
        <main className={styles.main} id="main-content">
            {/* Background Image — only one loaded at a time */}
            {activeProject && (
                <div
                    key={`bg-${activeProject.slug}`}
                    className={`${styles.backgroundLayer} ${styles.activeBg}`}
                    aria-hidden="true"
                >
                    <ProjectVisual
                        imageSrc={activeProject.imageSrc}
                        youtubeId={activeProject.youtubeId}
                        className={styles.backgroundImage}
                    />
                </div>
            )}

            {/* Dark gradient overlay so text remains readable */}
            <div className={`${styles.overlay} ${hoveredProject ? styles.overlayDark : ""}`} />

            <div className={styles.content}>
                <Navbar />

                <section className={styles.header}>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? noMotion : { duration: 1 }}
                    >
                        OUR WORK
                    </motion.h1>
                    <motion.p
                        className={styles.headerSub}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={prefersReducedMotion ? noMotion : { duration: 1, delay: 0.3 }}
                    >
                        Selected narrative films and commissioned work from our New Mexico studio.
                        Each project brings its own story, collaborators, and audience.
                    </motion.p>
                </section>

                <section className={styles.projectList}>
                    {projects.map((project) => (
                        <div
                            key={project.slug}
                            className={styles.projectItem}
                            onPointerEnter={(event) => {
                                if (event.pointerType !== "touch") setHoveredProject(project.slug);
                            }}
                            onPointerLeave={() => setHoveredProject(null)}
                            onFocus={() => setHoveredProject(project.slug)}
                            onBlur={() => setHoveredProject(null)}
                        >
                            <Link href={`/work/${project.slug}`} className={styles.projectLink}>
                                <span className={styles.mobileVisual} aria-hidden="true">
                                    <ProjectVisual
                                        imageSrc={project.imageSrc}
                                        youtubeId={project.youtubeId}
                                        className={styles.mobileImage}
                                    />
                                </span>
                                <motion.h2
                                    className={styles.projectTitle}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={prefersReducedMotion ? noMotion : { duration: 0.5 }}
                                >
                                    {project.title}
                                </motion.h2>
                                <span className={styles.projectYear}>{project.year}</span>
                            </Link>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}
