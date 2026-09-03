const H=require('./harness.js'); const {G}=H;
const {M,Bowl,Bat,Match,Cam,LEVELS,STYLES,FORMATS}=G;
console.log('THE BOWLER, FROM HIS MARK TO HIS FOLLOW-THROUGH');
console.log('  (his stumps are at x=0, the crease at x=' + G.RELEASE_X + ', the pitch runs to 20.12)\n');
console.log('  run-up:');
for (const q of [0,0.25,0.5,0.75,1]) console.log('    p='+q.toFixed(2)+'   x = '+G.runupX(q,true).toFixed(2));
console.log('\n  after a tap that caught him 35% of the way in:');
for (const t of [0,0.08,0.17,0.3,0.6,1.0,1.4]) {
  let out=null;
  G.drawBowlerDelivery(0.35, t, '#fff', STYLES[0], true, (x,z,fn)=>{ out={x:x,z:z}; fn(); });
  console.log('    t='+t.toFixed(2)+'s   x = '+out.x.toFixed(2)+'   z = '+out.z.toFixed(2));
}
console.log('\n  after a tap right on the crease:');
for (const t of [0,0.3,0.7,1.05,2.0]) {
  let out=null;
  G.drawBowlerDelivery(1, t, '#fff', STYLES[0], true, (x,z,fn)=>{ out={x:x,z:z}; fn(); });
  console.log('    t='+t.toFixed(2)+'s   x = '+out.x.toFixed(2)+'   z = '+out.z.toFixed(2));
}
console.log('\n  and where the reaction pose stands: x = '+G.REACTION_X+'  z = '+G.REACTION_Z);
console.log('\nTHE UMPIRE');
console.log('  x = '+G.UMPIRE_X+'  z = '+G.UMPIRE_Z+
            '   (bowler runs through z = '+G.BOWLER_Z+', non-striker at z = '+G.NONSTRIKER_Z+')');
console.log('  clear of the arm by ' + Math.abs(G.UMPIRE_Z - G.BOWLER_Z).toFixed(2) + ' m, ' +
            (G.UMPIRE_X < 0 ? Math.abs(G.UMPIRE_X).toFixed(2) + ' m behind his stumps' : 'IN FRONT of the stumps'));
