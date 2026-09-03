/* Drive the real Bat/Bowl state machines with a scripted thumb. */
const H = require('./harness.js');
const { G } = H;
const { M, Bat, Bowl, Ball, Match, Cam, LEVELS, SHOTS, STYLES, Input } = G;

const DT = 1 / 120;

function advance(t) { H.setClock(t); }

/* --- BATTING ---------------------------------------------------------- */
function simBattingInnings(tier, sigma, balls, opts) {
  opts = opts || {};
  M.reset(tier, 'batPractice');
  M.gear = opts.gear || 'helmet';
  Match.screen = 'match';
  M.phase = 'bat';
  Cam.home(true);
  Bat.lastBackliftZone = -1;
  Bat.nextBall();

  const tally = { balls: 0, runs: 0, dots: 0, ones: 0, twos: 0, threes: 0,
                  fours: 0, sixes: 0, out: 0, byRuns: {}, how: {} };
  let clock = 0;
  let planned = null;

  // scripted input: pick the best zone for the ball, release with a timing error
  const origTakeRelease = Input.takeRelease.bind(Input);
  Input.takeRelease = function () {
    if (!planned) return null;
    if (clock >= planned.at) { const p = planned; planned = null; return p.rel; }
    return null;
  };
  Input.charging = () => false;
  const origReadAim = null;

  let guard = 0;
  while (tally.balls < balls && guard < balls * 4000) {
    guard++;
    clock += DT;
    advance(clock);

    if (Bat.phase === 'flight' && !planned && !Bat.swung) {
      // choose the shot the ball deserves, then time it with an error
      // a player picks the shot for the ball: its length, its height AND its
      // line, which is what the bat having a position now demands
      let best = 2, bs = -9;
      for (let i = 0; i < 6; i++) {
        const S = G.SHOTS[i];
        const len = S.likeLen.indexOf(Bat.d.band.key) >= 0 ? 1 : 0;
        const h = Bat.pred.y >= S.likeH[0] - 0.2 && Bat.pred.y <= S.likeH[1] + 0.2 ? 1 : 0;
        const line = 1 - Math.min(1, Math.abs(Bat.pred.z - S.reachZ) / 0.9);
        const sc = len + h + line * 1.6 + Math.random() * 0.2;
        if (sc > bs) { bs = sc; best = i; }
      }
      Bat.zone = best;
      // aim: a player who reads the field picks the gap next to the fielder
      let ang = G.SHOTS[best].ang;
      if (opts.placement !== false) {
        let bd = -1;
        for (let a = ang - 24; a <= ang + 24; a += 2) {
          const r = 24;
          const px = G.CONTACT_X - Math.cos(a * Math.PI / 180) * r;
          const pz = -Math.sin(a * Math.PI / 180) * r;
          let near = 999;
          for (const f of M.field) near = Math.min(near, Math.hypot(px - f.x, pz - f.z));
          if (near > bd) { bd = near; ang = a; }
        }
      }
      const phi = G.screenFromAim(ang);
      Input.down = true; Input.ox = 640; Input.oy = 360;
      Input.x = 640 + Math.sin(phi * Math.PI / 180) * 120;
      Input.y = 360 - Math.cos(phi * Math.PI / 180) * 120;
      const err = randn() * sigma;
      planned = {
        at: Bat.contactT + err,
        rel: { x: 0, y: 0, ox: 0, oy: 0, t: Bat.contactT + err, held: opts.held || 0.25 },
      };
    }

    const before = M.bat.balls;
    Bat.update(DT);
    if (M.bat.balls > before) {
      const o = Bat.outcome || { runs: 0 };
      tally.balls++;
      tally.runs += o.runs;
      tally.byRuns[o.runs] = (tally.byRuns[o.runs] || 0) + 1;
      if (o.wicket) { tally.out++; tally.how[o.how || o.label] = (tally.how[o.how || o.label] || 0) + 1; }
      else if (o.runs === 0) tally.dots++;
      else if (o.runs === 1) tally.ones++;
      else if (o.runs === 2) tally.twos++;
      else if (o.runs === 3) tally.threes++;
      else if (o.runs === 4) tally.fours++;
      else if (o.runs === 6) tally.sixes++;
      planned = null;
      if (M.bat.out) { M.bat.out = false; M.swagger = 0; }
    }
  }
  Input.takeRelease = origTakeRelease;
  return tally;
}

function randn() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* --- BOWLING ---------------------------------------------------------- */
function simSpell(tier, styleKey, tapErr, balls, target) {
  M.reset(tier, 'bowlPractice');
  if (target) { M.bowl.target = target; M.bowl.overs = 5; }
  M.style = STYLES.find(s => s.key === styleKey);
  Match.screen = 'match';
  M.phase = 'bowl';
  Cam.home(true);
  Bowl.nextBall();

  const tally = { balls: 0, runs: 0, wickets: 0, dots: 0, fours: 0, sixes: 0 };
  let clock = 0, guard = 0;

  while (tally.balls < balls && guard < balls * 4000) {
    guard++;
    clock += DT;
    advance(clock);

    if (Bowl.phase === 'setup') {
      // aim a good length just outside off, occasionally shorter
      Bowl.target.x = 16.4 + randn() * 0.5;
      Bowl.target.z = 0.35 + randn() * 0.25;
      Bowl.startRunup();
      continue;
    }
    if (Bowl.phase === 'runup') {
      Bowl.tapErr = Math.min(1, Math.abs(randn()) * tapErr);
      Bowl.tapped = true;
      Bowl.release();
      continue;
    }
    const before = M.bowl.balls;
    Bowl.update(DT);
    if (M.bowl.balls > before) {
      const o = Bowl.outcome || { runs: 0 };
      tally.balls++;
      tally.runs += o.runs;
      if (o.wicket) tally.wickets++;
      if (o.runs === 0 && !o.wicket) tally.dots++;
      if (o.runs === 4) tally.fours++;
      if (o.runs === 6) tally.sixes++;
      if (M.bowl.wickets >= 10) M.bowl.wickets = 0;
      if (target && M.bowl.balls >= 30) { M.bowl.balls = 0; M.bowl.runs = 0; M.bowl.wickets = 0; }
    }
  }
  return tally;
}

/* --- report ----------------------------------------------------------- */
function pc(n, d) { return (100 * n / d).toFixed(1) + '%'; }
function row(label, t) {
  const bd = t.fours + t.sixes;
  console.log(
    label.padEnd(34) +
    ('boundary every ' + (bd ? (t.balls / bd).toFixed(1) : '∞') + ' balls').padEnd(28) +
    ('SR ' + (100 * t.runs / t.balls).toFixed(0)).padEnd(9) +
    ('out ' + pc(t.out, t.balls)).padEnd(12) +
    'dot ' + pc(t.dots, t.balls) + '  1s ' + pc(t.ones, t.balls) +
    '  2s ' + pc(t.twos, t.balls) + '  3s ' + pc(t.threes, t.balls) +
    '   ' + JSON.stringify(t.how));
}

const N = parseInt(process.argv[2] || '600', 10);
console.log('=== BATTING (' + N + ' balls each) ===');
LEVELS.forEach(L => {
  row(L.name.toLowerCase() + ', new player (140ms)', simBattingInnings(L, 0.140, N, { placement: false }));
  row(L.name.toLowerCase() + ', competent (60ms)', simBattingInnings(L, 0.060, N));
  row(L.name.toLowerCase() + ', expert (35ms)', simBattingInnings(L, 0.035, N));
});

console.log('\n=== BOWLING (per 6 balls, no target) ===');
for (const k of ['fast','medium','finger','wrist']) {
  const acc = simSpell(LEVELS[1], k, 0.12, N);
  const slop = simSpell(LEVELS[1], k, 0.55, N);
  console.log(k.padEnd(9) +
    ' accurate: ' + (acc.runs / acc.balls * 6).toFixed(1) + '/ov  ' +
    (acc.wickets / acc.balls * 24).toFixed(1) + ' wkts per 24' +
    '   |  sloppy: ' + (slop.runs / slop.balls * 6).toFixed(1) + '/ov  ' +
    (slop.wickets / slop.balls * 24).toFixed(1) + ' wkts per 24');
}

console.log('\n=== DEFENDING A TARGET (5 overs, 600 balls sampled) ===');
for (const tgt of [30, 55, 80]) {
  const acc = simSpell(LEVELS[1], 'fast', 0.12, N, tgt);
  const slop = simSpell(LEVELS[1], 'fast', 0.55, N, tgt);
  console.log(('need ' + (tgt / 5).toFixed(1) + '/ov').padEnd(14) +
    'accurate: ' + (acc.runs / acc.balls * 6).toFixed(1) + '/ov  ' +
    (acc.wickets / acc.balls * 30).toFixed(1) + ' wkts per 5 ov' +
    '   |  sloppy: ' + (slop.runs / slop.balls * 6).toFixed(1) + '/ov  ' +
    (slop.wickets / slop.balls * 30).toFixed(1) + ' wkts per 5 ov');
}
