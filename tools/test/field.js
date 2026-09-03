/* The radar, and setting a field. */
const H=require('./harness.js'); const {G}=H;
const {M,Bat,Bowl,Match,Cam,LEVELS,FORMATS,PLAY_AS,Input,Save,UI,Field,FIELD_SETS}=G;
let clock=0; function frames(n){for(let i=0;i<n;i++){clock+=1/60;H.setClock(clock);G.frame(clock*1000);}}

M.reset(LEVELS[1],'match');
Match.screen='match'; M.phase='bowl'; Cam.home(true); Bowl.nextBall(); frames(2);

console.log('THE RADAR — does it map the ground the way the camera reads it?\n');
const cx=200, cy=200, rr=100;
const probe = (label, wx, wz) => {
  const p = G.radarPt(wx, wz, cx, cy, rr);
  const back = G.radarWorld(p.x, p.y, cx, cy, rr);
  const ok = Math.abs(back.x-wx) < 0.01 && Math.abs(back.z-wz) < 0.01;
  console.log('  ' + label.padEnd(22) + 'screen ' + (p.x-cx>0.5?'right':p.x-cx<-0.5?'left ':'centre') +
    ' ' + (p.y-cy>0.5?'below':p.y-cy<-0.5?'above':'centre') +
    '   round trip ' + (ok?'ok':'BROKEN'));
};
probe('striker', G.CONTACT_X, 0);
probe('bowler\'s stumps', 0, 0);
probe('off side (cover)', 14, 20);
probe('leg side (midwicket)', 14, -20);

console.log('\n  boundary ' + G.boundaryR() + 'm maps to ' + rr + 'px; a man on the rope at 90deg lands ' +
  Math.round(Math.hypot(G.radarPt(G.PITCH_LEN/2, G.boundaryR(), cx,cy,rr).x-cx,
                        G.radarPt(G.PITCH_LEN/2, G.boundaryR(), cx,cy,rr).y-cy)) + 'px out');

console.log('\nPRESETS');
FIELD_SETS.forEach(s => {
  Field.preset(s.key);
  const out = M.field.filter(f=>!f.keeper && !f.bowler);
  console.log('  ' + s.name.padEnd(11) + out.length + ' out' +
    '   behind square leg: ' + G.legSideCount(M.field) + '/' + G.LEG_SIDE_CAP +
    (G.legSideCount(M.field) > G.LEG_SIDE_CAP ? '  ILLEGAL' : '  legal') +
    '   ' + out.map(f=>f.name.toLowerCase()).slice(0,4).join(', ') + '...');
});

console.log('\nDRAGGING');
Field.preset('standard');
const man = M.field.find(f=>f.key==='cover');
console.log('  ' + man.name + ' starts at x=' + man.hx.toFixed(1) + ' z=' + man.hz.toFixed(1));
Field.place(man, 6, 30);
console.log('  dragged deep on the off:  x=' + man.hx.toFixed(1) + ' z=' + man.hz.toFixed(1) +
            '   inside the rope? ' + (Math.hypot(man.hx-G.PITCH_LEN/2, man.hz) <= G.boundaryR() ? 'yes' : 'NO'));
Field.place(man, 900, 900);
console.log('  dragged off the ground:   ' + Math.hypot(man.hx-G.PITCH_LEN/2, man.hz).toFixed(1) +
            'm from the middle (rope is ' + G.boundaryR() + ')');
Field.place(man, G.CONTACT_X, 0.2);
console.log('  dragged onto the batsman: ' + Math.hypot(man.hx-G.CONTACT_X, man.hz).toFixed(1) + 'm away from him');
console.log('\nNAMING — a man is called by where he stands');
Field.preset('standard');
[['deep on the off', 6, 34], ['fine leg rope', 34, -30], ['short cover', 14, 12], ['long on', 2, -30]]
  .forEach(([label, wx, wz]) => {
    const f = M.field.find(x=>!x.keeper && !x.bowler);
    const ok = Field.place(f, wx, wz);
    console.log('  put a man ' + label.padEnd(18) + (ok ? '-> the card would call him "' + f.name.toLowerCase() + '"'
                                                        : '-> REFUSED: ' + Field.note));
  });

console.log('\nTHE LEG-SIDE LAW');
Field.preset('standard');
const movers = M.field.filter(f=>!f.keeper && !f.bowler);
let placed = 0, refused = 0;
movers.forEach((f,i) => { if (Field.place(f, 30 + i*0.5, -16 - i)) placed++; else refused++; });
console.log('  tried to put all nine behind square on the leg side: ' + placed + ' allowed, ' +
            refused + ' refused   final count ' + G.legSideCount(M.field) + '/' + G.LEG_SIDE_CAP);
console.log('  note shown: "' + Field.note + '"');

console.log('\nTHE SCREEN');
Field.preset('standard');
Match.screen='field'; Field.open();
try { frames(4); console.log('  draws OK, ' + UI.hits.length + ' buttons: ' + UI.hits.map(h=>h.id).join(', ')); }
catch(e) { console.log('  THREW: ' + e.message); }
// a thumb dragging a man
const target = M.field.find(f=>f.key==='midOn');
const q = G.radarPt(target.hx, target.hz, Field.cx, Field.cy, Field.r);
Input.down = true; Input.x = q.x; Input.y = q.y; frames(1);
Input.x = q.x + 40; Input.y = q.y - 30; frames(1);
Input.down = false; frames(1);
console.log('  dragged ' + target.name + ' with a thumb -> selected ' + (Field.sel===target ? 'yes' : 'no') +
            ', moved ' + (Math.abs(target.hz - G.POS.midOn.r * -Math.sin(G.POS.midOn.a*Math.PI/180)) > 0.5 ? 'yes' : 'no'));

console.log('\n  and the HUD radar sits at ' + Math.round(G.RADAR.cx) + ',' + Math.round(G.RADAR.cy) +
            ' r=' + G.RADAR.r + '  (frame ' + G.VW + 'x' + G.VH + ')');
