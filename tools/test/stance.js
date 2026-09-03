const H = require('./harness.js');
const { G } = H;
const { M, Bat, Cam, LEVELS, Input, STANCE, strikerPose, drawFigure, proj } = G;

M.reset(LEVELS[0], 'match'); M.phase = 'bat'; Cam.home(true);
Input.charging = () => false;
G.frame && null;

function shot(label, setup) {
  setup();
  const o = strikerPose(2, -1, null, '#7a1420', 'cap', 1);
  const x = G.STRIKER_X - o.stride;
  const a = drawFigure(x, G.STRIKER_Z, o);
  const ground = proj(x, 0, G.STRIKER_Z);
  // bat toe, from the front hand along the blade
  const r = o.batAng * Math.PI / 180;
  const bl = a.H * 0.42;
  const toe = { x: a.handF.x + Math.sin(r) * bl, y: a.handF.y + Math.cos(r) * bl };
  const px = v => ((v - ground.y) / (ground.y - a.head.y) * 100);   // % of body height, 0 = feet
  console.log('  ' + label.padEnd(22) +
    'bat ' + o.batAng.toFixed(0).padStart(4) + '°' +
    '   hands at ' + (-px(a.handF.y)).toFixed(0).padStart(3) + '% of height' +
    '   bat toe at ' + (-px(toe.y)).toFixed(0).padStart(4) + '%' +
    '   toe is ' + (toe.y >= ground.y - 4 ? 'ON THE GROUND' : 'up, ' + (-px(toe.y)).toFixed(0) + '% high'));
}

console.log('THE STANCE, AS A SILHOUETTE (0% = his feet, 100% = top of his head)');
Bat.phase = 'ready'; Bat.t = 0; M.swagger = 0; H.setClock(500.9);
shot('stance', () => {});
Bat.phase = 'runup'; Bat.runup = 1.35;
shot('trigger, half way', () => { Bat.t = 1.2; H.setClock(501.2); });
shot('pick-up, at release', () => { Bat.t = 1.35; H.setClock(501.35); });
Input.charging = () => true;
shot('pick-up, premeditated', () => { Bat.t = 1.35; H.setClock(501.35); });
Input.charging = () => false;

console.log('\n  feet ' + STANCE.legFront + '° / ' + STANCE.legBack + '° apart' +
  '   hands ' + STANCE.handFront + '/' + STANCE.handBack + '° and they lift only ' + STANCE.handLift + '°' +
  '   knees flexed ' + STANCE.crouch);
