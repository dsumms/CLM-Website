"use client";

import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import PointCloudParticles from "@/components/PointCloudParticles";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { projects } from "@/data/projects";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        {mounted && (
          <div className={styles.canvasContainer}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <Suspense fallback={null}>
                <PointCloudParticles imageSrc="/hero-image.jpg" />
              </Suspense>
            </Canvas>
          </div>
        )}

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <h1 className={styles.headline}>CHILE LINE MEDIA</h1>
            <p className={styles.subheadline}>Independent narrative and branded storytelling company</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className={styles.projects}>
        <motion.div
          className={styles.projectsHeader}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>SELECTED WORKS</h2>
        </motion.div>

        <div className={styles.grid}>
          {projects.slice(0, 3).map((project) => (
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

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h2>GET IN TOUCH</h2>
          <a href="mailto:hello@chilelinemedia.com" className={styles.email}>hello@chilelinemedia.com</a>
          <div className={styles.socials}>
            <a href="#">Instagram</a>
            <a href="#">Vimeo</a>
          </div>
          <p className={styles.copyright}>© 2025 Chile Line Media. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
