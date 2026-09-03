const H = require('./harness.js');
const { G } = H;
const { M, Bat, Bowl, Ball, Match, Cam, LEVELS, Input, proj, unprojectGround, horizonY } = G;

function px(l, x, y, z) { const p = proj(x, y, z); console.log('  ' + l.padEnd(22) + 'x=' + p.x.toFixed(0).padStart(6) + ' y=' + p.y.toFixed(0).padStart(6) + ' pxPerM=' + (p.s * 30).toFixed(1) + (p.behind ? '  BEHIND' : '')); }

M.reset(LEVELS[0], 'match'); M.phase = 'bat'; Cam.home(true);
console.log('BAT CAMERA  horizon y=' + horizonY().toFixed(0));
px('striker head', 19.35, 1.75, -0.72);
px('striker feet', 19.35, 0, -0.72);
px('striker stumps top', 20.12, 0.71, 0);
px('bowler release', 1.4, 2.05, 0.3);
px('bowler feet', 1.4, 0, 0.3);
px('pitch mark good len', 16.4, 0, 0.3);
px('cover (club)', 6.8, 0, 18.8);
px('mid off', -1.5, 0, 8.2);
px('far rope', 10.06 - 54, 0, 0);
px('sightscreen top', 10.06 - 58, 4.6, 0);

M.phase = 'bowl'; Cam.home(true);
console.log('BOWL CAMERA  horizon y=' + horizonY().toFixed(0));
px('batter head', 19.35, 1.75, -0.72);
px('batter feet', 19.35, 0, -0.72);
px('striker stumps', 20.12, 0.71, 0);
px('your release', 1.4, 2.05, 0.3);
px('good length spot', 16.4, 0, 0.3);
px('mid off', -1.5, 0, 8.2);

console.log('\nUNPROJECT round-trip (bowl camera, pitch targets):');
[[16.4, 0.3], [12.0, -1.0], [19.5, 1.2]].forEach(([x, z]) => {
  const p = proj(x, 0, z);
  const g = unprojectGround(p.x, p.y);
  console.log('  (' + x + ',' + z + ') -> screen(' + p.x.toFixed(0) + ',' + p.y.toFixed(0) + ') -> (' +
    g.x.toFixed(2) + ',' + g.z.toFixed(2) + ')');
});

console.log('\nRENDER SMOKE TEST');
let clock = 0;
function run(label, frames) {
  const before = H.calls.fill + H.calls.stroke + H.calls.text;
  for (let i = 0; i < frames; i++) { clock += 1 / 60; H.setClock(clock); G.frame(clock * 1000); }
  const drew = H.calls.fill + H.calls.stroke + H.calls.text - before;
  console.log('  ' + label.padEnd(30) + frames + ' frames, ' + drew + ' draw ops  ' + (drew > 0 ? 'OK' : 'NOTHING DRAWN'));
}
Match.screen = 'menu'; run('menu', 20);
Match.screen = 'player'; run('my player screen', 20);
Match.screen = 'board'; run('leaderboard (empty)', 20);
G.Save.record({ name: 'ACE', runs: 62, balls: 31, level: 'MEDIUM', when: '2026-08-28', fresh: true });
G.Save.record({ name: 'DUKE', runs: 14, balls: 12, level: 'HARD', when: '2026-08-27' });
Match.screen = 'board'; run('leaderboard (2 rows)', 20);
Match.screen = 'gear'; run('gear screen', 20);
Match.toGear(LEVELS[0], 'match'); Match.begin(); run('club batting', 900);
console.log('    after 900 frames: ' + M.bat.runs + ' (' + M.bat.balls + ') phase=' + Bat.phase + ' screen=' + Match.screen);
Match.screen = 'break'; run('innings break', 30);
Match.startBowling(); run('club bowling', 900);
console.log('    after 900 frames: ' + M.bowl.runs + '-' + M.bowl.wickets + ' (' + M.bowl.balls + ') phase=' + Bowl.phase);
Match.tier = LEVELS[1]; Match.toGear(LEVELS[1], 'match'); Match.begin(); run('island batting', 900);
Match.finish(); run('result screen', 20);
Match.screen = 'card'; run('scorecard', 20);
LEVELS.forEach(L => { Match.toGear(L, 'match'); Match.begin(); run('  play on ' + L.name, 240); });
console.log('\nALL RENDER PATHS RAN WITHOUT THROWING');
