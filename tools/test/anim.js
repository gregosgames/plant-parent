const H = require('./harness.js');
const { G } = H;
const { M, Bat, Match, Cam, LEVELS, SHOTS, SHOT_ANIM, STANCE, strikerPose, Input } = G;

M.reset(LEVELS[0], 'match'); M.phase = 'bat'; Cam.home(true);
Input.charging = () => false;

console.log('BEFORE THE BALL — the trigger, and the bat coming up every ball');
Bat.phase = 'runup'; Bat.runup = 1.35;
[0, 0.6, 1.05, 1.2, 1.35].forEach(t => {
  Bat.t = t; H.setClock(500 + t);
  const o = strikerPose(2, -1, null, '#000', 'cap', 1);
  console.log('   runup t=' + t.toFixed(2) + 's  bat ' + o.batAng.toFixed(0).padStart(4) +
    '°  crouch ' + o.crouch.toFixed(2) + '  stride ' + o.stride.toFixed(2) + 'm  lean ' + o.lean.toFixed(1));
});

console.log('\nTHE STROKE — bat angle and where his feet are');
Bat.phase = 'flight';
for (let z = 0; z < 6; z++) {
  const A = SHOT_ANIM[z];
  const out = [];
  [0, 0.4, 0.85, 1.3, 2.2, 4.0].forEach(f => {
    H.setClock(600 + f * G.SWING_DOWN);
    const o = strikerPose(z, 600, { quality: 'middle' }, '#000', 'cap', 1);
    out.push(o.batAng.toFixed(0));
  });
  H.setClock(600 + 1.3 * G.SWING_DOWN);
  const mid = strikerPose(z, 600, { quality: 'middle' }, '#000', 'cap', 1);
  console.log('  ' + SHOTS[z].name.padEnd(9) + out.join(' ').padEnd(34) +
    (A.back ? 'back foot ' : 'front foot') +
    '  stride ' + (A.stride > 0 ? '+' : '') + A.stride.toFixed(2) + 'm' +
    '  whip x' + A.whip.toFixed(1) +
    '  held ' + A.hold.toFixed(2) + 's  legs ' + mid.legF.toFixed(0) + '/' + mid.legB.toFixed(0));
}

console.log('\nSWAGGER CHANGES THE STANCE (bat tap rate and how open he stands)');
Bat.phase = 'ready';
[0, 0.5, 1].forEach(sw => {
  M.swagger = sw;
  H.setClock(700);
  const o = strikerPose(2, -1, null, '#000', 'cap', 1);
  console.log('   swagger ' + sw.toFixed(1) + '  taps/s ' + (STANCE.tapEvery * (1 - sw * 0.45)).toFixed(2) +
    '  bat rides ' + o.batAng.toFixed(0) + '°  feet ' + o.legF.toFixed(0) + '/' + o.legB.toFixed(0) +
    '  lean ' + o.lean.toFixed(1));
});
