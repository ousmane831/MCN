import babouche from "@/assets/Babouches_Serigne_Babacar_Sy.jpg";
import objet_archeo from "@/assets/objets-archogiques-du-Mali.jpg";
import sabre from "@/assets/Le_sabre_d’ElHadj_Omar_Tall.jpg";

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
    image: babouche,
    category: "Textile / Mode",
    period: "XXe siècle",
    hasAudio: true,
    hasAR: true,
    location: {
      floor: "1",
      room: "Salle 1",
      x: 25,
      y: 30,
    },
    translations: {
      fr: {
        title: "Babouches Serigne Babacar Sy",
        description: "Paire de babouches traditionnelles portées par Serigne Babacar Sy.",
        history: "Ces babouches symbolisent l'élégance et l'identité culturelle sénégalaise.",
      },
      en: {
        title: "Serigne Babacar Sy's Babouches",
        description: "Traditional slippers worn by Serigne Babacar Sy.",
        history: "These slippers symbolize elegance and Senegalese cultural identity.",
      },
      wo: {
        title: "Babouches Serigne Babacar Sy",
        description: "Babouches yu bariy gi ñu am Serigne Babacar Sy.",
        history: "Babouches bii dafay wone elegance ak culture Senegal.",
      },
    },
  },
  {
    id: "2",
    image: objet_archeo,
    category: "Archéologie",
    period: "Moyen Âge",
    hasAudio: true,
    hasAR: false,
    location: {
      floor: "1",
      room: "Salle 2",
      x: 70,
      y: 35,
    },
    translations: {
      fr: {
        title: "Objets archéologiques du Mali",
        description: "Collection d'objets archéologiques trouvés au Mali.",
        history: "Ces objets témoignent de l'histoire ancienne et des civilisations du Mali.",
      },
      en: {
        title: "Archaeological Objects from Mali",
        description: "Collection of archaeological objects found in Mali.",
        history: "These objects reflect the ancient history and civilizations of Mali.",
      },
      wo: {
        title: "Objets archéologiques du Mali",
        description: "Njàmm yi ñu gis ci Mali",
        history: "Njàmm yi dafay wone tey bu ndaw ak seen suqali yi.",
      },
    },
  },
  {
    id: "3",
    image: sabre,
    category: "Armes / Histoire",
    period: "XIXe siècle",
    hasAudio: true,
    hasAR: false,
    location: {
      floor: "2",
      room: "Salle 3",
      x: 50,
      y: 60,
    },
    translations: {
      fr: {
        title: "Le sabre d’ElHadj Omar Tall",
        description: "Sabre ayant appartenu au célèbre leader musulman ElHadj Omar Tall.",
        history: "Il a joué un rôle majeur dans les guerres et l'histoire de l'Afrique de l'Ouest.",
      },
      en: {
        title: "ElHadj Omar Tall's Saber",
        description: "Saber belonging to the famous Muslim leader ElHadj Omar Tall.",
        history: "He played a major role in wars and West African history.",
      },
      wo: {
        title: "Le sabre d’ElHadj Omar Tall",
        description: "Sabre bi am ElHadj Omar Tall, nekkin bu jigéen Muslim.",
        history: "ElHadj Omar Tall dafay am role ci jàmm ak Africa bi dees West.",
      },
    },
  },
];

export const routes = [
  {
    id: "1",
    translations: {
      fr: {
        title: "Route des textiles et objets anciens",
        description: "Cette route présente des babouches traditionnelles et des objets archéologiques.",
      },
      en: {
        title: "Textiles and Ancient Objects Route",
        description: "This route features traditional babouches and archaeological objects.",
      },
      wo: {
        title: "Route yi textiles ak njàmm yu ndaw",
        description: "Route bii dafay wone babouches ak njàmm yi ndaw.",
      },
    },
    artworks: ["1", "2"],
  },
  {
    id: "2",
    translations: {
      fr: {
        title: "Route des leaders et armes historiques",
        description: "Cette route met en avant le sabre d’ElHadj Omar Tall et d'autres objets.",
      },
      en: {
        title: "Leaders and Historical Weapons Route",
        description: "This route highlights ElHadj Omar Tall's saber and other historical items.",
      },
      wo: {
        title: "Route yi leaders ak armes historiques",
        description: "Route bii dafay wone sabre bi ElHadj Omar Tall ak njàmm yi ndaw.",
      },
    },
    artworks: ["1", "3"],
  },
];
