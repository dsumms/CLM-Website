"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
    title: string;
    year: string;
    youtubeId?: string;
    slug: string;
}

export default function ProjectCard({ title, year, youtubeId, slug }: ProjectCardProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const [thumbSrc, setThumbSrc] = useState(
        youtubeId
            ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
            : ""
    );
    const [hasError, setHasError] = useState(false);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const handleImgError = () => {
        if (youtubeId && !thumbSrc.includes("hqdefault.jpg")) {
            setThumbSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
        } else {
            setHasError(true);
        }
    };

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
                    {youtubeId && !hasError ? (
                        <motion.img
                            src={thumbSrc}
                            alt={title}
                            className={styles.image}
                            style={{ y }}
                            loading="lazy"
                            decoding="async"
                            onError={handleImgError}
                        />
                    ) : (
                        <div className={styles.placeholder} style={{ y }}>
                            <span className={styles.placeholderText}>{title}</span>
                        </div>
                    )}
                    <div className={styles.overlay} aria-label={`Play ${title}`}>
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
