"use client";

import { motion } from "framer-motion";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <motion.div
                className={styles.footerContent}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
            >
                <h2>GET IN TOUCH</h2>
                <a href="mailto:hello@chilelinemedia.com" className={styles.email}>hello@chilelinemedia.com</a>
                <div className={styles.socials}>
                    <a href="https://www.youtube.com/@ChileLineMedia" target="_blank" rel="noopener noreferrer">YouTube</a>
                    <a href="https://www.instagram.com/chilelinemedia/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.tiktok.com/@chilelinemedia?lang=en" target="_blank" rel="noopener noreferrer">TikTok</a>
                </div>
                <p className={styles.copyright}>&copy; {new Date().getFullYear()} Chile Line Media. All rights reserved.</p>
            </motion.div>
        </footer>
    );
}
