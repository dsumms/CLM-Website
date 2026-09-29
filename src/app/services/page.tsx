"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import styles from "./page.module.css";

const easeOut = [0.16, 1, 0.3, 1] as const;

const services = [
    {
        number: "01",
        title: "Commercial & Branded Content",
        description:
            "We produce commercials, brand films, and branded content for businesses, organizations, and institutions. From focused short-form pieces to longer brand stories, we build each production around the project's goals, audience, and scope.",
    },
    {
        number: "02",
        title: "Narrative Film Production",
        description:
            "We develop and produce original narrative films and scripted work. Our core team brings in trusted collaborators to build a crew around each story, from development and production through post. Our narrative short The Way We Carry Water was filmed across four seasons in northern New Mexico.",
    },
    {
        number: "03",
        title: "Documentary & Non-Fiction",
        description:
            "Our documentary and non-fiction work brings cinematic craft to real people and events. We collaborate with subjects and partners to shape each film around its story and audience.",
    },
    {
        number: "04",
        title: "Post-Production",
        description:
            "We support projects through editing, color grading, visual effects, sound, and finishing. The scope is planned with each team, from a focused edit to full post-production support.",
    },
];

export default function Services() {
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
                    SERVICES
                </motion.h1>
                <motion.p
                    className={styles.heroSub}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={prefersReducedMotion ? noMotion : { duration: 1, delay: 0.4 }}
                >
                    Narrative films, documentaries, and commercial work from a
                    production studio based in New Mexico.
                </motion.p>
            </section>

            <div className={styles.servicesContainer}>
                {services.map((service) => (
                    <motion.section
                        key={service.number}
                        className={styles.service}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={prefersReducedMotion ? noMotion : { duration: 0.9, ease: easeOut }}
                    >
                        <div className={styles.serviceNumber}>{service.number}</div>
                        <div className={styles.serviceContent}>
                            <h2 className={styles.serviceTitle}>{service.title}</h2>
                            <p className={styles.serviceDesc}>{service.description}</p>
                        </div>
                    </motion.section>
                ))}
            </div>

            {/* Deliverables */}
            <section className={styles.deliverablesSection}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? noMotion : { duration: 0.8, ease: easeOut }}
                >
                    <h2 className={styles.deliverablesHeading}>Deliverables tailored to your project</h2>
                    <p className={styles.deliverablesDescription}>
                        We agree on deliverables during scoping. Depending on the project,
                        these may include a finished film, web and social versions, and supporting assets.
                    </p>
                </motion.div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? noMotion : { duration: 1, ease: easeOut }}
                    className={styles.ctaContent}
                >
                    <h2 className={styles.ctaTitle}>Ready to start your project?</h2>
                    <p className={styles.ctaSub}>
                        Let&apos;s talk about the story you want to tell.
                    </p>
                    <div className={styles.ctaLinks}>
                        <Link href="/contact" className={styles.ctaButton}>
                            GET IN TOUCH
                        </Link>
                        <Link href="/work" className={styles.ctaLink}>
                            See our work
                        </Link>
                        <Link href="/process" className={styles.ctaLink}>
                            Our process
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
