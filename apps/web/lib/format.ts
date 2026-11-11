const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function formatLastTouch(iso: string | null): string {
  return iso ? dateFmt.format(new Date(iso)) : "Never";
}

export function formatUnits(units: number | null): string {
  return units === null ? "—" : String(units);
}
