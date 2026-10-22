export interface Project {
    title: string;
    year: string;
    slug: string;
    youtubeId?: string;
    videoSrc?: string;
    captionsSrc?: string;
    publishedAt?: string;
    imageSrc?: string;
    description: string;
    category: "narrative" | "commercial";
    awards?: string[];
}

export const movingArtsProject = {
    title: "Moving Arts Española",
    year: "2026",
    slug: "moving-arts-espanola",
    videoSrc: "/media/clm-showreel-v07.mp4",
    captionsSrc: "/media/clm-showreel.vtt",
    imageSrc: "/media/clm-showreel-poster.jpg",
    publishedAt: "2026-10-22",
    category: "commercial",
    description:
        "A short showcase of our work with Moving Arts Española, featuring interviews and moments from its arts programs.",
} satisfies Project;

export const projects: Project[] = [
    movingArtsProject,
    {
        title: "The Way We Carry Water",
        year: "2025",
        slug: "the-way-we-carry-water",
        youtubeId: "ZPXvh91ShMc",
        category: "narrative",
        description:
            "Set in the rural landscapes of northern New Mexico, The Way We Carry Water follows Marcos, a young man struggling with the sudden loss of his grandfather, Iván. As he works through his grief, Marcos must take on the responsibility of preserving his family's acequia, an ancient irrigation system that not only sustains the land, but also holds generations of cultural memory.\n\nFilmed across the four seasons, the story mirrors the cycles of nature, grief and healing, death and rebirth, and offers a poetic reflection on legacy, resilience, and the bond between people and place. With stunning cinematography and a quiet, immersive narrative, The Way We Carry Water is a deeply personal exploration of what it means to carry forward tradition in a changing world.",
        awards: [
            "Best Local Short — Las Cruces International Film Festival, 2026",
            "Audience Choice Award — Las Cruces International Film Festival, 2026",
        ],
    },
    {
        title: "Nick",
        year: "2023",
        slug: "nick",
        youtubeId: "JfFkKItuwLE",
        category: "narrative",
        description:
            "A comedic exploration of life, friendship, and the absurdity of everyday situations.",
    },
    {
        title: "The Rural Film Project",
        year: "2022",
        slug: "the-rural-film-project",
        youtubeId: "foS2B5aOQ74",
        category: "commercial",
        description:
            "A world of locations in one state. Completed in the summer of 2022, this was the first project produced by Chile Line Media. In partnership with the New Mexico Film Office, the goal of this short film was to showcase New Mexico as a world of locations in one state. Furthermore, to honor all creators past, present, and future and represent New Mexico as a premier place of the arts.",
    },
];
