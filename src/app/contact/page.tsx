"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import styles from "./page.module.css";

export default function Contact() {
    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.contentContainer}>
                <div className={styles.backgroundGlow}></div>

                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className={styles.title}>CONTACT</h1>
                        <p className={styles.subtitle}>Let&apos;s tell a story together.</p>
                    </motion.div>

                    <div className={styles.linksContainer}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <a href="mailto:hello@chilelinemedia.com" className={styles.emailLink}>
                                hello@chilelinemedia.com
                            </a>
                        </motion.div>

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
                                        delayChildren: 0.4
                                    }
                                }
                            }}
                        >
                            <motion.a
                                href="https://www.youtube.com/@ChileLineMedia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialCard}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
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
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
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
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>TikTok</span>
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
