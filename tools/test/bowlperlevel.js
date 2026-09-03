const H=require('./harness.js'); const {G}=H;
const {M,Bowl,Match,Cam,LEVELS,STYLES}=G;
const DT=1/120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
function spell(level,styleKey,tap,balls){
  M.reset(level,'bowlPractice'); M.style=STYLES.find(s=>s.key===styleKey);
  Match.screen='match'; M.phase='bowl'; Cam.home(true); Bowl.nextBall();
  let n=0,runs=0,w=0,clock=0,guard=0;
  while(n<balls && guard<balls*30000){
    guard++; clock+=DT; H.setClock(clock);
    if(Bowl.phase==='setup'){ Bowl.target.x=16.4+randn()*0.4; Bowl.target.z=0.35+randn()*0.2; Bowl.startRunup(); continue; }
    if(Bowl.phase==='runup'){ Bowl.tapErr=Math.min(1,Math.abs(randn())*tap); Bowl.tapped=true; Bowl.release(); continue; }
    const b=M.bowl.balls, e=M.bowl.extras; Bowl.update(DT);
    if(M.bowl.extras>e){ n++; runs++; }
    else if(M.bowl.balls>b){ const o=Bowl.outcome||{runs:0}; n++; runs+=o.runs; if(o.wicket)w++;
      if(M.bowl.wickets>=10)M.bowl.wickets=0; }
  }
  return {rpo:(runs/n*6), w24:(w/n*24)};
}
console.log('BOWLING BY DIFFICULTY (400 balls each) — the side you are bowling at\n');
for (const L of LEVELS) {
  const parts = ['fast','wrist'].map(k=>{
    const a=spell(L,k,0.12,400), b=spell(L,k,0.55,400);
    return k.padEnd(6)+' accurate '+a.rpo.toFixed(1)+'/ov '+a.w24.toFixed(1)+'w  | sloppy '+b.rpo.toFixed(1)+'/ov '+b.w24.toFixed(1)+'w';
  });
  console.log('  '+L.name.padEnd(8)+parts[0]+'\n          '+parts[1]);
}
