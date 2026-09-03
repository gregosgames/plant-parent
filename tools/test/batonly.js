/* The batting-only build, played end to end: you are set a total and you go
   and get it, and nothing anywhere asks you to bowl. */
const H = require('./harness.js'); const { G } = H;
const { M, Bat, Bowl, Match, Cam, LEVELS, FORMATS, PLAY_AS, Input, Save, UI } = G;
const DT = 1/60;
let clock = 0;
function frames(n){ for(let i=0;i<n;i++){ clock+=DT; H.setClock(clock); G.frame(clock*1000); } }

console.log('BATTING-ONLY BUILD   BAT_ONLY = ' + G.BAT_ONLY + '\n');

M.reset(LEVELS[1], 'match'); Match.screen = 'menu'; frames(2);
const ids = UI.hits.map(h => h.id);
console.log('  menu buttons: ' + ids.join(', '));
console.log('  BOWLING offered? ' + (ids.indexOf('BOWLING') >= 0 ? 'YES — WRONG' : 'no'));
console.log('  TEST offered?    ' + (ids.indexOf('FMTtest') >= 0 ? 'YES — WRONG' : 'no'));
Match.screen = 'gear'; frames(2);
const g = UI.hits.map(h => h.id);
console.log('  gear buttons: ' + g.join(', '));
console.log('  bowling picker?  ' + (g.some(i=>/FAST|SPIN|MEDIUM PACE/.test(i)) ? 'YES — WRONG' : 'no'));

function play(level, format, playAs, order) {
  Save.data.player.order = order;
  M.format = format; M.playAs = playAs; Match.level = level;
  Match.toGear(level, 'match'); Match.begin();
  const target = M.bat.target;
  let guard = 0, sawBowl = false;
  while (Match.screen !== 'result' && guard++ < 400000) {
    if (Match.screen === 'overEnd') { M.bat.overRuns = 0; Match.screen = 'match'; Bat.nextBall(); }
    if (['break','overs','runout'].indexOf(Match.screen) >= 0) sawBowl = true;
    if (M.phase === 'bowl') sawBowl = true;
    if (M.phase === 'bat' && Bat.phase === 'flight' && !Bat.swung) {
      Input.down = true; Input.ox=640; Input.oy=360; Input.x=700; Input.y=280;
      if (H.clock() >= Bat.contactT - 0.02) {
        Input.releases.push({x:700,y:280,ox:640,oy:360,t:Bat.contactT+(Math.random()-0.5)*0.12,held:0.3});
      }
    }
    frames(1);
  }
  const us = M.log.filter(e=>e.side==='us')[0] || {runs:0,wickets:0,card:[],extras:0};
  const them = M.log.filter(e=>e.side==='them')[0] || {runs:0,wickets:0,card:[],extras:0};
  const sum = c => c.card.reduce((a,x)=>a+x.runs,0) + (c.extras||0);
  console.log('  ' + (level.name+'/'+format.name+'/'+playAs.name).padEnd(26) +
    'target ' + String(target).padStart(4) +
    '   them ' + (them.runs+'-'+them.wickets).padStart(7) + ' card ' + (sum(them)===them.runs?'ok ':'MISMATCH') +
    '   you ' + (us.runs+'-'+Math.min(10,us.wickets)).padStart(7) + ' card ' + (sum(us)===us.runs?'ok ':'MISMATCH') +
    '   ' + (Match.won ? 'WON ' : 'lost') +
    (sawBowl ? '   *** REACHED A BOWLING SCREEN ***' : ''));
}
console.log('\nMATCHES');
const F = k => FORMATS.find(f=>f.key===k);
play(LEVELS[0], F('t5'),  PLAY_AS[1], 4);
play(LEVELS[1], F('t10'), PLAY_AS[1], 1);
play(LEVELS[2], F('t10'), PLAY_AS[0], 7);
play(LEVELS[0], F('od'),  PLAY_AS[1], 3);
play(LEVELS[1], F('od'),  PLAY_AS[0], 9);

console.log('\nSCREENS');
['result','card','player','board','typing','menu','gear'].forEach(sc => {
  try { Match.screen = sc; frames(3); console.log('  ' + sc.padEnd(10) + 'OK'); }
  catch (e) { console.log('  ' + sc.padEnd(10) + 'THREW: ' + e.message); }
});
