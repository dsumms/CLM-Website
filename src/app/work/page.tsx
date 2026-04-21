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

    // Only set background-image for the hovered project (or the first as default).
    // This avoids preloading all YouTube thumbnails at once.
    const activeSlug = hoveredProject ?? projects[0]?.slug ?? null;
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
                </section>

                <section className={styles.projectList}>
                    {projects.map((project) => (
                        <div
                            key={project.slug}
                            className={styles.projectItem}
                            onMouseEnter={() => setHoveredProject(project.slug)}
                            onMouseLeave={() => setHoveredProject(null)}
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
