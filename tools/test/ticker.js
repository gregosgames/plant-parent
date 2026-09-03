/* The bar across the bottom: does it say everything the reference bar says,
   and does it fit? */
const H=require('./harness.js'); const {G}=H;
const {M,Bat,Bowl,Match,Cam,LEVELS,FORMATS,PLAY_AS,Save}=G;
let clock=0; function frames(n){for(let i=0;i<n;i++){clock+=1/60;H.setClock(clock);G.frame(clock*1000);}}

const drawn = [];
function capture() {
  drawn.length = 0;
  const realText = G.Art.text;
  G.Art.text = function(t,x,y,size,col,align,weight){ drawn.push({t:String(t),x:x,y:y,size:size}); };
  frames(1);
  G.Art.text = realText;
  return drawn.filter(d=>d.y > G.VH - 60).map(d=>d.t).filter(t=>t.length);
}

Save.data.player.order=4;
M.format = FORMATS.find(f=>f.key==='t10'); M.playAs = PLAY_AS[1];
M.reset(LEVELS[1],'match');
Match.screen='match'; M.phase='bat'; Cam.home(true); Bat.nextBall();
M.bat.runs = 108; M.bat.balls = 36*6+2; M.bat.wickets = 3;
M.striker().runs = 41; M.striker().balls = 85;
M.myCard[M.myOther].runs = 1; M.myCard[M.myOther].balls = 6;
Bat.bowler.wickets = 2; Bat.bowler.runs = 15; Bat.bowler.balls = 8*6;
console.log('BATTING — the bar reads:');
capture().forEach(t=>console.log('   | ' + t));

M.phase='bowl'; Bowl.nextBall(); M.bowl.runs=72; M.bowl.balls=14*6+3; M.bowl.wickets=4;
M.bowl.target=110; M.theirBatter().runs=33; M.theirBatter().balls=28;
M.theirPartner().runs=7; M.theirPartner().balls=11;
M.myAttack[0].balls=18; M.myAttack[0].runs=21; M.myAttack[0].wickets=2;
Match.screen='match'; frames(1);
console.log('\nBOWLING — the bar reads:');
capture().forEach(t=>console.log('   | ' + t));

console.log('\nMY PLAYER, no partner modelled:');
M.playAs = PLAY_AS[0]; M.reset(LEVELS[1],'match');
Match.screen='match'; M.phase='bat'; Cam.home(true); Bat.nextBall();
M.bat.runs=20; M.bat.balls=18; M.striker().runs=20; M.striker().balls=18;
capture().forEach(t=>console.log('   | ' + t));

console.log('\nTEST, second innings, trailing:');
M.format = FORMATS.find(f=>f.key==='test'); M.playAs = PLAY_AS[1];
M.reset(LEVELS[1],'match'); M.inns=2;
M.log=[{side:'us',inns:1,runs:120,wickets:10,card:[],extras:0,balls:60},
       {side:'them',inns:1,runs:180,wickets:10,card:[],extras:0,balls:60}];
Match.screen='match'; M.phase='bat'; Cam.home(true); Bat.nextBall();
M.bat.runs=44; M.bat.balls=30; M.bat.wickets=2;
capture().forEach(t=>console.log('   | ' + t));

/* Does anything in the bar get shrunk to illegibility, and do the bowling
   buttons stay clear of it? */
console.log('\nFIT');
let worst = 99, worstT = '';
const realText = G.Art.text;
for (let t = 0; t < 60; t++) {
  M.playAs = PLAY_AS[t % 2]; M.format = FORMATS[t % 4];
  M.reset(LEVELS[t % 3], 'match');
  Match.screen='match'; M.phase = t % 2 ? 'bat' : 'bowl'; Cam.home(true);
  if (M.phase === 'bat') Bat.nextBall(); else Bowl.nextBall();
  M.bat.runs = 100 + t; M.bat.balls = 40; M.bowl.runs = 90 + t; M.bowl.balls = 40;
  G.Art.text = function(s,x,y,size){ if (y > G.VH - 60 && size < worst) { worst = size; worstT = String(s); } };
  frames(1);
  G.Art.text = realText;
}
console.log('  smallest type in the bar: ' + worst + 'px  ("' + worstT + '")' +
            (worst >= 13 ? '   legible' : '   TOO SMALL'));
M.phase = 'bowl'; Match.screen = 'match'; Bowl.nextBall();
const B = Bowl.buttons();
const top = Math.min(B.vari.y, B.bowl.y), bot = Math.max(B.vari.y + B.vari.h, B.bowl.y + B.bowl.h);
console.log('  bowling buttons y ' + top + '-' + bot + ', bar starts at ' + (G.VH - G.TICKER.h) +
            (bot <= G.VH - G.TICKER.h ? '   clear' : '   OVERLAPS'));
