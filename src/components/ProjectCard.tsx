"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
                    <motion.img
                        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                        alt={title}
                        className={styles.image}
                        style={{ y }}
                    />
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
