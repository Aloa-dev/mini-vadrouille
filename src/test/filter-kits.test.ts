import { describe, expect, it } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { vi } from "vitest";
import { filterKits, type KitCard } from "@/data/kits";
const k = (id: string, city: string, places: number, ageLabel: string) => ({ id, city, places, ageLabel }) as KitCard;
const kits = [k("a", "Bordeaux Centre", 2, "18 mois–3 ans"), k("b", "Mérignac", 1, "9–18 mois")];
describe("filterKits", () => {
  it("ville sans majuscules ni accents", () => expect(filterKits(kits, { ville: "merignac" }).map(x => x.id)).toEqual(["b"]));
  it("ville vide = pas de filtre", () => expect(filterKits(kits, {}).length).toBe(2));
  it("places >= nombre d'enfants", () => expect(filterKits(kits, { enfants: 2 }).map(x => x.id)).toEqual(["a"]));
  it("tranche d'âge", () => expect(filterKits(kits, { age: "9–18 mois" }).map(x => x.id)).toEqual(["b"]));
  it("Bordeaux inclut Bordeaux Centre", () => expect(filterKits(kits, { ville: "bordeaux" }).map(x => x.id)).toEqual(["a"]));
});
