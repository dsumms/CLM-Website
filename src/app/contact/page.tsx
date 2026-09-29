"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState, type FormEvent } from "react";
import {
    INQUIRY_EMAIL,
    budgetRanges,
    inquiryBody,
    inquiryDraftUrl,
    projectTypes,
    validateInquiry,
} from "@/lib/inquiry";

const easeOut = [0.16, 1, 0.3, 1] as const;

const services = [
    {
        title: "Narrative Films",
        description:
            "Original films shaped around character and story, developed with a collaborative crew from concept through post.",
    },
    {
        title: "Brand Storytelling",
        description:
            "Commissioned films for organizations, institutions, and businesses, built around each project's message and audience.",
    },
    {
        title: "Documentary",
        description:
            "Nonfiction films developed with care for the people and subjects at their center.",
    },
    {
        title: "Campaign & Digital Content",
        description:
            "Social cuts, promotional spots, event recaps, and digital-first content. Short-form work with the same visual standard and sense of story.",
    },
];

export default function Contact() {
    const prefersReducedMotion = useReducedMotion();
    const noMotion = { duration: 0 };
    const [deliveryMode, setDeliveryMode] = useState<"checking" | "direct" | "draft">("checking");
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ message: string; error: boolean } | null>(null);
    const [draftHref, setDraftHref] = useState<string | null>(null);
    const [draftText, setDraftText] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 4000);
        fetch("/api/inquiry", { cache: "no-store", signal: controller.signal })
            .then((response) => response.ok ? response.json() : null)
            .then((result: unknown) => {
                if (active) setDeliveryMode(
                    result && typeof result === "object" && "mode" in result && result.mode === "direct"
                        ? "direct"
                        : "draft",
                );
            })
            .catch(() => { if (active) setDeliveryMode("draft"); })
            .finally(() => window.clearTimeout(timeout));
        return () => {
            active = false;
            controller.abort();
            window.clearTimeout(timeout);
        };
    }, []);

    async function submitInquiry(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submitting || deliveryMode === "checking") return;

        const form = event.currentTarget;
        const fields = Object.fromEntries(new FormData(form));
        const validation = validateInquiry(fields);
        setDraftHref(null);
        setDraftText(null);
        if (!validation.ok) {
            setFeedback({ message: validation.error, error: true });
            return;
        }

        const draft = inquiryDraftUrl(validation.inquiry);
        const draftBody = inquiryBody(validation.inquiry);
        if (deliveryMode === "draft") {
            setDraftHref(draft);
            setDraftText(draftBody);
            setFeedback({
                message: `Your inquiry has not been sent. Open the email draft and press Send in your email app to reach ${INQUIRY_EMAIL}.`,
                error: false,
            });
            return;
        }

        setSubmitting(true);
        setFeedback({ message: "Sending your inquiry…", error: false });
        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fields),
                signal: AbortSignal.timeout(15_000),
            });
            if (response.ok) {
                form.reset();
                setFeedback({ message: "Your inquiry was accepted for delivery. We'll reply by email.", error: false });
            } else if (response.status === 400) {
                const result: unknown = await response.json();
                setFeedback({
                    message: result && typeof result === "object" && "error" in result && typeof result.error === "string"
                        ? result.error
                        : "Please check your inquiry and try again.",
                    error: true,
                });
            } else {
                setDraftHref(draft);
                setDraftText(draftBody);
                setDeliveryMode("draft");
                setFeedback({
                    message: `Your inquiry was not confirmed as sent. Open the email draft and press Send in your email app to reach ${INQUIRY_EMAIL}.`,
                    error: true,
                });
            }
        } catch {
            setDraftHref(draft);
            setDraftText(draftBody);
            setDeliveryMode("draft");
            setFeedback({
                message: `Your inquiry was not confirmed as sent. Open the email draft and press Send in your email app to reach ${INQUIRY_EMAIL}.`,
                error: true,
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className={styles.main} id="main-content">
            <Navbar />

            <div className={styles.contentContainer}>
                <div className={styles.backgroundGlow}></div>

                <div className={styles.content}>
                    {/* ── Hero / CTA ── */}
                    <motion.div
                        className={styles.heroSection}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? noMotion : { duration: 1, ease: easeOut }}
                    >
                        <h1 className={styles.ctaHeadline}>
                            Let&apos;s Build Something Remarkable
                        </h1>
                        <p className={styles.ctaSubline}>
                            Every great project starts with a conversation. Tell us about your
                            vision and we&apos;ll bring it to life.
                        </p>
                    </motion.div>

                    {/* ── Lead Capture Form (hero slot) ── */}
                    <motion.form
                        className={styles.form}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? noMotion : { duration: 1, delay: 0.15, ease: easeOut }}
                        onSubmit={submitInquiry}
                        onChange={() => {
                            setDraftHref(null);
                            setDraftText(null);
                            setFeedback(null);
                        }}
                    >
                        {deliveryMode === "draft" && (
                            <p className={styles.formNotice}>
                                Complete the form to prepare an email to {INQUIRY_EMAIL}. Review and send it in your email app.
                            </p>
                        )}
                        <div className={styles.formRow}>
                            <div className={styles.fieldGroup}>
                                <label htmlFor="name" className={styles.label}>
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className={styles.input}
                                    placeholder="Your name"
                                    minLength={2}
                                    maxLength={120}
                                    autoComplete="name"
                                    disabled={submitting}
                                    required
                                />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={styles.input}
                                    placeholder="you@company.com"
                                    maxLength={254}
                                    autoComplete="email"
                                    disabled={submitting}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.fieldGroup}>
                                <label htmlFor="projectType" className={styles.label}>
                                    Project Type
                                </label>
                                <select
                                    id="projectType"
                                    name="projectType"
                                    className={styles.select}
                                    defaultValue=""
                                    disabled={submitting}
                                    required
                                >
                                    <option value="" disabled>
                                        Select a project type
                                    </option>
                                    {projectTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label htmlFor="budget" className={styles.label}>
                                    Budget Range
                                </label>
                                <select
                                    id="budget"
                                    name="budget"
                                    className={styles.select}
                                    defaultValue=""
                                    disabled={submitting}
                                    required
                                >
                                    <option value="" disabled>
                                        Select a range
                                    </option>
                                    {budgetRanges.map((range) => (
                                        <option key={range} value={range}>
                                            {range}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="message" className={styles.label}>
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className={styles.textarea}
                                placeholder="Tell us about your project…"
                                rows={5}
                                minLength={10}
                                maxLength={5000}
                                disabled={submitting}
                                required
                            />
                        </div>

                        <div className={styles.honeypot} aria-hidden="true">
                            <label htmlFor="website">Leave this field blank</label>
                            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" disabled={submitting} />
                        </div>

                        <motion.button
                            type="submit"
                            className={styles.submitButton}
                            disabled={deliveryMode === "checking" || submitting}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                        >
                            {submitting ? "Sending…" : deliveryMode === "checking" ? "Preparing…" : deliveryMode === "draft" ? "Prepare Email Draft" : "Send Inquiry"}
                        </motion.button>
                        {feedback && (
                            <p className={feedback.error ? styles.formError : styles.formFeedback} role={feedback.error ? "alert" : "status"}>
                                {feedback.message}
                            </p>
                        )}
                        {draftHref && (
                            <a className={styles.draftLink} href={draftHref}>
                                Open email draft
                            </a>
                        )}
                        {draftText && (
                            <details className={styles.draftDetails}>
                                <summary>If your email app does not open, copy the inquiry text</summary>
                                <p>Email {INQUIRY_EMAIL} and paste this text:</p>
                                <textarea readOnly value={draftText} rows={8} onFocus={(event) => event.currentTarget.select()} />
                            </details>
                        )}
                    </motion.form>

                    {/* ── Services Section ── */}
                    <motion.div
                        className={styles.servicesSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={prefersReducedMotion ? noMotion : { duration: 1, delay: 0.35, ease: easeOut }}
                    >
                        <h2 className={styles.servicesTitle}>Our Services</h2>
                        <div className={styles.servicesGrid}>
                            {services.map((service, i) => (
                                <motion.div
                                    key={service.title}
                                    className={styles.serviceCard}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={
                                        prefersReducedMotion
                                            ? noMotion
                                            : {
                                                duration: 0.6,
                                                delay: 0.45 + i * 0.1,
                                                ease: easeOut,
                                            }
                                    }
                                    whileHover={prefersReducedMotion ? {} : { y: -4 }}
                                >
                                    <div className={styles.serviceIconPlaceholder} />
                                    <h3 className={styles.serviceName}>
                                        {service.title}
                                    </h3>
                                    <p className={styles.serviceDescription}>
                                        {service.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Social Links ── */}
                    <motion.div
                        className={styles.socialGrid}
                        initial="hidden"
                        animate="visible"
                        variants={
                            prefersReducedMotion
                                ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                                : {
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                            delayChildren: 0.65,
                                        },
                                    },
                                }
                        }
                    >
                        <motion.a
                            href="https://www.youtube.com/@ChileLineMedia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            aria-label="Chile Line Media on YouTube"
                            variants={
                                prefersReducedMotion
                                    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
                                    : {
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, ease: easeOut },
                                        },
                                    }
                            }
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        >
                            <span>YouTube</span>
                        </motion.a>
                        <motion.a
                            href="https://www.instagram.com/chilelinemedia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            aria-label="Chile Line Media on Instagram"
                            variants={
                                prefersReducedMotion
                                    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
                                    : {
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, ease: easeOut },
                                        },
                                    }
                            }
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        >
                            <span>Instagram</span>
                        </motion.a>
                        <motion.a
                            href="https://www.tiktok.com/@chilelinemedia?lang=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            aria-label="Chile Line Media on TikTok"
                            variants={
                                prefersReducedMotion
                                    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
                                    : {
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, ease: easeOut },
                                        },
                                    }
                            }
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        >
                            <span>TikTok</span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
