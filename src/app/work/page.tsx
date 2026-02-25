"use client";

import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { projects } from "@/data/projects";

export default function Work() {
    return (
        <main className={styles.main}>
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

            <section className={styles.gridContainer}>
                <div className={styles.masonryGrid}>
                    {projects.map((project) => (
                        <div key={project.slug} className={styles.gridItem}>
                            <ProjectCard
                                title={project.title}
                                year={project.year}
                                youtubeId={project.youtubeId}
                                slug={project.slug}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <footer className={styles.footer}>
                <p>© 2025 Chile Line Media. All rights reserved.</p>
            </footer>
        </main>
    );
}
