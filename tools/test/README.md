# Headless test suite

Drives the *shipped* `Bat` and `Bowl` state machines out of
`grade-cricket.html` with a scripted thumb, so every figure is measured from
the game rather than from a model of it.

    node tools/test/run.js              # 20 suites, ~30s — before every commit
    node tools/test/run.js --batting    # against the batting-only build
    node tools/test/run.js sim          # batting balance table (slow)
    node tools/test/run.js e2e          # six full matches, card arithmetic

`harness.js` stubs enough browser to `eval` the game's script block straight
out of the HTML and exports its internals. `GAME=path/to/build.html` points it
at a different build. Nothing is generated and nothing is checked in but the
scripts themselves.
