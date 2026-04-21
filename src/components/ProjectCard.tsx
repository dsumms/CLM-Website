"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
    title: string;
    year: string;
    youtubeId: string;
    slug: string;
}

export default function ProjectCard({ title, year, youtubeId, slug }: ProjectCardProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const [thumbSrc, setThumbSrc] = useState(
        `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    );

    const handleThumbError = () => {
        const hqSrc = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
        // Only fall back once — avoid infinite loop if hq also fails
        if (thumbSrc !== hqSrc) {
            setThumbSrc(hqSrc);
        }
    };

    // If there's no youtubeId, render a placeholder
    if (!youtubeId) {
        return (
            <motion.div
                className={styles.card}
                ref={targetRef}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Link href={`/work/${slug}`} className={styles.link}>
                    <div className={styles.imageContainer}>
                        <div
                            className={styles.image}
                            style={{
                                position: "absolute",
                                top: "-10%",
                                left: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(255,255,255,0.05)",
                                color: "rgba(255,255,255,0.3)",
                                fontSize: "1.5rem",
                            }}
                        >
                            Coming Soon
                        </div>
                        <div className={styles.overlay} />
                    </div>
                    <div className={styles.info}>
                        <h3 className={styles.title}>{title}</h3>
                        <span className={styles.year}>{year}</span>
                    </div>
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            className={styles.card}
            ref={targetRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Link href={`/work/${slug}`} className={styles.link}>
                <div className={styles.imageContainer}>
                    <motion.div style={{ y }} className={styles.motionImageWrapper}>
                        <Image
                            src={thumbSrc}
                            alt={title}
                            fill
                            unoptimized
                            loading="lazy"
                            className={styles.image}
                            onError={handleThumbError}
                        />
                    </motion.div>
                    <div className={styles.overlay}>
                        <div className={styles.playButton} />
                    </div>
                </div>
                <div className={styles.info}>
                    <h3 className={styles.title}>{title}</h3>
                    <span className={styles.year}>{year}</span>
                </div>
            </Link>
        </motion.div>
    );
}
