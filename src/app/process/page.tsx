"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";

const stages = [
    {
        number: "01",
        title: "Discovery / Brief",
        description:
            "Every project begins with listening. We sit down with you to understand your story, your goals, and the audience you want to reach. This phase shapes the creative direction and ensures we're aligned before a single frame is shot.",
        accent: "#ff4500",
    },
    {
        number: "02",
        title: "Pre-Production",
        description:
            "We develop the concept, build the shot list, scout locations, and lock the schedule. Pre-production is where vision becomes plan — every detail is mapped so production runs smoothly and efficiently.",
        accent: "#ff4500",
    },
    {
        number: "03",
        title: "Production",
        description:
            "Cameras roll. Our crew captures the performances, landscapes, and moments that bring the story to life. We stay adaptable on set while honoring the creative blueprint we built together.",
        accent: "#ff4500",
    },
    {
        number: "04",
        title: "Post-Production",
        description:
            "The footage is shaped into its final form through editing, color grading, and sound design. This is where rhythm, tone, and emotion are refined until every cut feels intentional and every frame earns its place.",
        accent: "#ff4500",
    },
    {
        number: "05",
        title: "Delivery",
        description:
            "Your finished film is exported in the right formats for every platform and audience. We provide the deliverables you need — from broadcast masters to social cuts — so your story reaches the world exactly as intended.",
        accent: "#ff4500",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export default function Process() {
    return (
        <main className={styles.main}>
            <Navbar />

            <section className={styles.hero}>
                <motion.h1
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                >
                    OUR PROCESS
                </motion.h1>
                <motion.p
                    className={styles.heroSub}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    From first conversation to final frame.
                </motion.p>
            </section>

            <motion.div
                className={styles.stagesContainer}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
            >
                {stages.map((stage) => (
                    <motion.section
                        key={stage.number}
                        className={styles.stage}
                        variants={itemVariants}
                    >
                        <div className={styles.stageNumber}>{stage.number}</div>
                        <div className={styles.stageContent}>
                            <h2 className={styles.stageTitle}>{stage.title}</h2>
                            <p className={styles.stageDesc}>{stage.description}</p>
                        </div>
                        <div className={styles.stageImage}>
                            <div
                                className={styles.placeholderRect}
                                style={{ backgroundColor: stage.accent, opacity: 0.12 }}
                            />
                        </div>
                    </motion.section>
                ))}
            </motion.div>

            <section className={styles.ctaSection}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                    className={styles.ctaContent}
                >
                    <h2 className={styles.ctaTitle}>
                        Ready to start your project?
                    </h2>
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