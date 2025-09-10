# The Gold Exchange — GitHub Pages + Cloudflare Worker (Proxy Ready)

This package makes the **Price per gram** update reliably on GitHub Pages, avoiding CORS blocks.

## Files
- `index.html` — your site with a CORS‑ready fetch chain and `window.GOLD_PROXY_URL` support.
- `.nojekyll` — prevents Jekyll processing.
- `worker.js` — Cloudflare Worker that returns gold price with permissive CORS.

## A) Deploy the site (GitHub Pages)
1. Create a repo (or use existing).
2. Upload **`index.html`** and **`.nojekyll`** to the repo **root**.
3. Settings → **Pages** → Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` → **Save**.

## B) Create the Cloudflare Worker (free)
1. Cloudflare → **Workers & Pages** → **Create Worker** → Quick Edit.
2. Paste **`worker.js`** contents. **Deploy**.
3. Click **View** and copy the URL (e.g., `https://your-subdomain.workers.dev`).

## C) Point the site to the Worker
In `index.html` near the top:
```html
<script>window.GOLD_PROXY_URL='';</script>
```
Replace with your Worker URL:
```html
<script>window.GOLD_PROXY_URL='https://your-subdomain.workers.dev';</script>
```
Commit, wait a minute, and reload your Pages site. You should see **Source:** `Worker→GoldPrice.org` (or `Worker→metals.live`) and the **$/g** values move.

## Troubleshooting
- If **Source** stays `baseline`, verify the Worker URL is correct and reachable.
- Disable privacy/ad blockers for your site and Worker domain.
- Hard refresh (Cmd‑Shift‑R / Ctrl‑F5).

## Optional tuning
- Change `UPDATE_MS` in `index.html` for update cadence.
- Want visible minute‑to‑minute movement? Switch formatting to 3 decimals.