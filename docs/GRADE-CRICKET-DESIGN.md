# Grade Cricket — Concept & Design Document

Single-player arcade cricket career. Stick figures, drawn in perspective from behind the batter. One cricketer, batting and bowling, from village club cricket to a Test cap. 10–15 seasons.

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

**Camera.** Fixed behind the batter, a little above his head, looking down the pitch at the bowler. This is mechanical, not stylistic. Line and length are one read from here: the ball comes at you and grows, so where it will pitch and how high it will get are the same piece of information rather than two. Swing bends it across the frame and spin kicks it sideways, both visible because you are looking straight down the line of them. The side-on view this replaced could show neither — it collapses the ball's approach into a profile, and no amount of elevation fixes that.

The cost is square of the wicket, which is off the edge of the picture. On contact the camera lifts, widens and swings on to the ball to pay it back. Your own spell is the same camera turned round: from behind the bowler's arm, with the off side correctly on the left.

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
2. **Does the drag-and-tap bowling gesture survive a long spell?** The scheme is down to one placement and one beat, which should hold up better than the three inputs it replaced — but the risk moves rather than disappearing: a gesture this simple can go stale instead of getting tiring. Instrument ball 4 against ball 40 and measure accuracy decay and self-reported tedium.
3. **Does the behind-the-batter camera cost anything square of the wicket?** Answered for line: looking down the pitch makes line and length one read, and the elevated side-on view this replaced never did. The open half is what happens after contact — a cut or a pull leaves the frame, and the camera has to swing to follow it. Test whether players can tell a well-placed square shot from a lucky one, and whether the swing reads as a replay or as losing the ball.
4. **Does the no-helmet toggle stay a real choice at the top?** If the injury risk makes cap strictly wrong internationally, the game's signature decision dies exactly where it should matter most. Tune the injury curve against observed take-up rates by tier.
5. **How many real minutes is a season?** Find the number at which a meaningful share of players finish twelve seasons, then build the fixture list backwards from it.

---

## Implementation — `grade-cricket.html`

The playable slice of §0–§2, built for a browser-and-mobile portal release
(CrazyGames). One self-contained HTML file: no build step, no external
requests, no asset files. The art is drawn and the audio is synthesised, so
the whole game is the file. Landscape-first at a logical 1280×720,
letterboxed; portrait shows a rotate prompt and is dismissible.

**The camera is behind the batter, looking down the pitch.** A real pinhole
projection with a yaw and a downward tilt, so the pitch converges and the ball
comes at you and grows. Length is read by watching it rather than by reading a
bar. Swing bends the ball across the screen before it pitches and spin kicks it
sideways after — both are visible because you are looking straight down the
line of them, which a side-on camera could never show. On contact the camera
lifts, widens and swings on to the ball, so square play is still watchable;
turn it round to `yaw = π` for your own spell and you get the view from behind
the bowler's arm with the off side correctly on the left.

**What is in.** The twenty-minute game and both meters. Batting: the six-zone
fan with continuous aim between the zones, tap/hold/premeditate, the raised
backlift, cap-or-helmet, Swagger with all three effects (stance, flourish,
degraded bowler accuracy). Bowling: drag a target on the pitch, one timed
release, six styles and one variation each. Real fielding positions with
names. A real outfield-and-throw model, so twos and threes are earned. Both
tiers at Layers 1–2, the length-marker squeeze between them, the Dossier stub,
the fast-forward of the rest of your team's innings, the selector's note, and
instant restart.

**Controls.** One thumb does everything: press anywhere, drag to pick the
line, release on the ball. The pick-up rises the moment you press. Hold time is intent — tap is control, hold is
attack, hold from before the bowler lets go is premeditated *and* raises the
backlift. Bowling is drag the target, tap BOWL, tap on the beat. Keyboard is
1–6 aim, SPACE swing/bowl, arrows to aim your bowling, V for the variation,
M to mute.

### Bowling: one drag and one tap

The three-input scheme in the first build — line drag, timed five-band length
sweep, quarter-second seam dial — was too much to do in the time a run-up
lasts, and the seam dial in particular was an abstraction nobody could feel.
It is replaced by:

1. **The target** — drag it anywhere on the pitch. Line and length in one
   untimed, spatial input. It stays where you left it between balls.
2. **The release** — one cursor, one green band, one tap. How far off the beat
   you are is how far the ball lands from the target. Quicker styles sweep
   faster.

The walk-back input is gone; the long walk now just happens, as feedback. The
bouncer is no longer a separate button — it is the fast bowler's variation, on
the same one button every other style uses for theirs.

**Four styles, and the difference is in the ball, not the input.**

| Style | Pace | Stock | Variation | What moves |
|---|---|---|---|---|
| Fast | 21.0–23.4 | Outswinger | Inswinger | Sideways **in the air**, before it pitches. Pick which way. |
| Medium pace | 17.0–19.0 | Stock | Slower ball | A little swing; the variation loops and dips |
| Finger spin | 13.0–14.6 | Off break | Arm ball | Turns **in** to a right-hander, off the pitch |
| Wrist spin | 11.8–13.6 | Leg break | Googly | Turns **away**. The googly does not. |

Swing and seam were separate styles doing nearly the same job. Swing folded
into FAST, where it is the choice between the two deliveries rather than a
style you commit to for a match; seam went.

Swing is a lateral acceleration applied only before the bounce; turn is a
lateral velocity handed over only at the bounce. Both are folded into the same
`predict()` the timing window and the AI read from, so nothing is a hidden
die roll. You pick your style before the match and the opposition rotate four
bowlers of their own, one over each, which is most of the variety you meet
while batting.

### Fielding positions

Eleven men, in positions with names, at the angles and distances they are
actually set: keeper, slip, gully, point, cover, extra cover, mid off, mid on,
midwicket, square leg, backward square, short fine leg, and the deep set —
third man, fine leg, deep point, deep cover, long off, long on, deep
midwicket, deep square leg. Deep positions are stored as a fraction of the
boundary so the ring stays a ring on either ground. Club is a ring with two
saved on the rope; island adds a gully and pushes a man back. The names are
drawn under the men before each ball, because knowing where cover is standing
is half of knowing where to hit it.

### Runs are earned, not looked up

The first build decided runs from a distance table, which is why a ball rolling
into a gap paid the same single as a push straight to cover. It now runs the
whole sequence:

- the ball keeps rolling under exponential drag;
- every fielder is tested against every point on that path — reaction time,
  sprint speed and about two metres of dive — and the first who can get there
  cuts it off. Nobody can, and it is four;
- he gathers, and throws to the nearer end at 24 m/s;
- the batters take whatever that clock allows: 2.7s for the first run, 3.6s
  for each one after it, because turning is the expensive part.

Two and three fall out of that on their own, and the chase is played on screen
— the fielder running it down, the throw coming back, and the two of them
turning — compressed so the next ball is still under two seconds away.

The corollary is that the ring is set at the positions the six shot names are
taken from, so a cover drive aimed at COVER is a cover fielder's catch. The
fan's zones therefore became a continuum: where you point *between* two names
is where the ball goes. That is §3 Layer 2's "direction becomes which gap",
and it costs nothing on a phone, because you were already dragging.

### The shot is an animation, not a caption

Each of the six zones has a keyframed swing: a high pick-up, a downswing to
its own contact angle, a follow-through to its own finish, and a hold. The
swing always rotates the same way — from over the shoulder, down through the
line, and out the far side — because that is the direction a right-hander's
bat actually travels; only where it stops differs, and that is what tells the
shots apart. A cut is a quarter turn dying at waist height off the back foot.
A straight drive is most of a half turn off the front foot finishing above the
shoulder and held for well over half a second. The bat is drawn back along its
own arc during the downswing so a middled shot reads as a wedge rather than a
stick that teleported, and being beaten over-rotates the finish.

Four things the reference batting of §1 has that a keyframed arc alone does
not, all of which the second pass added:

- **The trigger.** A small press back and across in the last third of a
  second of the run-up, with the bat rising as the bowler loads.
- **The pick-up happens every ball.** It used to come up only when you held
  the input. Now it rides to about 166° as a matter of course and holding
  takes it higher and earlier — so premeditation is still legible, but as
  *more* of something that always happens rather than as the only time he
  looks like a batter.
- **He strides.** A front-foot shot moves him up to 0.70 m down the pitch and
  a back-foot one rocks him back a third of a metre. This is a real change of
  world position, so it foreshortens correctly; it is presentation only, and
  contact is still resolved at a fixed point, because moving that would
  re-time every window in the game.
- **The bat snaps late where it should.** Each shot carries a `whip`
  exponent on the downswing: a flick through midwicket is nearly all bottom
  hand and barely moves before it accelerates (170° → 157° → 48°), where a
  cover drive swings evenly through the same span (176° → 145° → 65°).

**The stance, read off the behind-the-arm view.** Three things a reference
frame makes obvious that a keyframed arc does not:

- **A batter is a narrow shape.** Feet close together and side on, 15° and 9°
  off the vertical rather than the 21°/13° splay the first pass used, which
  read as somebody bracing for a tackle.
- **The bat is grounded.** In the stance the toe rests on the turf behind the
  back foot at about 22°, not hanging in space.
- **The pick-up is wrists, not arms.** The hands sit at hip height — 49% of
  his own height — and stay there: 49% in the stance, 50% at the trigger, 52%
  at a premeditated pick-up. Over the same span the bat toe travels from 6%
  of his height to 96%, up over his head. Lifting the arms with the bat was
  what made the first pass look like somebody raising an axe.

**The striker is a foreground character.** The batting camera moved in to
about seven and a half metres behind him and dropped to head height, which
takes him from a fifth of the frame to a quarter and opens the pitch out past
his shoulder. The figures also lost some bulk — a smaller head and longer,
thinner limbs — because at that size the chunky proportions read as a mascot
rather than a cricketer.

**And they are side on.** They were drawn on the facing rig, square to the
camera, which is not how anybody stands at a crease. All four — striker,
non-striker, the batter you bowl at and the two of them running — now use the
side rig. From behind the striker the off side is to the right so he turns
that way, and the swing table's angles are already screen angles, so they
carry straight over. At the other end the camera has the off side on the left,
so that batter is the same rig mirrored and his cut still goes to the off.

The feet are no longer level, the chest opens through the leg-side shots, and
Swagger changes the stance rather than only the meter: the taps slow from
about one and a half a second to under one, the bat rides higher between
balls, the stance opens, and past 55% he stops turning his head to watch the
bowler. That is §1's Presence, and it costs nothing mechanically.

Archetype, not portrait — what is lifted is the shape of the movement and
nothing else. The AI batter you bowl at plays off the same table, so his shots
read too.

### The power bar

Hold time has always been intent — tap for control, hold to attack, hold from
before he lets go to premeditate — and none of it was visible. You found out
how hard you had swung by getting caught at midwicket.

A bar appears at the bottom of the frame while the thumb is down, in three
segments, with the two dividers drawn at the exact thresholds the swing reads:
0.15s and 0.42s. CONTROL, ATTACK, BIG SHOT, and PREMEDITATED when the press
came before release. Checked against the swing's own decision at seven hold
times and on an early hold, the bar and the shot agree every time — which is
the only property that matters, because a power meter that lies is worse than
no power meter.

It replaces the BACKLIFT UP caption, which was saying one part of the same
thing in words.

### The 1980s pass

The presentation was period-neutral. It now commits:

- **Mown stripes** down the length of the ground, so they converge away from
  you toward the bowler. Sixteen quads, clipped to the rope. This is the
  single most 1980s thing on the screen.
- **Advertising boards** around the boundary — flat colour blocks a metre
  high, which is what a ground looked like before video hoardings, and which
  also hide the seam between the outfield and whatever is beyond it.
- **Kit.** A broad band across the chest and a wide collar, in the coloured
  clothing of the era. Two shapes out of the eight-shape budget, spent on
  saying which decade this is.
- **A caption-generator scorebar.** Hard rectangles, no rounded corners, no
  gradients, two flat colours, a rule between the cells and a hard drop
  shadow — the way a 1983 outside broadcast built one.
- **The broadcast pass.** Scanlines from a four-pixel pattern, a soft
  vignette, and a warm cast, composited over the finished frame. Kept
  deliberately light: every one of those is a veil over the thing you are
  trying to time, so the point is that it reads as period, not that it reads
  as broken.
- **A period colour grade** — a yellower grass, a paler warmer sky, cream
  instead of white.

### A catch is a man getting to the ball

Catches were judged at the bounce, against a reach that grew with hang time —
up to about a dozen metres for a skier — and the ball was then handed to
whoever qualified. On a scorecard that reads fine. On screen the ball came
down in an empty patch of outfield and jumped into the hands of somebody
standing a long way off, which is not a catch anybody believes. Caught behind
was worse: a box drawn behind the stumps that named no fielder at all.

The decision now happens in the air. A struck ball has no horizontal drag, so
the moment it leaves the bat its landing point and its hang time are known
exactly. Whoever can cover that ground in the time available is sent, and you
watch him run under it; he is standing on the spot when the ball arrives, so
the take happens where the ball actually was. If nobody can get there, nobody
catches it — and the man who was sent is already at the ball, so he fields it
straight away, which is also right. The keeper is in the same pool, for edges
only, so caught behind is a keeper taking a catch like any other.

Audited over 2,100 balls of deliberate slogging across both tiers: every
dismissal given as caught was taken by a named fielder, and the furthest the
ball ever moved into his hands was 2.46 m — inside a dive. Fielders ran an
average of 6 m for their catches and as much as 14.6 m.

The bowler is the exception that had to be written down. He is one of the
eleven, but he is drawn by his run-up rather than by the fielding code, so he
was skipped when the field was drawn — and a caught and bowled left the ball
hanging in mid-air a few metres from a bowler standing in his follow-through.
He now drops out of the run-up and into the field the moment he is the one
taking the catch or chasing the ball, and his fielding station moved to where
a follow-through actually leaves him, which is the only place a caught and
bowled can plausibly happen.

Two more that used to happen only in the scoreboard:

- **The keeper takes what you leave.** A ball left alone or beaten used to
  sail on out of the ground with nobody behind the stumps. It now ends in the
  gloves, every time.
- **Bowled is judged at the stumps.** The check used to read the ball's
  position several metres past them, after swing and spin had carried it
  somewhere else. It now records what the ball was doing as it crossed the
  stumps and judges that.

The keeper is also drawn during your innings. He stands between the lens and
the batter, which is why the first build culled him — and why the scene is now
drawn back to front, each figure queued with its own distance from the lens,
rather than in a fixed order that put whoever was written last on top. The
stumps are in that queue too: painted first, they were painted *under* the
keeper, so from your own end of the pitch he appeared to be standing in front
of the wicket he was standing behind.

Between balls the bowler walks back. He used to be drawn standing halfway down
the pitch while you set your field, which is nowhere a bowler has ever stood;
he now returns to the top of his mark over about a second and waits there,
turning the ball over, which is also the design's long walk finally doing its
job as feedback rather than as an input.

### The non-striker is out of the way

He was standing at z = +1.15, on the off side of the bowler's stumps, which is
the lane a right-arm-over bowler runs and releases through — so every delivery
went through him. He now stands on the other side, two metres clear of the
arm, and backs up as the ball is released. The umpire had the same problem and
has moved a step to the leg side of the bowler's stumps.

### What playtesting changed, and what it cost

**Hostility is gone.** It was one of the two pillars in §1–§2, and it was the
weaker one. Swagger survives because it is a batting power-up you can feel;
Hostility asked the player to read a meter while doing the one thing that
already needs their full attention, and its main mechanical job — widening the
AI batter's error — was doing work that accuracy and ball movement already do
more honestly. Removing it left the bowling scheme as target, beat, variation,
and the batter's confidence tick to tell you whether it is working. It also
un-suppressed the run rate. Getting the five-over game to actually look like
one took two more passes, recorded under *A five-over side bats like one*
below; a spell now goes for 3.5–5.9 an over rather than 2–3.

**Two tiers became three difficulties.** Village club and island senior were
career ladder rungs in a slice with no career. EASY / MEDIUM / HARD say the
same thing to a player who has just arrived, and the three still differ only
in window widths and distances — pace, waywardness, how long the length marker
stays up, how fast the field is, and how big the ground is. Measured, the same
competent player scores at a strike rate of 156, 116 and 61 across the three.

**Four bowling styles, not six.** Swing and seam were separate styles doing
almost the same thing; swing folded into FAST as its two variations, and seam
went. What is left is FAST (out/inswing), MEDIUM PACE (slower ball), FINGER
SPIN (arm ball) and WRIST SPIN (googly).

### The player, the cast and the card

**Your player** is a name, a lid, a skin tone and a kit, on one screen, with
the figure beside the controls drawn from the same rig the match uses — so
what you pick is what walks out. Whites are in, because most of the era this
game is set in was played in them.

**The cast** is parody, pushed to recognisable on request. Every name is a
bent spelling of a famous surname rather than the surname itself — the joke
only works if you can hear who it is rubbing against, and it only stays a joke
if it is never actually them. Eleven a side, an initial and a surname each,
out of per-nation pools with a nation drawn for each team, and at most two men
in a side share a surname, checked over three hundred cards. Nobody real is in
it, and the figures a name ends up with are whatever happened in your match.

**The scorecard** is filled in as the match happens rather than invented at the
end. Their card advances a batter on every wicket you take; your own line is
real and the rest of your side is shared out at the innings break so the column
adds up to the total you are defending. Their attack is four of the same eleven
you bowled at, taken from the bottom of the order — the first pass drew two
separate name lists and the card read as though they had brought a second team.

**The leaderboard** keeps your ten best innings, sorted, with the difficulty
they were made on. It is local: the game is a single file that makes no network
calls, so an online board needs a server this build does not have. It is stored
in the shape a server would want, so wiring one up later is a fetch rather than
a rewrite — which is also the honest first step towards the online two-player
idea, and that stays parked as agreed.

### The match as a broadcast

Every match now happens somewhere. A ground drawn from the opposition's own
nation, a time of day that sets the sky, the grass and how full the boundary
is, and a caption before the first ball naming the fixture, the ground, the
light, the format and the difficulty. It costs one screen and four constants,
and it is the difference between a test harness and a game with a world.

### Four formats, two ways to play

**T5**, **T10** and **ONE DAY** are five, ten and twenty overs of coloured
clothing, a ring field and a total to chase; the AI's patience rises with the
length, so twenty overs is a different innings rather than four times the same
one. **TEST** is whites, a slip cordon, twenty overs — and two innings each,
which is eighty overs of cricket and the longest thing in the game by some way.

Two innings is a real change of shape rather than a label. Your first innings
sets a total nobody is chasing, because there is nothing to chase yet; their
first innings is played out to ten wickets or the overs with no target on the
board; you bat again, and only the fourth innings of the four has a number to
get. The match is decided on aggregate, the scorecard grows a pair of innings
tabs, and the break between the second and third innings says what the lead is
instead of pretending a total is being defended.

**WHOLE TEAM** means what it says now. It used to bat the whole innings and
score all of it to one man's line, which is the same game as MY PLAYER with a
different label on it — the user's word for it was "still locked on the
player", and that was exactly right. You now bat all eleven: the innings runs
to ten wickets or the overs, a dismissal brings the next man out, the two
batters cross on the odd runs and change ends with the over, and every line on
the card is filled in as it happens. One of the eleven is your player, and
the cap you chose is on his head and nobody else's. You bowl every over too,
choosing who takes each one — including the first — off a four-man attack.

**MY PLAYER** is the design's original: you bat at your own number and bowl
your own spell. Your number is a real decision, because it decides the
situation you walk into — opening is a fresh sheet, coming in at seven is six
down with the overs going. What was already gone when you got there is priced
off the format rather than at a flat ten runs a wicket, which is why a
twenty-over total no longer reads like a Test score. Your spell is a quarter
of the innings, capped at four overs where a real one is.

Season and career stay parked, as agreed, until the ball-by-ball game settles.

### Wickets, and how they read

Bowled takes the stumps out of the ground: three sticks and two bails given a
shove along the ball's own line and then left to gravity. It was the loudest
thing in cricket and it was a caption.

Both cards now say how every man went, with the bowler named — `b`, `lbw`,
`c wk  b`, `c cover  b`, `c & b`, `run out`, `st wk  b` — and both carry an
extras line, because a card that does not add up is not a card. Verified
across four full matches at different difficulties, formats and batting
positions: every column balances against the team total and no dismissal is
blank.

### An edge goes behind square

The reach envelope gave the bat a position, and everything it turns into an
edge was still flying wherever the shot was pointed — an outside edge off a
cover drive went to cover. On a scorecard that showed up as the keeper taking
two thirds of every dismissal on hard, because a soft edge lands near the bat
and he was the nearest man to it.

An edge is a deflection, so it is modelled as one. Around two in three leave
the face at an angle of their own and carry on behind square — the cordon sees
about two thirds of those and fine leg the rest — and the remaining third are
the thick ones that go roughly where he aimed. They also keep the pace and lose
the height: a nick that went behind square gets under a third of the lift, so
most of them run away for runs and only some of them carry. That is why the
cordon is a lottery rather than a wall, and it is what turns slip from an
ornament into a fielder who takes thirty catches in a session of slogging.

The keeper is now barred from anything landing in front of the stumps. He was
eligible for every edge, and with a second of hang time he could cover nine
metres — so he was sprinting past the batter to take catches that were slip's
or nobody's. Together the two changes cut the keeper's share of dismissals from
about two thirds to under a half and put the rest where a scorecard expects
them: slip, square leg, midwicket, short fine leg.

### A five-over side bats like one

The AI batter was picking a shot properly and then throwing it away. The ring
stands on the six shot angles, so an unplaced shot is a fielder's catch by
construction — and he was taking four random guesses at a gap inside twenty
degrees while the player scans the whole arc. He also had no reason to hurry:
with no target to chase the required rate was 7.5, which put his urgency at
almost nothing, so two balls in five were defensive pushes that could not reach
the ring, let alone the rope.

Both are fixed by the same idea — a batter who is in behaves like one. His
placement is now three looks plus seven more scaled by his confidence, over a
span that widens with it, so a set batter finds the gap and a new one hits it
where the shot points and hopes. And a side batting first in a five-over game
is not saving anything: the standing rate is 9.5, which is what an innings of
that length actually is. A Test side is untouched, because its patience scales
the same term to nothing.

The third piece was *loose*, which decided whether he could stretch for a bad
ball. It asked for the ball to be wide **and** short or full before it counted,
so a long hop on the stumps — the easiest delivery in cricket — read the same
as a good length, and an accurate spell cost the same as a sloppy one. It is
now a matter of degree, driven by length first and line second.

Measured across the four styles, that moved an accurate spell from 1.5–3.5 an
over to 3.5–4.8, and it opened a gap accuracy had never had: a sloppy spell now
costs 0.4 to 1.1 more an over and takes fewer wickets doing it.

### Practice was ending after two overs

`simRestOfSpell` — the MY PLAYER rule that hands your team-mates the overs you
do not bowl — was firing in bowling practice too. Practice runs to ninety-nine
overs, so two overs in it simmed the other ninety-seven and dropped the player
on a result screen having conceded about nine hundred. It is gated to a real
match now. It is worth writing down because the balance figures in this
document are measured by driving the shipped state machines, and the harness
had been quietly stopping at the same place.

### The stops, and the things that were not moving

Four seconds of the game were wrong in ways a scorecard never shows.

**The bowler teleported.** The run-up was drawn off the clock and the tap that
times the release was drawn off the sweep bar, so tapping the beat early — which
is most taps — abandoned him wherever he stood and painted him at the crease on
the next frame. He now covers the last of the ground in a stride and then
follows through: on down the pitch, veering to the off, arm coming across, over
about a second. The reaction pose that used to stand halfway down the wicket
moved to where the follow-through ends, so there is no second jump either. The
run-up itself was shortened from 1.6s to 1.15s, because a run-up nobody ever
sees the end of is not a run-up.

**There was no stop between overs.** A five-over innings ran as one continuous
ball. The end of an over is now a screen: what it cost, what the side is on,
who is on strike, and who has the next one — and the ends change while you are
looking at it.

**Your spell ended in a cut to the result.** Finishing your overs with the
match still alive threw away the only part of it with any suspense left. The
remaining overs are simmed as before, but they are now revealed one at a time,
each with its bowler, its cost and the score after it, so a chase that went to
the last over reads like one.

**The batter changed clothes to duck.** The flinch pose was drawn in a flat
house colour with no trim, pads or skin of its own, so every ball left or ducked
put the man in a different kit for the length of the animation.

**The umpire was a fielder in the wrong shirt**, standing two and a half metres
behind the stumps and out on the square. He is at the wicket now — level with
the bowler's stumps, a shoulder's width to the leg side, clear of the arm by
1.25 m — and dressed like an umpire: the white coat and dark trousers of an
eighties outside broadcast.

### Wides, corrected

The law was biting on balls the bat could reach. The lines were set at 1.05 m
off and 0.92 m leg — inside the reach envelope, whose own far edge runs to
1.36 m — so a ball a batter could have cut was a wide. Worse, the call was made
where the ball passed the stumps rather than where the batter stands, and a leg
break that pitched on off and turned away crossed the line by doing exactly
what a leg break is supposed to do. Measured, one wrist-spin ball in five was
called wide off a perfect release, and the AI bowled one at you every four
balls of an over and a half.

The lines are now 1.48 m and 1.24 m, outside the far edge of the reach
envelope, and the call is made at the crease. The AI's lateral spread came down
with them — it ran to two thirds of a metre of standard deviation at the easy
end, and difficulty belongs in the length band, where a batter can feel it.
A wide is now one ball in twenty to thirty rather than one in four, and
parking it a metre outside off is still 120 wides in 120 balls.

### The bar across the bottom

The score lived in a caption box in the top corner. It named the striker and
his score and nothing else — you could not see who was at the other end, you
could not see what the bowler had taken or what he had gone for, and while you
were bowling it named neither batsman. That is fine for one man batting alone
and useless the moment eleven of them are yours.

It is now the bar a broadcast puts along the bottom of the picture, and it
carries what one carries: the side and its score, the over count, the state of
the match, both batsmen with their runs and balls and a dot on whoever is on
strike, and the bowler with his figures and how many he has sent down. The
same bar serves both innings with the roles swapped — bowling, it is their
score, their two batsmen and your own figures.

The state cell says what a caption generator would say: `NEED 38 OFF 24` in a
chase, `AUS TRAIL BY 167` in a Test, `4 OVERS LEFT` otherwise. Where there is
no partner to name — MY PLAYER, where you really are the only one of your side
anybody plays — that cell carries the run rate instead of an invented team-mate.

The power meter moved up to sit clear of it, on one line with its own label,
and the two bowling buttons came up with it.

### Both sides bat in pairs

Their innings had one man at the crease who faced every ball until he was out,
which read exactly as badly on their card as it did on ours. They now bat in
pairs like everybody else: two at the crease, crossing on the odd runs,
changing ends with the over, the next man in on a wicket. Over a full ten-over
innings that turns a card with two names on it into one with ten, every man
having faced balls, and it still balances against the total.

A wicket in WHOLE TEAM also names the man walking out, because with all eleven
yours that is the event, and leaving it to be inferred from the scorebar was
how it read as though the innings had ended.

**The format and how you play are remembered.** They reset to defaults on every
reload, so choosing WHOLE TEAM and coming back later put you in MY PLAYER
without saying so — which is indistinguishable from the mode not working.

### Two builds out of one file

`grade-cricket.html` is the whole game. `grade-cricket-batting.html` is the
same file with one constant flipped: `BAT_ONLY`. It drops the bowling half and
turns every match into a chase — the opposition's innings is filled in as a
real card with a total, and you go and get it. That is the shape to submit to
a portal first, because the batting loop is the one that carries the game and
it is the one a player understands in four seconds.

The batting build hides the BOWLING practice mode and leaves TEST off the
format row, because two innings needs a bowling half and offering it would be
a lie. Everything else is the same code: same difficulties, same formats, same
WHOLE TEAM and MY PLAYER, same scorecard, same leaderboard, same ticker — whose
state cell was already able to say `NEED 38 OFF 24`, so a chase reads correctly
with nothing added.

`python3 tools/build-batting.py` writes the second file. There is still no
build step to *run* either one: both are self-contained HTML.

### Typing your own name

The name was a button that cycled a pool of twelve. A canvas has no text field
and a phone has no keyboard until something asks for one — and a hidden DOM
input is not the answer, because iOS will not focus one outside a real gesture
handler, so the keyboard never appears. The letters are on screen instead, and
a physical keyboard drives the same buffer for anybody who has one. Sixteen
characters, letters, digits, space, apostrophe, hyphen and full stop; anything
else is dropped as it is typed. RANDOM is still there for people who would
rather not.

### The difficulty setting describes the opposition, not the world

Two things were wrong, and the second was the interesting one.

**The windows were too tight.** The middle window was fifty-two milliseconds —
a frame and a half — and nothing about the difficulty setting widened it; the
levels moved pace, waywardness, the length marker, the ground and the field,
but never the one number that decides whether a swing middles. The base windows
are wider now and each level scales them: easy 1.22, medium 1.12, hard 1.06.

Widening them all equally made easy *more* dangerous, which took a while to
see: every ball a beginner used to miss harmlessly became a nick he could be
caught off. The outer band has its own multiplier now — 0.72 on easy — so those
go back to being plays and misses, which cost nothing but the ball.

**And the setting was applied to the world rather than to the opposition.** On
easy the ball was slower, the ring slower, the boundary shorter and the field
sloppier — all of which helped you bat, and all of which also helped *them*,
because when you were bowling it was your own pace off the ball, your own
fielders standing still and your own short boundary. Measured, an accurate
spell went for 5.7 an over on EASY and 3.7 on HARD: bowling was hardest at the
easy end. Nobody would report that as a bug; they would conclude the bowling
half did not work.

Your arm is your arm and your fielders are your fielders, so both are now
constant across the settings, and what varies is the side you are playing:
their bowler's pace and accuracy when you bat, their batter's timing when you
bowl. Both of the AI batter's numbers now point the same way — they used to
disagree, with the opposition timing the ball *best* on EASY.

Measured after, an accurate spell goes for 2.4–4.0 an over on easy, 3.4–5.5 on
medium and 4.7–6.4 on hard, and being accurate is worth about a run an over at
every setting.

### Where this departs from the document

- **The flourish has no dedicated modifier button.** It fires on a full meter
  plus a premeditated release, because a separate modifier costs a second
  thumb on a phone. The risk/reward is unchanged: mistime it and the cone
  roughly doubles.
- **The cap costs something at club level.** The document puts the injury
  outcome at representative level and up, which would make the cap strictly
  correct in a two-tier slice. Here it narrows the timing window on short
  balls by 20% instead. The injury curve replaces this when the ladder
  extends.
- **Ground size and fielding sharpness are difficulty signals.** The rope is
  52 m on easy, 56 m on medium and 62 m on hard, and the easy ring is slower
  off the mark and slower to react. Open question 4's "the crowd gets further
  away" now has a companion: the field gets faster.
- **The chasing side accelerates.** The AI batter's aggression scales with the
  required rate, so defending 80 off 30 looks nothing like defending 30. This
  is not in the document; without it a five-over chase had no shape.
- **The UI has a panel, and the picture has a grade.** The document asks for
  chunky numerals with no panels and for high chroma. A caption box and a
  slightly veiled picture are the two things the period actually requires, so
  both are in — but the box behaves like poster type, holding nothing but the
  score at a size that reads across a room, and the grade is light enough to
  time a ball through.
- **No side-on camera, and open question 3 is answered rather than open.** The
  elevated side-on view was never enough to read line — it is what the first
  build's compressed near side was working around. Looking down the pitch
  makes line and length one read instead of two, and the leg-side imprecision
  the old camera had is gone.

### Measured balance (800-ball samples)

Batting, by how well the player times *and* places. The same scripted thumb
plays every row, after the difficulty pass:

| Difficulty | Timing | Boundary every | SR | Dot | 1s | 2s | Out |
|---|---|---|---|---|---|---|---|
| Easy | new player, 140 ms | 5.5 balls | 99 | 52% | 18% | 4% | 7.6% |
| Easy | competent, 60 ms | 2.0 balls | 230 | 22% | 21% | 6% | 1.9% |
| Easy | expert, 35 ms | 1.8 balls | 254 | 18% | 22% | 4% | 0.6% |
| Medium | new player, 140 ms | 9.1 balls | 69 | 59% | 16% | 4% | 10.1% |
| Medium | competent, 60 ms | 3.7 balls | 150 | 37% | 24% | 8% | 2.6% |
| Medium | expert, 35 ms | 3.0 balls | 172 | 34% | 25% | 6% | 1.9% |
| Hard | new player, 140 ms | 17.0 balls | 46 | 67% | 14% | 4% | 9.1% |
| Hard | competent, 60 ms | 6.1 balls | 119 | 43% | 21% | 16% | 3.1% |
| Hard | expert, 35 ms | 3.2 balls | 182 | 28% | 22% | 16% | 1.9% |

Before the pass the same competent player scored at 172 / 112 / 81 and was
dismissed on 3.5% / 3.2% / 4.2% of balls. Timing still separates skill — 99 to
254 across the three rows on easy — and the dismissal rate now falls as the
setting comes down, which it did not before.

Bowling, per over, by difficulty, against a side going at a limited-overs
tempo:

| | Fast, accurate | Fast, sloppy | Wrist, accurate | Wrist, sloppy |
|---|---|---|---|---|
| Easy | 3.5 | 4.0 | 2.4 | 5.0 |
| Medium | 3.4 | 5.1 | 3.9 | 5.5 |
| Hard | 4.7 | 6.4 | 4.7 | 5.2 |

Wides are a ball in twenty to thirty on a fair line and 120 in 120 when you
park it off the pitch.

A WHOLE TEAM innings, played by the competent thumb, comes out where an
innings should: three to seven men bat, there are partnerships, and the top
score is a real innings rather than one man facing every ball.

Every figure above comes from driving the shipped `Bat` and `Bowl` state
machines with a scripted thumb, not from a separate model. Six full matches
run end to end in the main build — all three difficulties, all four formats,
both ways to play, batting positions 1, 3, 4, 6, 7 and 11 — and five more in
the batting-only build; every innings' card balances against its own total, in
a Test all four of them, with no dismissal left blank. Every screen draws in
both builds, and every box on every menu sits inside the frame clear of its
neighbours.

### Not built

Everything §3 Layer 3 and up, the full Dossier, career, selection, seasons,
the Ledger, T20 and multi-day, injuries. The slice exists to answer the two
questions the MVP section asks, and nothing else.

### Portal integration

`Portal` is a guarded shim around the CrazyGames SDK — `loadingStart`,
`loadingStop`, `gameplayStart`, `gameplayStop`, `happytime`. Every call is
wrapped, so the build behaves identically with the SDK absent. To ship, add
the SDK script tag; nothing else changes.
