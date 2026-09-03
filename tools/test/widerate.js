const H=require('./harness.js'); const {G}=H;
const {M,Bat,Bowl,Match,Cam,LEVELS,STYLES}=G;
const DT=1/120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}

// (a) how often does a decent line get called wide, per style, when YOU bowl
console.log('WIDES CALLED ON A GOOD LINE (target z = 0.35, 300 balls each)');
for (const k of ['fast','medium','finger','wrist']) {
  for (const tap of [0.12, 0.5]) {
    M.reset(LEVELS[1],'bowlPractice'); M.style=STYLES.find(s=>s.key===k);
    Match.screen='match'; M.phase='bowl'; Cam.home(true); Bowl.nextBall();
    let n=0,wides=0,clock=0,guard=0;
    while(n<300 && guard<4000000){
      guard++; clock+=DT; H.setClock(clock);
      if(Bowl.phase==='setup'){ Bowl.target.x=16.4+randn()*0.4; Bowl.target.z=0.35+randn()*0.22; Bowl.startRunup(); continue; }
      if(Bowl.phase==='runup'){ Bowl.tapErr=Math.min(1,Math.abs(randn())*tap); Bowl.tapped=true; Bowl.release(); continue; }
      const before=M.bowl.balls, bw=M.bowl.extras;
      Bowl.update(DT);
      if(M.bowl.extras>bw){ wides++; n++; }
      else if(M.bowl.balls>before){ n++; if(M.bowl.wickets>=10)M.bowl.wickets=0; }
    }
    console.log('  '+k.padEnd(8)+' tapErr '+tap+'   wides '+wides+'/'+n+'  = '+(100*wides/n).toFixed(1)+'%  ('+(wides/n*6).toFixed(1)+' an over)');
  }
}

// (b) and how often the AI bowls one at you
console.log('\nWIDES BOWLED AT YOU (400 balls each level)');
for (const L of LEVELS) {
  M.reset(L,'batPractice'); Match.screen='match'; M.phase='bat'; Cam.home(true);
  Bat.lastBackliftZone=-1; Bat.nextBall();
  G.Input.charging=()=>false; G.Input.takeRelease=()=>null;
  let n=0,wides=0,clock=0,guard=0;
  while(n<400 && guard<4000000){
    guard++; clock+=DT; H.setClock(clock);
    const b=M.bat.balls, e=M.bat.extras;
    Bat.update(DT);
    if(M.bat.extras>e){ wides++; n++; }
    else if(M.bat.balls>b){ n++; if(M.bat.out){M.bat.out=false;M.bat.wickets=0;} }
  }
  console.log('  '+L.name.padEnd(8)+' wides '+wides+'/'+n+' = '+(100*wides/n).toFixed(1)+'%  ('+(wides/n*6).toFixed(1)+' an over)');
}
