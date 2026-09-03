#!/usr/bin/env node
/* The whole suite, in one go.
 *
 *   node tools/test/run.js            the full build
 *   node tools/test/run.js --batting  the batting-only build
 *   node tools/test/run.js sim e2e    just those
 *
 * Every script drives the shipped Bat/Bowl state machines out of
 * grade-cricket.html with a scripted thumb, so the numbers are measured from
 * the game rather than from a model of it. Balance suites print figures and
 * are slow; the rest assert and are quick.
 */
const { execFileSync } = require('child_process');
const path = require('path');

const QUICK = ['render', 'screens', 'menufit', 'order', 'cnb', 'stance', 'anim',
               'power', 'runup', 'field', 'ticker'];
const SLOW  = ['catches', 'wides', 'widerate', 'behave', 'theircard', 'wickets',
               'team', 'fieldmatch', 'e2e'];
const BALANCE = ['sim', 'bowlperlevel'];

const args = process.argv.slice(2);
const batting = args.includes('--batting');
const named = args.filter(a => !a.startsWith('--'));
const list = named.length ? named : (batting ? ['batonly'] : QUICK.concat(SLOW));

const env = Object.assign({}, process.env);
if (batting) env.GAME = path.join(__dirname, '..', '..', 'grade-cricket-batting.html');

let failed = 0;
for (const name of list) {
  const started = Date.now();
  process.stdout.write('  ' + name.padEnd(14));
  try {
    const out = execFileSync('node', [path.join(__dirname, name + '.js')],
                             { env: env, encoding: 'utf8', timeout: 20 * 60 * 1000 });
    const secs = ((Date.now() - started) / 1000).toFixed(0);
    console.log('ok   ' + secs + 's');
    if (BALANCE.indexOf(name) >= 0 || named.length) console.log(out.replace(/^/gm, '      '));
  } catch (e) {
    failed++;
    console.log('FAILED');
    console.log(String(e.stdout || '').replace(/^/gm, '      '));
    console.log(String(e.stderr || '').split('\n').slice(0, 8).join('\n').replace(/^/gm, '      '));
  }
}
console.log(failed ? '\n' + failed + ' of ' + list.length + ' failed'
                   : '\nall ' + list.length + ' passed');
process.exit(failed ? 1 : 0);
