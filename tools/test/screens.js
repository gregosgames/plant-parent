/* Every screen, drawn, plus the new ones — and a check that nothing is
   painted outside the box it belongs in. */
const H=require('./harness.js'); const {G}=H;
const {M,Bat,Bowl,Match,Cam,LEVELS,FORMATS,PLAY_AS,Save}=G;
let clock=0;
function frames(n){ for(let i=0;i<n;i++){ clock+=1/60; H.setClock(clock); G.frame(clock*1000);} }

function run(label, setup, n) {
  try { setup(); frames(n||10); console.log('  '+label.padEnd(30)+'OK'); }
  catch (e) { console.log('  '+label.padEnd(30)+'THREW: '+e.message+'\n'+(e.stack||'').split('\n')[1]); }
}
console.log('EVERY SCREEN\n');
M.reset(LEVELS[1],'match');
run('menu',      ()=>{ Match.screen='menu'; }, 4);
run('player',    ()=>{ Match.screen='player'; }, 4);
run('board',     ()=>{ Match.screen='board'; }, 4);
run('gear',      ()=>{ Match.screen='gear'; }, 4);
run('intro',     ()=>{ Match.screen='intro'; Match.introT=0; }, 20);
run('match, bat',()=>{ Match.screen='match'; M.phase='bat'; Cam.home(true); Bat.nextBall(); }, 90);
run('overEnd',   ()=>{ Match.screen='overEnd'; Match.overT=0; }, 20);
run('match, bowl',()=>{ Match.screen='match'; M.phase='bowl'; Cam.home(true); Bowl.nextBall(); }, 90);
run('overs',     ()=>{ Match.screen='overs'; }, 6);
run('field',     ()=>{ G.Field.open(); Match.screen='field'; }, 8);
run('runout',    ()=>{ Match.runOut={overs:[{who:'A. TEST',runs:8,wickets:1,at:'40-3',over:3},
                                            {who:'B. TEST',runs:2,wickets:0,at:'42-3',over:4}],shown:0,t:0};
                       Match.screen='runout'; }, 60);
run('break, sim',()=>{ M.log=[{side:'us',inns:1,name:M.us.name,card:M.myCard,runs:78,wickets:6,balls:60,extras:3}];
                       Match.simTarget=78; Match.simShown=20; Match.breakT=0; Match.screen='break'; }, 200);
run('break, 2nd innings',()=>{ M.format=FORMATS.find(f=>f.key==='test'); M.inns=1;
                       M.log=[{side:'us',inns:1,name:M.us.name,card:M.myCard,runs:78,wickets:10,balls:60,extras:3},
                              {side:'them',inns:1,name:M.oppo.name,card:M.theirCard,runs:64,wickets:10,balls:60,extras:2}];
                       Match.simTarget=-1; Match.breakT=0; Match.screen='break'; }, 120);
run('result',    ()=>{ Match.screen='result'; }, 6);
run('card, one innings',()=>{ M.log=M.log.slice(0,2); Match.cardInns=0; Match.screen='card'; }, 6);
run('card, four innings',()=>{
  M.log=[{side:'us',inns:1,name:M.us.name,card:M.myCard,runs:78,wickets:10,balls:60,extras:3},
         {side:'them',inns:1,name:M.oppo.name,card:M.theirCard,runs:64,wickets:10,balls:60,extras:2},
         {side:'us',inns:2,name:M.us.name,card:M.myCard,runs:91,wickets:10,balls:60,extras:1},
         {side:'them',inns:2,name:M.oppo.name,card:M.theirCard,runs:70,wickets:8,balls:60,extras:4}];
  Match.cardInns=1; Match.screen='card'; }, 6);

/* Does anything the menu draws fall outside the 1280x720 frame, or overlap
   a neighbouring box? */
console.log('\nMENU BOXES (frame is 1280 x 720)');
M.reset(LEVELS[1],'match'); Match.screen='menu'; frames(2);
const hits = G.Input && [];
const boxes = require('./harness.js').G;
