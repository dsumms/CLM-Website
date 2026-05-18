import { Metadata, ResolvingMetadata } from "next";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import Link from "next/link";
import { projects } from "@/data/projects";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: project.title,
        description: project.description.substring(0, 160) + (project.description.length > 160 ? "..." : ""),
        openGraph: {
            title: project.title,
            description: project.description.substring(0, 160) + (project.description.length > 160 ? "..." : ""),
            images: [
                `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`,
                ...previousImages,
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description.substring(0, 160) + (project.description.length > 160 ? "..." : ""),
            images: [`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`],
        },
    };
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "VideoObject",
                        "name": project.title,
                        "description": project.description,
                        "thumbnailUrl": [
                            `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`
                        ],
                        "datePublished": project.year,
                        "embedUrl": `https://www.youtube.com/embed/${project.youtubeId}`
                    })
                }}
            />
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
                {project.youtubeId && (
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
                )}

                <div className={styles.infoGrid}>
                    <div className={styles.description}>
                        <h2>ABOUT THE PROJECT</h2>
                        {project.description.split("\n\n").map((paragraph, i) => (
                            <p key={i} style={i > 0 ? { marginTop: "1.5rem" } : undefined}>
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {project.awards && project.awards.length > 0 && (
                        <div className={styles.awards}>
                            <h2>AWARDS</h2>
                            <ul>
                                {project.awards.map((award) => (
                                    <li key={award}>{award}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Chile Line Media. All rights reserved.</p>
            </footer>
        </main>
    );
}
