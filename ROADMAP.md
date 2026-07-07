# Plant Parent — 12-Month Roadmap

Six phases from working prototype to the App Store, built around Australia's
field seasons: spring wildflowers power the engagement beta, and the store
launch lands at the start of autumn fungi season, when there's the most to
find. M1 = August 2026.

| Months | Phase | Focus |
|---|---|---|
| M1–M2 (Aug–Sep 2026) | **Roots** | Harden the foundations |
| M3–M4 (Oct–Nov 2026) | **Sprout** | Make it a game you return to |
| M5–M6 (Dec–Jan 2027) | **Grow** | Add the social layer |
| M7–M8 (Feb–Mar 2027) | **Bud** | Package as native apps |
| M9–M10 (Apr–May 2027) | **Flower** | Store launch, fungi season |
| M11–M12 (Jun–Jul 2027) | **Seed** | Grow the community |

---

## Phase 1 — Roots (M1–M2): harden the foundations

No new gameplay — the unglamorous work that makes the next ten months possible.

**Build**
- [ ] True PWA: manifest, service worker, offline caching, install prompt, app icons
- [ ] IndexedDB migration for photos and state (localStorage's ~5 MB ceiling dies after ~20 photos)
- [ ] Monthly free tier — 10 IDs per month instead of 10 lifetime (a lifetime cap kills retention)
- [ ] Location fuzzing on rare and legendary finds (never publish precise coordinates of endangered species)

**Learn**
- [ ] Error tracking + privacy-friendly analytics
- [ ] Device pass: camera flow on iOS Safari and Android Chrome
- [ ] 10-friend alpha — hand the URL to people who like bushwalking, watch where they get confused

## Phase 2 — Sprout (M3–M4): make it a game you return to

Tested live during spring wildflower season. The question this phase answers:
why open the app on a Tuesday?

- [ ] **The Dex** — every species as a silhouette until found; completion % per kingdom and rarity tier
- [ ] Daily quests + streaks ("find something flowering today")
- [ ] "In-season" bonuses — extra XP for a plant in flower or fungus fruiting (the shiny mechanic, botanically true)
- [ ] Rarity 2.0 — recalibrate tiers against Atlas of Living Australia occurrence data
- [ ] Share cards — every find generates a story-sized card for socials
- [ ] Spring Bloom event — first limited-time challenge; rehearses the event pipeline

## Phase 3 — Grow (M5–M6): the social layer

Solo collecting plateaus. Other people are the endgame content.

- [ ] Profiles + friend codes (lightweight — no doom-scroll feed)
- [ ] Real Local Legend leaderboards per suburb (Supabase-backed)
- [ ] **Crews** — small teams with shared goals (school class, bushcare group, uni club) — the wedge into schools
- [ ] Peer ID confirmation, iNaturalist-style
- [ ] Biome badges — coastal, alpine, rainforest, desert, mallee (summer road trips become expeditions)
- [ ] **Contribute-to-science toggle** — opt-in submission of finds to iNaturalist/ALA as real citizen-science records. The differentiator; lead every pitch with it.
- [ ] Moderation basics: report/block, photo review queue (required for store submission)

## Phase 4 — Bud (M7–M8): go native

- [ ] Capacitor wrap → iOS + Android from the existing web codebase
- [ ] Native camera + GPS (keep web fallback)
- [ ] Push notifications — "It rained overnight — fungi will be popping near you" (weather-triggered pushes are the retention superpower)
- [ ] Offline packs: cached map tiles + queued-ID inbox for trips beyond reception
- [ ] Pro, for real: App Store/Play IAP + Stripe on web (unlimited IDs, seasonal forecast maps, offline packs, PDF export)
- [ ] Pricing test (monthly / annual / founder's lifetime); grandfather all preview Pro users free
- [ ] Closed beta: TestFlight + Play internal track, ~50 testers from field-naturalist clubs and uni bio societies

## Phase 5 — Flower (M9–M10): launch into fungi season

Ship to both stores during the season the app is most magical — softly, Australia only.

- [ ] Store submissions: privacy policy, Play data-safety form, age rating, UGC moderation plan
      (Apple review notes: the non-dismissable fungi safety warning is the best argument)
- [ ] ASO: real-find screenshots, 30-second preview video, keywords ("plant identifier australia", "fungi finder", "native plants app")
- [ ] Landing page + press kit (one page, one trailer, five screenshots, the citizen-science story)
- [ ] **Autumn Fungi Foray** launch event with a founding-finder badge
- [ ] Partnerships: Fungimap, Landcare, field naturalist clubs, uni societies (communities that already do this hobby — no ad spend)
- [ ] Local press: campus media + AU science/outdoors outlets

## Phase 6 — Seed (M11–M12): grow the community

- [ ] Creator partnerships — AU nature TikTok/YouTube, early access to seasonal events
- [ ] Schools pilot — crews + biodiversity hunts packaged for term 2/3 science classes
- [ ] City vs City Biodiversity Cup (Melbourne vs Sydney monthly species count)
- [ ] Weekly metrics loop: retention, IDs per user, Pro conversion — double down or kill
- [ ] Year-two candidates: new kingdoms (birds? insects?), NZ expansion, AR point-and-identify, guided walk mode
- [ ] Pledge a slice of Pro revenue to bush regeneration

---

## North-star metrics

| Metric | Target |
|---|---|
| Core action | IDs per weekly-active user |
| Retention | D7 > 20% by launch |
| Social proof | Share-card sends per find |
| Revenue | 2–4% Pro conversion |

## Non-negotiables

1. **Fungi safety stays non-dismissable.** Every new fungi surface inherits the warning.
2. **Rare finds stay fuzzy.** Precise coordinates of threatened species are never public. Leaderboards use suburbs, not pins.
3. **Camera-only stays camera-only.** The treasure hunt is the product; gallery upload would quietly kill it.

---

*Timeline assumes part-time solo development with AI assistance. Phases are
sequenced so each de-risks the next: foundations before mechanics, mechanics
before community, community before the store. The two anchors worth
protecting are the spring beta (M3–M4) and the autumn launch (M9–M10) —
the seasons won't move for you.*
