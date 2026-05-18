"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
            ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
            : ""
    );
    const [hasError, setHasError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = targetRef.current;
        if (!element) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            const frame = requestAnimationFrame(() => setIsVisible(true));
            return () => cancelAnimationFrame(frame);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const handleImgError = () => {
        if (youtubeId && !thumbSrc.includes("mqdefault.jpg")) {
            setThumbSrc(`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`);
        } else {
            setHasError(true);
        }
    };

    return (
        <div
            className={`${styles.card} ${isVisible ? styles.cardVisible : ""}`}
            ref={targetRef}
        >
            <Link
                href={`/work/${slug}`}
                className={styles.link}
                aria-label={`View project ${title}`}
            >
                <div className={styles.imageContainer}>
                    {youtubeId && !hasError ? (
                        <img
                            src={thumbSrc}
                            alt={title}
                            className={styles.image}
                            loading="lazy"
                            decoding="async"
                            onError={handleImgError}
                        />
                    ) : (
                        <div className={styles.placeholder}>
                            <span className={styles.placeholderText}>{title}</span>
                        </div>
                    )}
                    <div className={styles.overlay} aria-hidden="true">
                        <div className={styles.playButton} />
                    </div>
                </div>
                <div className={styles.info}>
                    <h3 className={styles.title}>{title}</h3>
                    <span className={styles.year}>{year}</span>
                </div>
            </Link>
        </div>
    );
}
