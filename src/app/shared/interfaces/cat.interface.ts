export interface Cat {
    id: string;
    name: string;
    imageUrl: string;
    breeds: Breed[];
}

export interface Breed {
    adaptability: number;
    child_friendly: number;
    affection_level: number;
    grooming: number;
    name: string;
    description: string;
    temperament: string;
    origin: string;
    wikipedia_url: string;
}