"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const easeOut = [0.16, 1, 0.3, 1] as const;

const services = [
    {
        title: "Narrative Films",
        description:
            "Original short and feature films rooted in place, culture, and character. Stories crafted with patience, intention, and a deep connection to the Southwest.",
    },
    {
        title: "Brand Storytelling",
        description:
            "Commissioned films for organizations, institutions, and businesses. Place-based, cinematic, and built to the same standard as our original work.",
    },
    {
        title: "Documentary",
        description:
            "Nonfiction stories rooted in place and culture. We capture what's real — the people, traditions, and landscapes that deserve to be seen and preserved.",
    },
    {
        title: "Campaign & Digital Content",
        description:
            "Social cuts, promotional spots, event recaps, and digital-first content. Short-form work with the same visual standard and sense of story.",
    },
];

const projectTypes = [
    "Narrative Films",
    "Brand Storytelling",
    "Documentary",
    "Campaign & Digital Content",
    "Other",
];

const budgetRanges = [
    "Under $5k",
    "$5k – $15k",
    "$15k – $50k",
    "$50k – $100k",
    "$100k+",
    "Not sure yet",
];

export default function Contact() {
    const prefersReducedMotion = useReducedMotion();
    const noMotion = { duration: 0 };

    return (
        <main className={styles.main} id="main-content">
            <Navbar />

            <div className={styles.contentContainer}>
                <div className={styles.backgroundGlow}></div>

                <div className={styles.content}>
                    {/* ── Hero / CTA ── */}
                    <motion.div
                        className={styles.heroSection}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? noMotion : { duration: 1, ease: easeOut }}
                    >
                        <h1 className={styles.ctaHeadline}>
                            Let&apos;s Build Something Remarkable
                        </h1>
                        <p className={styles.ctaSubline}>
                            Every great project starts with a conversation. Tell us about your
                            vision and we&apos;ll bring it to life.
                        </p>
                    </motion.div>

                    {/* ── Lead Capture Form (hero slot) ── */}
                    <motion.form
                        className={styles.form}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? noMotion : { duration: 1, delay: 0.15, ease: easeOut }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className={styles.formRow}>
                            <div className={styles.fieldGroup}>
                                <label htmlFor="name" className={styles.label}>
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className={styles.input}
                                    placeholder="Your name"
                                    required
                                />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={styles.input}
                                    placeholder="you@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.fieldGroup}>
                                <label htmlFor="projectType" className={styles.label}>
                                    Project Type
                                </label>
                                <select
                                    id="projectType"
                                    name="projectType"
                                    className={styles.select}
                                    required
                                >
                                    <option value="" disabled selected>
                                        Select a project type
                                    </option>
                                    {projectTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label htmlFor="budget" className={styles.label}>
                                    Budget Range
                                </label>
                                <select
                                    id="budget"
                                    name="budget"
                                    className={styles.select}
                                    required
                                >
                                    <option value="" disabled selected>
                                        Select a range
                                    </option>
                                    {budgetRanges.map((range) => (
                                        <option key={range} value={range}>
                                            {range}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="message" className={styles.label}>
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className={styles.textarea}
                                placeholder="Tell us about your project…"
                                rows={5}
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className={styles.submitButton}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                        >
                            Send Inquiry
                        </motion.button>
                    </motion.form>

                    {/* ── Services Section ── */}
                    <motion.div
                        className={styles.servicesSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={prefersReducedMotion ? noMotion : { duration: 1, delay: 0.35, ease: easeOut }}
                    >
                        <h2 className={styles.servicesTitle}>Our Services</h2>
                        <div className={styles.servicesGrid}>
                            {services.map((service, i) => (
                                <motion.div
                                    key={service.title}
                                    className={styles.serviceCard}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={
                                        prefersReducedMotion
                                            ? noMotion
                                            : {
                                                duration: 0.6,
                                                delay: 0.45 + i * 0.1,
                                                ease: easeOut,
                                            }
                                    }
                                    whileHover={prefersReducedMotion ? {} : { y: -4 }}
                                >
                                    <div className={styles.serviceIconPlaceholder} />
                                    <h3 className={styles.serviceName}>
                                        {service.title}
                                    </h3>
                                    <p className={styles.serviceDescription}>
                                        {service.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Social Links ── */}
                    <motion.div
                        className={styles.socialGrid}
                        initial="hidden"
                        animate="visible"
                        variants={
                            prefersReducedMotion
                                ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                                : {
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                            delayChildren: 0.65,
                                        },
                                    },
                                }
                        }
                    >
                        <motion.a
                            href="https://www.youtube.com/@ChileLineMedia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            aria-label="Chile Line Media on YouTube"
                            variants={
                                prefersReducedMotion
                                    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
                                    : {
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, ease: easeOut },
                                        },
                                    }
                            }
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        >
                            <span>YouTube</span>
                        </motion.a>
                        <motion.a
                            href="https://www.instagram.com/chilelinemedia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            aria-label="Chile Line Media on Instagram"
                            variants={
                                prefersReducedMotion
                                    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
                                    : {
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, ease: easeOut },
                                        },
                                    }
                            }
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        >
                            <span>Instagram</span>
                        </motion.a>
                        <motion.a
                            href="https://www.tiktok.com/@chilelinemedia?lang=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            aria-label="Chile Line Media on TikTok"
                            variants={
                                prefersReducedMotion
                                    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
                                    : {
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, ease: easeOut },
                                        },
                                    }
                            }
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        >
                            <span>TikTok</span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
