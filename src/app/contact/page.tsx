"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import styles from "./page.module.css";

const easeOut = [0.16, 1, 0.3, 1] as const;

const services = [
    {
        title: "Brand Films",
        description:
            "Cinematic narratives that define your brand identity and leave a lasting impression on every viewer.",
    },
    {
        title: "Documentary",
        description:
            "Authentic, story-driven documentaries that capture real moments and amplify unheard voices.",
    },
    {
        title: "Commercial Production",
        description:
            "High-end commercial content crafted for maximum impact across broadcast, digital, and social platforms.",
    },
    {
        title: "Event Coverage",
        description:
            "Comprehensive live-event capture that translates the energy of the room into compelling visual stories.",
    },
];

const projectTypes = [
    "Brand Film",
    "Documentary",
    "Commercial",
    "Event Coverage",
    "Social Content",
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
    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.contentContainer}>
                <div className={styles.backgroundGlow}></div>

                <div className={styles.content}>
                    {/* ── Hero / CTA ── */}
                    <motion.div
                        className={styles.heroSection}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: easeOut }}
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
                        transition={{ duration: 1, delay: 0.15, ease: easeOut }}
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
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Send Inquiry
                        </motion.button>
                    </motion.form>

                    {/* ── Services Section ── */}
                    <motion.div
                        className={styles.servicesSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.35, ease: easeOut }}
                    >
                        <h2 className={styles.servicesTitle}>Our Services</h2>
                        <div className={styles.servicesGrid}>
                            {services.map((service, i) => (
                                <motion.div
                                    key={service.title}
                                    className={styles.serviceCard}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.45 + i * 0.1,
                                        ease: easeOut,
                                    }}
                                    whileHover={{ y: -4 }}
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
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.65,
                                },
                            },
                        }}
                    >
                        <motion.a
                            href="https://www.youtube.com/@ChileLineMedia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.6, ease: easeOut },
                                },
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>YouTube</span>
                        </motion.a>
                        <motion.a
                            href="https://www.instagram.com/chilelinemedia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.6, ease: easeOut },
                                },
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Instagram</span>
                        </motion.a>
                        <motion.a
                            href="https://www.tiktok.com/@chilelinemedia?lang=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.6, ease: easeOut },
                                },
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>TikTok</span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}