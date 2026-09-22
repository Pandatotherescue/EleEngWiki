#!/usr/bin/env python3
"""
Regenerate the subset fonts embedded in exported PDFs.

jsPDF's built-in fonts are WinAnsi-encoded and cannot render the Greek and
mathematical symbols this site produces (ohm, gamma, lambda, mu, degree...).
These subsets of DejaVu Sans and DejaVu Sans Mono cover what is needed at a
fraction of the full font size.

Requires: pip install fonttools, and the DejaVu fonts installed locally.
Usage:    python3 scripts/build-fonts.py
"""
import base64
import os
import sys

try:
    from fontTools import subset
except ImportError:
    sys.exit("fonttools is required: pip install fonttools")

UNICODES = (
    "U+0020-007E,"      # Basic Latin
    "U+00A0-00FF,"      # Latin-1: degree, plus-minus, micro, times, accents
    "U+0100-017F,"      # Latin Extended-A
    "U+0192,U+02C6-02DC,"
    "U+0370-03FF,"      # Greek
    "U+2010-2027,"      # dashes, quotes, ellipsis
    "U+2030-205E,"      # per mille, prime, bullet
    "U+2070-209F,"      # super/subscripts
    "U+20AC,"           # euro
    "U+2122,U+2126,"    # trademark, ohm sign
    "U+2190-2199,"      # arrows
    "U+2202,U+2206,U+220F,U+2211-2213,U+221A,U+221E,"
    "U+2220,U+2225,U+2227-222B,U+2248,U+2260-2265,"
    "U+25A0-25CF,"
)

CANDIDATE_DIRS = [
    "/usr/share/fonts/truetype/dejavu",
    "/usr/share/fonts/dejavu",
    "/Library/Fonts",
    "C:/Windows/Fonts",
]

JOBS = [
    ("DejaVuSans.ttf", "eew-sans-normal"),
    ("DejaVuSans-Bold.ttf", "eew-sans-bold"),
    ("DejaVuSansMono.ttf", "eew-mono-normal"),
    ("DejaVuSansMono-Bold.ttf", "eew-mono-bold"),
]

out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "fonts")
os.makedirs(out_dir, exist_ok=True)

for src_name, out_name in JOBS:
    src = next(
        (os.path.join(d, src_name) for d in CANDIDATE_DIRS
         if os.path.exists(os.path.join(d, src_name))),
        None,
    )
    if not src:
        sys.exit(f"could not find {src_name} in any of: {', '.join(CANDIDATE_DIRS)}")
    dest = os.path.join(out_dir, out_name + ".ttf")
    subset.main([
        src, f"--unicodes={UNICODES}", f"--output-file={dest}",
        "--layout-features=", "--no-hinting", "--desubroutinize",
        "--drop-tables+=GSUB,GPOS,GDEF,DSIG,LTSH,VDMX,hdmx,kern",
    ])
    print(f"{out_name}.ttf  {os.path.getsize(dest) // 1024} KB")

print("done — fonts written to public/fonts/")
