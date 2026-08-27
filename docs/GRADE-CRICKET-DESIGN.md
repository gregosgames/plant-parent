# Grade Cricket — Concept & Design Document

Single-player arcade cricket career. Stick-figure 2D, side-on. One cricketer, batting and bowling, from village club cricket to a Test cap. 10–15 seasons.

**Thesis: dominance, not accumulation.** Most cricket games reward you for staying in. This one rewards you for taking the game away from someone. The whole system stack — batting, bowling, audio, progression — is tuned to the 1970s–80s West Indian idiom: batting with disdain, bowling as intimidation. That is the house style and every mechanic below serves it.

**Style position.** Stick-figure browser-cricket grammar — flat vector, saturated colour blocking, comic physicality, readable at a glance. Original characters, palette, UI and control mapping.

**On the real players.** Richards, Lara and the pace batteries are the design reference the way a film references a director. Archetypes, not portraits: no likenesses, no names, no licensed anything. What gets lifted is the *behaviour* — the high backlift, the whip off the toes, the cap instead of the helmet, the long walk back to the mark — and each of those becomes an input.

**Setting.** Caribbean ladder: village/parish club → island senior cricket → regional four-day and one-day → West Indies. Picked over Australian grade cricket because the flair system needs a home and "suburban grade cricket" pulls tonally against everything above. The systems are geography-agnostic; the ladder swaps without touching a mechanic.

---

## 0. The Twenty-Minute Game

Everything below this line is career scaffolding. None of it matters if one ball isn't fun. This section is a pillar, not a polish pass, and it is the first thing built.

**Contact is the reward.** A middled shot gets a 3-frame hit-stop, a short screen punch, the bat blurring to a solid wedge, and a ball that leaves at a speed reading as violence rather than physics. The player should want to middle one again before they've read the score.

**The default outcome is not a dot.** Concrete tuning target: at the bottom tier, a competent player middling well scores a boundary roughly every 5–6 balls. That decays to one in 10–12 at international. Arcade cricket dies when the honest default is a defensive push, so the bottom of the ladder is deliberately generous and the ladder is what takes it away.

**The bowler is a person you are beating.** He reacts, visibly, every ball: hands on head, a stare down the pitch, a slower walk back. Beating an opponent is more fun than beating a difficulty curve, and stick figures sell body language better than they sell anything else.

**The ground plays along.** See Audio. The soundtrack is a feedback instrument, not a backing track.

**Restart is instant.** Next ball in under two seconds, next match in ninety.

---

## 1. Batting: Swagger

Flair is not decoration here. It is the primary resource and the main source of arcade depth.

**Swagger builds** on dominant strokeplay only: boundaries, and especially attacking shots played to *good* balls rather than bad ones. Milked singles build nothing. It decays across consecutive dots and resets each innings.

**Three effects, escalating.**

1. **Presence.** The figure's stance changes as the meter fills. Bat taps get lazier. He stops watching the bowler between balls. Pure feedback, no mechanical effect, and it is the thing players will talk about.
2. **The flourish.** At full Swagger a modifier unlocks: on a well-timed ball it converts a normal stroke into a signature one — bigger, worth more, held pose, full-screen pop. Attempted on a mistimed ball it carries a much wider deviation cone. The flourish is both the reward and the way you get out.
3. **Pressure returned.** High Swagger degrades the AI bowler's accuracy. This is the mechanical translation of a batter making good bowlers bowl badly, and it is the only real counter to the Dossier at the top tier.

**Two thematic inputs with real teeth.**

- **Cap or helmet**, chosen before each innings. Cap builds Swagger ~40% faster and changes how the crowd and the fielding side behave. It also makes short-pitched bowling genuinely dangerous from representative level up, with an injury outcome that costs matches. One tap, permanent for the innings, real consequence.
- **The backlift.** Hold the direction input *before* release to raise the backlift: earlier commitment, wider timing window if the read was right, but you have shown your hand and from representative level the bowler's AI reads it and changes his length. Early commit against late react is a genuine depth axis and needs no tutorial.

**Controls.** Six shot zones on an arrow fan drawn on the field. Tap = control, hold = attack, hold + late release = premeditated slog. Direction held pre-release = raised backlift. Modifier at full meter = flourish. Feedback is animation first, then contact flash and a trail showing intended against actual placement.

---

## 2. Bowling: Hostility

Highest-risk section, and the West Indies reference solves most of it. Bowling in the reference games fails because it is cerebral. Make it visceral.

**Per ball: one drag and two taps.**

1. **Line (drag, untimed).** A marker painted on the pitch, set before the run-up.
2. **Length (tap, timed).** A bar sweeps a five-band track during the run-up: short, back-of-a-length, good, full, yorker. Bar speed scales with pace, so a genuine quick is harder to place than a medium-pacer.
3. **Seam (tap, ~0.25s).** A dial oscillating through upright, angled, cross-seam, scrambled. Missing it is a loose ball, not a disaster.

**Hostility is the meter that matters.** It builds on pace at the body, consecutive balls in a tight corridor, and the batter flinching, ducking or taking one on the glove. What it does: the AI batter's own timing window narrows as it rises. You are not waiting for a wicket ball. You are actively making them worse, and you can watch it happen — they start backing away, playing across the line, offering the false shot.

**The bouncer is a dedicated input**, not a length outcome. It spikes Hostility hard, draws from a per-over allowance, and risks both a called wide and a hook for six. It is the single most expressive thing a bowler can do and it is one button.

**The walk back** is the second untimed pre-ball input, alongside line. A long walk carries more Hostility between deliveries; a short one is faster and cheaper on Fitness. Free strategic layer, zero input cost, and it is exactly the thing the reference bowlers were famous for.

**Feedback.** Ghost trail of intended line and length against actual, so error is attributable. A batter-confidence tick. The Hostility meter, which is also the audio driver.

**Mastery.** Consistency on the dial, then *composition* — wicket probability spikes when Hostility is high and the current ball differs from the previous two along a specific axis, so purposeful variation is rewarded and random variation is punished. From representative level, an optional longer release window disguises the variation at the cost of a wider deviation cone.

You do not bowl every over. The captain gives spells, and spells end.

---

## 3. Arcade Depth Over a Career

The failure mode of the genre is that the *shape* of the decision never changes. The fix: information shrinks while the option set grows.

**Layer 1 — village club.** Length marker lands ~0.6s before release. Two shot zones, one window. Bowlers slow and wayward. The only skill is not swinging at everything.

**Layer 2 — island senior.** Shot intent, backlift commitment, and live fielders. Direction becomes "which gap." A perfectly timed shot at a fielder is a dot.

**Layer 3 — regional.** Length marker removed, replaced by a ~0.4s tell in the run-up. Bowlers bowl plans across an over, so the unit of attention stops being the ball.

**Layer 4 — West Indies.** The Dossier: the game has logged your actual wagon wheel and dismissal history since your first regional match, and opposition captains generate fields and lines from it. Your best scoring zone gets a fielder. Your recurring dismissal gets bowled at you. The counters are diversification and Swagger.

The Dossier is the answer to ball 10,000: the only system whose difficulty scales with hours played rather than a tier number.

---

## 4. Tier Feel

Defined by a perceptual shock in the first over, not a difficulty multiplier.

| Tier | Format | What changes | First over feels like |
|---|---|---|---|
| Village club | 40-over | Wide, slow, wayward. Ring field regardless. | Two balls you can hit anywhere. |
| Island senior | 40-over, T20 | Accuracy jumps. Fields respond to state. Attacking window −20%. | Six dots. The ball stops arriving in your zone. |
| Regional | + 4-day, T20 | Marker removed. Bowlers bowl plans. Pace +15%. Short stuff means it. | You can't see where it's going before it gets there. |
| West Indies | + ODI, Test | Dossier fields. Deceptive tells. No new-batter mercy. | Your favourite shot has a fielder in it. |

---

## 5. The Day You Don't Bat

A number eight in a 40-over club game misses out constantly. That day is a bowling day and a watched day.

- The match is not skipped. Your spell is played ball by ball and gets full screen time.
- **DNB is not a zero.** Form is opportunity-weighted, so no opportunities moves nothing. The card reads "DNB — 12-2-34-3" and the figures carry full weight.
- **Batting order is influenceable, not choosable.** A captain's conversation every few matches; lobbying succeeds on recent runs, your batting attribute against the men above you, and a relationship value. Failing costs standing.
- **Hard rule:** the fixture generator will not allow four consecutive matches without a bat. It will engineer a collapse or a declaration. Stated as a lever, not hidden.

---

## 6. Failure Pacing

**The golden duck is real, unrewindable, and ninety seconds from the next chance.** A duck feels cheap when the restart is free and punishing when it is twenty minutes away. Your innings ends, the match continues, you bowl, the next fixture loads fast. The zero is permanent in a ledger you keep for fifteen years; the wait is nothing. No retry, no rewind — an undo destroys the ledger, and the ledger is the career.

Three seconds of theatre: the ragdoll, the walk, one line from a teammate. Then a hard cut.

**New-batter windows invert across tiers.** At the bottom, the first two balls get a 15% wider window. That decays to zero by island senior and goes negative internationally, where the first two balls are the most dangerous of the innings. Same mechanic, opposite sign, doubling as tier feel.

---

## 7. Selection

A visible three-number model, not a black box. Opacity reads as unfairness, and the tension only exists if the player can see it.

- **Form** — rolling weighted average of the last six *opportunities*.
- **Standing** — career reputation. Slow. Buys reprieves. Swagger and five-fors move it faster than runs alone.
- **Need** — what the tier above actually lacks this week.

Promotion requires high Form *and* a matching Need. You can average 60 and stay put because the side above has three quicks and no batting slot; the ladder screen names the bottleneck, which turns frustration into a legible obstacle. Demotion is a Form floor — three consecutive low-Form matches drops you, and Standing absorbs one.

**The core tension, resolved by capping one currency:** runs below your ceiling tier have a hard Standing cap. Farming the bottom builds Form, which promotes you, and almost no Standing, which is what gets you noticed. Scraping by above builds Standing slowly while risking demotion. Both viable, different careers.

**Availability** matters. Work, minor injuries, and a trial that clashes with a club fixture all cost matches, and missed matches decay Form.

---

## Core Loop

- **Ball (2–4s):** read → input → contact → meter moves.
- **Match (8–20 min):** your innings and your spells played; the rest compresses. Ends on a card with your figures, the result, one selector's note.
- **Season (2–3 hrs):** 12–16 fixtures, a mid-season selection window, an end-of-season tier decision, honour boards, one narrative thread.

## Attributes & the All-Rounder

**Timing**, **Placement**, **Accuracy**, **Movement**, plus two shared: **Fitness** (stamina across a spell or innings) and **Cricket Brain** (how long the run-up tell is visible). Stats never roll outcomes — they set window width and deviation cone size. Low Timing doesn't get you out; it makes your perfect window 90ms instead of 130ms.

Attributes improve through use. Specialists raise discipline stats faster. The all-rounder's compensation is that Fitness and Cricket Brain accrue from both disciplines, and an all-rounder's squad slot satisfies two Needs. Balance risk: all-rounders cap 10–15% lower in Timing and Accuracy, so a mediocre all-rounder never beats a good specialist.

## Input vs Stats

**70/30 at club level, sliding to 55/45 internationally.** Stats must matter more later so progression is felt; input must never fall below half or it stops being an arcade game. Implemented entirely through window width and cone size, never hidden dice.

## Formats

**In:** 40-over club (the spine), T20 from island senior, four-day at regional, ODI and Test internationally. **Cut:** The Hundred, 10-over social, indoor — none open new decision space. Multi-day is played in passages: your innings, your spells, nothing else.

---

## Visual Direction

**Characters.** Single-weight limb lines, filled circle head, no face. Shirt is one colour block, pads a white band, bat a flat trapezoid, helmet a filled arc — or a cap, which is a two-shape silhouette everyone will recognise from across the room. Roughly eight shapes per figure. Chunkier torso and wider stance than the genre default so the figures read as ours.

**Camera.** Fixed, side-on, slight elevation so the pitch renders as a shallow trapezoid. This is mechanical, not stylistic: pure side-on collapses leg and off into one pixel column and kills the bowling line input.

**The figures never gain fidelity.** No better rigs for internationals. Everything earned is expressed in the world around them, which keeps the idiom honest and the tier ladder cheap.

**Light and palette.** Hard tropical light, short shadows, high chroma. Maroon and gold as the spine colours. Grounds go from a dirt-patch square with a road on one boundary and the sea behind it, through a painted picket boundary and a small stand, to a stadium drawn as two stacked colour bands, to floodlight pylons as four vertical strokes over a saturated crowd field.

**Crowds are close.** At club level they are individual blobs on the boundary edge with speech shapes — they talk to you, and they talk to the bowler. Above regional they become a texture whose density and colour *is* the tier readout. The crowd getting further away as you climb is the one thing that gets worse with promotion, and that is deliberate.

**UI.** Chunky numerals top-centre, poster weight, no panels. Shot fan drawn on the field. Bowling line marker and length track painted on the pitch. Swagger and Hostility are the only meters, and each is a single bar with a colour ramp. A stranger walking past should read the score, the format, and who is winning.

**Motion is the feedback.** Middled: bat blurs, pose holds ~200ms, speed lines, hard trail. Mistimed: ragdoll, spinning bat, wobbly loop. Beaten: over-rotation. Big events get full-screen chunky type held half a second.

**The tell, solved by the idiom.** No faces or fingers means a rotating hand-blob and a white seam stripe on a red circle are the only moving details in the run-up. The Layer 3 read is legible *because* the art is bare.

## Audio

**The soundtrack is a feedback instrument.** Live percussion, layered, driven by the meters. Baseline is a single hi-hat and crowd noise. As Swagger builds, layers stack — the ground starts playing for you, and it drops out the ball you get out. Bowling inverts it: Hostility drives a low, sparse, threatening pattern that thickens as the batter starts flinching. Players will feel the meters before they read them, which is the point.

Bat contact is three chunky samples — middle, edge, miss. Crowd is the other tier signal: at club level, individual voices, close, personal, funny; internationally, an undifferentiated wall. Short comic stings on ducks and drops. A rising note as the ball travels toward the rope that resolves either way.

**Tone.** Comic and dry, played straight where it counts. The career is serious; the furniture is funny. Never pastiche.

## Simulation & The Ledger

Everything outside your innings and spells is simmed, presented as a scorecard filling in compressed real time on the tier-appropriate board — hooked number plates at village level, LED internationally — with two or three watchable moments per match. Never a wall of numbers.

The Ledger holds full career stats per tier and format, plus wagon wheels and dismissal maps, which double as the Dossier's source data. The narrative chase is three milestones: first club hundred, first regional five-for, first cap. Honour boards are painted boards on the clubhouse wall and persist for the whole career.

---

## MVP — First Playable Vertical Slice

One club, two tiers, 40-over only. Full batting and bowling schemes at Layers 1–2, including **Swagger, Hostility, cap-or-helmet, the bouncer and the walk-back** — the flair systems are the product, not a later feature. A 12-match season. Two-tier selection on the three-number model. DNB handling. The Ledger. One art tier built to final quality, with the adaptive percussion working.

**Cut:** regional and international tiers, the Dossier, T20 and multi-day, injuries, the captain's conversation, narrative threads, every art tier above club.

The slice answers two questions: is one over fun with no career attached, and does the bowling scheme hold up across a full ten-over spell?

## Five Open Questions

1. **Does Swagger read as a flow state or as a power-up?** Build it both ways — a visible meter against pure animation-and-audio feedback with no bar — and test which one players describe in their own words afterward.
2. **Does the two-tap bowling gesture survive a long spell?** Instrument ball 4 against ball 40 and measure accuracy decay and self-reported tedium.
3. **Is the elevated side-on camera enough to read line?** The whole bowling scheme rests on it. Build the trapezoid at three angles and test line discrimination cold, no tutorial.
4. **Does the no-helmet toggle stay a real choice at the top?** If the injury risk makes cap strictly wrong internationally, the game's signature decision dies exactly where it should matter most. Tune the injury curve against observed take-up rates by tier.
5. **How many real minutes is a season?** Find the number at which a meaningful share of players finish twelve seasons, then build the fixture list backwards from it.
