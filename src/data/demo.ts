import search_0 from "@/assets/search-0.jpg.asset.json";
import search_2 from "@/assets/search-2.jpg.asset.json";
import search_4 from "@/assets/search-4.jpg.asset.json";
import search_6 from "@/assets/search-6.jpg.asset.json";
import detail_0 from "@/assets/detail-0.jpg.asset.json";
import compatRapid from "@/assets/compat-axe-rapide.jpg.asset.json";
import compatThrough from "@/assets/compat-axe-traversant.jpg.asset.json";
import compatPin from "@/assets/compat-goupille.jpg.asset.json";
import panniers from "@/assets/sacoches.png.asset.json";
import weather from "@/assets/meteo-confort.png.asset.json";
import repair from "@/assets/reparation.png.asset.json";
import safety from "@/assets/antivol-gilet.png.asset.json";
import avatar_thomas from "@/assets/avatar-thomas.jpg.asset.json";
import avatar_sophie from "@/assets/avatar-sophie.jpg.asset.json";
import avatar_camille from "@/assets/avatar-camille.jpg.asset.json";
import avatar_claire from "@/assets/avatar-claire.jpg.asset.json";

import avatarChloe from "@/assets/avatar-chloe.jpg.asset.json";
import parentGuide from "@/assets/Guide-du-parent-cycliste.pdf.asset.json";

export const guideDownload = parentGuide;
export const demoRenter = { name: "Chloé", email: "chloe@exemple.fr", city: "Bordeaux", age: "18 mois–3 ans", avatar: avatarChloe.url };

export const demoKits = [
  {
    "id": "thomas",
    "name": "Kit Explorateur Curieux",
    "age": "18 mois–3 ans",
    "location": "Bordeaux Centre · Place Pey-Berland",
    "rating": "4.98",
    "reviewCount": 34,
    "equipment": "Remorque Thule Chariot Cross 2 + adaptateur axe universel",
    "duration": "Jusqu'à 4 jours de voyage",
    "estimate": "Estimation du loueur, selon son expérience",
    "owner": "Thomas · Papa de Léonie & Milo",
    "quote": "« Testé sur 3 voyages avec Léonie et Milo, de la Loire à l'EuroVelo 3. »",
    "dailyPrice": 22,
    "variant": "explorer",
    "photoAlt": "Remorque Thule Chariot Cross 2 verte stationnée dans une cour pavée"
  },
  {
    "id": "sophie",
    "name": "Kit Petit Cocon",
    "age": "9–18 mois",
    "location": "Bordeaux · Chartrons",
    "rating": "5.0",
    "reviewCount": 19,
    "equipment": "Siège arrière Thule + casque",
    "duration": "Jusqu'à 3 jours de voyage",
    "estimate": "Estimation du loueur, selon son expérience",
    "owner": "Sophie · Maman de Paul (14 mois)",
    "quote": "« Le harnais est hyper simple à régler, Paul s'endort presque à chaque sortie à l'arrière. »",
    "dailyPrice": 15,
    "variant": "cocoon",
    "photoAlt": "Vélo de ville vert avec siège enfant arrière Thule gris dans une rue ancienne"
  },
  {
    "id": "camille",
    "name": "Kit Mini Baroudeur",
    "age": "3–6 ans",
    "location": "Bordeaux · Bastide",
    "rating": "4.95",
    "reviewCount": 22,
    "equipment": "Pack vélo suiveur Follow-Me + vélo enfant 16 pouces ultra-léger",
    "duration": "Jusqu'à 4 jours de voyage",
    "estimate": "Estimation du loueur, selon son expérience",
    "owner": "Camille · Maman de Lola (5 ans)",
    "quote": "« Idéal pour les petits qui fatiguent en côte : on clipse le vélo enfant en 10 secondes et on repart sans fatigue. »",
    "dailyPrice": 26,
    "variant": "adventurer",
    "photoAlt": "Mère et enfant à vélo avec système de traction Follow-Me sur un sentier côtier"
  },
  {
    "id": "claire",
    "name": "Kit Explorateur Curieux",
    "age": "18 mois–3 ans",
    "location": "Mérignac · Centre",
    "rating": "4.92",
    "reviewCount": 16,
    "equipment": "Remorque Thule + 2 sacoches + 2 casques enfant",
    "duration": "Jusqu'à 3 jours de voyage",
    "estimate": "Estimation du loueur, selon son expérience",
    "owner": "Claire · Maman de Jules (2 ans)",
    "quote": "« Super suspension pour les pavés et les chemins forestiers. Se transforme en poussette au restaurant sans réveiller l'enfant. »",
    "dailyPrice": 20,
    "variant": "explorer",
    "photoAlt": "Remorque Thule bleue, sacoches étanches et casques sur terrasse en bois"
  }
] as const;
export const kitImages = { thomas: search_0.url, sophie: search_2.url, camille: search_4.url, claire: search_6.url };
export const ownerImages = { thomas: avatar_thomas.url, sophie: avatar_sophie.url, camille: avatar_camille.url, claire: avatar_claire.url };
export const kitDetail = {
  "equipment": [
    {
      "title": "Bagages",
      "items": [
        "Sacoches arrière",
        "Sacoche de guidon"
      ]
    },
    {
      "title": "Météo & confort enfant",
      "items": [
        "Protection pluie remorque",
        "Pare-soleil",
        "Moustiquaire",
        "Chancelière"
      ]
    },
    {
      "title": "Kit réparation",
      "items": [
        "Pompe",
        "Kit rustines",
        "Multi-outil"
      ]
    },
    {
      "title": "Kit sécurité",
      "items": [
        "Antivol",
        "Éclairage avant",
        "Éclairage arrière",
        "Gilet réfléchissant"
      ]
    }
  ],
  "ownerDescription": "Testé sur l'EuroVelo 3 avec Léonie (2 ans) et Milo (4 ans) · Bordeaux Centre",
  "ownerQuote": "« Nous avons fait 3 voyages à vélo avec nos enfants. On loue notre matériel entre deux escapades pour qu'il serve à d'autres familles plutôt que de dormir au garage ! »",
  "experienceQuote": "« Ce kit a transformé nos weekends. Au début, on craignait le gabarit dans Bordeaux, mais la Thule Cross est un modèle de maniabilité : elle pivote sur elle-même une fois en mode poussette, et s'oublie totalement derrière le vélo. »",
  "tips": [
    {
      "title": "Le conseil météo fraîche",
      "text": "Pensez à prévoir un petit plaid polaire pour le départ matinal : les petits ne bougent pas et refroidissent plus vite que le parent qui pédale !"
    },
    {
      "title": "Voies vertes & chicanes",
      "text": "Avec 80 cm de largeur hors-tout, la remorque passe toutes les barrières anti-scooter standards et les portillons de pistes cyclables sans manoeuvrer."
    },
    {
      "title": "Pour un 2e enfant",
      "text": "Léonie avait 2 ans et Milo 4 ans : la remorque a servi aux deux, tant que la charge totale reste sous 45 kg."
    }
  ],
  "details": [
    "Sièges inclinables d'une seule main : indispensable pour laisser les enfants dormir paisiblement sans que leur tête ne bascule vers l'avant.",
    "Filet anti-gravillons ultra rassurant : bloque les projections de poussière et cailloux soulevés par votre roue arrière sans étouffer la ventilation.",
    "Suspension à lames réglable : ajustée sur mesure lors de la prise en main selon le poids cumulé de vos enfants pour un confort royal."
  ],
  "compatibility": [
    {
      "step": "Étape 1 · Votre axe",
      "title": "Axe rapide standard",
      "text": "L'attache Thule fournie s'insère directement derrière le levier de serrage d'origine."
    },
    {
      "step": "Étape 2 · VAE ou Axe 12mm",
      "title": "Axe traversant inclus",
      "text": "Thomas met à disposition 2 adaptateurs Thule M12 (filetage 1.0 et 1.5) inclus avec le kit."
    },
    {
      "step": "Étape 3 · Le clic",
      "title": "Verrouillage en 1 clic",
      "text": "La rotule ezHitch s'enclenche avec une sécurité double et une goupille captive."
    }
  ],
  "compatibilityIntro": "Thomas monte l'attache en 90 secondes sur la plupart des vélos (musculaires ou électriques).",
  "weightDescription": "Charge totale : 45 kg (2 enfants jusqu'à 20 kg chacun + 5 kg de bagages dans le coffre).",
  "maxWeight": 45,
  "checklist": [
    {
      "title": "Harnais 5 points contrôlés par le loueur, non effilochés",
      "text": "Boucles à double déclenchement"
    },
    {
      "title": "Frein de stationnement au pied fonctionnel",
      "text": "Blocage immédiat des 2 roues arrières, même en pente"
    },
    {
      "title": "Attache de sécurité secondaire présente",
      "text": "Sangle en nylon doublant la rotule métallique"
    },
    {
      "title": "Pression des pneus contrôlée par le loueur avant le départ",
      "text": "Pneus à bande anti-crevaison renforcée"
    },
    {
      "title": "Fanion de visibilité orange fluo 1m60 et feux LED",
      "text": "Mât démontable et éclairages rechargeables USB fournis"
    }
  ],
  "lastCheck": "14 mai 2027",
  "checklistIntro": "Thomas a auto-évalué ces points avant la mise à disposition. À vérifier ensemble lors de la remise en main propre :",
  "title": "Kit Explorateur Curieux : Remorque Thule Chariot Cross 2 + adaptateur axe universel",
  "badges": [
    "1 ou 2 enfants",
    "De 18 mois à 3 ans",
    "Pliable coffre voiture (93×76×37 cm)"
  ]
};
export const gallery = [{ url: detail_0.url, alt: "Remorque Thule Chariot Cross 2 stationnée dans une cour pavée à Bordeaux" }];
export const equipmentImages = [
  { url: panniers.url, alt: "Sacoches vélo étanches et sacoche de guidon" },
  { url: weather.url, alt: "Chancelière polaire Thule, pare-pluie et pare-soleil pour remorque vélo" },
  { url: repair.url, alt: "Kit réparation vélo avec mini-pompe, rustines et multi-outil" },
  { url: safety.url, alt: "Antivol Zéfal, éclairages LED rechargeables et gilets haute visibilité" },
];
export const compatibilityImages = [compatRapid.url, compatThrough.url, compatPin.url];
export const demoBooking = {
 status: "accepted" as const,
 fullDates: "Du mercredi 19 mai 2027 au vendredi 21 mai 2027",
 pickupDate: "Mercredi 19 mai 2027", returnDate: "Vendredi 21 mai 2027", pickupShort: "Mer. 19 mai 2027", returnShort: "Ven. 21 mai 2027",
 pickupDay: "Mercredi 19 mai", returnDay: "Vendredi 21 mai", inspectionOpening: "mercredi 19 mai à 18h", inspectionButtonDate: "19 mai à 18h",
 demonstrationMinutes: 15,
 pickupTimes: ["18:00", "18:30", "19:00"], returnTimes: ["18:00", "18:30", "19:00", "20:00"],
 reference: "MV-8841", renter: "Chloé", ownerId: "thomas", days: 3, serviceRate: 0.10, serenity: 12, deposit: 150, refundHours: 48, responseHours: 24,
 dates: "Du mer. 19 au ven. 21 mai 2027", searchDates: "19 Mai – 21 Mai", start: "2027-05-19", end: "2027-05-21", handover: "18h30", returnTime: "19h00",
 cancellation: "jusqu'au lundi 17 mai à 18h30", address: "42 cours d'Albret, 33000 Bordeaux", departure: "Bordeaux", children: [1, 2], ages: ["9–18 mois", "18 mois–3 ans", "3–6 ans"],
};
export const reservationStatuses = [
 { id: "pending", label: "En attente" }, { id: "accepted", label: "Demande acceptée" },
 { id: "rejected-expired", label: "Refusée/expirée" }, { id: "cancelled", label: "Annulée" },
] as const;
export const journeyCopy = {
 email: "Le loueur vous répond sous 24 h.",
 message: "Bonjour Thomas ! Nous partons pour notre première escapade de 3 jours à vélo avec notre fille de 2 ans. Hâte d'essayer la remorque et merci d'avance pour le petit brief d'installation !",
 cleaning: "Option sérénité incluse : Thomas s'occupe du nettoyage, rendez simplement le kit.",
 equipmentName: "Remorque Thule Chariot Cross 2 + adaptateur axe universel",
 preparation: [
  { title: "Votre vélo", text: "Thomas vous montre comment atteler la remorque et régler les sangles." },
  { title: "Votre téléphone", text: "Pour l'état des lieux photo, fait ensemble, avant et après." },
  { title: "15 minutes", text: "Démonstration et état des lieux photo sur place." },
 ],
 inspection: ["Vue générale : face et profil de la remorque", "Pneus & freins : pression des pneus et frein de stationnement", "Harnais & assise : boucles 5 points, propreté", "Attache & timon : goupille de sécurité et sangle"],
};
export function bookingAmounts(serenity: boolean) {
 const rental = demoKits[0].dailyPrice * demoBooking.days;
 const service = Math.round(rental * demoBooking.serviceRate * 100) / 100;
 return { rental, service, total: rental + service + demoBooking.deposit + (serenity ? demoBooking.serenity : 0) };
}
export function euros(value: number, decimals = true) {
 return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: decimals ? 2 : 0, maximumFractionDigits: decimals ? 2 : 0 }).format(value) + " €";
}
