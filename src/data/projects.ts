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
];