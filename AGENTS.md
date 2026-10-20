<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep TanStack Start file routing and Tailwind v4; the accepted default stack avoids replacing the template runtime.
- Define all theme roles in src/styles.css as OKLCH semantic tokens, and use the shared UI components; this keeps styling consistent.
- Use a single CSS theme without a provider or stored theme preference; the application has no display-mode switching.
- Keep shared header/footer in the root layout and each validated journey screen in its own TanStack route; this preserves identical chrome and shareable pages.
- Keep all kit and booking demo data in src/data/demo.ts and calculate amounts from it; this provides one replaceable source for a future data connection.
- Reuse KitSearch on the homepage and results with presentation modes; this preserves existing field and button styling without duplicated controls.
- Link only implemented demo destinations and leave future actions without navigation; this prevents fake or missing screens.
- Share the journey stepper and reservation summaries across the four demo routes; keep payment fields non-persistent and never send card data because this journey has no real payment integration.

- Use URL search parameters for the kit-to-payment demo option and component state for cancellation/forms; this preserves navigation while avoiding persistence or real authentication.
- Serve the supplied guide through its same-origin CDN asset pointer with a download link; this keeps the static PDF out of the source tree.
- Keep both demo auth forms in one shared component and the French date range picker in KitSearch; this avoids duplicate controls.
- Pass search criteria to /recherche as URL search params and filter kits client-side with filterKits in src/data/kits.ts; keeps results shareable and the rule testable.
