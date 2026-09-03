/* Does every menu box sit inside the frame, clear of its neighbours, with
   its text inside it? */
const H=require('./harness.js'); const {G}=H;
const {M,Match,LEVELS,FORMATS,UI}=G;
let clock=0;
function frame(){ clock+=1/60; H.setClock(clock); G.frame(clock*1000); }

function check(label, screen, setup) {
  if (setup) setup();
  Match.screen = screen;
  frame();
  const hits = UI.hits.map(h=>Object.assign({},h));
  let bad = [];
  hits.forEach(h => {
    if (h.x < 0 || h.y < 0 || h.x + h.w > G.VW || h.y + h.h > G.VH)
      bad.push(h.id + ' off frame (' + h.x + ',' + h.y + ' ' + h.w + 'x' + h.h + ')');
  });
  for (let i = 0; i < hits.length; i++) {
    for (let j = i + 1; j < hits.length; j++) {
      const a = hits[i], b = hits[j];
      if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h)
        bad.push(a.id + ' overlaps ' + b.id);
    }
  }
  console.log('  ' + label.padEnd(24) + hits.length + ' boxes   ' +
              (bad.length ? 'FAIL\n      ' + bad.join('\n      ') : 'clear'));
  return hits;
}

console.log('MENU AND SCREEN BOXES (frame ' + G.VW + 'x' + G.VH + ')\n');
M.reset(LEVELS[1],'match');
const menu = check('menu', 'menu');
check('gear', 'gear');
check('player', 'player');
check('board', 'board');
check('result', 'result');
check('card', 'card');
check('overs', 'overs');

console.log('\nMENU ROWS, top to bottom');
menu.slice().sort((a,b)=>a.y-b.y||a.x-b.x).forEach(h=>{
  console.log('   y ' + String(h.y).padStart(3) + '-' + String(h.y+h.h).padStart(3) +
              '   x ' + String(h.x).padStart(4) + '-' + String(h.x+h.w).padStart(4) +
              '   ' + h.id);
});
