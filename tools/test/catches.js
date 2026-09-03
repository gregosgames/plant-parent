const H = require('./harness.js');
const { G } = H;
const { M, Bat, Bowl, Ball, Match, Cam, LEVELS, Input, Take, Catcher, CATCH_REACH } = G;
const DT = 1 / 120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}

/* Every CAUGHT must have a named fielder, and the ball must not jump to him. */
function audit(label, tier, n, held) {
  M.reset(tier, 'batPractice');
  Match.screen = 'match'; M.phase = 'bat'; Cam.home(true);
  Bat.lastBackliftZone = -1; Bat.nextBall();
  Input.charging = () => false;
  let planned = null, clock = 0, guard = 0, done = 0;
  Input.takeRelease = () => { if (planned && clock >= planned.at) { const p = planned; planned = null; return p.rel; } return null; };

  const r = { caught: 0, noFielder: 0, teleported: 0, worstJump: 0, byName: {}, run: [] };
  let prev = null;
  while (done < n && guard < n * 8000) {
    guard++; clock += DT; H.setClock(clock);
    if (Bat.phase === 'flight' && !Bat.swung && !planned) {
      Bat.zone = (Math.random() * 6) | 0;
      Input.down = true; Input.ox = 640; Input.oy = 360; Input.x = 700; Input.y = 300;
      const e = randn() * 0.10;
      planned = { at: Bat.contactT + e, rel: { x:0,y:0,ox:0,oy:0, t: Bat.contactT + e, held: held } };
      prev = { x: G.CONTACT_X, z: 0 };   // a catch can land on the very first frame
    }
    if (Bat.phase === 'flight' && Ball.hit && !Take.on) prev = { x: Ball.x, z: Ball.z };
    const before = M.bat.balls;
    Bat.update(DT);
    if (M.bat.balls > before) {
      const o = Bat.outcome;
      if (o.label === 'CAUGHT' || o.label === 'CAUGHT BEHIND') {
        r.caught++;
        if (!Take.who) r.noFielder++;
        else {
          r.byName[Take.who.name] = (r.byName[Take.who.name] || 0) + 1;
          // how far did the ball move to reach his hands?
          const jump = prev ? Math.hypot(prev.x - Take.x, prev.z - Take.z) : 999;
          r.worstJump = Math.max(r.worstJump, jump);
          if (jump > CATCH_REACH + 0.6) r.teleported++;
          // how far did he run for it?
          r.run.push(Math.hypot(Take.who.hx - Take.x, Take.who.hz - Take.z));
        }
      }
      done++; planned = null; prev = null;
      if (M.bat.out) M.bat.out = false;
    }
  }
  const avgRun = r.run.length ? (r.run.reduce((a, b) => a + b, 0) / r.run.length).toFixed(1) : '-';
  const maxRun = r.run.length ? Math.max(...r.run).toFixed(1) : '-';
  console.log(label.padEnd(30) + r.caught + ' catches   ' +
    'no fielder: ' + r.noFielder + '   ball jumped to hands: ' + r.teleported +
    '   worst gap ' + r.worstJump.toFixed(2) + 'm   fielder ran avg ' + avgRun + 'm, max ' + maxRun + 'm');
  console.log('   takers: ' + JSON.stringify(r.byName));
  return r;
}

console.log('CATCH AUDIT — reach limit is ' + CATCH_REACH + 'm\n');
const a = audit('club, slogging', LEVELS[0], 700, 0.5);
const b = audit('club, normal shots', LEVELS[0], 700, 0.25);
const c = audit('island, slogging', LEVELS[1], 700, 0.5);
const bad = a.noFielder + b.noFielder + c.noFielder + a.teleported + b.teleported + c.teleported;
console.log('\n' + (bad === 0 ? 'PASS — every catch was taken by a fielder standing at the ball'
                              : 'FAIL — ' + bad + ' catches with no fielder or a teleporting ball'));
