// Dates du séjour (format AAAA-MM-JJ), transmises de page en page via l'URL.
export const DEFAULT_STAY = { debut: "2027-05-19", fin: "2027-05-21" };
export const PICKUP_TIME = "18:30";
export const RETURN_TIME = "19:00";

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
export interface Stay { debut: string; fin: string }

export function parseStay(s: Record<string, unknown>): Stay {
  const debut = typeof s["debut"] === "string" && ISO_DAY.test(s["debut"]) ? s["debut"] : undefined;
  const fin = typeof s["fin"] === "string" && ISO_DAY.test(s["fin"]) ? s["fin"] : undefined;
  if (debut && fin && fin >= debut) return { debut, fin };
  return { ...DEFAULT_STAY };
}

const toDate = (day: string) => { const [y, m, d] = day.split("-").map(Number); return new Date(Date.UTC(y!, m! - 1, d!)); };
export const toDay = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

/** Nombre de jours facturés : du premier au dernier jour inclus. */
export function stayDays({ debut, fin }: Stay) {
  return Math.round((toDate(fin).getTime() - toDate(debut).getTime()) / 86_400_000) + 1;
}

const fmt = (day: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", ...o }).format(toDate(day));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « Du mer. 19 au ven. 21 mai 2027 » */
export function stayLabel({ debut, fin }: Stay) {
  const sameMonth = debut.slice(0, 7) === fin.slice(0, 7);
  const start = fmt(debut, sameMonth ? { weekday: "short", day: "numeric" } : { weekday: "short", day: "numeric", month: "long", ...(debut.slice(0, 4) !== fin.slice(0, 4) ? { year: "numeric" } : {}) });
  return `Du ${start} au ${fmt(fin, { weekday: "short", day: "numeric", month: "long", year: "numeric" })}`;
}
/** « Mer. 19 mai 2027 » */
export const shortDay = (day: string) => cap(fmt(day, { weekday: "short", day: "numeric", month: "long", year: "numeric" }));

/** Date et heure de Paris au format ISO avec le bon décalage, ex. 2027-05-19T18:30:00+02:00 */
export function parisIso(day: string, time: string) {
  const [h, mi] = time.split(":").map(Number);
  const guess = new Date(toDate(day).getTime() + (h! * 60 + mi!) * 60_000 - 2 * 3_600_000);
  const name = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", timeZoneName: "longOffset" }).formatToParts(guess).find(p => p.type === "timeZoneName")?.value ?? "GMT";
  const offset = name === "GMT" ? "+00:00" : name.replace("GMT", "");
  return `${day}T${time}:00${offset}`;
}

/** Chemin interne sûr pour le retour après connexion. */
export function safeRedirect(value: unknown): string | undefined {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : undefined;
}
