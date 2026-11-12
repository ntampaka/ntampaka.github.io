# Editing Rigorous Curiosity — Build 12.1

This is **Build 12**, reorganized for editing.  Visual design, wording, links, and gameplay are intentionally unchanged.

## The easiest way to edit text

1. Open the **whole folder** in Visual Studio Code (File → Open Folder).
2. Open the page you want: `index.html` (Home), `research.html` (Research), `field-notes.html` (Field Notes), `about.html` (About).
3. Look for descriptive HTML comments, such as `<!-- HOME FEATURE CARDS -->` or `<!-- CAREER TIMELINE / PAWPRINTS -->`.
4. Search for the sentence with **⌘F**; edit the words **between** the tags (`<p> ... </p>`).  Leave the tags and attributes intact.
5. Save with **⌘S**.  Enable **View → Word Wrap** or press **Option+Z** so long sentences wrap visually without changing the website.
6. Preview the page in a browser; using a local server is best for interactive features.

### Common text locations

| What to change | Where |
| --- | --- |
| Home introduction, three feature cards | `index.html` |
| Research prose and publication links | `research.html` |
| Field Notes resource descriptions | `field-notes.html` |
| About biography, leadership, mentoring, contact | `about.html` |
| Career timeline years and milestone descriptions | `assets/site.js` (search for `EDIT HERE`) |
| Cosmic Oracle fortunes | `assets/oracle.js` (search for `EDIT HERE`) |
| Policy Lab text | `policy-lab.html`, `policy-lab-desktop.html`, `policy-lab-mobile.html` |
| Thinking Machine page | `thinking-machine.html` |

### Important HTML tips

- Normal source-code line breaks and indentation **do not** create extra visible paragraphs.  Use a new `<p> ... </p>` block for a new paragraph, and `<br>` for a deliberate line break.
- To preserve the author's **two spaces after a period** in rendered HTML, use `.&nbsp; ` between sentences.  Avoid Find and Replace across the entire project: it could damage URLs, scripts, or code.
- Some interactive wording is in JavaScript.  Edit the text in its quotes; leave punctuation like `,`, `[`, `]`, and quote marks in place.
- Avoid formatting/minifying or running bulk substitutions across HTML, CSS, or JavaScript.  They can break positioning and interactivity.
- The many `assets/build*.css` files are historical incremental overrides.  Leave them in place while making prose edits; merging them is a separate refactor and carries more risk.

## Sanity checks after edits

- Test Home, Research, Field Notes and About at laptop and mobile widths.
- Test the Big Dipper's anomalous star, Cassiopeia's wandering star, Orion's hidden interaction, the career story toggle, and the Cosmic Oracle.
- Check any links whose text or destination you changed.
- If a page suddenly looks wrong, undo the **last code change** first.

The original Build 12 download is unchanged; this folder is a separate working copy.
