import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ShoppingBag, Heart, Search, Star, Menu, X, ChevronRight, ChevronLeft,
  Eye, Plus, Minus, Sun, Moon, User, Package, LayoutDashboard, TrendingUp,
  TrendingDown, SlidersHorizontal, LayoutGrid, List, Truck, CreditCard,
  Check, ShieldCheck, Sparkles, Store, Trash2, ArrowRight, Tag, Users,
  DollarSign, BarChart3, MoreHorizontal
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

/* ============================================================
   NOVA COMMERCE — front-end prototype
   Design system per brief: Electric Purple #7C3AED / Neon Blue #2563EB
   Self-contained: mock data, simulated flows, no external assets.
   ============================================================ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

#nova, #nova * { box-sizing: border-box; }
#nova {
  --bg:#FAFAFA; --bg2:#F2F2F5; --card:#FFFFFF; --ink:#0B0B12; --muted:#6B7280;
  --border:#ECECEF; --purple:#7C3AED; --purple-2:#9F67FF; --blue:#2563EB;
  --soft:rgba(124,58,237,.08); --soft-blue:rgba(37,99,235,.08);
  --shadow:0 1px 2px rgba(16,16,24,.04), 0 8px 24px rgba(16,16,24,.06);
  --shadow-lg:0 24px 64px -20px rgba(60,30,120,.28);
  --rose:#E11D48; --green:#16A34A; --amber:#D97706;
  font-family:'Inter',system-ui,sans-serif; color:var(--ink);
  background:var(--bg); -webkit-font-smoothing:antialiased; line-height:1.5;
}
#nova.nova-dark {
  --bg:#09090B; --bg2:#101012; --card:#18181B; --ink:#FAFAFA; --muted:#A1A1AA;
  --border:#27272A; --soft:rgba(124,58,237,.16); --soft-blue:rgba(37,99,235,.16);
  --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.4);
  --shadow-lg:0 24px 64px -16px rgba(0,0,0,.7);
}
#nova h1,#nova h2,#nova h3,#nova h4,#nova p,#nova ul,#nova li { margin:0; padding:0; }
#nova button { font-family:inherit; cursor:pointer; border:none; background:none; color:inherit; }
#nova input { font-family:inherit; }
#nova a { color:inherit; text-decoration:none; }
#nova ::-webkit-scrollbar { height:8px; width:8px; }
#nova ::-webkit-scrollbar-thumb { background:var(--border); border-radius:8px; }

.nv-wrap { max-width:1280px; margin:0 auto; padding:0 22px; }
.nv-grad-text { background:linear-gradient(100deg,var(--purple),var(--blue)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.nv-card { background:var(--card); border:1px solid var(--border); border-radius:18px; box-shadow:var(--shadow); }
.nv-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; font-weight:600; font-size:14px; padding:11px 18px; border-radius:12px; transition:.18s; white-space:nowrap; }
.nv-btn:active { transform:translateY(1px); }
.nv-primary { background:linear-gradient(100deg,var(--purple),var(--blue)); color:#fff; box-shadow:0 8px 22px -8px rgba(124,58,237,.6); }
.nv-primary:hover { filter:brightness(1.07); box-shadow:0 12px 28px -8px rgba(124,58,237,.7); }
.nv-ghost { background:var(--card); border:1px solid var(--border); color:var(--ink); }
.nv-ghost:hover { border-color:var(--purple); color:var(--purple); }
.nv-soft { background:var(--soft); color:var(--purple); }
.nv-input { width:100%; background:var(--card); border:1px solid var(--border); border-radius:12px; padding:11px 14px; font-size:14px; color:var(--ink); outline:none; transition:.16s; }
.nv-input:focus { border-color:var(--purple); box-shadow:0 0 0 4px var(--soft); }
.nv-chip { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600; padding:6px 12px; border-radius:999px; border:1px solid var(--border); background:var(--card); color:var(--muted); transition:.15s; }
.nv-chip.on { background:var(--purple); color:#fff; border-color:var(--purple); }
.nv-chip:hover { color:var(--ink); }
.nv-muted { color:var(--muted); }
.nv-prod-grid { display:grid; gap:18px; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); }
.nv-cat-grid { display:grid; gap:16px; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); }

.nv-thumb { position:relative; border-radius:14px; overflow:hidden; aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; }
.nv-thumb::after { content:""; position:absolute; inset:0; background:radial-gradient(120% 80% at 30% 0%,rgba(255,255,255,.5),transparent 60%); pointer-events:none; }
.nova-dark .nv-thumb::after { background:radial-gradient(120% 80% at 30% 0%,rgba(255,255,255,.08),transparent 60%); }

.nv-badge { position:absolute; top:10px; left:10px; font-size:11px; font-weight:800; letter-spacing:.3px; padding:4px 9px; border-radius:8px; background:var(--rose); color:#fff; z-index:2; }
.nv-wish { position:absolute; top:10px; right:10px; width:34px; height:34px; border-radius:10px; background:rgba(255,255,255,.85); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:2; transition:.15s; }
.nova-dark .nv-wish { background:rgba(24,24,27,.7); }
.nv-wish:hover { transform:scale(1.08); }

.nv-card-prod { background:var(--card); border:1px solid var(--border); border-radius:18px; padding:12px; transition:.22s; }
.nv-card-prod:hover { box-shadow:var(--shadow-lg); transform:translateY(-4px); border-color:transparent; }
.nv-quick { position:absolute; left:12px; right:12px; bottom:12px; opacity:0; transform:translateY(8px); transition:.22s; }
.nv-card-prod:hover .nv-quick { opacity:1; transform:translateY(0); }

.nv-aurora { position:absolute; inset:-40% -10% auto -10%; height:140%; background:
  radial-gradient(40% 60% at 25% 30%, rgba(124,58,237,.45), transparent 60%),
  radial-gradient(40% 55% at 78% 20%, rgba(37,99,235,.40), transparent 62%),
  radial-gradient(30% 45% at 60% 70%, rgba(159,103,255,.35), transparent 60%);
  filter:blur(14px); pointer-events:none; z-index:0; }
@keyframes nv-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes nv-up { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
@keyframes nv-shim { 0%{background-position:-300px 0} 100%{background-position:300px 0} }
.nv-float { animation:nv-float 5s ease-in-out infinite; }
.nv-up { animation:nv-up .5s cubic-bezier(.2,.7,.2,1) both; }
.nv-skel { background:linear-gradient(90deg,var(--bg2),var(--card),var(--bg2)); background-size:600px 100%; animation:nv-shim 1.2s linear infinite; border-radius:10px; }

.nv-star { color:#F59E0B; }
.nv-divider { height:1px; background:var(--border); }
.nv-table { width:100%; border-collapse:collapse; }
.nv-table th { text-align:left; font-size:11.5px; text-transform:uppercase; letter-spacing:.5px; color:var(--muted); font-weight:700; padding:12px 14px; border-bottom:1px solid var(--border); }
.nv-table td { padding:13px 14px; border-bottom:1px solid var(--border); font-size:13.5px; }
.nv-table tr:hover td { background:var(--bg2); }
.nv-pill { font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:999px; display:inline-flex; align-items:center; gap:5px; }

input[type=range].nv-range { -webkit-appearance:none; width:100%; height:5px; border-radius:9px; background:var(--border); outline:none; }
input[type=range].nv-range::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:var(--purple); border:3px solid var(--card); box-shadow:0 2px 6px rgba(124,58,237,.5); cursor:pointer; }

.nv-scrollx { display:flex; gap:18px; overflow-x:auto; scroll-snap-type:x mandatory; scroll-behavior:smooth; padding-bottom:6px; }
.nv-scrollx > * { scroll-snap-align:start; flex:0 0 auto; }
.nv-hide-sb { scrollbar-width:none; }
.nv-hide-sb::-webkit-scrollbar { display:none; }

.nv-step-dot { width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; flex:0 0 auto; }
.nv-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); z-index:90; background:var(--ink); color:var(--bg); padding:12px 18px; border-radius:12px; font-size:13.5px; font-weight:600; box-shadow:var(--shadow-lg); display:flex; align-items:center; gap:9px; animation:nv-up .3s both; }

.nv-side { width:230px; flex:0 0 auto; }
@media (max-width:980px){ .nv-side{ display:none; } }
.nv-hide-mob { }
@media (max-width:820px){ .nv-hide-mob{ display:none !important; } }
.nv-only-mob { display:none; }
@media (max-width:820px){ .nv-only-mob{ display:inline-flex; } }
`;

/* ----------------------------- mock data ----------------------------- */
const CATS = [
  { id: "fashion", name: "Fashion", icon: "👗", g: ["#F472B6", "#7C3AED"] },
  { id: "electronics", name: "Electronics", icon: "🎧", g: ["#2563EB", "#22D3EE"] },
  { id: "beauty", name: "Beauty", icon: "💄", g: ["#EC4899", "#F59E0B"] },
  { id: "home", name: "Home", icon: "🛋️", g: ["#10B981", "#84CC16"] },
  { id: "sports", name: "Sports", icon: "🏃", g: ["#F97316", "#EF4444"] },
];
const catOf = (id) => CATS.find((c) => c.id === id) || CATS[0];

const NAMES = {
  fashion: ["Aurora Wool Coat", "Linen Oversized Shirt", "Heritage Denim Jacket", "Silk Slip Dress", "Cashmere Crew Knit", "Tailored Trousers"],
  electronics: ["Pulse ANC Headphones", "Nova Smartwatch S2", "Lumen 4K Monitor", "Echo Mech Keyboard", "Drift Wireless Buds", "Volt Power Bank"],
  beauty: ["Velvet Matte Serum", "Glow Vitamin-C Set", "Hydra Night Cream", "Bloom Eau de Parfum", "Silk Lip Trio", "Pure Clay Mask"],
  home: ["Cloud Linen Bedding", "Terra Ceramic Vase", "Halo Floor Lamp", "Oak Side Table", "Mesa Wool Rug", "Aria Scented Candle"],
  sports: ["Strider Pro Runners", "Flux Yoga Mat", "Apex Dumbbell Set", "Trail 30L Backpack", "Core Resistance Kit", "Glide Cycling Jersey"],
};
const BRANDS = ["NOVA Studio", "Atelier 9", "Northwind", "Lumière", "Vertex", "Kasa"];

let _id = 0;
const PRODUCTS = CATS.flatMap((c, ci) =>
  NAMES[c.id].map((n, i) => {
    const base = 39 + ((ci * 7 + i * 13) % 26) * 9;
    const disc = [0, 0, 10, 15, 20, 25][(i + ci) % 6];
    return {
      id: ++_id,
      name: n,
      cat: c.id,
      brand: BRANDS[(i + ci) % BRANDS.length],
      price: base,
      discount: disc,
      rating: (3.8 + (((i * 3 + ci) % 12) / 10)).toFixed(1) * 1,
      reviews: 40 + ((i * 37 + ci * 53) % 480),
      stock: [0, 4, 18, 60, 120][(i + ci) % 5],
      sku: `NV-${c.id.slice(0, 2).toUpperCase()}-${100 + i}`,
      best: i < 2,
    };
  })
);
const finalPrice = (p) => +(p.price * (1 - p.discount / 100)).toFixed(0);

const REVIEWS = [
  { n: "Sara M.", t: "Checkout was the smoothest I've used. Order arrived in two days, beautifully packed.", r: 5, city: "Riyadh" },
  { n: "Daniel K.", t: "The product photos matched exactly. Quality feels well above the price point.", r: 5, city: "Dubai" },
  { n: "Layla A.", t: "Loved being able to track delivery step by step. I'll definitely shop again.", r: 4, city: "Cairo" },
  { n: "Omar H.", t: "Clean interface, fast search, fair prices. NOVA has become my default store.", r: 5, city: "Jeddah" },
];

const ADMIN_SALES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((m, i) => ({
  m, sales: 28 + i * 6 + (i % 3) * 9, orders: 120 + i * 40 + (i % 2) * 60,
}));
const ADMIN_CATS = CATS.map((c, i) => ({ name: c.name, value: [42, 31, 24, 19, 14][i], color: c.g[0] }));
const ADMIN_GROWTH = ADMIN_SALES.map((d, i) => ({ m: d.m, customers: 200 + i * 90 + (i % 2) * 50 }));
const ORDERS = [
  { id: "#NV-10482", cust: "Sara Mansour", total: 248, status: "Delivered", pay: "Paid", items: 3 },
  { id: "#NV-10481", cust: "Daniel Köhler", total: 89, status: "Shipped", pay: "Paid", items: 1 },
  { id: "#NV-10480", cust: "Layla Aziz", total: 412, status: "Processing", pay: "Paid", items: 5 },
  { id: "#NV-10479", cust: "Omar Halabi", total: 67, status: "Pending", pay: "Unpaid", items: 2 },
  { id: "#NV-10478", cust: "Nadia Roux", total: 533, status: "Delivered", pay: "Paid", items: 6 },
  { id: "#NV-10477", cust: "Ivan Petrov", total: 120, status: "Cancelled", pay: "Refunded", items: 2 },
];
const STATUS_COLOR = {
  Delivered: ["var(--green)", "rgba(22,163,74,.12)"],
  Shipped: ["var(--blue)", "var(--soft-blue)"],
  Processing: ["var(--amber)", "rgba(217,119,6,.12)"],
  Pending: ["var(--muted)", "rgba(120,120,130,.12)"],
  Cancelled: ["var(--rose)", "rgba(225,29,72,.12)"],
};

/* ----------------------------- small ui ----------------------------- */
const money = (n) => `$${Number(n).toLocaleString()}`;

function Stars({ r, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className="nv-star"
          fill={i <= Math.round(r) ? "#F59E0B" : "transparent"} strokeWidth={1.6} />
      ))}
    </span>
  );
}

function Thumb({ p, big }) {
  const c = catOf(p.cat);
  return (
    <div className="nv-thumb" style={{ background: `linear-gradient(135deg, ${c.g[0]}, ${c.g[1]})` }}>
      <span style={{ fontSize: big ? 96 : 46, filter: "drop-shadow(0 6px 14px rgba(0,0,0,.25))" }}>{c.icon}</span>
      <span style={{ position: "absolute", bottom: 10, left: 12, fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,.85)", letterSpacing: ".5px", textTransform: "uppercase", zIndex: 2 }}>{c.name}</span>
    </div>
  );
}

function ProductCard({ p, onOpen, onAdd, onWish, wished }) {
  const fp = finalPrice(p);
  return (
    <div className="nv-card-prod nv-up" style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        {p.discount > 0 && <span className="nv-badge">-{p.discount}%</span>}
        <button className="nv-wish" onClick={() => onWish(p.id)} aria-label="Add to wishlist">
          <Heart size={17} fill={wished ? "var(--rose)" : "transparent"} color={wished ? "var(--rose)" : "currentColor"} />
        </button>
        <div onClick={() => onOpen(p)} style={{ cursor: "pointer" }}><Thumb p={p} /></div>
        <div className="nv-quick">
          <button className="nv-btn nv-ghost" style={{ width: "100%", backdropFilter: "blur(6px)" }} onClick={() => onOpen(p)}>
            <Eye size={15} /> Quick view
          </button>
        </div>
      </div>
      <div style={{ padding: "12px 6px 4px" }}>
        <div className="nv-muted" style={{ fontSize: 11.5, fontWeight: 600 }}>{p.brand}</div>
        <div onClick={() => onOpen(p)} style={{ fontWeight: 600, fontSize: 14.5, margin: "3px 0 6px", cursor: "pointer" }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Stars r={p.rating} /><span className="nv-muted" style={{ fontSize: 12 }}>{p.rating} ({p.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
            <span style={{ fontWeight: 800, fontSize: 17 }}>{money(fp)}</span>
            {p.discount > 0 && <span className="nv-muted" style={{ textDecoration: "line-through", fontSize: 13 }}>{money(p.price)}</span>}
          </div>
          <button className="nv-btn nv-primary" style={{ padding: "9px 12px" }} onClick={() => onAdd(p)} aria-label="Add to cart">
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- nav + footer ----------------------------- */
function Nav({ go, route, cartCount, wishCount, dark, setDark, mode, setMode, q, setQ }) {
  const [open, setOpen] = useState(false);
  const links = [["home", "Home"], ["catalog", "Shop"], ["catalog", "Deals"], ["account", "Account"]];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "color-mix(in srgb,var(--card) 86%, transparent)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
      <div className="nv-wrap" style={{ display: "flex", alignItems: "center", gap: 16, height: 64 }}>
        <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,var(--purple),var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px -6px rgba(124,58,237,.7)" }}>
            <Sparkles size={18} color="#fff" />
          </span>
          <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: "-.5px" }}>NOVA</span>
        </button>

        <nav className="nv-hide-mob" style={{ display: "flex", gap: 4, marginLeft: 8 }}>
          {links.map(([r, l], i) => (
            <button key={i} onClick={() => go(r)} className="nv-chip" style={{ border: "none", background: route === r ? "var(--soft)" : "transparent", color: route === r ? "var(--purple)" : "var(--muted)" }}>{l}</button>
          ))}
        </nav>

        <div className="nv-hide-mob" style={{ flex: 1, maxWidth: 360, marginLeft: "auto", position: "relative" }}>
          <Search size={16} className="nv-muted" style={{ position: "absolute", left: 13, top: 12 }} />
          <input className="nv-input" style={{ paddingLeft: 36 }} placeholder="Search 30 products…" value={q}
            onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go("catalog")} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          <button className="nv-chip" onClick={() => setMode(mode === "store" ? "admin" : "store")} title="Switch view">
            {mode === "store" ? <LayoutDashboard size={15} /> : <Store size={15} />}
            <span className="nv-hide-mob">{mode === "store" ? "Admin" : "Store"}</span>
          </button>
          <button className="nv-chip" style={{ padding: 8 }} onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="nv-chip" style={{ padding: 8, position: "relative" }} onClick={() => go("account")}>
            <Heart size={16} />{wishCount > 0 && <Dot n={wishCount} />}
          </button>
          <button className="nv-btn nv-primary" style={{ padding: "9px 14px", position: "relative" }} onClick={() => go("cart")}>
            <ShoppingBag size={16} /><span className="nv-hide-mob">Cart</span>{cartCount > 0 && <Dot n={cartCount} light />}
          </button>
          <button className="nv-only-mob nv-chip" style={{ padding: 8 }} onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      {open && (
        <div className="nv-wrap" style={{ paddingBottom: 14 }}>
          <div style={{ position: "relative", marginBottom: 10 }}>
            <Search size={16} className="nv-muted" style={{ position: "absolute", left: 13, top: 12 }} />
            <input className="nv-input" style={{ paddingLeft: 36 }} placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { go("catalog"); setOpen(false); } }} />
          </div>
          {links.map(([r, l], i) => <button key={i} onClick={() => { go(r); setOpen(false); }} className="nv-btn nv-ghost" style={{ width: "100%", justifyContent: "flex-start", marginBottom: 6 }}>{l}</button>)}
        </div>
      )}
    </header>
  );
}
const Dot = ({ n, light }) => (
  <span style={{ position: "absolute", top: -5, right: -5, minWidth: 18, height: 18, padding: "0 5px", borderRadius: 9, background: light ? "#fff" : "var(--rose)", color: light ? "var(--purple)" : "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
);

function Footer({ go }) {
  const cols = [
    ["Company", ["About NOVA", "Careers", "Press", "Sustainability"]],
    ["Support", ["Help center", "Track order", "Returns", "Contact us"]],
    ["Policies", ["Privacy", "Terms", "Shipping", "Refunds"]],
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 60, background: "var(--bg2)" }}>
      <div className="nv-wrap" style={{ padding: "44px 22px 28px", display: "grid", gap: 34, gridTemplateColumns: "1.4fr 1fr 1fr 1fr" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,var(--purple),var(--blue))", display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={16} color="#fff" /></span>
            <span style={{ fontWeight: 900, fontSize: 18 }}>NOVA</span>
          </div>
          <p className="nv-muted" style={{ fontSize: 13.5, maxWidth: 260 }}>The future of shopping — premium products, transparent pricing, and delivery you can watch step by step.</p>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {["𝕏", "ⓘ", "f", "in"].map((s, i) => <span key={i} className="nv-chip" style={{ width: 34, height: 34, padding: 0, justifyContent: "center" }}>{s}</span>)}
          </div>
        </div>
        {cols.map(([h, items], i) => (
          <div key={i}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>{h}</div>
            {items.map((it, j) => <div key={j} className="nv-muted" style={{ fontSize: 13.5, padding: "5px 0", cursor: "pointer" }} onClick={() => go("catalog")}>{it}</div>)}
          </div>
        ))}
      </div>
      <div className="nv-divider" />
      <div className="nv-wrap" style={{ padding: "16px 22px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 12.5 }} >
        <span className="nv-muted">© 2026 NOVA Commerce. Prototype build.</span>
        <span className="nv-muted">Crafted with a purple → blue gradient.</span>
      </div>
    </footer>
  );
}

/* ----------------------------- HOME ----------------------------- */
function Home({ go, openP, addCart, toggleWish, wish }) {
  const featured = PRODUCTS.filter((p) => p.discount > 0).slice(0, 8);
  const best = PRODUCTS.filter((p) => p.best);
  const scroller = useRef(null);
  const scroll = (d) => scroller.current?.scrollBy({ left: d * 280, behavior: "smooth" });

  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div className="nv-aurora" />
        <div className="nv-wrap" style={{ position: "relative", zIndex: 1, padding: "64px 22px 56px", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 40, alignItems: "center" }}>
          <div className="nv-up">
            <span className="nv-chip nv-soft" style={{ border: "none", marginBottom: 18 }}><Sparkles size={13} /> New season · up to 25% off</span>
            <h1 style={{ fontSize: 52, lineHeight: 1.04, fontWeight: 900, letterSpacing: "-1.5px" }}>
              Discover the <span className="nv-grad-text">future</span> of shopping
            </h1>
            <p className="nv-muted" style={{ fontSize: 16.5, marginTop: 18, maxWidth: 460 }}>
              A curated store built for speed and clarity. Premium products, honest prices, and a checkout that gets out of your way.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <button className="nv-btn nv-primary" style={{ padding: "13px 22px", fontSize: 15 }} onClick={() => go("catalog")}>Shop the collection <ArrowRight size={17} /></button>
              <button className="nv-btn nv-ghost" style={{ padding: "13px 22px", fontSize: 15 }} onClick={() => go("catalog")}>Browse deals</button>
            </div>
            <div style={{ display: "flex", gap: 26, marginTop: 34 }}>
              {[["30+", "Products"], ["4.9★", "Avg rating"], ["2-day", "Delivery"]].map(([a, b], i) => (
                <div key={i}><div style={{ fontWeight: 800, fontSize: 22 }}>{a}</div><div className="nv-muted" style={{ fontSize: 12.5 }}>{b}</div></div>
              ))}
            </div>
          </div>
          <div className="nv-float" style={{ position: "relative" }}>
            <div className="nv-card" style={{ padding: 16, transform: "rotate(-3deg)", maxWidth: 320, marginLeft: "auto" }}>
              <Thumb p={featured[0]} big />
              <div style={{ padding: "14px 6px 4px" }}>
                <div className="nv-muted" style={{ fontSize: 12 }}>{featured[0].brand}</div>
                <div style={{ fontWeight: 700, fontSize: 16, margin: "2px 0 8px" }}>{featured[0].name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: 20 }}>{money(finalPrice(featured[0]))}</span>
                  <span className="nv-pill" style={{ background: "var(--soft)", color: "var(--purple)" }}>Best value</span>
                </div>
              </div>
            </div>
            <div className="nv-card" style={{ padding: 14, position: "absolute", bottom: -18, left: -8, transform: "rotate(4deg)", maxWidth: 210 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(22,163,74,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}><Truck size={20} color="var(--green)" /></span>
                <div><div style={{ fontWeight: 700, fontSize: 13 }}>Order shipped</div><div className="nv-muted" style={{ fontSize: 12 }}>Arrives tomorrow</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <Section title="Shop by category" sub="Five worlds, one checkout" go={go}>
        <div className="nv-cat-grid">
          {CATS.map((c) => (
            <button key={c.id} onClick={() => go("catalog", { cat: c.id })} className="nv-card" style={{ padding: 0, overflow: "hidden", textAlign: "left", transition: ".2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
              <div style={{ height: 110, background: `linear-gradient(135deg,${c.g[0]},${c.g[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>{c.icon}</div>
              <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 14.5 }}>{c.name}</span><ChevronRight size={16} className="nv-muted" />
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* FEATURED */}
      <Section title="Featured products" sub="Hand-picked, on sale this week" go={go} action={() => go("catalog")}>
        <div className="nv-prod-grid">
          {featured.map((p) => <ProductCard key={p.id} p={p} onOpen={openP} onAdd={addCart} onWish={toggleWish} wished={wish.includes(p.id)} />)}
        </div>
      </Section>

      {/* BEST SELLERS carousel */}
      <Section title="Best sellers" sub="What everyone's adding to cart" go={go}
        right={<div style={{ display: "flex", gap: 8 }}>
          <button className="nv-chip" style={{ padding: 9 }} onClick={() => scroll(-1)}><ChevronLeft size={16} /></button>
          <button className="nv-chip" style={{ padding: 9 }} onClick={() => scroll(1)}><ChevronRight size={16} /></button>
        </div>}>
        <div className="nv-scrollx nv-hide-sb" ref={scroller}>
          {best.map((p) => <div key={p.id} style={{ width: 250 }}><ProductCard p={p} onOpen={openP} onAdd={addCart} onWish={toggleWish} wished={wish.includes(p.id)} /></div>)}
        </div>
      </Section>

      {/* REVIEWS */}
      <Section title="Loved by shoppers" sub="Real words from real carts">
        <div className="nv-prod-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" }}>
          {REVIEWS.map((rv, i) => (
            <div key={i} className="nv-card" style={{ padding: 20 }}>
              <Stars r={rv.r} size={15} />
              <p style={{ fontSize: 14.5, margin: "12px 0 16px", lineHeight: 1.55 }}>"{rv.t}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,var(--purple),var(--blue))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{rv.n[0]}</span>
                <div><div style={{ fontWeight: 700, fontSize: 13.5 }}>{rv.n}</div><div className="nv-muted" style={{ fontSize: 12 }}>{rv.city}</div></div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER */}
      <div className="nv-wrap" style={{ padding: "10px 22px 0" }}>
        <div className="nv-card" style={{ position: "relative", overflow: "hidden", padding: "40px 32px", background: "linear-gradient(120deg,var(--purple),var(--blue))", border: "none" }}>
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between", color: "#fff" }}>
            <div>
              <h3 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-.5px" }}>Get 15% off your first order</h3>
              <p style={{ opacity: .9, marginTop: 6, fontSize: 14.5 }}>Join the newsletter for early drops and members-only deals.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flex: "1 1 320px", maxWidth: 440 }}>
              <input className="nv-input" placeholder="you@email.com" style={{ background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.3)", color: "#fff" }} />
              <button className="nv-btn" style={{ background: "#fff", color: "var(--purple)", padding: "11px 20px" }}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, sub, children, action, right }) {
  return (
    <section className="nv-wrap" style={{ padding: "44px 22px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22, gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-.6px" }}>{title}</h2>
          {sub && <p className="nv-muted" style={{ fontSize: 14, marginTop: 4 }}>{sub}</p>}
        </div>
        {right || (action && <button className="nv-chip" onClick={action}>View all <ChevronRight size={14} /></button>)}
      </div>
      {children}
    </section>
  );
}

/* ----------------------------- CATALOG ----------------------------- */
function Catalog({ go, openP, addCart, toggleWish, wish, q, setQ, initCat }) {
  const [cat, setCat] = useState(initCat || "all");
  const [view, setView] = useState("grid");
  const [maxP, setMaxP] = useState(300);
  const [minR, setMinR] = useState(0);
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 550); return () => clearTimeout(t); }, [cat, sort, q, maxP, minR]);

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) =>
      (cat === "all" || p.cat === cat) &&
      finalPrice(p) <= maxP && p.rating >= minR &&
      (!q || (p.name + p.brand).toLowerCase().includes(q.toLowerCase())));
    if (sort === "low") l = [...l].sort((a, b) => finalPrice(a) - finalPrice(b));
    if (sort === "high") l = [...l].sort((a, b) => finalPrice(b) - finalPrice(a));
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [cat, maxP, minR, q, sort]);

  return (
    <div className="nv-wrap" style={{ padding: "28px 22px 0", display: "flex", gap: 26, alignItems: "flex-start" }}>
      {/* sidebar */}
      <aside className="nv-side">
        <div className="nv-card" style={{ padding: 18, position: "sticky", top: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><SlidersHorizontal size={16} /><span style={{ fontWeight: 700 }}>Filters</span></div>
          <Label>Category</Label>
          {["all", ...CATS.map((c) => c.id)].map((id) => (
            <button key={id} onClick={() => setCat(id)} style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 9, marginBottom: 3, background: cat === id ? "var(--soft)" : "transparent", color: cat === id ? "var(--purple)" : "var(--ink)", fontWeight: cat === id ? 700 : 500, fontSize: 13.5 }}>
              <span style={{ textTransform: "capitalize" }}>{id === "all" ? "All products" : catOf(id).name}</span>
              <span className="nv-muted" style={{ fontSize: 12 }}>{id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === id).length}</span>
            </button>
          ))}
          <div style={{ height: 14 }} />
          <Label>Max price · {money(maxP)}</Label>
          <input type="range" className="nv-range" min={20} max={300} value={maxP} onChange={(e) => setMaxP(+e.target.value)} />
          <div style={{ height: 18 }} />
          <Label>Minimum rating</Label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[0, 3, 4, 4.5].map((r) => <button key={r} className={"nv-chip" + (minR === r ? " on" : "")} onClick={() => setMinR(r)}>{r === 0 ? "Any" : `${r}+`}</button>)}
          </div>
        </div>
      </aside>

      {/* main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-.6px", textTransform: "capitalize" }}>{cat === "all" ? "All products" : catOf(cat).name}</h1>
            <p className="nv-muted" style={{ fontSize: 13.5, marginTop: 3 }}>{loading ? "Loading…" : `${list.length} items`}{q ? ` · "${q}"` : ""}</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select className="nv-input" style={{ width: "auto", paddingRight: 30 }} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option><option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option><option value="rating">Top rated</option>
            </select>
            <div className="nv-card" style={{ padding: 3, display: "flex", gap: 2, borderRadius: 11 }}>
              <button className="nv-btn" style={{ padding: 8, background: view === "grid" ? "var(--soft)" : "transparent", color: view === "grid" ? "var(--purple)" : "var(--muted)" }} onClick={() => setView("grid")}><LayoutGrid size={16} /></button>
              <button className="nv-btn" style={{ padding: 8, background: view === "list" ? "var(--soft)" : "transparent", color: view === "list" ? "var(--purple)" : "var(--muted)" }} onClick={() => setView("list")}><List size={16} /></button>
            </div>
          </div>
        </div>

        {/* mobile category chips */}
        <div className="nv-only-mob" style={{ gap: 8, flexWrap: "wrap", marginBottom: 16, display: "flex" }}>
          {["all", ...CATS.map((c) => c.id)].map((id) => <button key={id} className={"nv-chip" + (cat === id ? " on" : "")} onClick={() => setCat(id)} style={{ textTransform: "capitalize" }}>{id === "all" ? "All" : catOf(id).name}</button>)}
        </div>

        {loading ? (
          <div className="nv-prod-grid">{Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="nv-card" style={{ padding: 12 }}><div className="nv-skel" style={{ aspectRatio: "1/1", borderRadius: 14 }} /><div className="nv-skel" style={{ height: 12, margin: "12px 0 8px", width: "60%" }} /><div className="nv-skel" style={{ height: 16, width: "40%" }} /></div>
          ))}</div>
        ) : list.length === 0 ? (
          <div className="nv-card" style={{ padding: "60px 20px", textAlign: "center" }}>
            <Search size={34} className="nv-muted" style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 17 }}>Nothing matches those filters</div>
            <p className="nv-muted" style={{ fontSize: 14, margin: "6px 0 18px" }}>Try widening the price range or clearing the search.</p>
            <button className="nv-btn nv-primary" onClick={() => { setCat("all"); setMaxP(300); setMinR(0); setQ(""); }}>Reset filters</button>
          </div>
        ) : view === "grid" ? (
          <div className="nv-prod-grid">{list.map((p) => <ProductCard key={p.id} p={p} onOpen={openP} onAdd={addCart} onWish={toggleWish} wished={wish.includes(p.id)} />)}</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {list.map((p) => (
              <div key={p.id} className="nv-card" style={{ padding: 12, display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 110, flex: "0 0 auto", cursor: "pointer" }} onClick={() => openP(p)}><Thumb p={p} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="nv-muted" style={{ fontSize: 12 }}>{p.brand}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, cursor: "pointer" }} onClick={() => openP(p)}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "5px 0" }}><Stars r={p.rating} /><span className="nv-muted" style={{ fontSize: 12 }}>{p.rating} ({p.reviews})</span></div>
                  <span style={{ fontWeight: 800, fontSize: 18 }}>{money(finalPrice(p))}</span>
                  {p.discount > 0 && <span className="nv-muted" style={{ textDecoration: "line-through", fontSize: 13, marginLeft: 8 }}>{money(p.price)}</span>}
                </div>
                <div style={{ display: "flex", gap: 8, flex: "0 0 auto" }}>
                  <button className="nv-btn nv-ghost" onClick={() => toggleWish(p.id)}><Heart size={16} fill={wish.includes(p.id) ? "var(--rose)" : "transparent"} /></button>
                  <button className="nv-btn nv-primary" onClick={() => addCart(p)}><Plus size={16} /> Add</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
const Label = ({ children }) => <div className="nv-muted" style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 9 }}>{children}</div>;

/* ----------------------------- PRODUCT DETAILS ----------------------------- */
function Product({ p, go, addCart, toggleWish, wished, openP }) {
  const [tab, setTab] = useState("desc");
  const [color, setColor] = useState("Onyx");
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const fp = finalPrice(p);
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const colors = [["Onyx", "#27272A"], ["Purple", "#7C3AED"], ["Azure", "#2563EB"], ["Sand", "#D6C3A5"]];

  return (
    <div className="nv-wrap" style={{ padding: "20px 22px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, marginBottom: 18 }} className="nv-muted">
        <span style={{ cursor: "pointer" }} onClick={() => go("home")}>Home</span><ChevronRight size={13} />
        <span style={{ cursor: "pointer" }} onClick={() => go("catalog", { cat: p.cat })}>{catOf(p.cat).name}</span><ChevronRight size={13} />
        <span style={{ color: "var(--ink)" }}>{p.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "flex-start" }}>
        {/* gallery */}
        <div>
          <div className="nv-card" style={{ padding: 0, overflow: "hidden", cursor: "zoom-in" }} onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)}>
            <div style={{ transition: ".4s", transform: zoom ? "scale(1.12)" : "none" }}><Thumb p={p} big /></div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {[0, 1, 2, 3].map((i) => <div key={i} className="nv-card" style={{ padding: 0, overflow: "hidden", width: 70, height: 70, opacity: i === 0 ? 1 : .55, cursor: "pointer", border: i === 0 ? "2px solid var(--purple)" : "1px solid var(--border)" }}><Thumb p={p} /></div>)}
          </div>
        </div>

        {/* info */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span className="nv-chip nv-soft" style={{ border: "none" }}>{p.brand}</span>
            {p.stock > 0 ? <span className="nv-pill" style={{ background: "rgba(22,163,74,.12)", color: "var(--green)" }}><Check size={12} /> In stock</span>
              : <span className="nv-pill" style={{ background: "rgba(225,29,72,.12)", color: "var(--rose)" }}>Out of stock</span>}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-.8px", lineHeight: 1.1 }}>{p.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0 18px" }}>
            <Stars r={p.rating} size={16} /><span style={{ fontWeight: 700 }}>{p.rating}</span>
            <span className="nv-muted" style={{ fontSize: 13.5 }}>· {p.reviews} reviews</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
            <span style={{ fontSize: 34, fontWeight: 900 }}>{money(fp)}</span>
            {p.discount > 0 && <><span className="nv-muted" style={{ textDecoration: "line-through", fontSize: 18 }}>{money(p.price)}</span><span className="nv-pill" style={{ background: "var(--rose)", color: "#fff" }}>Save {p.discount}%</span></>}
          </div>

          <Label>Color · {color}</Label>
          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            {colors.map(([n, c]) => <button key={n} onClick={() => setColor(n)} title={n} style={{ width: 34, height: 34, borderRadius: 10, background: c, border: color === n ? "2px solid var(--purple)" : "2px solid var(--border)", boxShadow: color === n ? "0 0 0 3px var(--soft)" : "none" }} />)}
          </div>
          <Label>Size</Label>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {["XS", "S", "M", "L", "XL"].map((s) => <button key={s} className={"nv-chip" + (size === s ? " on" : "")} style={{ minWidth: 46, justifyContent: "center" }} onClick={() => setSize(s)}>{s}</button>)}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
            <div className="nv-card" style={{ display: "flex", alignItems: "center", padding: 4, borderRadius: 12 }}>
              <button className="nv-btn" style={{ padding: 9 }} onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
              <span style={{ width: 38, textAlign: "center", fontWeight: 700 }}>{qty}</span>
              <button className="nv-btn" style={{ padding: 9 }} onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
            </div>
            <button className="nv-btn nv-primary" style={{ flex: 1, padding: "13px 20px" }} onClick={() => addCart(p, qty)}><ShoppingBag size={17} /> Add to cart</button>
            <button className="nv-btn nv-ghost" style={{ padding: 13 }} onClick={() => toggleWish(p.id)}><Heart size={18} fill={wished ? "var(--rose)" : "transparent"} color={wished ? "var(--rose)" : "currentColor"} /></button>
          </div>
          <button className="nv-btn nv-ghost" style={{ width: "100%", padding: "13px 20px", marginBottom: 22, borderColor: "var(--purple)", color: "var(--purple)" }} onClick={() => { addCart(p, qty); go("checkout"); }}>Buy now</button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[[Truck, "Free delivery", "On orders over $50"], [ShieldCheck, "2-year warranty", "Full coverage"], [CreditCard, "Secure checkout", "Encrypted payment"], [Package, "Easy returns", "30-day window"]].map(([Ic, t, s], i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ width: 38, height: 38, borderRadius: 11, background: "var(--soft)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic size={18} color="var(--purple)" /></span>
                <div><div style={{ fontWeight: 700, fontSize: 13 }}>{t}</div><div className="nv-muted" style={{ fontSize: 12 }}>{s}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* tabs */}
      <div style={{ marginTop: 44 }}>
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--border)", marginBottom: 22 }}>
          {[["desc", "Description"], ["specs", "Specifications"], ["reviews", "Reviews"], ["ship", "Shipping"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ padding: "12px 16px", fontWeight: 600, fontSize: 14, color: tab === k ? "var(--purple)" : "var(--muted)", borderBottom: tab === k ? "2px solid var(--purple)" : "2px solid transparent", marginBottom: -1 }}>{l}</button>
          ))}
        </div>
        <div style={{ maxWidth: 760, fontSize: 14.5, lineHeight: 1.7 }} className="nv-up">
          {tab === "desc" && <p className="nv-muted">The {p.name} from {p.brand} blends considered materials with everyday durability. Designed for people who want fewer, better things — it pairs a clean silhouette with finishes that hold up. Each unit is quality-checked before it ships, and arrives in recyclable packaging.</p>}
          {tab === "specs" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", borderRadius: 12, overflow: "hidden" }}>
            {[["Brand", p.brand], ["SKU", p.sku], ["Category", catOf(p.cat).name], ["Weight", "0.8 kg"], ["Material", "Premium composite"], ["Warranty", "24 months"]].map(([k, v], i) => (
              <div key={i} style={{ background: "var(--card)", padding: "12px 16px", display: "flex", justifyContent: "space-between" }}><span className="nv-muted">{k}</span><span style={{ fontWeight: 600 }}>{v}</span></div>
            ))}
          </div>}
          {tab === "reviews" && <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {REVIEWS.slice(0, 3).map((rv, i) => (
              <div key={i} className="nv-card" style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontWeight: 700, fontSize: 14 }}>{rv.n}</span><Stars r={rv.r} /></div>
                <p className="nv-muted">{rv.t}</p>
              </div>
            ))}
          </div>}
          {tab === "ship" && <p className="nv-muted">Standard delivery in 2–4 business days. Orders over $50 ship free; express options are offered at checkout. We deliver across the GCC and beyond, with live tracking from dispatch to doorstep.</p>}
        </div>
      </div>

      <Section title="You may also like">
        <div className="nv-prod-grid">{related.map((p2) => <ProductCard key={p2.id} p={p2} onOpen={openP} onAdd={addCart} onWish={toggleWish} wished={wished} />)}</div>
      </Section>
    </div>
  );
}

/* ----------------------------- CART ----------------------------- */
function Cart({ cart, setQty, remove, go }) {
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const sub = cart.reduce((s, it) => s + finalPrice(it.p) * it.qty, 0);
  const ship = sub > 50 || sub === 0 ? 0 : 6;
  const off = applied ? Math.round(sub * 0.1) : 0;
  const total = sub + ship - off;

  if (cart.length === 0) return (
    <div className="nv-wrap" style={{ padding: "60px 22px" }}>
      <div className="nv-card" style={{ padding: "60px 20px", textAlign: "center", maxWidth: 460, margin: "0 auto" }}>
        <ShoppingBag size={38} className="nv-muted" style={{ marginBottom: 14 }} />
        <h2 style={{ fontWeight: 800, fontSize: 22 }}>Your cart is empty</h2>
        <p className="nv-muted" style={{ fontSize: 14.5, margin: "8px 0 20px" }}>Browse the collection and add something you'll love.</p>
        <button className="nv-btn nv-primary" onClick={() => go("catalog")}>Start shopping <ArrowRight size={16} /></button>
      </div>
    </div>
  );

  return (
    <div className="nv-wrap" style={{ padding: "28px 22px 0" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-.6px", marginBottom: 22 }}>Shopping cart <span className="nv-muted" style={{ fontWeight: 600, fontSize: 18 }}>· {cart.length}</span></h1>
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 26, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map((it) => (
            <div key={it.p.id} className="nv-card" style={{ padding: 12, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 92, flex: "0 0 auto" }}><Thumb p={it.p} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="nv-muted" style={{ fontSize: 12 }}>{it.p.brand}</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{it.p.name}</div>
                <div style={{ fontWeight: 800, fontSize: 15, marginTop: 4 }}>{money(finalPrice(it.p))}</div>
              </div>
              <div className="nv-card" style={{ display: "flex", alignItems: "center", padding: 3, borderRadius: 10 }}>
                <button className="nv-btn" style={{ padding: 7 }} onClick={() => setQty(it.p.id, Math.max(1, it.qty - 1))}><Minus size={14} /></button>
                <span style={{ width: 32, textAlign: "center", fontWeight: 700, fontSize: 14 }}>{it.qty}</span>
                <button className="nv-btn" style={{ padding: 7 }} onClick={() => setQty(it.p.id, it.qty + 1)}><Plus size={14} /></button>
              </div>
              <button className="nv-btn" style={{ padding: 9, color: "var(--rose)" }} onClick={() => remove(it.p.id)}><Trash2 size={17} /></button>
            </div>
          ))}
        </div>

        <div className="nv-card" style={{ padding: 20, position: "sticky", top: 80 }}>
          <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 16 }}>Order summary</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input className="nv-input" placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            <button className="nv-btn nv-ghost" onClick={() => setApplied(coupon.trim().length > 0)}>Apply</button>
          </div>
          {applied && <div className="nv-pill" style={{ background: "rgba(22,163,74,.12)", color: "var(--green)", marginBottom: 14 }}><Tag size={12} /> 10% coupon applied</div>}
          <Row k="Subtotal" v={money(sub)} />
          <Row k="Shipping" v={ship === 0 ? "Free" : money(ship)} />
          {off > 0 && <Row k="Discount" v={`– ${money(off)}`} green />}
          <div className="nv-divider" style={{ margin: "14px 0" }} />
          <Row k="Total" v={money(total)} big />
          <button className="nv-btn nv-primary" style={{ width: "100%", padding: "13px", marginTop: 18 }} onClick={() => go("checkout")}>Checkout <ArrowRight size={16} /></button>
          <button className="nv-btn nv-ghost" style={{ width: "100%", padding: "11px", marginTop: 8 }} onClick={() => go("catalog")}>Continue shopping</button>
        </div>
      </div>
    </div>
  );
}
const Row = ({ k, v, big, green }) => (
  <div style={{ display: "flex", justifyContent: "space-between", margin: "6px 0", fontSize: big ? 18 : 14, fontWeight: big ? 800 : 500 }}>
    <span className={big ? "" : "nv-muted"}>{k}</span><span style={{ color: green ? "var(--green)" : "inherit" }}>{v}</span>
  </div>
);

/* ----------------------------- CHECKOUT ----------------------------- */
function Checkout({ cart, go, clear }) {
  const [step, setStep] = useState(0);
  const steps = ["Shipping", "Delivery", "Payment", "Confirm"];
  const [ship, setShip] = useState("express");
  const sub = cart.reduce((s, it) => s + finalPrice(it.p) * it.qty, 0);
  const shipCost = ship === "express" ? 9 : 0;
  const total = sub + shipCost;

  return (
    <div className="nv-wrap" style={{ padding: "28px 22px 0", maxWidth: 980 }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-.6px", marginBottom: 24 }}>Checkout</h1>
      {/* stepper */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span className="nv-step-dot" style={{ background: i <= step ? "linear-gradient(135deg,var(--purple),var(--blue))" : "var(--bg2)", color: i <= step ? "#fff" : "var(--muted)", border: i <= step ? "none" : "1px solid var(--border)" }}>{i < step ? <Check size={15} /> : i + 1}</span>
              <span className="nv-hide-mob" style={{ fontSize: 13.5, fontWeight: i === step ? 700 : 500, color: i <= step ? "var(--ink)" : "var(--muted)" }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, margin: "0 12px", background: i < step ? "var(--purple)" : "var(--border)" }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: step < 3 ? "1.6fr 1fr" : "1fr", gap: 26, alignItems: "flex-start" }}>
        <div className="nv-card" style={{ padding: 24 }}>
          {step === 0 && <div className="nv-up">
            <H>Shipping information</H>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="First name" ph="Hatem" /><Field label="Last name" ph="—" />
              <Field label="Email" ph="you@email.com" wide /><Field label="Phone" ph="+966 …" wide />
              <Field label="Address" ph="Street, building" wide />
              <Field label="City" ph="Riyadh" /><Field label="Postal code" ph="12345" />
            </div>
          </div>}
          {step === 1 && <div className="nv-up">
            <H>Delivery method</H>
            {[["express", "Express", "Next-day delivery", "$9"], ["standard", "Standard", "2–4 business days", "Free"]].map(([k, t, d, p]) => (
              <button key={k} onClick={() => setShip(k)} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 14, marginBottom: 10, border: ship === k ? "2px solid var(--purple)" : "1px solid var(--border)", background: ship === k ? "var(--soft)" : "var(--card)" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", border: ship === k ? "6px solid var(--purple)" : "2px solid var(--border)" }} />
                <Truck size={20} className="nv-muted" />
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14.5 }}>{t}</div><div className="nv-muted" style={{ fontSize: 13 }}>{d}</div></div>
                <span style={{ fontWeight: 800 }}>{p}</span>
              </button>
            ))}
          </div>}
          {step === 2 && <div className="nv-up">
            <H>Payment method</H>
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              {["Card", "Apple Pay", "Cash on delivery"].map((m, i) => <span key={i} className={"nv-chip" + (i === 0 ? " on" : "")}>{m}</span>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Card number" ph="•••• •••• •••• 4242" wide />
              <Field label="Expiry" ph="MM / YY" /><Field label="CVC" ph="•••" />
              <Field label="Name on card" ph="Full name" wide />
            </div>
            <div className="nv-pill" style={{ background: "var(--soft)", color: "var(--purple)", marginTop: 14 }}><ShieldCheck size={13} /> This is a demo — no real payment is processed.</div>
          </div>}
          {step === 3 && <div className="nv-up" style={{ textAlign: "center", padding: "30px 10px" }}>
            <span style={{ width: 76, height: 76, borderRadius: "50%", background: "rgba(22,163,74,.12)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}><Check size={38} color="var(--green)" /></span>
            <h2 style={{ fontSize: 26, fontWeight: 900 }}>Order confirmed</h2>
            <p className="nv-muted" style={{ fontSize: 14.5, margin: "8px 0 4px" }}>Thanks — your order <b style={{ color: "var(--ink)" }}>#NV-10483</b> is on its way.</p>
            <p className="nv-muted" style={{ fontSize: 14.5, marginBottom: 24 }}>A confirmation has been sent to your email.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button className="nv-btn nv-primary" onClick={() => { clear(); go("home"); }}>Back to store</button>
              <button className="nv-btn nv-ghost" onClick={() => { clear(); go("account"); }}>View orders</button>
            </div>
          </div>}

          {step < 3 && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <button className="nv-btn nv-ghost" onClick={() => (step === 0 ? go("cart") : setStep(step - 1))}><ChevronLeft size={16} /> Back</button>
              <button className="nv-btn nv-primary" onClick={() => setStep(step + 1)}>{step === 2 ? "Place order" : "Continue"} <ArrowRight size={16} /></button>
            </div>
          )}
        </div>

        {step < 3 && (
          <div className="nv-card" style={{ padding: 20, position: "sticky", top: 80 }}>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 14 }}>Your order</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
              {cart.map((it) => (
                <div key={it.p.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 46, flex: "0 0 auto" }}><Thumb p={it.p} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.p.name}</div><div className="nv-muted" style={{ fontSize: 12 }}>Qty {it.qty}</div></div>
                  <span style={{ fontWeight: 700, fontSize: 13.5 }}>{money(finalPrice(it.p) * it.qty)}</span>
                </div>
              ))}
            </div>
            <div className="nv-divider" style={{ margin: "10px 0" }} />
            <Row k="Subtotal" v={money(sub)} />
            <Row k="Shipping" v={shipCost === 0 ? "Free" : money(shipCost)} />
            <div className="nv-divider" style={{ margin: "10px 0" }} />
            <Row k="Total" v={money(total)} big />
          </div>
        )}
      </div>
    </div>
  );
}
const H = ({ children }) => <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 18 }}>{children}</h2>;
const Field = ({ label, ph, wide }) => (
  <div style={{ gridColumn: wide ? "1 / -1" : "auto" }}>
    <Label>{label}</Label><input className="nv-input" placeholder={ph} />
  </div>
);

/* ----------------------------- ACCOUNT ----------------------------- */
function Account({ go, wish, openP, addCart, toggleWish }) {
  const [tab, setTab] = useState("orders");
  const tabs = [["orders", "Orders", Package], ["wishlist", "Wishlist", Heart], ["addresses", "Addresses", Truck], ["profile", "Profile", User]];
  const wishItems = PRODUCTS.filter((p) => wish.includes(p.id));
  return (
    <div className="nv-wrap" style={{ padding: "28px 22px 0", display: "flex", gap: 26, alignItems: "flex-start" }}>
      <aside className="nv-side">
        <div className="nv-card" style={{ padding: 16, position: "sticky", top: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,var(--purple),var(--blue))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>H</span>
            <div><div style={{ fontWeight: 700, fontSize: 14 }}>Hatem</div><div className="nv-muted" style={{ fontSize: 12 }}>Gold member</div></div>
          </div>
          {tabs.map(([k, l, Ic]) => (
            <button key={k} onClick={() => setTab(k)} style={{ display: "flex", width: "100%", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, marginBottom: 3, background: tab === k ? "var(--soft)" : "transparent", color: tab === k ? "var(--purple)" : "var(--ink)", fontWeight: tab === k ? 700 : 500, fontSize: 14 }}><Ic size={17} /> {l}</button>
          ))}
        </div>
      </aside>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-.5px", marginBottom: 20, textTransform: "capitalize" }}>{tab}</h1>
        {tab === "orders" && <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ORDERS.slice(0, 4).map((o) => {
            const [c, bg] = STATUS_COLOR[o.status];
            return <div key={o.id} className="nv-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14.5 }}>{o.id}</div><div className="nv-muted" style={{ fontSize: 12.5 }}>{o.items} items · {money(o.total)}</div></div>
              <span className="nv-pill" style={{ background: bg, color: c }}>{o.status}</span>
              <button className="nv-btn nv-ghost" onClick={() => go("home")}>Track</button>
            </div>;
          })}
        </div>}
        {tab === "wishlist" && (wishItems.length ? <div className="nv-prod-grid">{wishItems.map((p) => <ProductCard key={p.id} p={p} onOpen={openP} onAdd={addCart} onWish={toggleWish} wished />)}</div>
          : <Empty icon={Heart} title="No saved items yet" sub="Tap the heart on any product to keep it here." cta="Browse products" onCta={() => go("catalog")} />)}
        {tab === "addresses" && <div className="nv-card" style={{ padding: 20, maxWidth: 460 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Home</div>
          <p className="nv-muted" style={{ fontSize: 14 }}>King Fahd Rd, Al Olaya<br />Riyadh 12211, Saudi Arabia</p>
          <button className="nv-btn nv-ghost" style={{ marginTop: 14 }}><Plus size={15} /> Add address</button>
        </div>}
        {tab === "profile" && <div className="nv-card" style={{ padding: 24, maxWidth: 520 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="First name" ph="Hatem" /><Field label="Last name" ph="—" />
            <Field label="Email" ph="info@wsla.io" wide /><Field label="Phone" ph="+966 …" wide />
          </div>
          <button className="nv-btn nv-primary" style={{ marginTop: 18 }}>Save changes</button>
        </div>}
      </div>
    </div>
  );
}
const Empty = ({ icon: Ic, title, sub, cta, onCta }) => (
  <div className="nv-card" style={{ padding: "50px 20px", textAlign: "center" }}>
    <Ic size={32} className="nv-muted" style={{ marginBottom: 12 }} />
    <div style={{ fontWeight: 700, fontSize: 17 }}>{title}</div>
    <p className="nv-muted" style={{ fontSize: 14, margin: "6px 0 18px" }}>{sub}</p>
    <button className="nv-btn nv-primary" onClick={onCta}>{cta}</button>
  </div>
);

/* ----------------------------- ADMIN ----------------------------- */
function Admin({ go, dark }) {
  const [page, setPage] = useState("overview");
  const nav = [["overview", "Dashboard", LayoutDashboard], ["products", "Products", Package], ["orders", "Orders", ShoppingBag], ["customers", "Customers", Users], ["analytics", "Analytics", BarChart3]];
  const axis = { fontSize: 11, fill: "var(--muted)" };
  const grid = dark ? "#27272A" : "#ECECEF";

  return (
    <div style={{ display: "flex", minHeight: "70vh" }}>
      <aside className="nv-side" style={{ borderRight: "1px solid var(--border)", padding: "20px 14px", background: "var(--card)" }}>
        <div style={{ fontWeight: 800, fontSize: 12, color: "var(--muted)", letterSpacing: ".5px", padding: "0 10px 12px" }}>ADMIN</div>
        {nav.map(([k, l, Ic]) => (
          <button key={k} onClick={() => setPage(k)} style={{ display: "flex", width: "100%", alignItems: "center", gap: 11, padding: "11px 12px", borderRadius: 11, marginBottom: 3, background: page === k ? "var(--soft)" : "transparent", color: page === k ? "var(--purple)" : "var(--ink)", fontWeight: page === k ? 700 : 500, fontSize: 14 }}><Ic size={18} /> {l}</button>
        ))}
        <div className="nv-divider" style={{ margin: "14px 0" }} />
        <button onClick={() => go("home")} style={{ display: "flex", width: "100%", alignItems: "center", gap: 11, padding: "11px 12px", borderRadius: 11, color: "var(--muted)", fontSize: 14 }}><Store size={18} /> View store</button>
      </aside>

      <div style={{ flex: 1, minWidth: 0, padding: "26px 26px 0" }}>
        {/* mobile admin nav */}
        <div className="nv-only-mob" style={{ gap: 8, flexWrap: "wrap", marginBottom: 18, display: "flex" }}>
          {nav.map(([k, l]) => <button key={k} className={"nv-chip" + (page === k ? " on" : "")} onClick={() => setPage(k)}>{l}</button>)}
        </div>

        {page === "overview" && <div className="nv-up">
          <Head t="Dashboard" s="Store performance at a glance" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 }}>
            {[["Total revenue", "$284,920", 12.4, true, DollarSign], ["Orders", "3,842", 8.1, true, ShoppingBag], ["Customers", "12,508", 5.6, true, Users], ["Conversion", "3.24%", 1.2, false, TrendingUp]].map(([l, v, d, up, Ic], i) => (
              <div key={i} className="nv-card" style={{ padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 11, background: "var(--soft)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic size={19} color="var(--purple)" /></span>
                  <span className="nv-pill" style={{ background: up ? "rgba(22,163,74,.12)" : "rgba(225,29,72,.12)", color: up ? "var(--green)" : "var(--rose)" }}>{up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {d}%</span>
                </div>
                <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: "-.5px" }}>{v}</div>
                <div className="nv-muted" style={{ fontSize: 13 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 16 }}>
            <div className="nv-card" style={{ padding: 18 }}>
              <CardHead t="Sales trend" s="Revenue, last 9 months" />
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={ADMIN_SALES}>
                  <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C3AED" stopOpacity={.35} /><stop offset="100%" stopColor="#7C3AED" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                  <XAxis dataKey="m" tick={axis} axisLine={false} tickLine={false} /><YAxis tick={axis} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="sales" stroke="#7C3AED" strokeWidth={2.5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="nv-card" style={{ padding: 18 }}>
              <CardHead t="Top categories" s="Share of sales" />
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={ADMIN_CATS} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" hide /><YAxis type="category" dataKey="name" tick={axis} axisLine={false} tickLine={false} width={74} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "var(--soft)" }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={18}>{ADMIN_CATS.map((c, i) => <Cell key={i} fill={c.color} />)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="nv-card" style={{ padding: 18 }}>
            <CardHead t="Customer growth" s="Cumulative customers" />
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ADMIN_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                <XAxis dataKey="m" tick={axis} axisLine={false} tickLine={false} /><YAxis tick={axis} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="customers" stroke="#2563EB" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>}

        {page === "products" && <div className="nv-up">
          <Head t="Products" s={`${PRODUCTS.length} items in catalog`} action="Add product" />
          <div className="nv-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="nv-table">
                <thead><tr><th>Product</th><th>SKU</th><th>Category</th><th>Stock</th><th>Price</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {PRODUCTS.slice(0, 9).map((p) => (
                    <tr key={p.id}>
                      <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 38, flex: "0 0 auto" }}><Thumb p={p} /></div><span style={{ fontWeight: 600 }}>{p.name}</span></div></td>
                      <td className="nv-muted">{p.sku}</td>
                      <td style={{ textTransform: "capitalize" }}>{catOf(p.cat).name}</td>
                      <td>{p.stock}</td>
                      <td style={{ fontWeight: 700 }}>{money(finalPrice(p))}</td>
                      <td>{p.stock === 0 ? <span className="nv-pill" style={{ background: "rgba(225,29,72,.12)", color: "var(--rose)" }}>Out of stock</span> : p.stock < 5 ? <span className="nv-pill" style={{ background: "rgba(217,119,6,.12)", color: "var(--amber)" }}>Low</span> : <span className="nv-pill" style={{ background: "rgba(22,163,74,.12)", color: "var(--green)" }}>Active</span>}</td>
                      <td><button className="nv-btn" style={{ padding: 6 }}><MoreHorizontal size={16} className="nv-muted" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>}

        {page === "orders" && <div className="nv-up">
          <Head t="Orders" s="Recent orders across the store" />
          <div className="nv-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="nv-table">
                <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
                <tbody>
                  {ORDERS.map((o) => { const [c, bg] = STATUS_COLOR[o.status]; return (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 700 }}>{o.id}</td><td>{o.cust}</td><td>{o.items}</td><td style={{ fontWeight: 700 }}>{money(o.total)}</td>
                      <td><span className="nv-pill" style={{ background: o.pay === "Paid" ? "rgba(22,163,74,.12)" : "rgba(120,120,130,.12)", color: o.pay === "Paid" ? "var(--green)" : "var(--muted)" }}>{o.pay}</span></td>
                      <td><span className="nv-pill" style={{ background: bg, color: c }}>{o.status}</span></td>
                    </tr>
                  ); })}
                </tbody>
              </table>
            </div>
          </div>
        </div>}

        {page === "customers" && <div className="nv-up">
          <Head t="Customers" s="Top customers by spend" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
            {ORDERS.map((o, i) => (
              <div key={i} className="nv-card" style={{ padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
                  <span style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,var(--purple),var(--blue))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{o.cust[0]}</span>
                  <div><div style={{ fontWeight: 700, fontSize: 14 }}>{o.cust}</div><div className="nv-muted" style={{ fontSize: 12 }}>{["Gold", "Silver", "Platinum", "Bronze"][i % 4]} member</div></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span className="nv-muted">Total spent</span><span style={{ fontWeight: 800 }}>{money(o.total * 4 + 200)}</span></div>
              </div>
            ))}
          </div>
        </div>}

        {page === "analytics" && <div className="nv-up">
          <Head t="Analytics" s="Revenue & orders over time" />
          <div className="nv-card" style={{ padding: 18, marginBottom: 16 }}>
            <CardHead t="Revenue vs orders" s="Monthly comparison" />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ADMIN_SALES}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                <XAxis dataKey="m" tick={axis} axisLine={false} tickLine={false} /><YAxis tick={axis} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "var(--soft)" }} />
                <Bar dataKey="sales" fill="#7C3AED" radius={[6, 6, 0, 0]} barSize={16} />
                <Bar dataKey="orders" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>}
      </div>
    </div>
  );
}
const Head = ({ t, s, action }) => (
  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
    <div><h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-.6px" }}>{t}</h1><p className="nv-muted" style={{ fontSize: 13.5, marginTop: 3 }}>{s}</p></div>
    {action && <button className="nv-btn nv-primary"><Plus size={16} /> {action}</button>}
  </div>
);
const CardHead = ({ t, s }) => <div style={{ marginBottom: 14 }}><div style={{ fontWeight: 700, fontSize: 15 }}>{t}</div><div className="nv-muted" style={{ fontSize: 12.5 }}>{s}</div></div>;

/* ----------------------------- APP ----------------------------- */
export default function App() {
  const [route, setRoute] = useState("home");
  const [mode, setMode] = useState("store");
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [active, setActive] = useState(null);
  const [q, setQ] = useState("");
  const [initCat, setInitCat] = useState("all");
  const [toast, setToast] = useState(null);

  const go = (r, opts = {}) => { if (opts.cat) setInitCat(opts.cat); setRoute(r); window.scrollTo?.({ top: 0, behavior: "smooth" }); };
  const openP = (p) => { setActive(p); go("product"); };
  const fire = (msg) => { setToast(msg); clearTimeout(window._nvt); window._nvt = setTimeout(() => setToast(null), 1900); };

  const addCart = (p, qty = 1) => {
    setCart((c) => { const ex = c.find((it) => it.p.id === p.id); return ex ? c.map((it) => it.p.id === p.id ? { ...it, qty: it.qty + qty } : it) : [...c, { p, qty }]; });
    fire(`${p.name} added to cart`);
  };
  const setQtyFn = (id, qty) => setCart((c) => c.map((it) => it.p.id === id ? { ...it, qty } : it));
  const remove = (id) => setCart((c) => c.filter((it) => it.p.id !== id));
  const toggleWish = (id) => setWish((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <div id="nova" className={dark ? "nova-dark" : ""} style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <style>{STYLES}</style>
      <Nav go={go} route={route} cartCount={cartCount} wishCount={wish.length} dark={dark} setDark={setDark} mode={mode} setMode={setMode} q={q} setQ={setQ} />

      {mode === "admin" ? (
        <Admin go={(r, o) => { setMode("store"); go(r, o); }} dark={dark} />
      ) : (
        <main style={{ paddingBottom: 30 }}>
          {route === "home" && <Home go={go} openP={openP} addCart={addCart} toggleWish={toggleWish} wish={wish} />}
          {route === "catalog" && <Catalog go={go} openP={openP} addCart={addCart} toggleWish={toggleWish} wish={wish} q={q} setQ={setQ} initCat={initCat} />}
          {route === "product" && active && <Product p={active} go={go} addCart={addCart} toggleWish={toggleWish} wished={wish.includes(active.id)} openP={openP} />}
          {route === "cart" && <Cart cart={cart} setQty={setQtyFn} remove={remove} go={go} />}
          {route === "checkout" && (cart.length ? <Checkout cart={cart} go={go} clear={() => setCart([])} /> : <Cart cart={cart} setQty={setQtyFn} remove={remove} go={go} />)}
          {route === "account" && <Account go={go} wish={wish} openP={openP} addCart={addCart} toggleWish={toggleWish} />}
        </main>
      )}

      {mode === "store" && <Footer go={go} />}
      {toast && <div className="nv-toast"><Check size={16} color="#4ADE80" /> {toast}</div>}
    </div>
  );
}
