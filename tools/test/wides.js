const H = require('./harness.js');
const { G } = H;
const { M, Bowl, Match, Cam, LEVELS, STYLES } = G;
const DT = 1/120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}

function spell(targetZ, label, balls) {
  M.reset(LEVELS[1], 'bowlPractice');
  M.style = STYLES[0]; Match.screen='match'; M.phase='bowl'; Cam.home(true);
  Bowl.nextBall();
  let clock=0, guard=0, legal=0, wides=0, runs=0, wkts=0;
  while (legal + wides < balls && guard < balls*5000) {
    guard++; clock+=DT; H.setClock(clock);
    if (Bowl.phase==='setup') { Bowl.target.x=16.4+randn()*0.4; Bowl.target.z=targetZ; Bowl.startRunup(); continue; }
    if (Bowl.phase==='runup') { Bowl.tapErr=Math.min(1,Math.abs(randn())*0.15); Bowl.release(); continue; }
    const bb = M.bowl.balls, br = M.bowl.runs;
    Bowl.update(DT);
    if (Bowl.outcome && Bowl.phase==='result' && !Bowl.counted) {
      Bowl.counted = true;
      if (Bowl.outcome.wide) wides++; else legal++;
      if (Bowl.outcome.wicket) wkts++;
      runs = M.bowl.runs;
    }
    if (Bowl.phase!=='result') Bowl.counted = false;
  }
  const per = 6 * runs / Math.max(1, legal);
  console.log('  ' + label.padEnd(30) + 'wides ' + String(wides).padStart(3) +
    '   legal ' + String(legal).padStart(3) +
    '   ' + per.toFixed(1) + ' runs/over   ' + wkts + ' wickets');
  return { wides, legal, per };
}

console.log('BOWLING OFF THE PITCH — does the wide law bite?  (wide outside off is z > ' +
  G.WIDE_OFF + ', down leg z < ' + G.WIDE_LEG + ')');
const a = spell(0.35,  'on a good line (z=0.35)', 120);
const b = spell(1.85, 'well outside off (1.85)', 120);
const c = spell(-1.70, 'down the leg side (-1.70)', 120);
console.log('\n  => ' + (b.wides > a.wides * 4 && c.wides > a.wides * 4
  ? 'PASS — parking it off the pitch is punished' : 'FAIL — wides are not biting'));
