# The Garden — Design Document

*The Grow verb. Phase 2 headline feature. Single-player, fully local, no
backend required for v1.*

## Fantasy

You're not just cataloguing Australian natives — you're raising them. Every
find in the field yields a **seed** of that species. Plant it in your garden,
tend it through real days, and watch it germinate, sprout, and flower. Your
garden becomes a living record of everywhere you've been: the Waratah from
that Blue Mountains walk, the Ghost Fungus log from the autumn foray.

The app is called **Plant Parent**. This is the mechanic the name has been
waiting for.

## Why it works (the retention argument)

The identify loop only fires when the player is outdoors with time to spare —
for most people that's weekends. The garden fires **every day, anywhere, in
under a minute**: open app → tend → see growth → close. It converts weekend
hunting energy into weekday retention, gives streaks a second reason to
exist, and makes every find matter beyond a Dex tick. Target: **tend rate ≥
40% of DAU**, measurable D7 lift.

---

## Core loop

```
   FIELD (weekends)                    HOME (daily)
   ┌─────────────┐   seed per find   ┌──────────────────┐
   │ Hunt + ID   │ ────────────────▶ │ Plant in a plot  │
   └─────────────┘                   └────────┬─────────┘
         ▲                                    │ tend daily (one tap)
         │  nectar goals need                 ▼
         │  species you lack        ┌──────────────────┐
         └───────────────────────── │ Grow: 4 stages   │
                                    │ over real days   │
                                    └────────┬─────────┘
                                             │ mature
                                             ▼
                                    ┌──────────────────┐
                                    │ Flower: nectar   │
                                    │ + seeds + beauty │
                                    └──────────────────┘
```

## Growth model

**Stages:** `seed → sprout → juvenile → mature → flowering`

- Each stage takes a number of **real days**, scaled by rarity:

| Rarity | Days per stage | Seed → flowering |
|---|---|---|
| Common | 1 | ~4 days |
| Uncommon | 2 | ~8 days |
| Rare | 4 | ~16 days |
| Legendary | 7 | ~28 days |

- A stage's clock **only runs on days the plant was tended.** Untended days
  simply don't count — growth pauses, nothing is lost.
- **No plant death, ever.** Neglect pauses; it never punishes. The streak
  mechanic already provides loss-aversion; the garden is the kind mechanic.
  (This is also the brand-correct choice for a conservation app.)
- **Flowering plants stay flowering.** They keep producing daily nectar when
  tended. The garden only accumulates beauty.

**Tending is one tap for the whole garden.** A single "watering can" action
per day tends every plot (no per-plant tap grind). Tending is what links the
garden to streaks: the tend action counts as opening the app, and a find OR
a tend keeps the daily habit alive (streak itself still requires a find —
the garden gives you something to do on non-find days without diluting it).

**Fungi grow on logs, not plots.** Fungi finds yield **spores**; the garden
has a shaded log/mulch corner where they fruit. Identical mechanics, themed
presentation ("mist" instead of "water"). The fungi safety note appears on
the log corner like everywhere else.

## Economy — Nectar 🍯

One currency. Earned slowly, spent on expansion and acceleration. All caps
are per-day to keep the loop calm, not compulsive.

**Earn:**

| Source | Nectar |
|---|---|
| Daily tend (whole garden) | 5 + 1 per flowering plant (cap 15) |
| New find planted | 5 / 10 / 25 / 60 by rarity |
| Plant reaches a new stage | 5 |
| First flowering of a species | 25 |
| Quest completion (existing bonus XP unchanged) | +10 nectar rider |

**Spend:**

| Sink | Cost |
|---|---|
| Extra plot (start with 6, max 12 free) | 50 → 75 → 100 → 150 → 200 → 300 |
| Fertiliser: count one extra day on a plant's current stage | 30 |
| Decorations (rocks, birdbath, bench — cosmetic) | 20–80 |
| Log corner expansion (more simultaneous fungi) | 100 |

**Pro (existing tier, no new paywall):** +6 greenhouse plots, an
**auto-waterer** that covers up to 2 missed days per week, and exclusive
decorations. Free players keep the complete core loop — Pro buys breadth
and forgiveness, never progress itself.

## Seeds

- Every discovery yields one seed of that species (duplicates stack:
  `seeds[speciesId] += 1`).
- Planting consumes a seed. Removing a planted specimen refunds nothing
  (confirm dialog) — plots are commitments.
- **Phase 3 hook:** duplicate seeds become giftable to friends (the Pokémon
  GO gift loop). The data model supports it from day one.
- Species not in the static table (ad-hoc iNat/Claude finds) yield **wild
  seeds** — plantable, generic sprout art, still earn nectar. Nothing the
  player finds is worthless.

## UI

**Navigation rework (required):** the bottom nav is full. Merge Collection
and Dex into one **Botanica** view (tabs: `Collection | Dex` — Dex already
uses the tab pattern), freeing a slot:

```
Discover · Garden · Botanica · Map · Profile
   📸        🌱        📔        🗺️      👤
```

**Garden view:**
- Plot grid (2×3 to start) in the earthy palette; each plot renders its
  stage: mound → small emoji sprout 🌱 → the species emoji at growing sizes
  → full-size with a subtle flowering glow.
- Big friendly **watering can button** at top — one tap, gentle rain
  animation over all plots, +nectar toast, disabled until tomorrow after use.
- Nectar balance chip in the corner; tap for the earn/spend ledger.
- Tap a plot → plant card: species, stage, days-tended progress to next
  stage, fertilise button, and a link to your original find photo (the
  discovery detail) — the garden and the collection reference each other.
- Empty plots show a seed-packet picker filtered to seeds you own.
- Log corner rendered as a distinct shaded strip below the plots.

**Discover view addition:** after "Add to Herbarium", the result flow says
"🌰 Seed collected — plant it in your Garden", deep-linking to the garden.
First-ever find auto-prompts the tutorial planting.

## Data model

```js
state.garden = {
  nectar: 0,
  lastTend: 'YYYY-MM-DD',        // one watering-can action per day
  plots: [                        // planted specimens
    {
      id, speciesId,
      plantedDay: 'YYYY-MM-DD',
      stage: 0,                   // 0..4 (seed..flowering)
      daysTendedThisStage: 0,     // increments on tend; stage-up at threshold
      firstFloweredDay: null,
    },
  ],
  logCorner: [ /* same shape, fungi only */ ],
  decorations: [],
  plotCapacity: 6,
};
state.seeds = { [speciesId]: count };
```

- All day math uses the local `dayKey()` helper already in the codebase
  (shared with streaks/quests).
- Tend applies to all plots in one pass: `daysTendedThisStage++` each, then
  stage-up where the rarity threshold is met (with stage-up toasts).
- **Clock tampering:** ignored. Single-player, local — a player who fast-forwards
  their phone clock only cheats their own garden. Caps keep it harmless.
- **Sync:** v1 is local-only. When cloud sync lands, `garden` + `seeds` ride
  along as a JSON blob in a `profiles` row — last-write-wins like the rest.

## Ecology synergies (v1.5, after the core proves out)

Adjacency bonuses that teach real ecology and drive *combination* collecting:

| Combo | Effect | The lesson |
|---|---|---|
| Wattle next to any plant | Neighbour counts +1 tend day/week | Acacias fix nitrogen |
| Fungi log adjacent to plots | +1 nectar per tend ("mulch") | Decomposers feed the soil |
| Banksia/Grevillea flowering | +nectar radius bonus | Nectar-feeders and pollination |
| 3+ same-biome plants adjacent | "Habitat" bonus + visual flourish | Communities, not specimens |

## Guardrails

1. **No real-world tending instructions.** The garden is a game, not plant-care
   advice; no mechanic implies collecting real seeds or cuttings (non-negotiable
   #4: observation only).
2. **Fungi safety warning** appears on the log corner detail cards.
3. **Calm by design:** one tend per day, hard nectar caps, no timers that
   expire, nothing to lose. The garden should feel like a cup of tea, not a
   slot machine.
4. **No pay-to-grow.** Pro buys plots and forgiveness; it never buys stages.

## Implementation plan

| Slice | Scope | Est. |
|---|---|---|
| **v1.0** | Nav rework (Botanica merge), garden view, plots, seeds from finds, 5-stage growth, daily tend, nectar earn/spend on plots + fertiliser, tutorial planting | 2–3 sessions |
| **v1.1** | Log corner (fungi), decorations, plant-card ↔ discovery cross-links, garden stats on profile | 1 session |
| **v1.5** | Ecology synergies, habitat bonuses, in-season flowering tie-in (Sprout's seasonal bonus feature) | 1–2 sessions |
| **v2 (Phase 3)** | Seed gifting via friend codes, garden in cloud sync, Pro greenhouse + auto-waterer | with social layer |

## Metrics to watch

- Tend rate (target ≥ 40% of DAU), D7 retention lift vs pre-garden cohort
- % of finds planted within 24h (is the seed hook landing?)
- Nectar sink distribution (are plots/fertiliser/decorations all being used?)
- Session pattern: we *want* a new short daily session class (< 1 min) that
  didn't exist before — that's the whole point.
