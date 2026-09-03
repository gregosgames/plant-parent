/* Headless harness: stub just enough browser to run the real game code,
   then drive it ball by ball to measure balance. */
const fs = require('fs');
const path = require('path');
const S = __dirname;

let CLOCK = 0;
const calls = { fill: 0, stroke: 0, text: 0 };

function makeCtx() {
  const noop = () => {};
  const c = {
    canvas: null, fillStyle: '', strokeStyle: '', lineWidth: 1, lineCap: '',
    font: '', textAlign: '', textBaseline: '', globalAlpha: 1,
    save: noop, restore: noop, beginPath: noop, closePath: noop,
    moveTo: noop, lineTo: noop, arc: noop, ellipse: noop,
    fill: () => calls.fill++, stroke: () => calls.stroke++,
    fillRect: noop, strokeRect: noop, clearRect: noop, rect: noop, clip: noop,
    fillText: () => calls.text++, strokeText: noop,
    setTransform: noop, translate: noop, scale: noop, rotate: noop,
    setLineDash: noop, measureText: () => ({ width: 10 }),
    createLinearGradient: () => ({ addColorStop: noop }),
    createRadialGradient: () => ({ addColorStop: noop }),
    createPattern: () => ({}),
  };
  return c;
}

const el = {
  width: 1280, height: 720, style: {},
  getContext: () => makeCtx(),
  addEventListener: () => {},
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 1280, height: 720 }),
  classList: { toggle: () => {}, remove: () => {}, add: () => {} },
};

global.window = {
  innerWidth: 1280, innerHeight: 720, devicePixelRatio: 1,
  addEventListener: () => {},
};
global.document = {
  getElementById: () => el,
  createElement: () => ({ width: 0, height: 0, getContext: () => makeCtx() }),
};
global.performance = { now: () => CLOCK * 1000 };
global.requestAnimationFrame = () => {};
global.localStorage = { getItem: () => null, setItem: () => {} };

/* Read the game out of the shipped HTML. No build step and no generated
   file to keep in sync: the tests run against exactly what ships.
   GAME=... points at a different build (the batting-only one, say). */
const GAME = process.env.GAME
  || path.join(S, '..', '..', 'grade-cricket.html');
const html = fs.readFileSync(GAME, 'utf8');
const m = html.match(/<script>\n'use strict';\n([\s\S]*)<\/script>/);
if (!m) throw new Error('no <script> block found in ' + GAME);
const src = m[1];
const wrapped = '(function(){' + src + '\nreturn {Art,BAT_ONLY,BOWLER_Z,Ball,Bat,Bowl,CATCH_REACH,CFG,CONTACT_X,Cam,Catcher,Chase,FIELD_SETS,FOLLOW_X,FORMATS,Field,GROUNDS,Input,KITS,LEG_SIDE_CAP,LEVELS,LIGHTS,M,Match,NATIONS,NONSTRIKER_Z,PITCH_LEN,PLAY_AS,POS,POWER,RADAR,REACTION_X,REACTION_Z,RELEASE_X,SHOTS,SHOT_ANIM,SKINS,STANCE,STRIKER_X,STRIKER_Z,STYLES,SWING_DOWN,SWING_THROUGH,Save,Stumps,TICKER,Take,Typing,UI,UMPIRE_X,UMPIRE_Z,VH,VW,WIDE_LEG,WIDE_OFF,aimFromScreen,batReach,batterScreen,boundaryR,bowlerWaitX,buildField,drawBowlerDelivery,drawFigure,drawRadar,fieldTheBall,fillCard,fitText,frame,fx,fz,horizonY,isWide,keeperOf,kitByKey,legSideCount,markX,myKit,playableFormats,powerBand,proj,radarPt,radarWorld,resize,rollPath,runupX,screenFromAim,strikerPose,theirKit,tickerState,unprojectGround};\n})()';
const G = eval(wrapped);
module.exports = { G, setClock: t => { CLOCK = t; }, clock: () => CLOCK, calls };
