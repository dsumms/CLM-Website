"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import styles from "./page.module.css";

const easeOut = [0.16, 1, 0.3, 1] as const;

const areas = ["Rio Rancho", "Bernalillo", "Los Lunas", "Belen", "Sandia Park", "Tijeras", "Placitas"];

export default function AlbuquerquePage() {
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
                    ALBUQUERQUE
                </motion.h1>
                <motion.p
                    className={styles.heroSub}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={prefersReducedMotion ? noMotion : { duration: 1, delay: 0.4 }}
                >
                    Video production in Albuquerque, New Mexico — cinematic commercials, narrative
                    films, and branded content from a Santa Fe-based production company.
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
                        Chile Line Media provides video production services in Albuquerque and
                        the greater Bernalillo County area. Based an hour north in Santa Fe, we
                        work regularly in Albuquerque — a city that has become one of the most
                        active film and television production centers in the United States.
                    </p>

                    <p>
                        Albuquerque is home to major studio facilities including Netflix's
                        Albuquerque Studios and NBCUniversal's production hub. New Mexico's
                        25-35% film tax incentive applies to commercials, television, and feature
                        films alike, with additional uplifts for filming at qualified production
                        facilities and in rural zones. We understand the logistics of working
                        across both the Santa Fe and Albuquerque production ecosystems.
                    </p>

                    <h2>What We Offer in Albuquerque</h2>
                    <p>
                        Whether you need a commercial shot in Albuquerque, a local production
                        partner for an out-of-state production, or post-production services for
                        footage already captured, we bring the same cinematic standard to every
                        project. Our team has worked on productions ranging from studio features
                        to independent shorts and branded content. <Link href="/services">See
                        our full range of services</Link>.
                    </p>

                    <p>
                        We handle permitting, location scouting, crew booking, and full production
                        coordination throughout the Albuquerque metro area. We can also provide
                        a seamless bridge between Albuquerque and Santa Fe — two production hubs
                        less than an hour apart with complementary infrastructure and locations.
                    </p>

                    <h2>Areas We Serve</h2>
                    <p>
                        Based in Santa Fe, we serve the greater Albuquerque metro area including:
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
                    <h2 className={styles.ctaTitle}>Have a project in Albuquerque?</h2>
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
