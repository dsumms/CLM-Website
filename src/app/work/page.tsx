"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import { useState } from "react";
import Link from "next/link";

export default function Work() {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    return (
        <main className={styles.main}>
            {/* Background Images */}
            {projects.map((project) => (
                <div
                    key={`bg-${project.slug}`}
                    className={`${styles.backgroundLayer} ${hoveredProject === project.slug ? styles.activeBg : ""}`}
                    style={{ backgroundImage: `url(https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg)` }}
                />
            ))}

            {/* Dark gradient overlay so text remains readable */}
            <div className={`${styles.overlay} ${hoveredProject ? styles.overlayDark : ""}`} />

            <div className={styles.content}>
                <Navbar />

                <section className={styles.header}>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
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
                                    transition={{ duration: 0.5 }}
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
