"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const menuItems = ["Work", "Services", "Process", "About", "Contact"];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile((prevIsMobile) => {
                if (prevIsMobile !== mobile) {
                    setIsOpen(!mobile);
                }
                return mobile;
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isOpen && isMobile && mobileMenuRef.current) {
            const firstLink = mobileMenuRef.current.querySelector<HTMLAnchorElement>("a");
            if (firstLink) {
                firstLink.focus();
            }
        }

        if (!isOpen && isMobile && hamburgerRef.current) {
            hamburgerRef.current.focus();
        }
    }, [isOpen, isMobile]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = useCallback(() => setIsOpen(false), []);
    const menuOpen = isOpen;

    const handleMobileKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            closeMenu();
            return;
        }

        if (e.key === "Tab" && mobileMenuRef.current) {
            const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            );
            const firstEl = focusableElements[0];
            const lastEl = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    }, [closeMenu]);

    const noMotion = { duration: 0 };
    const navTransition = prefersReducedMotion
        ? noMotion
        : { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

    return (
        <motion.nav
            className={styles.navbar}
            initial={{ y: -100, opacity: 0, background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)" }}
            animate={{
                y: 0,
                opacity: 1,
                background: isOpen && isMobile
                    ? "rgba(0, 0, 0, 1)"
                    : "linear-gradient(to bottom, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0) 100%)",
            }}
            transition={navTransition}
        >
            <a href="#main-content" className={styles.skipLink}>
                Skip to content
            </a>

            <div className={styles.logo}>
                <Link href="/" onClick={closeMenu}>
                    <Image
                        src="/logo-full.png"
                        alt="Chile Line Media Logo"
                        width={150}
                        height={150}
                        sizes="(max-width: 768px) 100px, 150px"
                        priority
                        className={styles.logoImage}
                    />
                </Link>
            </div>

            <div className={styles.navRight}>
                {!isMobile && menuOpen && (
                    <>
                        <motion.div
                            className={styles.trainLocomotive}
                            initial={{ x: 140, opacity: 0, scale: 0.9 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={prefersReducedMotion ? noMotion : {
                                delay: 0,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <Link href="/" onClick={closeMenu}>
                                <Image
                                    src="/train.png"
                                    alt="Train Locomotive"
                                    width={160}
                                    height={40}
                                    sizes="160px"
                                    className={styles.locomotiveImage}
                                />
                            </Link>
                        </motion.div>
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item}
                                className={styles.trainCar}
                                initial={{ x: 140, opacity: 0, scale: 0.9 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                transition={prefersReducedMotion ? noMotion : {
                                    delay: (index + 1) * 0.12,
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
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
                    </>
                )}

                <button
                    ref={hamburgerRef}
                    className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        ref={mobileMenuRef}
                        key="mobile-menu"
                        className={styles.mobileMenuOverlay}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0, transition: prefersReducedMotion ? noMotion : { duration: 0.3 } }}
                        transition={prefersReducedMotion ? noMotion : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        onKeyDown={handleMobileKeyDown}
                    >
                        <div className={styles.mobileMenuContent}>
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={`mobile-${item}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20, transition: prefersReducedMotion ? noMotion : { duration: 0.2 } }}
                                    transition={prefersReducedMotion ? noMotion : { delay: index * 0.1, duration: 0.4 }}
                                >
                                    <Link
                                        href={`/${item.toLowerCase()}`}
                                        className={styles.mobileMenuLink}
                                        onClick={closeMenu}
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
