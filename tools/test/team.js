const H=require('./harness.js'); const {G}=H;
const {M,Bat,Bowl,Match,Cam,LEVELS,FORMATS,PLAY_AS,Input,Save,SHOTS}=G;
const DT=1/120;
function randn(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}

function innings(level, format, sigma, order) {
  Save.data.player.order = order;
  M.format = format; M.playAs = PLAY_AS[1];      // WHOLE TEAM
  Match.level = level;
  M.reset(level, 'match');
  Match.screen='match'; M.phase='bat'; Cam.home(true);
  Bat.lastBackliftZone=-1; Bat.nextBall();
  Input.charging=()=>false;
  let planned=null, clock=0, guard=0;
  Input.takeRelease=()=>{ if(planned && clock>=planned.at){const p=planned;planned=null;return p.rel;} return null; };
  while (Match.screen !== 'break' && guard++ < 900000) {
    clock+=DT; H.setClock(clock);
    if (Match.screen==='overEnd'){ M.bat.overRuns=0; Match.screen='match'; Bat.nextBall(); continue; }
    if (Bat.phase==='flight' && !planned && !Bat.swung) {
      let best=2,bs=-9;
      for(let i=0;i<6;i++){
        const S=SHOTS[i];
        const len=S.likeLen.indexOf(Bat.d.band.key)>=0?1:0;
        const h=Bat.pred.y>=S.likeH[0]-0.2 && Bat.pred.y<=S.likeH[1]+0.2?1:0;
        const line=1-Math.min(1,Math.abs(Bat.pred.z-S.reachZ)/0.9);
        const sc=len+h+line*1.6+Math.random()*0.2;
        if(sc>bs){bs=sc;best=i;}
      }
      Bat.zone=best;
      let ang=SHOTS[best].ang, bd=-1;
      for(let a=ang-24;a<=ang+24;a+=2){
        const px=G.CONTACT_X-Math.cos(a*Math.PI/180)*24, pz=-Math.sin(a*Math.PI/180)*24;
        let near=999; for(const f of M.field) near=Math.min(near,Math.hypot(px-f.x,pz-f.z));
        if(near>bd){bd=near;ang=a;}
      }
      const phi=G.screenFromAim(ang);
      Input.down=true; Input.ox=640; Input.oy=360;
      Input.x=640+Math.sin(phi*Math.PI/180)*120; Input.y=360-Math.cos(phi*Math.PI/180)*120;
      const e=randn()*sigma;
      planned={at:Bat.contactT+e, rel:{x:0,y:0,ox:0,oy:0,t:Bat.contactT+e,held:0.25}};
    }
    const before=M.bat.balls; Bat.update(DT);
    if(M.bat.balls>before) planned=null;
  }
  const e = M.log[M.log.length-1];
  const batted = e.card.filter(c=>c.how!=='dnb');
  return { runs:e.runs, wkts:e.wickets, ov:(e.balls/6).toFixed(1), batted:batted.length,
           top: batted.slice().sort((a,b)=>b.runs-a.runs)[0] };
}

console.log('WHOLE TEAM INNINGS — does it last like one?\n');
for (const fk of ['t5','t10','od']) {
  const F = FORMATS.find(f=>f.key===fk);
  for (const L of LEVELS) {
    const r = innings(L, F, 0.060, 4);
    console.log('  '+F.name.padEnd(9)+L.name.padEnd(8)+
      String(r.runs+'-'+r.wkts).padStart(7)+'  ('+r.ov+' ov)   '+
      r.batted+' batted   top: '+r.top.name+' '+r.top.runs+' ('+r.top.balls+')');
  }
}
