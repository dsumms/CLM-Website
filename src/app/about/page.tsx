"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formerClients, partners } from "@/data/partners";

const team = [
    {
        name: "Makaio Frazier",
        role: "Co-Founder & Creative Director",
        bio: "Makaio Frazier is a filmmaker, writer, and producer based in northern New Mexico. His crew work includes Oppenheimer, American Primeval, and Frybread Face and Me. As Creative Director and co-founder, he develops Chile Line Media’s narrative films and commercial content.",
        photo: "/images/team/makaio.jpg",
    },
    {
        name: 'Fred “Boomer” Mady III',
        role: "Co-Founder & Head of Production",
        bio: "Fred “Boomer” Mady III is a filmmaker, producer, and production manager based in New Mexico. As co-founder and Head of Production, he brings experience in set leadership, production logistics, and independent filmmaking.",
        photo: "/images/team/fred.jpg",
    },
    {
        name: "Dylan Summer",
        role: "Co-Founder & Post-Production Lead",
        bio: "Dylan Summer is a co-founder and post-production lead at Chile Line Media. A visual effects artist, editor, and producer, he helps shape the visual direction of the studio’s film and commercial work, from early compositing through final cut.",
        photo: "/images/team/dylan.jpg",
    },
    {
        name: "Mia Gonzales",
        role: "Head of Marketing",
        bio: "Mia Gonzales is an integral member of Chile Line Media and leads the studio’s marketing. A multidisciplinary artist, writer, and marketing strategist, she develops brand storytelling, social media strategy, and creative direction for campaigns that connect with audiences across digital platforms and festival spaces.",
        photo: "/images/team/mia.jpg",
    },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: containerRef });

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

            <section className={styles.contentSection} aria-label="Studio introduction">
                <motion.div
                    className={styles.introCopy}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={prefersReducedMotion ? noMotion : { duration: 0.8, ease: easeOut }}
                >
                    <p>
                        Chile Line Media is an independent production studio creating narrative films, documentaries, and commercial work. We bring cinematic craft, a collaborative approach, and a clear point of view to every project.
                    </p>
                    <p>
                        We’re hands-on from concept to delivery, working with filmmakers, brands, and organizations through development, production, and post. Our core team brings in trusted collaborators to build the right crew for each project, with the story and its audience guiding the work.
                    </p>
                    <p>
                        Founded by Makaio Frazier, Fred “Boomer” Mady III, and Dylan Summer, Chile Line Media is based in New Mexico.
                    </p>
                </motion.div>
            </section>

            <section className={styles.imageGallery} aria-label="Production imagery">
                <motion.div
                    className={`${styles.imageContainer} ${styles.locationImage}`}
                    style={{ y: prefersReducedMotion ? 0 : imgY }}
                    aria-hidden="true"
                />
                <motion.div
                    className={`${styles.imageContainer} ${styles.btsImage}`}
                    style={{ y: prefersReducedMotion ? 0 : imgY }}
                    aria-hidden="true"
                />
            </section>

            <section className={styles.teamSection} aria-labelledby="team-heading">
                <motion.h2
                    id="team-heading"
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
                        <motion.article
                            key={member.name}
                            className={styles.teamCard}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={
                                prefersReducedMotion
                                    ? noMotion
                                    : { duration: 0.7, delay: i * 0.1, ease: easeOut }
                            }
                        >
                            <div className={styles.teamPhoto}>
                                <Image
                                    src={member.photo}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <h3 className={styles.teamName}>{member.name}</h3>
                            <p className={styles.teamRole}>{member.role}</p>
                            <p className={styles.teamBio}>{member.bio}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            <section className={styles.clientsSection} aria-labelledby="clients-heading">
                <motion.h2
                    id="clients-heading"
                    className={styles.sectionHeading}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? noMotion : { duration: 0.8, ease: easeOut }}
                >
                    CLIENTS &amp; COLLABORATORS
                </motion.h2>

                <div className={styles.clientGrid}>
                    {formerClients.map((client) => (
                        <a
                            key={client.name}
                            className={styles.clientCard}
                            href={client.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${client.name}, ${client.relationship}; opens in a new tab`}
                        >
                            <span className={styles.clientName}>{client.name}</span>
                            <span className={styles.clientRelationship}>{client.relationship}</span>
                        </a>
                    ))}
                </div>
            </section>

            <section className={styles.partnershipsSection} aria-labelledby="partnerships-heading">
                <motion.h2
                    id="partnerships-heading"
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
                    {partners.map((partner) => (
                        <motion.a
                            key={partner.name}
                            className={styles.partnerGridItem}
                            href={partner.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${partner.name}`}
                            variants={
                                prefersReducedMotion
                                    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
                                    : {
                                          hidden: { opacity: 0, y: 20 },
                                          visible: {
                                              opacity: 1,
                                              y: 0,
                                              transition: { duration: 0.5, ease: easeOut },
                                          },
                                      }
                            }
                        >
                            {partner.logo ? (
                                <div className={styles.partnerLogoBox}>
                                    <Image
                                        src={partner.logo}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 140px, 250px"
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                            ) : (
                                <div className={styles.partnerLogoBox}>
                                    <span className={styles.partnerPlaceholderText}>{partner.name}</span>
                                </div>
                            )}
                            <span className={styles.partnerLabel}>{partner.name}</span>
                        </motion.a>
                    ))}
                </motion.div>
            </section>

            <section className={styles.inquirySection} aria-label="Project inquiry">
                <p>Have a project in mind?</p>
                <Link className={styles.inquiryLink} href="/contact">
                    Start a conversation
                </Link>
            </section>
        </main>
    );
}
