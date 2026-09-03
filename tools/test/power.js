const H = require('./harness.js');
const { G } = H;
const { M, Bat, Cam, LEVELS, POWER, powerBand, batterScreen, CFG, VH, proj } = G;

M.reset(LEVELS[0], 'match'); M.phase = 'bat'; Cam.home(true); H.setClock(100);

console.log('THE POWER BAR — what the bar says vs what the swing actually does');
console.log('  (swing() reads: held < 0.15 control, < 0.42 attack, else slog; early hold = slog)');
[0.05, 0.14, 0.16, 0.30, 0.41, 0.45, 0.58].forEach(held => {
  const band = powerBand(held, false);
  // the real decision, lifted straight out of Bat.swing
  const real = (false || held > 0.42) ? 'slog' : held < 0.15 ? 'control' : 'attack';
  const shown = ['control', 'attack', 'slog'][band.i];
  console.log('   held ' + held.toFixed(2) + 's   bar says ' + band.name.padEnd(13) +
    '  swing plays ' + real.padEnd(8) + (shown === real ? 'MATCH' : 'MISMATCH'));
});
const e = powerBand(0.05, true);
console.log('   pressed early     bar says ' + e.name.padEnd(13) + '  swing plays slog     ' +
  (e.i === 2 ? 'MATCH' : 'MISMATCH'));

console.log('\n  power multipliers behind those bands: control x' + CFG.swingSpeed.control +
  '  attack x' + CFG.swingSpeed.attack + '  slog x' + CFG.swingSpeed.slog);

console.log('\nLAYOUT (frame is 720 tall)');
const b = batterScreen();
const feet = proj(G.STRIKER_X, 0, G.STRIKER_Z), head = proj(G.STRIKER_X, 1.82, G.STRIKER_Z);
console.log('  batter        ' + head.y.toFixed(0) + ' to ' + feet.y.toFixed(0) +
  '  (' + ((feet.y - head.y) / 7.2).toFixed(0) + '% of frame height)');
console.log('  fan hub       ' + b.y.toFixed(0) + ', spokes reach ' + (b.y + 186).toFixed(0) + ' at full stretch');
console.log('  power bar     ' + (VH - 62) + ' to ' + (VH - 46) + ', label at ' + (VH - 72));
console.log('  => ' + (b.y + 186 < VH - 72 ? 'clear of the fan' : 'OVERLAPS THE FAN by ' + (b.y + 186 - (VH - 72)).toFixed(0) + 'px'));
