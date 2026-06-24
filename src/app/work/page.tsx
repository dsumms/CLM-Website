"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import { useState } from "react";
import Link from "next/link";

export default function Work() {
    const prefersReducedMotion = useReducedMotion();
    const noMotion = { duration: 0 };
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    // Only set background-image for the hovered project.
    // This avoids preloading all YouTube thumbnails and keeps the default state black.
    const activeSlug = hoveredProject;
    const activeProject = projects.find((p) => p.slug === activeSlug);

    return (
        <main className={styles.main}>
            {/* Background Image — only one loaded at a time */}
            {activeProject && activeProject.youtubeId && (
                <div
                    key={`bg-${activeProject.slug}`}
                    className={`${styles.backgroundLayer} ${styles.activeBg}`}
                    style={{ backgroundImage: `url(https://img.youtube.com/vi/${activeProject.youtubeId}/maxresdefault.jpg)` }}
                />
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
                        Narrative short films and commissioned storytelling from New Mexico.
                        Each project is rooted in place — the landscapes, communities, and
                        traditions that shape the stories we tell.
                    </motion.p>
                </section>

                <section className={styles.projectList}>
                    {projects.map((project) => (
                        <div
                            key={project.slug}
                            className={styles.projectItem}
                            onPointerMove={() => setHoveredProject(project.slug)}
                            onPointerLeave={() => setHoveredProject(null)}
                            onFocus={() => setHoveredProject(project.slug)}
                            onBlur={() => setHoveredProject(null)}
                        >
                            <Link href={`/work/${project.slug}`} className={styles.projectLink}>
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
