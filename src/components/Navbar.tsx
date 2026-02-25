"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

const menuItems = ['Work', 'About', 'Contact'];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <motion.nav
            className={styles.navbar}
            initial={{ y: -100, opacity: 0, background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)" }}
            animate={{
                y: 0,
                opacity: 1,
                background: isOpen
                    ? "linear-gradient(to bottom, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0.75) 75%, rgba(0, 0, 0, 0) 100%)"
                    : "linear-gradient(to bottom, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0) 100%)"
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.logo}>
                <Link href="/" onClick={closeMenu}>
                    <Image
                        src="/logo-full.png"
                        alt="Chile Line Media Logo"
                        width={150}
                        height={150}
                        priority
                        className={styles.logoImage}
                    />
                </Link>
            </div>

            <div className={styles.navRight}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="train-locomotive"
                            className={styles.trainLocomotive}
                            initial={{ x: 140, opacity: 0, scale: 0.9 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{
                                x: 100,
                                opacity: 0,
                                scale: 0.9,
                                transition: {
                                    delay: menuItems.length * 0.08,
                                    duration: 0.4,
                                    ease: [0.76, 0, 0.24, 1]
                                }
                            }}
                            transition={{
                                delay: 0,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/train.png" alt="Train Locomotive" className={styles.locomotiveImage} />
                        </motion.div>
                    )}
                    {isOpen && menuItems.map((item, index) => (
                        <motion.div
                            key={item}
                            className={styles.trainCar}
                            initial={{ x: 140, opacity: 0, scale: 0.9 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{
                                x: 100,
                                opacity: 0,
                                scale: 0.9,
                                transition: {
                                    delay: (menuItems.length - 1 - index) * 0.08,
                                    duration: 0.4,
                                    ease: [0.76, 0, 0.24, 1]
                                }
                            }}
                            transition={{
                                delay: (index + 1) * 0.12,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <Link
                                href={`/${item.toLowerCase()}`}
                                className={styles.menuLink}
                                onClick={closeMenu}
                            >
                                {item}
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <button
                    className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </button>
            </div>
        </motion.nav>
    );
}
