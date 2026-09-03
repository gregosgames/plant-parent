# Grade Cricket — handoff prompt

Paste everything between the rules into a fresh agent session opened on this
repository. It is written to stand alone: it assumes no memory of the sessions
that built the game.

---

You are picking up **Grade Cricket**, a finished-and-playable browser/mobile
arcade cricket game aimed at portals like CrazyGames. It is being developed on
the branch `claude/grade-cricket-design-g06701`, which is open as a pull
request. Read this whole brief before touching anything.

## The hard constraints

These are not preferences. Breaking any of them breaks the product.

1. **One self-contained HTML file.** `grade-cricket.html` is the entire game:
   no build step, no external requests, no asset files, no dependencies. All
   art is drawn on a `<canvas>`; all audio is synthesised with WebAudio. If you
   are about to add a `<script src=...>`, a font link, an image, or an npm
   package, you have misunderstood the project.
2. **There is a second build.** `grade-cricket-batting.html` is the same file
   with the constant `BAT_ONLY` flipped to `true`, which drops the bowling half
   and turns every match into a chase. It is generated — never hand-edit it.
   Run `python3 tools/build-batting.py` after any change to the main file, and
   commit both.
3. **Balance claims are measured, never estimated.** `tools/test/` drives the
   *shipped* `Bat` and `Bowl` state machines with a scripted thumb. Every
   number in the design document came out of it. If you change a tuning
   constant, re-run the suite and update the document with the new figures. Do
   not write a number you have not measured.
4. **The design document is a running record, not a spec.** Keep
   `docs/GRADE-CRICKET-DESIGN.md` honest: when you change behaviour, add a
   short section saying what was wrong, what you did, and what it measures at.
   It already contains an account of every significant decision, including the
   mistakes — read it before proposing anything, because most obvious ideas
   have already been tried and the document says how they went.

## Running the tests

```
node tools/test/run.js              # 20 suites, ~30s — run this before every commit
node tools/test/run.js --batting    # the batting-only build
node tools/test/run.js sim          # batting balance, prints a table (slow, ~10 min)
node tools/test/run.js bowlperlevel # bowling economy by difficulty
node tools/test/run.js e2e          # six full matches, card arithmetic
```

`tools/test/harness.js` stubs just enough browser (canvas context, DOM,
`performance`, `localStorage`) to `eval` the game's script block straight out
of the HTML, then exports its internals. Point it at another build with
`GAME=path/to/build.html`. There is no generated intermediate file — the tests
run against exactly what ships.

The suites split into: **quick assertions** (every screen renders, no menu box
overlaps or leaves the frame, the bowler's run-up is continuous, catches are
taken by a named fielder standing at the ball, the field radar round-trips its
projection) and **balance measurements** (strike rate and dismissal rate per
difficulty and per timing error, bowling economy, wide rate, whole-team innings
shape, and six full matches whose scorecards must balance against their totals).

## What the game is

A ball-by-ball cricket game seen from **behind the batter**, down the pitch at
the bowler — Stick Cricket's camera, done as a real perspective projection.

**Batting** is one gesture: press, drag to pick one of six shot zones on a fan,
release on the ball. The release is your timing, how long you held is your
intent (control / attack / big shot), where you dragged is your zone. The bat
has a *position*, so a shot played to a ball it cannot reach misses regardless
of timing.

**Bowling** is two inputs: drag a target onto the pitch, then release on a
sweeping beat. How far off the beat you are is how far the ball lands from
where you put the marker. Four styles (fast with in/outswing, medium pace,
finger spin, wrist spin), each with a stock ball and a variation.

**Around that**: four formats (T5, T10, ONE DAY at 20 overs, TEST at 20 overs
and two innings a side), three difficulties, two ways to play (MY PLAYER — you
bat at your number and bowl your own spell; WHOLE TEAM — you bat all eleven and
bowl every over), a player you name and dress, a cast of parody names, live
scorecards, a local leaderboard, a broadcast ticker along the bottom, a field
radar, and a field you can set by dragging.

## Principles the code already follows

Hold to these; they were arrived at by playtesting and reverting things.

- **Stats never roll outcomes.** Difficulty and attributes set window widths,
  distances and cone sizes. The player's input decides what happens. There is
  no hidden die.
- **The difficulty setting describes the opposition, not the world.** Your own
  bowling pace, your own fielders and the size of the ground are constant
  across the settings; what changes is the side you are playing. This was got
  wrong once — easy made your own bowling slow and your own fielders sluggish,
  so bowling was *hardest* on EASY — and the document explains the fix.
- **Anything the scorecard says must be true.** Every catch is taken by a named
  fielder who is standing where the ball is. Every card column adds up to its
  total. A fielder is called by where he is standing, because that name is what
  the card writes.
- **EASY is very easy on purpose.** A beginner (≈140 ms of timing error) gets a
  boundary every 1.4 balls, and that is the brief — a portal gives a game about
  four seconds to be fun. Medium is 3.8 balls and hard is 16.7.

## Where things are

```
grade-cricket.html            the game (~5,100 lines, one file)
grade-cricket-batting.html    generated batting-only build — do not edit
tools/build-batting.py        generates it
tools/test/                   headless suite; run.js is the entry point
docs/GRADE-CRICKET-DESIGN.md  the design document and running record
```

Inside the HTML, the sections are banner-commented and in this order: build
flag, world constants, bowling styles, grounds, formats, fielding positions,
difficulty levels, palette, utilities, portal shim, save, audio, camera and
projection, art, the ball, the field, shot resolution, the outfield and the
run, the catcher, the take, tuning (`CFG`), input, match state (`M`), batting
(`Bat`), bowling (`Bowl`), match flow (`Match`), scene, power, HUD and ticker,
the broadcast pass, screens, and the loop.

## Conventions

- World axes: `x` runs down the pitch (0 = bowler's stumps, 20.12 = striker's),
  `z` across it (**+z is the off side**), `y` is height. From behind the batter,
  screen-right is +z.
- Comments explain *why*, in prose, at the density already in the file. Match
  it. Several comments record a bug that was fixed and why the obvious
  alternative was wrong — do not delete those.
- Commit messages are prose that says what was wrong and what changed, not a
  bullet list of files.
- The CrazyGames SDK is a guarded shim (`Portal`); the build behaves
  identically with the SDK absent. To ship, add the SDK script tag.

## Explicitly deferred

Do not start these unless asked: online two-player, season mode, career mode.
The user's position is that they come after the ball-by-ball game is settled.

## How to work

Small, verified changes. For anything touching feel or balance: measure first,
change one thing, measure again, and put the before-and-after in the design
document. When you find something wrong that the user did not report, say so
plainly and fix it — several of the best changes in this project came from
measuring something adjacent to the actual request and finding it broken.

Start by reading `docs/GRADE-CRICKET-DESIGN.md` end to end, then run
`node tools/test/run.js` to confirm the baseline is green.

---
