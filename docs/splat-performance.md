# Gaussian splat hero performance

The homepage uses the calibrated `hero-image-gigapixel.spz` splat (15,653,962 bytes, 14.93 MiB) with `hero-image.jpg` (1,185,262 bytes, 1.13 MiB) as its loading and failure image. The camera pose, pointer motion, render resolution cap, and appearance are unchanged.

The canvas now runs frames only while the hero intersects the viewport and the document is visible. It stays mounted while paused, so the loaded splat and last rendered frame remain available when a visitor returns. Its first visible load still fades from the static image; subsequent pauses do not restart that fade. The hero root exposes `data-splat-rendering="active"`, `"paused"`, or `"fallback"` for browser checks. Spark update promise rejections and WebGL context loss trigger the existing static fallback. The observer and event listeners are removed on unmount.

This change eliminates continuous frame updates while the hero is offscreen or the tab is hidden. It does not reduce the 14.93 MiB splat download or release its GPU memory. No frame-time, battery, or load-time improvement has been measured yet.

## Level of detail decision

The installed Spark 2.1 API accepts `lod: true` on `SplatMesh`. Spark's [LoD guide](https://sparkjs.dev/docs/lod-getting-started/) says this builds a tree in a background worker *after* loading the original file, then renders a platform-dependent splat budget. That can reduce rendering work, but it does not make the current SPZ download progressive and may change the hero's detail. We have left it off until the image can be compared at the existing camera pose and through the full pointer range.

Spark recommends a prebuilt `.rad` LoD asset with `paged: true` for streaming. Its [guide](https://sparkjs.dev/docs/lod-getting-started/) documents the build tool, the `--quality` and `--rad-chunked` options, and the required Rust toolchain. A future controlled comparison can generate that asset from the existing source, then compare cold-cache bytes and time to the first live frame, steady frame time, GPU memory, and visible blur or holes against the current SPZ at desktop widths. Ship an LoD asset only if those measurements improve without losing the calibrated look.

The current canvas already disables WebGL antialiasing and caps device pixel ratio at 1.25, consistent with Spark's [performance guidance](https://sparkjs.dev/docs/performance/). Further renderer quality settings should also be validated side by side before changing them.
