"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import styles from "./page.module.css";

const easeOut = [0.16, 1, 0.3, 1] as const;

const areas = ["Tesuque", "Pojoaque", "Española", "Taos", "Las Vegas", "Pecos", "Abiquiú"];

export default function SantaFePage() {
    const prefersReducedMotion = useReducedMotion();
    const noMotion = { duration: 0 };

    return (
        <main className={styles.main} id="main-content">
            <Navbar />

            <section className={styles.hero}>
                <motion.h1
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? noMotion : { duration: 1, ease: easeOut }}
                >
                    SANTA FE
                </motion.h1>
                <motion.p
                    className={styles.heroSub}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={prefersReducedMotion ? noMotion : { duration: 1, delay: 0.4 }}
                >
                    Video production in Santa Fe, New Mexico — cinematic storytelling rooted in
                    the landscapes and communities of northern New Mexico.
                </motion.p>
            </section>

            <section className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? noMotion : { duration: 0.8, ease: easeOut }}
                >
                    <p>
                        Chile Line Media is a video production company based in Santa Fe, New
                        Mexico. We produce cinematic narrative films, commercial content, and
                        branded documentaries throughout Santa Fe County and northern New Mexico.
                        Our work is rooted in the landscapes, communities, and traditions that
                        define this region.
                    </p>

                    <p>
                        Santa Fe has become one of the most distinctive production hubs in the
                        country. With a 25% base tax incentive from the State of New Mexico —
                        up to 35% with uplifts for filming at qualified production facilities,
                        in rural zones, or for episodic series — Santa Fe offers a rare
                        combination of cinematic landscapes, world-class crew, and production
                        infrastructure. We are proud to be part of this community.
                    </p>

                    <h2>Our Santa Fe Work</h2>
                    <p>
                        Our recent projects include narrative short films shot across all four
                        seasons in northern New Mexico, branded content for the New Mexico Film
                        Office, and documentary work celebrating the heritage of acequia culture.
                        We collaborate with local organizations including the Santa Fe Film
                        Institute, the Santa Fe International Film Festival, Los Luceros Historic
                        Site, and the Taos Destination Stewardship Network.
                    </p>

                    <p>
                        Whether you are a Santa Fe-based business looking for a brand film, an
                        out-of-state production company needing a local production partner, or a
                        filmmaker with a story to tell, we bring feature-quality craft to every
                        project. <Link href="/services">Explore our services</Link> or{" "}
                        <Link href="/work">see our recent work</Link>.
                    </p>

                    <h2>Areas We Serve</h2>
                    <p>
                        Based in Santa Fe, we work throughout northern New Mexico including:
                    </p>
                    <ul className={styles.areaList}>
                        {areas.map((area) => (
                            <li key={area} className={styles.areaTag}>
                                {area}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </section>

            <section className={styles.ctaSection}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? noMotion : { duration: 1, ease: easeOut }}
                    className={styles.ctaContent}
                >
                    <h2 className={styles.ctaTitle}>Have a project in Santa Fe?</h2>
                    <p className={styles.ctaSub}>
                        Let&apos;s talk about the story you want to tell.
                    </p>
                    <Link href="/contact" className={styles.ctaButton}>
                        GET IN TOUCH
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
