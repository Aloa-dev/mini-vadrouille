import { useState } from "react";
import { CalendarDays, Navigation, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoBooking } from "@/data/demo";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import type { KitCriteria } from "@/data/kits";
import { toDay } from "@/lib/stay";

export function KitSearch({ compact = false, initial, onSearch }: { compact?: boolean; initial?: KitCriteria; onSearch: (criteria: KitCriteria) => void }) {
  const [ville, setVille] = useState(initial?.ville ?? demoBooking.departure);
  const [children, setChildren] = useState<number | null>(initial?.enfants ?? null);
  const [age, setAge] = useState<string | null>(initial?.age ?? null);
  const [dates, setDates] = useState<DateRange | undefined>(compact ? { from: new Date(`${initial?.debut ?? demoBooking.start}T00:00:00`), to: new Date(`${initial?.fin ?? demoBooking.end}T00:00:00`) } : undefined);
  const [dateOpen, setDateOpen] = useState(false);
  const [today, setToday] = useState<Date>();
  const dateLabel = (date: Date) => format(date, 'd MMMM', { locale: fr }).replace(/ (.)/, (_, letter: string) => ` ${letter.toUpperCase()}`);
  const label = "text-sm uppercase text-muted-foreground";
  return <form className={compact ? "grid items-center gap-3 rounded-3xl bg-reassurance p-4 sm:grid-cols-2 xl:grid-cols-[1fr_1.2fr_1.4fr_2fr_auto]" : "mt-8 grid gap-3"} onSubmit={e => { e.preventDefault(); onSearch({ ville: ville.trim() || undefined, enfants: children ?? undefined, age: age ?? undefined, ...(dates?.from && dates.to ? { debut: toDay(dates.from), fin: toDay(dates.to) } : {}) }); }}>
    <label className="flex min-w-0 items-center gap-4 rounded-full border border-input bg-field px-6 py-3 focus-within:outline-2 focus-within:outline-ring">
      {!compact && <Navigation aria-hidden className="size-4 shrink-0 text-muted-foreground" />}
      <span className="flex min-w-0 flex-1 flex-col"><span className={label}>{compact ? "Point de départ" : "Point de départ de la vadrouille"}</span><input value={ville} onChange={e => setVille(e.target.value)} className="w-full min-w-0 bg-transparent font-medium outline-none" /></span>
    </label>
    <div className={compact ? "contents" : "grid gap-3 sm:grid-cols-2"}>
      <div className="flex min-w-0 items-center gap-4 rounded-full border border-input bg-field px-6 py-3 focus-within:outline-2 focus-within:outline-ring">
        {!compact && <CalendarDays aria-hidden className="size-4 shrink-0 text-muted-foreground" />}
        <Popover open={dateOpen} onOpenChange={open => { setDateOpen(open); if (open) setToday(startOfDay(new Date())); }}><div className="min-w-0 flex-1"><span id="kit-search-dates-label" className={label}>Dates du séjour</span><PopoverTrigger asChild><Button id="kit-search-dates" type="button" variant="ghost" aria-labelledby="kit-search-dates-label kit-search-dates"className="h-auto w-full justify-start rounded-sm p-0 text-base font-medium hover:bg-transparent">{compact ? <span className="min-w-0 whitespace-normal text-left">{dates?.from ? `${dateLabel(dates.from)}${dates.to ? ` – ${dateLabel(dates.to)}` : ''}` : demoBooking.searchDates}</span> : <span className="flex w-full gap-4 text-left"><span className="min-w-0 flex-1 whitespace-normal">{dates?.from ? dateLabel(dates.from) : 'Début'}</span><span className="min-w-0 flex-1 whitespace-normal">{dates?.to ? dateLabel(dates.to) : 'Fin'}</span></span>}</Button></PopoverTrigger></div><PopoverContent align="start" className="w-auto max-w-[calc(100vw-2rem)] p-0"><Calendar className="kit-date-calendar pointer-events-auto [--cell-size:2.25rem]" locale={fr} labels={{ labelPrevious: () => "Aller au mois précédent", labelNext: () => "Aller au mois suivant" }} mode="range" defaultMonth={new Date(`${demoBooking.start}T00:00:00`)} numberOfMonths={1} selected={dates} disabled={today ? { before: today } : undefined} onSelect={range => { setDates(range); if (range?.from && range.to && range.from.getTime() !== range.to.getTime()) setDateOpen(false); }} classNames={{ weekday: 'flex-1 select-none rounded-md text-sm font-normal text-muted-foreground' }} /></PopoverContent></Popover>
      </div>
      <fieldset className={compact ? "flex min-w-0 flex-col gap-1" : "flex items-center justify-between gap-3 rounded-full border border-input bg-field px-6 py-3"}>
        <legend className="sr-only">Nombre d'enfants</legend><span aria-hidden className={label}>Nombre d'enfants</span>
        <div className="flex gap-1">{demoBooking.children.map(n => <Button key={n} type="button" size="sm" variant={children === n ? "selected" : "ghost"} aria-pressed={children === n} onClick={() => setChildren(children === n ? null : n)} className="h-8 px-3">{n} enfant{n > 1 ? "s" : ""}</Button>)}</div>
      </fieldset>
    </div>
    <fieldset className={compact ? "flex min-w-0 flex-col gap-1" : "flex flex-wrap items-center justify-between gap-3 rounded-full border border-input bg-field px-6 py-2"}>
      <legend className="sr-only">Âge du ou des enfants</legend><span aria-hidden className={label}>Âge du ou des enfants</span>
      <div className="flex flex-wrap gap-1">{demoBooking.ages.map(a => <Button key={a} type="button" size="sm" variant={age === a ? "selected" : "ghost"} aria-pressed={age === a} onClick={() => setAge(age === a ? null : a)} className="h-8 px-3">{a}</Button>)}</div>
    </fieldset>
    <Button type="submit" size="lg" className={compact ? "sm:col-span-2 xl:col-span-1" : "mt-2 w-full"}><Search />Trouver un kit</Button>
  </form>;
}