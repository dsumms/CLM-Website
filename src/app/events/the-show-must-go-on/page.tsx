import Image from "next/image";
import Navbar from "@/components/Navbar";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

const pagePath = "/events/the-show-must-go-on";
const ticketsUrl = "https://tickets.holdmyticket.com/tickets/467199";
const eventImage = "/events/the-show-must-go-on-flyer.webp";

export const metadata = createPageMetadata({
  title: "The Show Must Go On! Film Community Soirée in Santa Fe",
  description:
    "Join Chile Line Media's launch and film community soirée at The Marigold Room in Santa Fe on October 23, 2026. Get event details and tickets.",
  path: pagePath,
  image: eventImage,
});

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "The Show Must Go On! A Film Community Soirée",
  description:
    "Chile Line Media's official launch brings New Mexico filmmakers, artists, creatives, friends, and film lovers together for a film community soirée in Santa Fe.",
  startDate: "2026-10-23T19:30:00-06:00",
  doorTime: "2026-10-23T19:00:00-06:00",
  endDate: "2026-10-23T23:00:00-06:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  image: absoluteUrl(eventImage),
  url: absoluteUrl(pagePath),
  sameAs: ticketsUrl,
  location: {
    "@type": "Place",
    name: "The Marigold Room at Hotel Glorieta",
    address: {
      "@type": "PostalAddress",
      streetAddress: "750 N St Francis Dr",
      addressLocality: "Santa Fe",
      addressRegion: "NM",
      postalCode: "87501",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Chile Line Media",
    url: "https://www.chilelinemedia.com",
  },
};

export default function TheShowMustGoOnPage() {
  return (
    <main className={styles.main} id="main-content">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <article>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Chile Line Media presents</p>
            <h1>The Show Must Go On!</h1>
            <p className={styles.subtitle}>A film community soirée</p>
            <p className={styles.lead}>
              Join Chile Line Media in Santa Fe for our official launch and a night
              celebrating New Mexico&apos;s film community.
            </p>
            <a
              className={styles.ticketButton}
              href={ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get tickets
            </a>
          </div>

          <figure className={styles.flyer}>
            <Image
              src={eventImage}
              alt="The Show Must Go On! film community soirée flyer with Chile Line Media logo and two raised glasses"
              width={618}
              height={800}
              sizes="(max-width: 800px) 100vw, 42vw"
              priority
            />
          </figure>
        </header>

        <section className={styles.detailsBand} aria-labelledby="event-details-heading">
          <div className={styles.detailsInner}>
            <h2 id="event-details-heading">The evening</h2>
            <dl className={styles.detailsList}>
              <div>
                <dt>Date</dt>
                <dd>Friday, October 23, 2026</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>Doors 7:00 PM; event 7:30-11:00 PM</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>
                  The Marigold Room at Hotel Glorieta<br />
                  750 N St Francis Dr, Santa Fe, NM 87501
                </dd>
              </div>
              <div>
                <dt>Dress &amp; admission</dt>
                <dd>Old Hollywood-inspired attire required. Ages 21+.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.story} aria-labelledby="story-heading">
          <h2 id="story-heading">A night for New Mexico film</h2>
          <div className={styles.storyCopy}>
            <p>
              We&apos;re bringing New Mexico&apos;s film community together for red-carpet
              arrivals, cocktails, food, and conversation. Come meet fellow creatives,
              enjoy professional red-carpet photography, and raise a glass to the stories
              and storytellers shaping what comes next.
            </p>
            <p>
              The 1940s-inspired evening is planned to include jazz, showgirl-style
              performances, dancing, and remarks from sponsors. Your ticket includes
              admission, food, one drink ticket, and the evening&apos;s performances.
            </p>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="tickets-heading">
          <div className={styles.closingInner}>
            <div>
              <h2 id="tickets-heading">Join us at The Marigold Room</h2>
              <p>Ticket options and current availability are on HoldMyTicket.</p>
            </div>
            <a
              className={styles.closingButton}
              href={ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get tickets
            </a>
          </div>
        </section>
      </article>
    </main>
  );
}
