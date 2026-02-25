export interface Project {
    title: string;
    year: string;
    slug: string;
    youtubeId: string;
    description: string;
}

export const projects: Project[] = [
    {
        title: "The Way We Carry Water",
        year: "2025",
        slug: "the-way-we-carry-water",
        youtubeId: "ruBcMlhNMJQ",
        description: "Filmed across the seasons in Northern New Mexico, it explores grief, tradition, and the interconnection between people and the land. The project is supported by the Santa Fe International Film Festival, Los Luceros Historic Site, the Northern Rio Grande National Heritage Area, and Hands Across Cultures.",
    },
    {
        title: "Nick - A Comedy Short Film",
        year: "2023",
        slug: "nick",
        youtubeId: "JfFkKItuwLE",
        description: "A comedic exploration of life, friendship, and the absurdity of everyday situations.",
    },
    {
        title: "Filming in New Mexico",
        year: "2024",
        slug: "filming-in-new-mexico",
        youtubeId: "foS2B5aOQ74",
        description: "A behind-the-scenes look at the thriving film industry in New Mexico, showcasing the landscapes and the people who make the magic happen.",
    }
];
