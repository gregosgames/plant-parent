#!/usr/bin/env python3
"""Write the batting-only build from the full game.

One source, two games. `grade-cricket.html` is bat and bowl; this emits
`grade-cricket-batting.html`, the same file with BAT_ONLY flipped, which drops
the bowling half and turns every match into a chase. Both outputs are
self-contained HTML — no build step is needed to *run* either of them, only to
produce the second one.

    python3 tools/build-batting.py
"""
import io
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'grade-cricket.html')
OUT = os.path.join(ROOT, 'grade-cricket-batting.html')

SWAPS = [
    ('const BAT_ONLY = false;', 'const BAT_ONLY = true;'),
    ('<title>Grade Cricket</title>', '<title>Grade Cricket — Batting</title>'),
]


def main():
    src = io.open(SRC, encoding='utf-8').read()
    for old, new in SWAPS:
        if src.count(old) != 1:
            sys.exit('build-batting: expected exactly one %r in %s, found %d'
                     % (old, os.path.basename(SRC), src.count(old)))
        src = src.replace(old, new)
    io.open(OUT, 'w', encoding='utf-8').write(src)
    print('wrote %s (%d KB)' % (os.path.basename(OUT), len(src.encode('utf-8')) // 1024))


if __name__ == '__main__':
    main()
