"use client";

import { useRef, useState } from "react";
import styles from "./Showreel.module.css";

const reelSource = "/media/clm-showreel-v07.mp4";

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function playReel() {
    const video = videoRef.current;
    if (!video) return;

    setHasStarted(true);
    setHasError(false);
    try {
      await video.play();
      video.focus({ preventScroll: true });
    } catch {
      setHasError(true);
    }
  }

  return (
    <div
      id="showreel"
      className={styles.card}
    >
        <div className={styles.player}>
          <video
            ref={videoRef}
            className={styles.video}
            src={reelSource}
            poster="/media/clm-showreel-poster.jpg"
            width={1280}
            height={720}
            preload="none"
            playsInline
            controls={hasStarted}
            tabIndex={hasStarted ? 0 : -1}
            aria-label="Moving Arts Española showreel"
            aria-describedby="showreel-description"
            onError={() => setHasError(true)}
          >
            <track
              kind="captions"
              src="/media/clm-showreel.vtt"
              srcLang="en"
              label="English"
            />
            Your browser does not support embedded video. <a href={reelSource}>Watch the reel</a>.
          </video>
          {!hasStarted && (
            <button
              type="button"
              className={styles.playButton}
              onClick={playReel}
              aria-label="Play the 35-second Moving Arts Española showreel with sound"
            >
              <span className={styles.playIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4.5v15l12-7.5z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        <p id="showreel-description" className={styles.visuallyHidden}>
          A 35-second montage of interviews, painting, dance, and music, ending
          with the Moving Arts and Chile Line Media logos. Instrumental music;
          no spoken dialogue.
        </p>
        {hasError && (
          <p className={styles.error} role="status">
            The reel couldn’t play here. <a href={reelSource}>Open the video directly</a>.
          </p>
        )}
        <div className={styles.info}>
          <h3 className={styles.title}>Moving Arts Española</h3>
          <span className={styles.year}>2026</span>
        </div>
    </div>
  );
}
