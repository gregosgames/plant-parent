/* Play a WHOLE TEAM innings and narrate every wicket: does the next man
   actually walk out, or does the innings stop the moment somebody goes? */
const H=require('./harness.js'); const {G}=H;
const {M,Bat,Match,Cam,LEVELS,FORMATS,PLAY_AS,Input,Save,SHOTS}=G;
const DT=1/120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}

Save.data.player.order = 4;
M.format = FORMATS.find(f=>f.key==='t10'); M.playAs = PLAY_AS[1];
Match.level = LEVELS[2];                       // hard, so wickets fall
M.reset(LEVELS[2],'match');
Match.screen='match'; M.phase='bat'; Cam.home(true);
Bat.lastBackliftZone=-1; Bat.nextBall();
Input.charging=()=>false;
let planned=null, clock=0, guard=0, lastW=0;
Input.takeRelease=()=>{ if(planned && clock>=planned.at){const p=planned;planned=null;return p.rel;} return null; };
console.log('WHOLE TEAM, HARD, T10 — every wicket\n');
while (Match.screen !== 'break' && guard++ < 900000) {
  clock+=DT; H.setClock(clock);
  if (Match.screen==='overEnd'){ M.bat.overRuns=0; Match.screen='match'; Bat.nextBall(); continue; }
  if (Bat.phase==='flight' && !planned && !Bat.swung) {
    Bat.zone = 2 + (Math.random()*4|0) % 4;
    const e=randn()*0.11;
    planned={at:Bat.contactT+e, rel:{x:0,y:0,ox:0,oy:0,t:Bat.contactT+e,held:0.3}};
  }
  const before=M.bat.balls; Bat.update(DT);
  if (M.bat.wickets > lastW) {
    lastW = M.bat.wickets;
    const gone = M.myCard.filter(c=>c.out);
    const g = gone[gone.length-1];
    console.log('  wkt '+lastW+'  '+g.name.padEnd(18)+g.runs+' ('+g.balls+')  '+g.how.padEnd(22)+
      '  screen=' + Match.screen + '  next in: ' + M.striker().name +
      '  partner: ' + (M.myOther>=0 ? M.myCard[M.myOther].name : 'none') +
      '   ' + M.myScore() + '-' + M.bat.wickets + ' (' + (M.bat.balls/6).toFixed(1) + ' ov)');
  }
  if(M.bat.balls>before) planned=null;
}
const e = M.log[M.log.length-1];
console.log('\n  innings ended: '+e.runs+'-'+e.wickets+' in '+(e.balls/6).toFixed(1)+' overs');
console.log('  batted: '+e.card.filter(c=>c.how!=='dnb').length+'   dnb: '+e.card.filter(c=>c.how==='dnb').length);
console.log('  simmed anybody in? ' + (e.card.some(c=>c.how!=='dnb' && c.balls===0) ? 'YES — BUG' : 'no'));
