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
            "We produce cinematic commercials, brand films, and branded content for businesses, agencies, and institutions across New Mexico. From a 30-second spot to a long-form brand documentary, we bring the same cinematic eye to commercial work that we bring to our narrative films. Our commercial productions have served organizations like the New Mexico Film Office, Los Luceros Historic Site, and the Taos Destination Stewardship Network — projects rooted in place and purpose, not just product.",
    },
    {
        number: "02",
        title: "Narrative Film Production",
        description:
            "Original short films, features, and scripted content shot and produced in New Mexico. Our narrative work has screened at festivals and venues across the Southwest. We handle the full pipeline — development, financing strategy, pre-production, production, and post — with a team built from crews who have worked on productions like Oppenheimer, American Primeval, and Frybread Face and Me. We develop stories that highlight the landscapes, communities, and traditions of the Southwest.",
    },
    {
        number: "03",
        title: "Documentary & Non-Fiction",
        description:
            "Commissioned documentaries and non-fiction storytelling for organizations, institutions, and brands who want real stories told with cinematic craft. We specialize in place-based documentary work — films about people, land, water, culture, and community in New Mexico and the broader Southwest. Our documentary work is built on ethical collaboration with the communities we film.",
    },
    {
        number: "04",
        title: "Post-Production",
        description:
            "Editing, color grading, visual effects, and sound design for projects shot in New Mexico or anywhere else. Our post-production team brings feature film standards to every project — from commercial deliverables to independent films. We offer full post-production support including editorial, color, VFX compositing, sound mixing, and final delivery in any format required.",
    },
];

const deliverables = [
    "Final film in all required formats (broadcast master, web, social)",
    "Behind-the-scenes photography from the production",
    "Project archive with all raw footage",
    "Music licensing and rights documentation",
    "Color-graded and sound-mixed deliverables",
    "Social media cutdowns and trailer edits",
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
                    Video production services in New Mexico — commercial, narrative, and
                    branded storytelling from the Southwest.
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
                    <h2 className={styles.deliverablesHeading}>What You Receive</h2>
                    <ul className={styles.deliverablesList}>
                        {deliverables.map((item) => (
                            <li key={item} className={styles.deliverablesItem}>
                                {item}
                            </li>
                        ))}
                    </ul>
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
