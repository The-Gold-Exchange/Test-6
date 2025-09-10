export default {
  async fetch(req) {
    try {
      const r = await fetch('https://data-asg.goldprice.org/dbXRates/USD', { cf: { cacheTtl: 30 } });
      const d = await r.json();
      const oz = d?.items?.[0]?.xauPrice;
      if (oz && isFinite(oz)) {
        const perGram24 = oz / 31.1034768;
        return new Response(JSON.stringify({ perGram24, source: 'Worker→GoldPrice.org' }), {
          headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'cache-control': 'max-age=15' }
        });
      }
    } catch (_) {}
    try {
      const r2 = await fetch('https://api.metals.live/v1/spot');
      const a = await r2.json();
      const oz2 = Array.isArray(a) ? (a.find(x => x && typeof x === 'object' && 'gold' in x)?.gold) : null;
      if (oz2 && isFinite(oz2)) {
        const perGram24 = oz2 / 31.1034768;
        return new Response(JSON.stringify({ perGram24, source: 'Worker→metals.live' }), {
          headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'cache-control': 'max-age=15' }
        });
      }
    } catch (_) {}
    return new Response(JSON.stringify({ perGram24: null, source: 'Worker→baseline' }), {
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }, status: 200
    });
  }
}