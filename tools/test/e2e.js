const H = require('./harness.js');
const { G } = H;
const { M, Bat, Bowl, Ball, Match, Cam, LEVELS, FORMATS, PLAY_AS, Input, Save, Stumps } = G;
const DT = 1/60;
let clock = 0;
function frames(n) { for (let i=0;i<n;i++){ clock+=DT; H.setClock(clock); G.frame(clock*1000); } }

function playMatch(level, format, playAs, order) {
  Save.data.player.order = order;
  M.format = format; M.playAs = playAs;
  Match.level = level;
  Match.toGear(level, 'match');
  Match.begin();
  const seen = { intro:false, overs:false, stumps:false, overEnd:false, runout:false, inns2:false };
  let guard = 0;
  while (Match.screen !== 'result' && guard++ < 400000) {
    if (Match.screen === 'intro') seen.intro = true;
    if (Match.screen === 'overs') { seen.overs = true; M.style = M.bowlerAs.style; Match.screen='match'; Bowl.nextBall(); }
    if (Match.screen === 'overEnd') { seen.overEnd = true; M.bat.overRuns = 0; Match.screen='match'; Bat.nextBall(); }
    if (Match.screen === 'runout') { seen.runout = true; Match.endTheirInnings(); }
    if (Match.screen === 'break') {
      if (Match.simTarget < 0) { seen.inns2 = true; Match.screen='match'; Bat.lastBackliftZone=-1; Bat.nextBall(); }
      else Match.startBowling();
    }
    if (Stumps.on) seen.stumps = true;
    if (M.phase === 'bat' && Bat.phase === 'flight' && !Bat.swung) {
      Input.down = true; Input.ox=640; Input.oy=360; Input.x=700; Input.y=280;
      if (H.clock() >= Bat.contactT - 0.02) {
        Input.releases.push({x:700,y:280,ox:640,oy:360,t:Bat.contactT + (Math.random()-0.5)*0.12, held:0.3});
      }
    }
    if (M.phase === 'bowl' && Bowl.phase === 'setup') { Bowl.target.x = 16.4; Bowl.target.z = 0.35; Bowl.startRunup(); }
    if (M.phase === 'bowl' && Bowl.phase === 'runup') { Bowl.tapErr = Math.random()*0.3; Bowl.release(); }
    frames(1);
  }
  if (guard >= 400000) console.log('  !! STALLED on screen ' + Match.screen + ' phase ' + M.phase);
  return seen;
}

function audit(label, seen) {
  const flags = ['overs','overEnd','runout','stumps','inns2'].filter(k=>seen[k]).map(k=>'['+k+']').join(' ');
  console.log('  ' + label);
  console.log('      ' + M.us.name + ' ' + Match.ourRuns() + '  ·  ' + M.oppo.name + ' ' + Match.theirRuns() +
              '   ' + (Match.won ? 'WON' : 'lost') + ' by ' + Match.margin + '   ' + flags);
  let bad = 0;
  M.log.forEach(e => {
    const sum = e.card.reduce((a,c)=>a + c.runs, 0) + (e.extras||0);
    const noHow = e.card.filter(c=>c.out && !c.how).length;
    const ok = sum === e.runs && noHow === 0;
    if (!ok) bad++;
    console.log('      ' + (e.side==='us'?M.us.name:M.oppo.name).padEnd(14) +
      'inns ' + e.inns + '  ' + String(e.runs + '-' + Math.min(10,e.wickets)).padStart(7) +
      '  (' + Math.floor(e.balls/6) + '.' + (e.balls%6) + ' ov)' +
      '   card ' + sum + (ok ? ' ok' : '  MISMATCH/blank how'));
  });
  const mine = Match.myInnings();
  console.log('      you: ' + mine.runs + ' (' + mine.balls + ')   innings logged ' + M.log.length +
              (bad ? '   *** ' + bad + ' BAD ***' : ''));
}

console.log('FULL MATCHES END TO END\n');
const F = k => FORMATS.find(f=>f.key===k);
audit('easy / T5 / whole team #4',      playMatch(LEVELS[0], F('t5'),  PLAY_AS[1], 4));
audit('medium / T10 / whole team #1',   playMatch(LEVELS[1], F('t10'), PLAY_AS[1], 1));
audit('hard / T10 / my player #7',      playMatch(LEVELS[2], F('t10'), PLAY_AS[0], 7));
audit('easy / TEST / whole team #6',    playMatch(LEVELS[0], F('test'),PLAY_AS[1], 6));
audit('medium / TEST / my player #11',  playMatch(LEVELS[1], F('test'),PLAY_AS[0], 11));
audit('easy / ONE DAY / my player #3',  playMatch(LEVELS[0], F('od'),  PLAY_AS[0], 3));
