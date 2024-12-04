type RickAndMortyAPIResponse = {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Character[];
  };
  
  type Character = {
    id: number; 
    name: string; 
    status: "Alive" | "Dead" | "unknown";
    species: string;
    type: string;
    gender: "Male" | "Female" | "Genderless" | "unknown";
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
  };
  
  type Location = {
    name: string;
    url: string;
  };

  export type { RickAndMortyAPIResponse, Character, Location };