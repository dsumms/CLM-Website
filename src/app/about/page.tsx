"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./page.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const team = [
    {
        name: "Makaio Frazier",
        role: "Founder, CEO & Creative Director",
        bio: "Makaio Frazier is a filmmaker, writer, and producer based in northern New Mexico. He began his career working on crews for acclaimed projects such as Oppenheimer, American Primeval, and Frybread Face and Me, experiences that led him to launch Chile Line Media in 2022. Through CLM, Makaio develops narrative films and commercial content that highlight the landscapes, communities, and traditions of the Southwest. His latest short, The Way We Carry Water (2025), was filmed across all four seasons and celebrates the living heritage of acequia culture while tracing a young man's journey through grief and renewal. Makaio's work reflects a commitment to craft, authenticity, and supporting regional voices in cinema.",
        photo: "/images/team/makaio.jpg",
    },
    {
        name: 'Fred "Boomer" Mady III',
        role: "Partner, COO & Head of Production",
        bio: "Fred Mady III is a filmmaker, producer, and production manager based in New Mexico. He is the co-founder of Chile Line Media, where he develops narrative films and visual work rooted in the landscapes, people, and traditions of the Southwest. With a background in set leadership, production logistics, and independent filmmaking, his work is built on both story and execution.",
        photo: "/images/team/fred.jpg",
    },
    {
        name: "Dylan Summer",
        role: "Partner, CTO & Head of Post-Production",
        bio: "Dylan Summer, co-founder of Chile Line Media, is a visual effects artist, editor, and producer. He helps define the visual direction of the company's film and commercial projects, from early compositing through final cut. Five years in post-production — he brings a careful eye to timing, color, and continuity under real production constraints. On location he supports producing, keeping projects on track and the work itself the priority.",
        photo: "/images/team/dylan.jpg",
    },
    {
        name: "Mia Gonzales",
        role: "Head of Marketing",
        bio: "Mia Gonzales is a multidisciplinary artist, writer, and marketing strategist specializing in brand storytelling, compelling social media strategy, and creative direction. As Head of Marketing for Chile Line Media, she develops campaigns that extend film beyond the screen, shaping how they connect with audiences across digital platforms and festival spaces.",
        photo: "/images/team/mia.jpg",
    },
];

const partnerships = [
    { name: "The New Mexico Film Office", logo: "/logos/media__1776718884198.png" },
    { name: "The Santa Fe Film Institute", logo: "/logos/media__1776718884197.png" },
    { name: "Santa Fe International Film Festival", logo: "/logos/media__1776719502962.png" },
    { name: "Los Luceros Historic Site / NM Historic Sites", logo: "/logos/media__1776720924256.png" },
    { name: "Northern Rio Grande Heritage Area", logo: "/logos/media__1776723477993.png" },
    { name: "Apaluma", logo: "/logos/media__1776718766123.png" },
    { name: "The New Mexico Environment Department", logo: "/logos/media__1776718766127.png" },
    { name: "Hands Across Cultures", logo: "/logos/media__1776719321756.png" },
    { name: "Taos Mainstreet", logo: "/logos/taos-mainstreet.png" },
    { name: "Taos Destination Stewardship Network", logo: "/logos/taos-dsn.png" },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: containerRef });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    const noMotion = { duration: 0 };

    return (
        <main className={styles.main} ref={containerRef} id="main-content">
            <Navbar />

            <section className={styles.hero}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? noMotion : { duration: 1 }}
                >
                    ABOUT US
                </motion.h1>
            </section>

            <section className={styles.contentSection}>
                <motion.div
                    className={styles.textBlock}
                    style={{ y: prefersReducedMotion ? 0 : y1 }}
                >
                    <p>
                        Chile Line Media is a production company based in New Mexico. We tell stories rooted in the Southwest — its people, its landscapes, and the traditions that have shaped it for generations. We believe this region deserves the same cinematic attention as anywhere else, and we&apos;re building a body of work that proves it.
                    </p>
                </motion.div>

                <div className={styles.imageContainer}>
                    <motion.div
                        className={styles.parallaxImage}
                        style={{ y: prefersReducedMotion ? 0 : imgY, backgroundImage: "url('/images/about-location.jpg')" }}
                    />
                </div>

                <motion.div
                    className={styles.textBlockRight}
                    style={{ y: prefersReducedMotion ? 0 : y2 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={prefersReducedMotion ? noMotion : { duration: 1 }}
                >
                    <p>
                        Our team brings professional film industry experience to independent, place-based storytelling. Whether through intimate short films or ambitious features, we are committed to authentic representation, ethical filmmaking, and collaboration with local communities.
                    </p>
                </motion.div>

                <div className={styles.imageContainer}>
                    <motion.div
                        className={styles.parallaxImage}
                        style={{ y: prefersReducedMotion ? 0 : imgY, backgroundImage: "url('/images/about-bts.jpg')" }}
                    />
                </div>

                <motion.div
                    className={styles.textBlock}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={prefersReducedMotion ? noMotion : { duration: 1 }}
                >
                    <p>
                        We also produce brand films and commissioned storytelling for organizations, institutions, and businesses who share that commitment — shot with the same cinematic standard and sense of place we bring to our original films.
                    </p>
                </motion.div>
            </section>

            <section className={styles.mantraSection}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? noMotion : { duration: 2 }}
                >
                    At Chile Line Media, we believe <br />
                    <span className={styles.highlight}>storytelling is stewardship.</span>
                </motion.h2>
                <p>
                    We carry forward the stories of those who came before us while creating space for new voices to emerge.
                </p>
            </section>

            {/* ── Our Team ── */}
            <section className={styles.teamSection}>
                <motion.h2
                    className={styles.sectionHeading}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? noMotion : { duration: 0.8, ease: easeOut }}
                >
                    OUR TEAM
                </motion.h2>

                <div className={styles.teamGrid}>
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            className={styles.teamCard}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={
                                prefersReducedMotion
                                    ? noMotion
                                    : {
                                        duration: 0.7,
                                        delay: i * 0.1,
                                        ease: easeOut,
                                    }
                            }
                        >
                            <div className={styles.teamPhoto}>
                                <Image
                                    src={member.photo}
                                    alt={member.name}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <h3 className={styles.teamName}>{member.name}</h3>
                            <span className={styles.teamRole}>{member.role}</span>
                            <p className={styles.teamBio}>{member.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Past Partnerships ── */}
            <section className={styles.partnershipsSection}>
                <motion.h2
                    className={styles.sectionHeading}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? noMotion : { duration: 0.8, ease: easeOut }}
                >
                    PAST PARTNERSHIPS
                </motion.h2>

                <motion.div
                    className={styles.partnerGrid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={
                        prefersReducedMotion
                            ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                            : {
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                                },
                            }
                    }
                >
                    {partnerships.map((partner) => (
                        <motion.div
                            key={partner.name}
                            className={styles.partnerGridItem}
                            variants={
                                prefersReducedMotion
                                    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
                                    : {
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
                                    }
                            }
                        >
                            {partner.logo ? (
                                <div className={styles.partnerLogoBox}>
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                            ) : (
                                <div className={styles.partnerLogoBox}>
                                    <span className={styles.partnerPlaceholderText}>{partner.name}</span>
                                </div>
                            )}
                            <span className={styles.partnerLabel}>{partner.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

        </main>
    );
}
