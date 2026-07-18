# Rarity 2.0 — how tiers are set

Rarity in Plant Parent means **how hard a species is to encounter in the
wild**, not its market value. As of Rarity 2.0 the tiers are derived from real
occurrence data rather than hand-guessed.

## Data source

[Atlas of Living Australia](https://www.ala.org.au/) occurrence records —
`biocache.ala.org.au/ws/occurrences/search?q=taxon_name:"<name>"`. The record
count is ALA's aggregate of museum, herbarium, survey, and citizen-science
observations for a taxon. More records ≈ more encounterable.

Raw counts and the resulting tier for every species are in
[`rarity-data.json`](rarity-data.json), refreshed by re-running the query.

## Kingdom-relative thresholds

Fungi records run about an order of magnitude sparser than plants — Australian
mycology is dramatically under-surveyed, not because fungi are genuinely that
much rarer. A single absolute cutoff would label almost every fungus "rare"
and misrepresent how hard they actually are to find in the field. So the
thresholds are set per kingdom:

| Tier | Plants (records) | Fungi (records) |
|---|---|---|
| Common | ≥ 10,000 | ≥ 6,000 |
| Uncommon | 2,500–9,999 | 2,000–5,999 |
| Rare | 250–2,499 | 250–1,999 |
| Legendary | < 250 | < 250 |

## Conservation override

For a few species the raw record count is a poor proxy for wild-encounter
rarity — the records are dominated by cultivated plantings, or the species is
critically endangered with a tiny wild range. These are pinned to **legendary**
regardless of count:

| Species | Records | Why |
|---|---|---|
| Wollemi Pine (*Wollemia nobilis*) | 301 | ~100 wild trees in one secret grove; records are almost all cultivated (CR) |
| Matchstick Banksia (*Banksia cuneata*) | 279 | Endangered, tiny WA wheatbelt range |
| Illawarra Greenhood (*Pterostylis gibbosa*) | 425 | Endangered orchid, few small populations |
| King Spider Orchid (*Caladenia huegelii*) | 451 | Critically endangered |

## Resulting distribution

| Tier | Plants | Fungi |
|---|---|---|
| Common | 13 | 6 |
| Uncommon | 11 | 6 |
| Rare | 11 | 8 |
| Legendary | 8 | 3 |

## Refreshing

Re-run the ALA query for each species' scientific name, apply the thresholds
above plus the override list, and update both the `rarity:` fields in the
`SPECIES` table and `rarity-data.json`. Records grow over time, so a species
near a threshold may shift tier on refresh — that's expected and correct.
