"use client";

import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./page.module.css";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

    return (
        <main className={styles.main} ref={containerRef}>
            <Navbar />

            <section className={styles.hero}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    ABOUT US
                </motion.h1>
            </section>

            <section className={styles.contentSection}>
                <motion.div
                    className={styles.textBlock}
                    style={{ y: y1 }}
                >
                    <p>
                        Chile Line Media is a New Mexico based production company founded by filmmaker Makaio Frazier.
                        The company is dedicated to telling stories rooted in land, legacy, and lived experience.
                        We create films that celebrate the depth of regional culture while connecting with universal themes
                        of identity, resilience, and belonging.
                    </p>
                </motion.div>

                <div className={styles.spacer}></div>

                <motion.div
                    className={styles.textBlockRight}
                    style={{ y: y2 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1 }}
                >
                    <p>
                        Our team of filmmakers, designers, and storytellers blends narrative craft with visual poetry,
                        capturing the quiet beauty, humanity, and complexity of the Southwest. Whether through intimate
                        short films or ambitious features, we are committed to authentic representation, ethical filmmaking,
                        and collaboration with local communities.
                    </p>
                </motion.div>

                <div className={styles.spacer}></div>

                <motion.div
                    className={styles.emphasisBlock}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2 }}
                >
                    <h2>THE WAY WE CARRY WATER</h2>
                    <span className={styles.year}>(2025)</span>
                    <p className={styles.debutText}>
                        Our debut short film, The Way We Carry Water, embodies this vision. Filmed across the seasons in
                        Northern New Mexico, it explores grief, tradition, and the interconnection between people and the land.
                        The project is supported by the Santa Fe International Film Festival, Los Luceros Historic Site,
                        the Northern Rio Grande National Heritage Area, and Hands Across Cultures, reflecting our deep
                        regional partnerships and dedication to preserving cultural heritage through cinema.
                    </p>
                </motion.div>
            </section>

            <section className={styles.mantraSection}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                >
                    At Chile Line Media, we believe <br />
                    <span className={styles.highlight}>storytelling is stewardship.</span>
                </motion.h2>
                <p>
                    We carry forward the stories of those who came before us while creating space for new voices to emerge.
                </p>
            </section>

            <footer className={styles.footer}>
                <p>© 2025 Chile Line Media. All rights reserved.</p>
            </footer>
        </main>
    );
}
