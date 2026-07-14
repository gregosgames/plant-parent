# Plant Parent — 12-Month Roadmap

Six phases from working prototype to the App Store, built around Australia's
field seasons: spring wildflowers power the engagement beta, and the store
launch lands at the start of autumn fungi season, when there's the most to
find. M1 = August 2026.

## The two-verb thesis

Identification alone isn't a game — it's a tool. Pokémon GO doesn't retain
players through catching alone; it retains through the loops around it:
**collect → complete → invest → compete over places → co-op events**.
Plant Parent's verbs:

| Verb | Mechanic | Phase |
|---|---|---|
| **Identify** | Camera hunt, Dex, quests, streaks | ✅ shipped |
| **Grow** | **The Garden** — every find yields a seed; tend a living native garden between hunts | Phase 2 |
| **Compete over places** | **Groves** — steward real parks by logging the most biodiversity there | Phase 3 |
| **Co-op** | **Bioblitzes** — timed community events that double as real citizen science | Phase 4–5 |
| **Duel** | **Field Duels** — card battles with stats from real plant traits | Phase 6 / year 2 |

Design guardrail for every competitive verb: the winning action is always
*observe more nature*, never take or damage it. Combat and consumption stay
entirely in the virtual layer.

| Months | Phase | Focus |
|---|---|---|
| M1–M2 (Aug–Sep 2026) | **Roots** | Harden the foundations ✅ |
| M3–M4 (Oct–Nov 2026) | **Sprout** | The Dex ✅ · quests/streaks ✅ · **the Garden** |
| M5–M6 (Dec–Jan 2027) | **Grow** | Social layer + **Groves** |
| M7–M8 (Feb–Mar 2027) | **Bud** | Native apps + **Bioblitz engine** |
| M9–M10 (Apr–May 2027) | **Flower** | Store launch into fungi season |
| M11–M12 (Jun–Jul 2027) | **Seed** | Community growth + **Duels prototype** |

---

## Phase 1 — Roots (M1–M2): harden the foundations ✅

- [x] True PWA: manifest, service worker, offline caching, install prompt, app icons
- [x] IndexedDB migration for photos and state
- [x] Monthly free tier — 10 IDs per month instead of 10 lifetime
- [x] Location fuzzing on rare and legendary finds

**Learn (human-side, ongoing)**
- [ ] Error tracking + privacy-friendly analytics
- [ ] Device pass: camera flow on iOS Safari and Android Chrome
- [ ] 10-friend alpha

## Phase 2 — Sprout (M3–M4): make it a game you return to

The identify loop gets pull; the **Grow verb** gives the app a life between
hunts. Full design: [`docs/GARDEN-DESIGN.md`](docs/GARDEN-DESIGN.md).

- [x] **The Dex** — every species a silhouette until found; completion %
- [x] Daily quests + streaks
- [ ] **The Garden v1** — every find yields a seed; plant it, tend it daily,
      watch it grow through real-day stages scaled by rarity. Nectar economy,
      six starting plots, no plant death (untended plants pause, never die).
      Single-player and fully local — no backend required.
- [ ] "In-season" bonuses — extra XP for a plant in flower or fungus fruiting
- [ ] Share cards — story-sized find cards for socials
- [ ] Rarity 2.0 — recalibrate tiers against Atlas of Living Australia data
- [ ] Spring Bloom event — first limited-time challenge (garden-integrated:
      event seeds as rewards)

## Phase 3 — Grow (M5–M6): the social layer + places

Other people are the endgame content — and now there are places to care about.

- [ ] Profiles + friend codes
- [ ] **Groves v1** — real parks/reserves become Groves; the season's top
      *biodiversity contributor* becomes Steward (name on the map, crown on
      the grove). Stewardship decays and is contestable — the gym mechanic,
      but the contest verb is finding more nature. Supabase-backed.
- [ ] Real Local Legend leaderboards per suburb (Supabase-backed)
- [ ] **Crews** — small teams (school class, bushcare group, uni club);
      crew-held Groves
- [ ] **Seed gifting** — send duplicate-find seeds to friends (garden v2)
- [ ] Peer ID confirmation, iNaturalist-style
- [ ] Biome badges — coastal, alpine, rainforest, desert, mallee
- [ ] Contribute-to-science toggle — opt-in submission to iNaturalist/ALA
- [ ] Moderation basics: report/block, photo review queue

## Phase 4 — Bud (M7–M8): go native + the event engine

- [ ] Capacitor wrap → iOS + Android from the existing web codebase
- [ ] Native camera + GPS (keep web fallback)
- [ ] Push notifications — "It rained overnight — fungi will be popping" and
      "Your Waratah is ready to flower 🌸" (the garden makes push twice as useful)
- [ ] **Bioblitz engine** — timed co-op events scoped to a place or weekend:
      "this park needs 40 species by Sunday; contribute 3+ for the badge."
      The raid mechanic, mapping 1:1 onto real citizen-science bioblitzes.
- [ ] Offline packs: cached map tiles + queued-ID inbox
- [ ] Pro, for real: IAP + Stripe (unlimited IDs, garden greenhouse +
      auto-waterer + extra plots, seasonal forecast maps, PDF export)
- [ ] Closed beta: TestFlight + Play internal track, ~50 naturalist-club testers

## Phase 5 — Flower (M9–M10): launch into fungi season

- [ ] Store submissions: privacy policy, data safety, age rating, UGC
      moderation plan (Apple review notes: non-dismissable fungi warning)
- [ ] ASO: screenshots (garden + hunt + dex), 30s preview video, AU keywords
- [ ] Landing page + press kit — lead with citizen science + the garden hook
- [ ] **Autumn Fungi Foray** — the launch event *is* a Bioblitz, run on the
      Phase 4 engine, with a founding-finder badge and exclusive fungi log
      for the garden
- [ ] Partnerships: Fungimap, Landcare, field naturalist clubs, uni societies
- [ ] Local press: campus media + AU science/outdoors outlets

## Phase 6 — Seed (M11–M12): grow the community + the duel bet

- [ ] Creator partnerships — AU nature TikTok/YouTube
- [ ] Schools pilot — crews + Bioblitzes packaged for term 2/3 science classes
- [ ] City vs City Biodiversity Cup — Melbourne vs Sydney, Bioblitz-powered
- [ ] **Field Duels prototype** — every find is a card; stats derived from
      real traits (hardiness, toxicity, growth rate, fire response, rarity).
      Async auto-battles against friends' decks. Fully virtual; accidentally
      teaches ecology. Ship to beta cohort, measure, then decide year 2.
- [ ] Weekly metrics loop: retention, IDs per user, tend rate, Pro conversion
- [ ] Year-two candidates: new kingdoms (birds? insects?), NZ expansion,
      AR point-and-identify, guided walk mode
- [ ] Pledge a slice of Pro revenue to bush regeneration

---

## North-star metrics

| Metric | Target |
|---|---|
| Core action | IDs per weekly-active user |
| **Second-verb retention** | **Garden tend rate ≥ 40% of DAU** |
| Retention | D7 > 20% by launch (garden should lift this measurably) |
| Social proof | Share-card sends per find |
| Revenue | 2–4% Pro conversion |

## Non-negotiables

1. **Fungi safety stays non-dismissable.** Every new fungi surface inherits the warning.
2. **Rare finds stay fuzzy.** Precise coordinates of threatened species are never public. Groves and leaderboards use places and suburbs, not pins.
3. **Camera-only stays camera-only.** The treasure hunt is the product.
4. **Competition never touches real plants.** The winning verb is always
   *observe more*; battles, tending, and consumption exist only in the
   virtual layer. No mechanic may reward picking, moving, or disturbing
   living things.

---

*Timeline assumes part-time solo development with AI assistance. Phases are
sequenced so each de-risks the next: foundations before mechanics, mechanics
before community, community before the store. The two anchors worth
protecting are the spring beta (M3–M4) and the autumn launch (M9–M10) —
the seasons won't move for you.*
