# Build 12.1 — Editor-Friendly Edition: QA Report

**Result: PASS, no visual regressions detected in the tested viewports.**

## Scope of changes

- Reformatted all **9 HTML pages** with structural indentation, one logical paragraph/heading per line, blank lines between sections, and descriptive comments.
- Moved all **29 Oracle fortunes** and **9 career milestones** onto separate, editable lines in their existing JavaScript files.
- Added `EDITING-GUIDE.md` with a quick reference for changing website text safely.
- Left all CSS files, images, PDFs, JSON data, asset filenames, IDs, element attributes, links, and game logic untouched.
- Preserved the author's double spacing after sentence-ending periods, including `&nbsp;` in HTML text.

## Checks completed

1. **Structural preservation:** Compared page elements and their attributes against Build 12; no differences.  Compared textual content of headings, paragraphs, navigation, links, labels, etc.; no content changes.
2. **Local references:** All local `href` and `src` references resolve to included files; no missing assets.
3. **JavaScript syntax:** All external `assets/*.js` files and every inline script passed `node --check`.
4. **Chromium visual regression:** All **9 HTML pages**, at **1440 × 900** and **390 × 844** browser viewports (**18 comparisons**), rendered **pixel-for-pixel identical** to Build 12.  No horizontal overflow or uncaught page script errors in the comparison test.
5. **Interaction smoke tests:** About page displayed all 9 pawprints in correct dark blue before and after whole-story expansion; the career toggle worked; the Cosmic Oracle opened; returning Cassiopeia's wandering star opened Pong; the Big Dipper's anomalous star was present.
6. **Original files:** All non-HTML assets except the two intentionally reformatted JavaScript source files are byte-for-byte identical to Build 12.

See `QA-COMPARISON.json` for each page's viewport-by-viewport result.

## Testing limitations

Because this environment blocks localhost navigation, the Chromium test used **locally inlined CSS, JS, and image assets** for both builds.  It establishes rendered equivalence, but is **not** a production HTTP deployment test.  External links and every possible game action were not exhaustively tested.  After editing and deployment, spot-check navigation and links in a real browser.
