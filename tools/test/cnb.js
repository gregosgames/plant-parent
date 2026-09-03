const H = require('./harness.js');
const { G } = H;
const { M, Bat, Ball, Match, Cam, LEVELS, Input, Take, strikerPose } = G;
const DT = 1 / 120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}

console.log('THE BATTERS');
M.reset(LEVELS[0], 'match'); M.phase = 'bat'; Cam.home(true); H.setClock(400);
const st = strikerPose(2, -1, null, '#7a1420', 'cap', 1);
const other = strikerPose(2, -1, null, '#1f4f8a', 'helmet', -1);
console.log('  striker      view=' + st.view + '  face=' + st.face +
  '  legs F' + st.legF.toFixed(0) + '/B' + st.legB.toFixed(0) +
  '  arms F' + st.armF.toFixed(0) + '/B' + st.armB.toFixed(0));
console.log('  other end    view=' + other.view + '  face=' + other.face + '   (mirrored, so his off side is screen-left)');
console.log('  => ' + (st.view === 'side' && other.view === 'side' ? 'both side on' : 'STILL FRONT ON'));

/* caught and bowled: is the bowler drawn, and is he at the ball? */
console.log('\nCAUGHT AND BOWLED');
M.reset(LEVELS[0], 'batPractice');
Match.screen = 'match'; M.phase = 'bat'; Cam.home(true);
Bat.lastBackliftZone = -1; Bat.nextBall();
Input.charging = () => false;
let planned = null, clock = 0, guard = 0, found = 0;
Input.takeRelease = () => { if (planned && clock >= planned.at) { const p = planned; planned = null; return p.rel; } return null; };

while (found < 4 && guard < 500000) {
  guard++; clock += DT; H.setClock(clock);
  if (Bat.phase === 'flight' && !Bat.swung && !planned) {
    Bat.zone = (Math.random() * 6) | 0;
    Input.down = true; Input.ox = 640; Input.oy = 360; Input.x = 700; Input.y = 300;
    const e = randn() * 0.11;
    planned = { at: Bat.contactT + e, rel: { x:0,y:0,ox:0,oy:0, t: Bat.contactT + e, held: 0.5 } };
  }
  const before = M.bat.balls;
  Bat.update(DT);
  if (M.bat.balls > before) {
    if (Bat.outcome.how === 'c bowler' && Take.who) {
      const b = Take.who;
      const drawn = M.field.some(p => p.bowler && (p.taking || p.chase));
      const gap = Math.hypot(Ball.x - G.fx(b), Ball.z - G.fz(b));
      console.log('  taker=' + b.name + '  drawn as a fielder: ' + (drawn ? 'YES' : 'NO') +
        '   he is at (' + G.fx(b).toFixed(1) + ',' + G.fz(b).toFixed(1) + ')' +
        '   ball at (' + Ball.x.toFixed(1) + ',' + Ball.z.toFixed(1) + ')' +
        '   gap ' + gap.toFixed(2) + 'm  ' + (drawn && gap < 0.05 ? 'CATCHES IT' : 'PROBLEM'));
      found++;
    }
    planned = null;
    if (M.bat.out) M.bat.out = false;
  }
}
