# The Social Layer — Design Document

*Phase 3 "Grow". Profiles, suburb leaderboards, Groves, crews, seed gifting,
peer confirmation. Supabase-backed — the first features that need the cloud.*

## Principles

1. **Opt-in, always.** Nothing about a player is visible to anyone until they
   choose a handle *and* flip the "share my finds" toggle. Default is off.
2. **No coordinates, no photos, no emails — ever — on any public surface.**
   The public projection of a find is species + rarity + suburb + time. Full
   stop. This is stricter than the location-fuzzing non-negotiable and makes
   most moderation problems structurally impossible (there is nothing to
   moderate but handles).
3. **The winning verb is observing more.** Every score in the social layer is
   *distinct species* (biodiversity), never raw find count — so grinding the
   same wattle 50 times does nothing.
4. **No feed.** Leaderboards, groves, and crews are pull surfaces you visit,
   not an engagement loop that visits you.

## Architecture — the `sightings` substrate

Private `discoveries` (photos, coords) stays exactly as is: RLS row-owner
only. The social layer reads from a second, privacy-safe table the client
**dual-writes only when sharing is on**:

```
sightings: id (== discovery id), user_id, species_id, name, kingdom,
           rarity, suburb, grove_key (nullable), found_at
```

- Readable by all signed-in users; writable/deletable only by the owner.
- Deleting a discovery deletes its sighting; flipping sharing off stops new
  rows (a "remove my past sightings" button bulk-deletes old ones).
- Every social feature is a view over this one table — leaderboards, groves,
  crews, confirmation. One privacy review, one substrate.

## Identity

```
profiles: id (auth.uid), handle (unique, 3–20 chars, [a-z0-9_]),
          friend_code (unique, e.g. "WATTLE-7F3K"), created_at
```

Handle chosen in settings after sign-in; handles are the only human-readable
identity anywhere. Friend codes are share-out-of-band strings used for crew
joins and seed gifts — knowing a code lets someone *send you things*, not
read your data.

## Suburb leaderboards (slice 1 — this PR)

A SQL view groups sightings by (suburb, user): `species` = distinct species
count (the score), `finds` = total. Client shows the top 10 for the suburb of
your latest find, in the Profile view, own row highlighted. Season-windowed
scoring (resets each season) comes with Groves.

## Groves (slice 2)

Real parks and reserves become contestable places.

- **Grove key:** the find's coordinates are checked against the park/reserve
  polygons *containing* them via Overpass's `is_in` (Nominatim's reverse
  snaps to benches and paths, so it can't name the containing park — tested).
  The most significant green-space tag wins (national park > protected area >
  nature reserve > park > reserve > garden > forest), and the find carries
  `grove_key = "<suburb>/<park name>"`. No curation needed; groves exist
  lazily wherever people actually hunt. Lookup failure just means no grove —
  never a blocked find. (Coordinates still never leave the device — a grove
  is a name, not a polygon.)
- **Stewardship:** the player with the most distinct species in a grove
  *this season* (Dec–Feb / Mar–May / Jun–Aug / Sep–Nov) is its Steward.
  Seasonal windows ARE the decay mechanic — every season the crown resets
  and the contest reopens. Shown on the grove card and as a crown on the map.
- Contest verb: find more biodiversity there. Nothing to attack.

## Crews (slice 3)

```
crews: id, name, join_code, created_by, created_at
crew_members: crew_id, user_id, joined_at   (cap 30 members)
```

Join by code (a teacher writes it on the whiteboard). Crew score = union of
members' distinct species per season. Crew-held groves: steward resolution
prefers the crew with the highest union score when members tag the same
grove. No chat — crews coordinate wherever they already talk.

## Seed gifting (slice 3)

```
gifts: id, from_user, to_user, species_id, status (sent|claimed), created_at
```

Sending consumes a *duplicate* seed (client enforces `seeds[id] > 1`);
claiming credits the recipient's local seed store on next sync. Rate cap:
5 gifts/day. This is the Pokémon GO gift loop with zero item inflation —
seeds only move, they aren't minted.

## Peer confirmation (slice 4)

`confirmations: sighting_id, confirmer_id, vote ('agree'|'unsure')` — 2+
agrees from distinct users marks a sighting "community-verified" (✓ shown on
leaderboards; later: verified-only mode for grove scoring). Votes are on the
*identification claim*, not the photo (photos stay private) — this is
deliberately weaker than iNaturalist and clearly labelled as such; the
science-grade path is the iNat submission toggle, not our votes.

## Moderation & abuse

- Public surface = handles only ⇒ moderation = handle policy. `reports`
  table + client-side block list (blocked handles filtered from all views).
- Leaderboard integrity at hobby scale is trust-based, with structural
  dampers: distinct-species scoring, one counted sighting per species per
  user per day (enforced in the views), and the existing camera-only capture.
- All limits enforced in SQL views/policies where possible, not client code.

## Rollout

| Slice | Contents | Ships |
|---|---|---|
| 1 | profiles, sharing toggle, sightings dual-write, suburb leaderboard | this PR |
| 2 | grove_key capture, grove view + stewardship, seasonal windows | next |
| 3 | crews, seed gifting | after groves |
| 4 | peer confirmation, iNat/ALA science toggle, reports/blocklist | with beta |

## What needs a live Supabase project

Schema SQL ships in the app's settings panel (same copy-paste flow as the
existing `discoveries` setup). Everything client-side is testable with a
stubbed client; the end-to-end path (RLS behaviour, view performance, unique
constraint races on handles) needs a real project — flagged per PR.
