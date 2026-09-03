const H=require('./harness.js'); const {G}=H;
const {M,Bowl,Match,Cam,LEVELS,FORMATS,PLAY_AS,STYLES,Save}=G;
const DT=1/120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
Save.data.player.order=4; M.format=FORMATS.find(f=>f.key==='t10'); M.playAs=PLAY_AS[1];
M.reset(LEVELS[1],'match'); M.style=STYLES[0];
M.phase='bowl'; M.startTheirInnings(); M.bowl.target=0;
Match.screen='match'; Cam.home(true); Bowl.nextBall();
let clock=0,guard=0;
while (M.bowl.balls < 60 && M.bowl.wickets < 10 && guard++ < 900000) {
  clock+=DT; H.setClock(clock);
  if(Bowl.phase==='setup'){ Bowl.target.x=16.4+randn()*0.5; Bowl.target.z=0.30+randn()*0.2; Bowl.startRunup(); continue; }
  if(Bowl.phase==='runup'){ Bowl.tapErr=Math.min(1,Math.abs(randn())*0.25); Bowl.tapped=true; Bowl.release(); continue; }
  if(Match.screen==='overs'){ Match.screen='match'; Bowl.nextBall(); continue; }
  Bowl.update(DT);
}
console.log('THEIR INNINGS — ' + M.bowl.runs + '-' + M.bowl.wickets +
            ' in ' + (M.bowl.balls/6).toFixed(1) + ' overs\n');
M.theirCard.forEach((c,i)=>console.log('  '+String(i+1).padStart(2)+'. '+c.name.padEnd(20)+
  (c.how==='dnb' ? 'did not bat' : String(c.runs).padStart(3)+' ('+c.balls+')  '+c.how)));
const sum = M.theirCard.reduce((a,c)=>a+c.runs,0) + M.bowl.extras;
console.log('\n  card ' + sum + ' vs total ' + M.bowl.runs + (sum===M.bowl.runs?'  ok':'  MISMATCH'));
console.log('  batted ' + M.theirCard.filter(c=>c.how!=='dnb').length +
            ', of whom ' + M.theirCard.filter(c=>c.how!=='dnb'&&c.balls===0).length + ' faced nothing');
