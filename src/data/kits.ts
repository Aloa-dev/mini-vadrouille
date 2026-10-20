import { supabase } from "@/integrations/supabase/client";
import search_0 from "@/assets/search-0.jpg.asset.json";
import search_2 from "@/assets/search-2.jpg.asset.json";
import search_4 from "@/assets/search-4.jpg.asset.json";
import search_6 from "@/assets/search-6.jpg.asset.json";
import avatar_thomas from "@/assets/avatar-thomas.jpg.asset.json";
import avatar_sophie from "@/assets/avatar-sophie.jpg.asset.json";
import avatar_camille from "@/assets/avatar-camille.jpg.asset.json";
import avatar_claire from "@/assets/avatar-claire.jpg.asset.json";

// Textes des loueurs et images locales, associés à l'id du kit en base.
// (La table photos_kits est vide pour l'instant : images locales en attendant.)
const KIT_THOMAS = "b0000000-0000-4000-8000-000000000004";
const KIT_SOPHIE = "b0000000-0000-4000-8000-000000000003";
const KIT_CAMILLE = "b0000000-0000-4000-8000-000000000002";
const KIT_CLAIRE = "b0000000-0000-4000-8000-000000000001";

export interface KitOwnerInfo {
  slug: string;
  owner: string;
  ownerFirstName: string;
  ownerDescription: string;
  rating: string;
  reviewCount: number;
  variant: "explorer" | "cocoon" | "adventurer";
  photo: string;
  photoAlt: string;
  avatar: string;
}

export const kitOwners: Record<string, KitOwnerInfo> = {
  [KIT_THOMAS]: {
    slug: "thomas",
    owner: "Thomas · Papa de Léonie & Milo",
    ownerFirstName: "Thomas",
    ownerDescription: "Testé sur l'EuroVelo 3 avec Léonie (2 ans) et Milo (4 ans) · Bordeaux Centre",
    rating: "4.98",
    reviewCount: 34,
    variant: "explorer",
    photo: search_0.url,
    photoAlt: "Remorque Thule Chariot Cross 2 verte stationnée dans une cour pavée",
    avatar: avatar_thomas.url,
  },
  [KIT_SOPHIE]: {
    slug: "sophie",
    owner: "Sophie · Maman de Paul (14 mois)",
    ownerFirstName: "Sophie",
    ownerDescription: "Sorties en ville et le long de la Garonne avec Paul (14 mois) · Chartrons",
    rating: "5.0",
    reviewCount: 19,
    variant: "cocoon",
    photo: search_2.url,
    photoAlt: "Vélo de ville vert avec siège enfant arrière Thule gris dans une rue ancienne",
    avatar: avatar_sophie.url,
  },
  [KIT_CAMILLE]: {
    slug: "camille",
    owner: "Camille · Maman de Lola (5 ans)",
    ownerFirstName: "Camille",
    ownerDescription: "Trois jours sur les chemins avec Lola (5 ans) · Bastide",
    rating: "4.95",
    reviewCount: 22,
    variant: "adventurer",
    photo: search_4.url,
    photoAlt: "Mère et enfant à vélo avec système de traction Follow-Me sur un sentier côtier",
    avatar: avatar_camille.url,
  },
  [KIT_CLAIRE]: {
    slug: "claire",
    owner: "Claire · Maman de Jules (2 ans)",
    ownerFirstName: "Claire",
    ownerDescription: "Pavés en ville et chemins forestiers avec Jules (2 ans) · Mérignac",
    rating: "4.92",
    reviewCount: 16,
    variant: "explorer",
    photo: search_6.url,
    photoAlt: "Remorque Thule bleue, sacoches étanches et casques sur terrasse en bois",
    avatar: avatar_claire.url,
  },
};

// Ordre d'affichage demandé : Thomas, Sophie, Camille, Claire.
export const kitOrder = [KIT_THOMAS, KIT_SOPHIE, KIT_CAMILLE, KIT_CLAIRE];

const trancheLabels: Record<string, string> = {
  petit_cocon: "9–18 mois",
  explorateur_curieux: "18 mois–3 ans",
  mini_baroudeur: "3–6 ans",
};

export interface KitCard {
  id: string;
  name: string;
  age: string;
  location: string;
  rating: string;
  reviewCount: number;
  equipment: string;
  duration: string;
  estimate: string;
  owner: string;
  ownerFirstName: string;
  ownerDescription: string;
  quote: string;
  dailyPrice: number;
  variant: "explorer" | "cocoon" | "adventurer";
  photo: string;
  photoAlt: string;
  avatar: string;
  recit: string;
  conseil: string | null;
  caution: number;
  serenity: number | null;
  maxWeight: number;
  places: number;
  city: string;
  ageLabel: string;
}

type KitRow = {
  id: string;
  nom: string;
  tranche_age: string;
  nombre_places: number;
  prix_jour: number;
  ville: string;
  quartier: string | null;
  teaser: string;
  recit_complet: string;
  conseil_pratique: string | null;
  contenu_kit: string | null;
  duree_max_jours: number | null;
  caution_montant: number;
  option_serenite_montant: number | null;
  charge_max_kg: number;
};

const kitSelect =
  "id, nom, tranche_age, nombre_places, prix_jour, ville, quartier, teaser, recit_complet, conseil_pratique, contenu_kit, duree_max_jours, caution_montant, option_serenite_montant, charge_max_kg";

function toKitCard(row: KitRow): KitCard | null {
  const info = kitOwners[row.id];
  if (!info) return null;
  return {
    id: row.id,
    name: row.nom,
    age: trancheLabels[row.tranche_age] ?? row.tranche_age,
    location: row.quartier ? `${row.ville} · ${row.quartier}` : row.ville,
    rating: info.rating,
    reviewCount: info.reviewCount,
    equipment: row.contenu_kit ?? row.nom,
    duration: row.duree_max_jours ? `Jusqu'à ${row.duree_max_jours} jours de voyage` : "Durée libre",
    estimate: "Estimation du loueur, selon son expérience",
    owner: info.owner,
    ownerFirstName: info.ownerFirstName,
    ownerDescription: info.ownerDescription,
    quote: `« ${row.teaser} »`,
    dailyPrice: Number(row.prix_jour),
    variant: info.variant,
    photo: info.photo,
    photoAlt: info.photoAlt,
    avatar: info.avatar,
    recit: row.recit_complet,
    conseil: row.conseil_pratique,
    caution: Number(row.caution_montant),
    serenity: row.option_serenite_montant == null ? null : Number(row.option_serenite_montant),
    maxWeight: row.charge_max_kg,
    places: row.nombre_places,
    city: row.ville,
    ageLabel: trancheLabels[row.tranche_age] ?? row.tranche_age,
  };
}

export async function fetchKits(): Promise<KitCard[]> {
  const { data, error } = await supabase
    .from("kits")
    .select(kitSelect)
    .eq("statut_relecture", "publie");
  if (error) throw new Error(error.message);
  const cards = ((data ?? []) as unknown as KitRow[])
    .map(toKitCard)
    .filter((k): k is KitCard => k !== null);
  return cards.sort((a, b) => kitOrder.indexOf(a.id) - kitOrder.indexOf(b.id));
}

export async function fetchKit(id: string): Promise<KitCard> {
  const { data, error } = await supabase
    .from("kits")
    .select(kitSelect)
    .eq("id", id)
    .eq("statut_relecture", "publie")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Kit introuvable");
  const card = toKitCard(data as unknown as KitRow);
  if (!card) throw new Error("Kit introuvable");
  return card;
}

export interface KitCriteria { ville?: string | undefined; enfants?: number | undefined; age?: string | undefined; debut?: string | undefined; fin?: string | undefined }

const normalize = (v: string) => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

export function filterKits(kits: KitCard[], c: KitCriteria): KitCard[] {
  const ville = c.ville ? normalize(c.ville) : "";
  return kits.filter(k =>
    (!ville || normalize(k.city).includes(ville)) &&
    (!c.enfants || k.places >= c.enfants) &&
    (!c.age || k.ageLabel === c.age));
}
