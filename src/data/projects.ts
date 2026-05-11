export interface Project {
    title: string;
    year: string;
    slug: string;
    youtubeId: string;
    description: string;
    category: "narrative" | "commercial";
    awards?: string[];
}

export const projects: Project[] = [
    {
        title: "The Way We Carry Water",
        year: "2025",
        slug: "the-way-we-carry-water",
        youtubeId: "ruBcMlhNMJQ",
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
    {
        title: "Apaluma - Brand Video",
        year: "2026",
        slug: "the-apaluma-brand-video",
        youtubeId: "tnYdJrTh75U",
        category: "commercial",
        description:
            "Introducing Apaluma — a unified platform that centralizes government environmental data (air, water, waste, hazardous waste, energy) from agencies like the New Mexico Environment Department, making it accessible to regulators, decision-makers, and the public. The platform features Luma, an AI agent designed to help users find, connect, and understand information — even when they don't know exactly what they're looking for. From locating permits and checking compliance histories to surfacing relationships across data points that human staff might miss, Apaluma is transforming how government environmental data serves the people it's supposed to serve.",
    },
];
