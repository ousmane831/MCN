import maskRoyal from "@/assets/mask-royal.jpg";
import sculptureBronze from "@/assets/sculpture-bronze.jpg";
import textilePattern from "@/assets/textile-pattern.jpg";

export interface Artwork {
  id: string;
  image: string;
  category: string;
  period: string;
  hasAudio: boolean;
  hasAR: boolean;
  location: {
    floor: string;
    room: string;
    x: number; // Position on floor plan (0-100%)
    y: number; // Position on floor plan (0-100%)
  };
  translations: {
    fr: { title: string; description: string; history: string };
    en: { title: string; description: string; history: string };
    wo: { title: string; description: string; history: string };
  };
}

export const artworks: Artwork[] = [
  {
    id: "1",
    image: maskRoyal,
    category: "Masque",
    period: "XVIIe siècle",
    hasAudio: true,
    hasAR: true,
    location: {
      floor: "1",
      room: "Salle des Masques",
      x: 25,
      y: 30,
    },
    translations: {
      fr: {
        title: "Masque Royal Baoulé",
        description: "Ce masque royal représente la beauté idéale et la noblesse du peuple Baoulé. Ses traits fins et ses motifs géométriques témoignent d'une maîtrise artistique exceptionnelle.",
        history: "Les masques Baoulé étaient utilisés lors de cérémonies sacrées et de rituels royaux. Ils incarnent les ancêtres et les esprits protecteurs de la communauté.",
      },
      en: {
        title: "Baoulé Royal Mask",
        description: "This royal mask represents the ideal beauty and nobility of the Baoulé people. Its fine features and geometric patterns demonstrate exceptional artistic mastery.",
        history: "Baoulé masks were used during sacred ceremonies and royal rituals. They embody the ancestors and protective spirits of the community.",
      },
      wo: {
        title: "Ndaxu Buur Bu Baoulé",
        description: "Ndaxu buur bii di rafet bu gëna mag ak dund bu njëkk ci Baoulé. Safaa yi ak motif yi ñu defar di jëfandikoo liggéey bu baax.",
        history: "Ndaxu yi Baoulé dañuy jëfandikoo ci seen yéenaleem ak seen liggéey bu njëkk. Dañu di mbind seen maam yi ak seen jaan.",
      },
    },
  },
  {
    id: "2",
    image: sculptureBronze,
    category: "Sculpture",
    period: "XIVe siècle",
    hasAudio: true,
    hasAR: false,
    location: {
      floor: "1",
      room: "Salle des Royaumes",
      x: 70,
      y: 35,
    },
    translations: {
      fr: {
        title: "Guerrier de Bronze du Bénin",
        description: "Cette sculpture représente un guerrier du royaume du Bénin, témoignant de la sophistication des techniques de fonte à la cire perdue.",
        history: "Les bronzes du Bénin sont parmi les plus grands chefs-d'œuvre de l'art africain. Ils ornaient le palais royal et racontaient l'histoire du royaume.",
      },
      en: {
        title: "Benin Bronze Warrior",
        description: "This sculpture represents a warrior from the Benin Kingdom, showcasing the sophistication of lost-wax casting techniques.",
        history: "Benin bronzes are among the greatest masterpieces of African art. They adorned the royal palace and told the kingdom's history.",
      },
      wo: {
        title: "Jigéen Benin Bu Bronze",
        description: "Nataal bii di jigéen bu boroom réew Benin, di wone ni liggéey bi ñu defar bu gëna mag.",
        history: "Bronze yi Benin dañuy jot ci nataal bu gëna mag ci Afrig. Dañu dee di jëfandikoo ci palais bu buur bi te wax liggéeyu réew bi.",
      },
    },
  },
  {
    id: "3",
    image: textilePattern,
    category: "Textile",
    period: "XVIIIe siècle",
    hasAudio: true,
    hasAR: false,
    location: {
      floor: "2",
      room: "Salle des Textiles",
      x: 50,
      y: 60,
    },
    translations: {
      fr: {
        title: "Textile Kente du Ghana",
        description: "Le tissu Kente est un textile traditionnel ghanéen tissé à la main avec des motifs symboliques colorés. Chaque couleur et motif raconte une histoire.",
        history: "À l'origine réservé à la royauté Ashanti, le Kente est devenu un symbole de fierté et d'identité culturelle africaine dans le monde entier.",
      },
      en: {
        title: "Kente Textile from Ghana",
        description: "Kente cloth is a traditional Ghanaian hand-woven textile with colorful symbolic patterns. Each color and pattern tells a story.",
        history: "Originally reserved for Ashanti royalty, Kente has become a symbol of African pride and cultural identity worldwide.",
      },
      wo: {
        title: "Dëkk Kente Bu Ghana",
        description: "Dëkk Kente moo ngi jëfandikoo ci Ghana, dañu koy def ak loxo, motif yi am benn xel bu njëkk. Benn benn melokaanu ak motif am na seen xalaat.",
        history: "Ci tàmbaali, Kente moo ngi jëfandikoo seeneen buur yi Ashanti rekk, waaye leegi dafa jot ci benn nataal bu gëna mag ci Afrig ci àdduna bi.",
      },
    },
  },
];

export const routes = [
  {
    id: "1",
    translations: {
      fr: {
        title: "Royaumes Africains",
        description: "Découvrez l'histoire des grands royaumes africains",
      },
      en: {
        title: "African Kingdoms",
        description: "Discover the history of great African kingdoms",
      },
      wo: {
        title: "Réew Yi Afrig",
        description: "Xam liggéeyu réew yi mag yi ci Afrig",
      },
    },
    artworks: ["1", "2"],
  },
  {
    id: "2",
    translations: {
      fr: {
        title: "Art et Spiritualité",
        description: "L'expression spirituelle à travers l'art",
      },
      en: {
        title: "Art and Spirituality",
        description: "Spiritual expression through art",
      },
      wo: {
        title: "Nataal ak Liggéey bu Yalla",
        description: "Liggéey bu Yalla ci nataal",
      },
    },
    artworks: ["1", "3"],
  },
];
