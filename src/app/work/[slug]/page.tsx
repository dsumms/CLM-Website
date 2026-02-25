import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import Link from "next/link";
import { projects } from "@/data/projects";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectDetail({ params }: PageProps) {
    const { slug } = await params;

    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return (
            <main className={styles.main}>
                <Navbar />
                <div style={{ padding: "120px 20px", textAlign: "center" }}>
                    <h1>Project Not Found</h1>
                    <Link href="/work" style={{ color: "#fff", textDecoration: "underline" }}>Return to Work</Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.hero}>
                <div className={styles.heroBackground} style={{ backgroundImage: `url(https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg)` }}></div>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <Link href="/work" className={styles.backLink}>← BACK TO WORK</Link>
                    <h1 className={styles.title}>{project.title}</h1>
                </div>
            </div>

            <section className={styles.content}>
                <div className={styles.videoPlaceholder}>
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${project.youtubeId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.description}>
                        <h2>ABOUT THE PROJECT</h2>
                        <p>{project.description}</p>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>© 2025 Chile Line Media. All rights reserved.</p>
            </footer>
        </main>
    );
}
