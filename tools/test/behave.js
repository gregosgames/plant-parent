const H = require('./harness.js');
const { G } = H;
const { M, Bat, Ball, Match, Cam, LEVELS, SHOTS, Input, Take, SHOT_ANIM, strikerPose } = G;
const DT = 1 / 120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}

/* ---- 1. non-striker and umpire are clear of the bowler's line ---- */
console.log('CLEARANCE (bowler releases at z = +0.34..+0.50, runs the lane at z = +0.45)');
console.log('  non-striker z = ' + G.NONSTRIKER_Z + '   gap from the lane = ' +
  Math.abs(G.NONSTRIKER_Z - 0.45).toFixed(2) + ' m');
console.log('  umpire      z = ' + G.UMPIRE_Z + '  x = ' + G.UMPIRE_X +
  '   gap from the lane = ' + Math.abs(G.UMPIRE_Z - 0.45).toFixed(2) + ' m');
console.log('  striker     z = ' + G.STRIKER_Z);

/* ---- 2. the shot animation actually sweeps ---- */
console.log('\nSHOT ANIMATION (bat angle over the swing, degrees from straight down)');
for (let z = 0; z < 6; z++) {
  const A = SHOT_ANIM[z];
  const samples = [];
  for (const frac of [0, 0.5, 1, 1.6, 3.0]) {
    H.setClock(100 + frac * G.SWING_DOWN);
    const o = strikerPose(z, 100, { quality: 'middle' }, '#000', 'cap', true);
    samples.push(o.batAng.toFixed(0));
  }
  console.log('  ' + SHOTS[z].name.padEnd(9) +
    'lift ' + String(A.lift).padStart(4) + ' -> ' + samples.join(' -> ') +
    '   (contact ' + A.contact + ', finish ' + A.finish + ', held ' + A.hold + 's)' +
    (A.back ? '  back foot' : '  front foot'));
}

/* ---- 3. catches and keeper takes ---- */
function runBalls(tier, sigma, n, opts) {
  opts = opts || {};
  M.reset(tier, 'batPractice');
  Match.screen = 'match'; M.phase = 'bat'; Cam.home(true);
  Bat.lastBackliftZone = -1; Bat.nextBall();
  Input.charging = () => false;
  let planned = null, clock = 0, done = 0, guard = 0;
  Input.takeRelease = () => { if (planned && clock >= planned.at) { const p = planned; planned = null; return p.rel; } return null; };
  const seen = { caught: 0, caughtInHands: 0, leave: 0, leaveInGloves: 0, bowled: 0, other: 0 };
  while (done < n && guard < n * 6000) {
    guard++; clock += DT; H.setClock(clock);
    if (Bat.phase === 'flight' && !planned && !Bat.swung) {
      Bat.zone = (Math.random() * 6) | 0;
      Input.down = !opts.leaveEverything;
      Input.ox = 640; Input.oy = 360; Input.x = 700; Input.y = 300;
      if (!opts.leaveEverything) {
        const e = randn() * sigma;
        planned = { at: Bat.contactT + e, rel: { x: 0, y: 0, ox: 0, oy: 0, t: Bat.contactT + e, held: 0.5 } };
      }
    }
    const before = M.bat.balls;
    Bat.update(DT);
    if (M.bat.balls > before) {
      done++;
      const o = Bat.outcome;
      const k = G.keeperOf(M.field);
      const atTaker = Take.on && Math.abs(Ball.x - Take.x) < 0.01 && Math.abs(Ball.z - Take.z) < 0.01;
      if (o.label === 'CAUGHT') { seen.caught++; if (atTaker) seen.caughtInHands++; }
      else if (o.label === 'BEATEN' || o.label === 'DOT') {
        if (Take.on && Take.keeper) { seen.leave++; if (Math.abs(Ball.x - k.x) < 0.01) seen.leaveInGloves++; }
      }
      else if (o.label === 'BOWLED') seen.bowled++;
      else seen.other++;
      planned = null;
      if (M.bat.out) M.bat.out = false;
    }
  }
  return seen;
}

console.log('\nWHERE THE BALL ENDS UP');
const a = runBalls(LEVELS[0], 0.10, 400);
console.log('  playing shots:  caught ' + a.caught + ' (' + a.caughtInHands + ' with the ball in the taker\'s hands)' +
  ',  keeper takes ' + a.leave + ' (' + a.leaveInGloves + ' in the gloves),  bowled ' + a.bowled);
const b = runBalls(LEVELS[0], 0.10, 200, { leaveEverything: true });
console.log('  leaving every ball: keeper takes ' + b.leave + ' (' + b.leaveInGloves + ' in the gloves),  bowled ' + b.bowled);
