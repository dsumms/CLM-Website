export function getProjectImageSources(imageSrc?: string, youtubeId?: string): string[] {
    const sources = imageSrc ? [imageSrc] : [];

    if (youtubeId) {
        sources.push(
            `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
            `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`,
            `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
            `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
        );
    }

    return sources;
}
