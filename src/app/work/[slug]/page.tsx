import { Metadata, ResolvingMetadata } from "next";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import Link from "next/link";
import { projects } from "@/data/projects";
import { absoluteUrl, siteName, truncateDescription } from "@/lib/seo";

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

    const projectType = project.category === "narrative" ? "Short Film" : "Commercial";
    const seoTitle = `${project.title} — ${projectType}`;

    const previousImages = (await parent).openGraph?.images || [];
    const description = truncateDescription(project.description);
    const url = absoluteUrl(`/work/${project.slug}`);
    const image = `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`;

    return {
        title: seoTitle,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${seoTitle} | Chile Line Media`,
            description,
            url,
            siteName,
            type: "video.other",
            images: [
                image,
                ...previousImages,
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${seoTitle} | Chile Line Media`,
            description,
            images: [image],
        },
    };
}

export default async function ProjectDetail({ params }: PageProps) {
    const { slug } = await params;

    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return (
            <main className={styles.main} id="main-content">
                <Navbar />
                <div style={{ padding: "120px 20px", textAlign: "center" }}>
                    <h1>Project Not Found</h1>
                    <Link href="/work" style={{ color: "#fff", textDecoration: "underline" }}>Return to Work</Link>
                </div>
            </main>
        );
    }

    const isWaterFilm = project.slug === "the-way-we-carry-water";
    const recognitions = isWaterFilm
        ? [
            {
                label: "Emerging Cinematographer Awards — Honoree: Jannis Schelenz, The Way We Carry Water",
                year: "2026",
                href: "https://ecawards.net/honorees/2026/the-way-we-carry-water/",
            },
            {
                label: "TaosFF Favorite — Spirit of New Mexico, Narrative Short",
                year: "2026",
                href: "https://taosff.org/about/2026-highlights/",
            },
            {
                label: "Best Local Short — Las Cruces International Film Festival",
                year: "2026",
                href: "https://nmfilm.com/news/the-way-we-carry-water-continues-successful-festival-run",
            },
            {
                label: "Audience Choice Award — Las Cruces International Film Festival",
                year: "2026",
                href: "https://nmfilm.com/news/the-way-we-carry-water-continues-successful-festival-run",
            },
        ]
        : (project.awards ?? []).map((label) => ({ label }));

    const pressFeatures = isWaterFilm
        ? [
            {
                source: "Emerging Cinematographer Awards",
                title: "The Way We Carry Water — 2026 Honoree Profile",
                date: "2026",
                linkLabel: "View honoree profile",
                href: "https://ecawards.net/honorees/2026/the-way-we-carry-water/",
            },
            {
                source: "Taos News · Land, Water, People, Time",
                title: "Stories Worth Saving",
                date: "September 2026",
                linkLabel: "Read the article",
                href: "https://www.taosnews.com/magazines/land-water-people-time/stories-worth-saving/article_d0caf460-d3cc-557f-86b6-72ce80d9aa2e.html",
            },
            {
                source: "New Mexico Film Office",
                title: "‘The Way We Carry Water’ Continues Successful Festival Run",
                date: "May 20, 2026",
                linkLabel: "Read the feature",
                href: "https://nmfilm.com/news/the-way-we-carry-water-continues-successful-festival-run",
            },
        ]
        : [];

    const projectUrl = absoluteUrl(`/work/${project.slug}`);
    const thumbnailUrl = `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`;
    const videoJsonLd = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${project.title} — ${project.category === "narrative" ? "Short Film" : "Commercial"}`,
        description: project.description,
        thumbnailUrl: [thumbnailUrl],
        uploadDate: `${project.year}-01-01`,
        datePublished: project.year,
        contentUrl: `https://www.youtube.com/watch?v=${project.youtubeId}`,
        embedUrl: `https://www.youtube.com/embed/${project.youtubeId}`,
        url: projectUrl,
        creator: {
            "@type": "Organization",
            name: "Chile Line Media",
            url: absoluteUrl("/"),
        },
    };
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Work",
                item: absoluteUrl("/work"),
            },
            {
                "@type": "ListItem",
                position: 3,
                name: project.title,
                item: projectUrl,
            },
        ],
    };

    return (
        <main className={styles.main} id="main-content">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [videoJsonLd, breadcrumbJsonLd],
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
                    <div className={styles.videoSection}>
                        <div className={styles.videoPlaceholder}>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${project.youtubeId}`}
                                title={`${project.title} video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <a
                            className={styles.videoFallback}
                            href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Watch directly on YouTube ↗
                        </a>
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

                    {recognitions.length > 0 && (
                        <div className={styles.awards}>
                            <h2>{isWaterFilm ? "AWARDS & RECOGNITION" : "AWARDS"}</h2>
                            <ul>
                                {recognitions.map((recognition) => (
                                    <li key={recognition.label}>
                                        {"href" in recognition ? (
                                            <a href={recognition.href} target="_blank" rel="noopener noreferrer">
                                                {recognition.label}
                                            </a>
                                        ) : recognition.label}
                                        {"year" in recognition && `, ${recognition.year}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {pressFeatures.length > 0 && (
                    <section className={styles.press} aria-labelledby="press-heading">
                        <h2 id="press-heading">PRESS &amp; FEATURES</h2>
                        <div className={styles.pressGrid}>
                            {pressFeatures.map((feature) => (
                                <article className={styles.pressCard} key={feature.href}>
                                    <p className={styles.pressSource}>{feature.source}</p>
                                    <h3>{feature.title}</h3>
                                    <p className={styles.pressDate}>{feature.date}</p>
                                    <a href={feature.href} target="_blank" rel="noopener noreferrer">
                                        {feature.linkLabel} ↗
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </section>

            {/* More Work Link */}
            <section style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <Link href="/work" style={{ color: "#ff4500", textDecoration: "underline", fontSize: "1.1rem" }}>
                    ← Back to all work
                </Link>
            </section>
        </main>
    );
}
