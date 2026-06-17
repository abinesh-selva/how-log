export interface HistoricalEvent {
  slug: string
  name: string
  date: string // ISO date string YYYY-MM-DD
  category: "Space" | "Technology" | "History" | "Culture" | "Science"
  description: string
  significance: string
  wikipediaUrl?: string
}

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    slug: "apollo-11-moon-landing",
    name: "Apollo 11 Moon Landing",
    date: "1969-07-20",
    category: "Space",
    description: "American astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the moon.",
    significance: "Marked the culmination of the Space Race and remains one of humanity's greatest technological achievements.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Apollo_11",
  },
  {
    slug: "fall-of-the-berlin-wall",
    name: "Fall of the Berlin Wall",
    date: "1989-11-09",
    category: "History",
    description: "The Berlin Wall was opened, allowing East Germans to travel freely to West Germany.",
    significance: "Symbolized the end of the Cold War and paved the way for German reunification.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Fall_of_the_Berlin_Wall",
  },
  {
    slug: "first-iphone-release",
    name: "Release of the first iPhone",
    date: "2007-06-29",
    category: "Technology",
    description: "Apple released the first-generation iPhone to the public in the United States.",
    significance: "Revolutionized the smartphone industry and changed how people communicate and access information globally.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/IPhone_(1st_generation)",
  },
  {
    slug: "world-war-2-ends",
    name: "End of World War II",
    date: "1945-09-02",
    category: "History",
    description: "Formal surrender documents were signed aboard the USS Missouri, officially ending World War II.",
    significance: "Ended the deadliest conflict in human history and reshaped the global geopolitical landscape.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/End_of_World_War_II_in_Asia",
  },
  {
    slug: "discovery-of-penicillin",
    name: "Discovery of Penicillin",
    date: "1928-09-28",
    category: "Science",
    description: "Scottish scientist Alexander Fleming discovered penicillin, the world's first broadly effective antibiotic.",
    significance: "Transformed modern medicine and saved millions of lives by effectively treating bacterial infections.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Discovery_of_penicillin",
  },
  {
    slug: "titanic-sinks",
    name: "Sinking of the RMS Titanic",
    date: "1912-04-15",
    category: "History",
    description: "The RMS Titanic sank in the North Atlantic Ocean after striking an iceberg during her maiden voyage.",
    significance: "Led to major improvements in maritime safety regulations and remains one of the most famous shipwrecks in history.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Sinking_of_the_Titanic",
  },
  {
    slug: "first-flight-wright-brothers",
    name: "First Flight by the Wright Brothers",
    date: "1903-12-17",
    category: "Technology",
    description: "Orville and Wilbur Wright made the first successful flight of a powered, controlled, heavier-than-air airplane.",
    significance: "Began the era of aviation, eventually shrinking global travel times dramatically.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Wright_brothers",
  },
  {
    slug: "launch-of-world-wide-web",
    name: "Launch of the World Wide Web",
    date: "1991-08-06",
    category: "Technology",
    description: "Tim Berners-Lee published the first-ever website, introducing the World Wide Web to the public.",
    significance: "Fundamentally changed global communication, commerce, and access to information.",
  },
  {
    slug: "bitcoin-genesis-block",
    name: "Bitcoin Genesis Block Mined",
    date: "2009-01-03",
    category: "Technology",
    description: "Satoshi Nakamoto mined the first block of the Bitcoin blockchain, known as the Genesis Block.",
    significance: "Launched the first decentralized cryptocurrency, sparking the modern crypto and blockchain industry.",
  },
  {
    slug: "chatgpt-release",
    name: "Release of ChatGPT",
    date: "2022-11-30",
    category: "Technology",
    description: "OpenAI launched ChatGPT, an advanced conversational AI model, to the general public.",
    significance: "Ignited a massive global boom in artificial intelligence adoption and public awareness.",
  },
  {
    slug: "human-genome-project-completed",
    name: "Human Genome Project Completed",
    date: "2003-04-14",
    category: "Science",
    description: "Scientists successfully mapped and sequenced the entire human genome.",
    significance: "Revolutionized genetics and modern medicine by providing a blueprint of human DNA.",
  },
  {
    slug: "chernobyl-disaster",
    name: "Chernobyl Nuclear Disaster",
    date: "1986-04-26",
    category: "History",
    description: "Reactor No. 4 at the Chernobyl Nuclear Power Plant in Ukraine exploded.",
    significance: "The worst nuclear disaster in history, heavily influencing global nuclear energy policies.",
  },
  {
    slug: "first-youtube-video",
    name: "First YouTube Video Uploaded",
    date: "2005-04-23",
    category: "Culture",
    description: "Jawed Karim uploaded 'Me at the zoo', the very first video on YouTube.",
    significance: "Marked the beginning of the world's most popular video-sharing platform and the rise of user-generated content.",
  },
  {
    slug: "discovery-of-dna-structure",
    name: "Discovery of DNA Structure",
    date: "1953-02-28",
    category: "Science",
    description: "James Watson and Francis Crick discovered the double-helix structure of DNA.",
    significance: "A fundamental breakthrough that unlocked the molecular basis of genetics and biology.",
  }
]

export function getEventBySlug(slug: string): HistoricalEvent | undefined {
  return HISTORICAL_EVENTS.find((e) => e.slug === slug)
}
