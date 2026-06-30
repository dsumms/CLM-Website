import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

const pagePath = "/events/young-washington-red-carpet-screening";
const eventImage = "/events/young-washington-clm-sponsor-instagram.jpg";

export const metadata = createPageMetadata({
  title: "Young Washington Red Carpet Screening Sponsorship",
  description:
    "Chile Line Media is the Presenting Sponsor of Native Guitars Tour's Young Washington red carpet screening in Albuquerque on July 3, 2026.",
  path: pagePath,
  image: eventImage,
});

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Young Washington Red Carpet Screening",
  description:
    "Native Guitars Tour presents a red carpet screening of Young Washington in Albuquerque, with Chile Line Media as Presenting Sponsor.",
  startDate: "2026-07-03T18:00:00-06:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  image: absoluteUrl(eventImage),
  url: absoluteUrl(pagePath),
  location: {
    "@type": "Place",
    name: "Flix Brewhouse ABQ - Coors",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Albuquerque",
      addressRegion: "NM",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Native Guitars Tour",
    url: "https://www.nativeguitarstour.com/events/film",
  },
  sponsor: {
    "@type": "Organization",
    name: "Chile Line Media",
    url: "https://chilelinemedia.com",
  },
};

export default function YoungWashingtonEventPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventJsonLd),
        }}
      />

      <article className={styles.article}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Presenting Sponsor</p>
          <h1>Young Washington Red Carpet Screening in Albuquerque</h1>
          <p className={styles.lead}>
            Chile Line Media is proud to support Native Guitars Tour&apos;s red carpet screening of <em>Young Washington</em>, an Albuquerque event honoring Native representation on screen and the next generation of Indigenous storytellers.
          </p>
        </header>

        <section className={styles.eventGrid} aria-label="Young Washington screening details">
          <div className={styles.posterWrap}>
            <Image
              src={eventImage}
              alt="Young Washington red carpet screening presenting sponsor announcement for Chile Line Media"
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
              className={styles.poster}
              priority
            />
          </div>

          <div className={styles.details}>
            <dl>
              <div>
                <dt>Date</dt>
                <dd>Friday, July 3, 2026</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>6:00 PM screening, 5:30 PM red carpet reception</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Flix Brewhouse ABQ - Coors, Albuquerque, New Mexico</dd>
              </div>
              <div>
                <dt>Presented by</dt>
                <dd>Native Guitars Tour Film Storytellers</dd>
              </div>
            </dl>

            <div className={styles.actions}>
              <a href="https://www.nativeguitarstour.com/events/film" target="_blank" rel="noopener noreferrer">
                Native Guitars Tour event details
              </a>
              <a href="https://www.instagram.com/p/DaD2ss9Dzz9/?hl=en&img_index=1" target="_blank" rel="noopener noreferrer">
                Original announcement
              </a>
            </div>
          </div>
        </section>

        <section className={styles.bodyCopy}>
          <h2>Why We&apos;re Sponsoring</h2>
          <p>
            Chile Line Media is an independent film and storytelling company based in New Mexico. Sponsoring this screening is part of our commitment to regional film culture, Indigenous artists, authentic storytelling, and community spaces where Native actors, filmmakers, musicians, designers, and storytellers are celebrated.
          </p>
          <p>
            The evening brings together film, music, fashion, and community around <em>Young Washington</em>, featuring Ryan Begay as Tanacharison. For us, supporting the event means investing in the kind of representation and creative opportunity that can inspire future storytellers across New Mexico and the Southwest.
          </p>
          <p>
            We&apos;re grateful to Native Guitars Tour for building this space and proud to stand alongside the artists and community members gathering in Albuquerque for the screening.
          </p>
        </section>

        <footer className={styles.footerLinks}>
          <Link href="/work">See our film and commercial work</Link>
          <Link href="/about">Learn about Chile Line Media</Link>
          <Link href="/contact">Start a project</Link>
        </footer>
      </article>
    </main>
  );
}
