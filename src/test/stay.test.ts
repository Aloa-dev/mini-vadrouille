import { describe, expect, it } from "vitest";
import { parisIso, parseStay, safeRedirect, stayDays, stayLabel } from "@/lib/stay";

describe("séjour", () => {
  it("par défaut du 19 au 21 mai 2027", () => expect(parseStay({})).toEqual({ debut: "2027-05-19", fin: "2027-05-21" }));
  it("3 jours du 19 au 21", () => expect(stayDays({ debut: "2027-05-19", fin: "2027-05-21" })).toBe(3));
  it("libellé", () => expect(stayLabel({ debut: "2027-05-19", fin: "2027-05-21" })).toBe("Du mer. 19 au ven. 21 mai 2027"));
  it("remise 18h30 heure de Paris l'été", () => expect(parisIso("2027-05-19", "18:30")).toBe("2027-05-19T18:30:00+02:00"));
  it("restitution 19h00", () => expect(parisIso("2027-05-21", "19:00")).toBe("2027-05-21T19:00:00+02:00"));
  it("décalage hiver", () => expect(parisIso("2027-01-10", "18:30")).toBe("2027-01-10T18:30:00+01:00"));
  it("redirection externe refusée", () => expect(safeRedirect("//evil.com")).toBeUndefined());
});
