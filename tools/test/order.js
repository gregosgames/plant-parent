const H = require('./harness.js');
const { G } = H;
const { M, Bowl, Bat, Cam, LEVELS, proj, PITCH_LEN, RELEASE_X } = G;

function depth(x, z) { const p = proj(x, 0, z); return p.behind ? 999 : p.d; }

for (const phase of ['bowl', 'bat']) {
  M.reset(LEVELS[0], 'match'); M.phase = phase; Cam.home(true);
  const k = G.keeperOf(M.field);
  const rows = [
    ['striker stumps', PITCH_LEN, 0],
    ['batter', G.STRIKER_X, G.STRIKER_Z],
    ['keeper', k.x, k.z],
    ["bowler's stumps", 0, 0],
    ['bowler at mark', G.markX(phase === 'bowl'), G.BOWLER_Z],
    ['bowler at release', RELEASE_X, G.BOWLER_Z],
    ['umpire', G.UMPIRE_X, G.UMPIRE_Z],
  ].map(r => ({ name: r[0], d: depth(r[1], r[2]) }));
  rows.sort((a, b) => b.d - a.d);
  console.log(phase.toUpperCase() + ' camera — painted far to near (later = on top)');
  rows.forEach((r, i) => console.log('  ' + (i + 1) + '. ' + r.name.padEnd(18) + r.d.toFixed(1) + 'm'));
  const ks = rows.findIndex(r => r.name === 'keeper');
  const ss = rows.findIndex(r => r.name === 'striker stumps');
  console.log('  => keeper is ' + (ks > ss ? 'IN FRONT OF' : 'BEHIND') + ' the striker stumps' +
    (phase === 'bowl' ? (ks < ss ? '  CORRECT' : '  WRONG') : (ks > ss ? '  CORRECT' : '  WRONG')));
  console.log('');
}

/* where is the bowler while you pick your length? */
M.reset(LEVELS[0], 'match'); M.phase = 'bowl'; Cam.home(true);
Bowl.nextBall();
console.log('BOWLER WHILE YOU SET UP THE BALL (his stumps are at x=0, the pitch runs 0..20.12)');
[0, 0.3, 0.7, 1.2, 2.0, 5.0].forEach(t => {
  console.log('  t=' + t.toFixed(1) + 's   x = ' + G.bowlerWaitX(t).toFixed(2) + 'm' +
    (G.bowlerWaitX(t) < 0 ? '   behind his stumps, on his mark' : '   ON THE PITCH'));
});
