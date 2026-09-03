/* Does a field you set actually stick, and does the fielding model use it? */
const H=require('./harness.js'); const {G}=H;
const {M,Bowl,Match,Cam,LEVELS,FORMATS,PLAY_AS,Field,Save,STYLES}=G;
const DT=1/120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
Save.data.player.order=4; M.format=FORMATS.find(f=>f.key==='t10'); M.playAs=PLAY_AS[1];
M.reset(LEVELS[1],'match'); M.style=STYLES[0];
M.phase='bowl'; M.startTheirInnings(); M.bowl.target=0;
Match.screen='match'; Cam.home(true); Bowl.nextBall();

Field.preset('defend');
const man = M.field.find(f=>f.key==='cover');
Field.place(man, 4, 34);            // send him to the deep cover rope
const want = { x: man.hx, z: man.hz, name: man.name };
console.log('A FIELD YOU SET\n');
console.log('  moved a man to x=' + want.x.toFixed(1) + ' z=' + want.z.toFixed(1) + '  (' + want.name + ')');

let clock=0, guard=0;
while (M.bowl.balls < 36 && M.bowl.wickets < 10 && guard++ < 900000) {
  clock+=DT; H.setClock(clock);
  if(Bowl.phase==='setup'){ Bowl.target.x=16.4+randn()*0.5; Bowl.target.z=0.3+randn()*0.2; Bowl.startRunup(); continue; }
  if(Bowl.phase==='runup'){ Bowl.tapErr=0.2; Bowl.tapped=true; Bowl.release(); continue; }
  if(Match.screen==='overs'){ Match.screen='match'; Bowl.nextBall(); continue; }
  Bowl.update(DT);
}
const still = M.field.find(f=>f.hx===want.x && f.hz===want.z);
console.log('  after ' + (M.bowl.balls/6).toFixed(0) + ' overs he is still there: ' + (still ? 'yes' : 'NO — the field was rebuilt'));
console.log('  legal field? ' + (G.legSideCount(M.field) <= G.LEG_SIDE_CAP ? 'yes' : 'NO'));
console.log('  they made ' + M.bowl.runs + '-' + M.bowl.wickets);
const outs = M.theirCard.filter(c=>c.out);
console.log('  dismissals name real positions: ' + (outs.length ? outs.map(c=>c.how).slice(0,4).join(' | ') : 'none'));
