# Wick Editor (iPad fix)

A copy of the open-source [Wick Editor](https://github.com/Wicklets/wick-editor) (v1.19.3), patched so it works on iPad, hosted with GitHub Pages.

**Open the editor:** https://kingjab1.github.io/wick-editor/

## What's different from the original

- **Buttons respond to a full tap.** The original fired actions on touch-down, and iPad Safari won't open a file picker from that, so Open and asset upload did nothing.
- **File pickers work on iPad.** The hidden file input is now actually on the page, and the file-type filter is skipped on iOS so `.wick` projects aren't greyed out.
- **Sound import is more reliable.** Fixed a file-extension check in the engine and added `.m4a`/`.aac` (iPad Voice Memos).
- **Textured brushes.** A Brush Texture button in the brush settings adds Crayon, Chalk, Charcoal and Spray. Both the inside and the outline of the stroke are textured, and the texture is baked into the traced vector shape, so strokes stay editable and fillable.
- **Hosting tweaks.** Built-in library objects are served as `.wickobj.json`, and the video exporter (`ffmpeg.js`) is split into two files.

## Source

This is the built site. The source changes against upstream commit `f34f0d9` are in [`ipad-fixes.patch`](ipad-fixes.patch). Apply them to a clone of [Wicklets/wick-editor](https://github.com/Wicklets/wick-editor), then split `public/corelibs/video/ffmpeg.js` into `ffmpeg.part1.js` and `ffmpeg.part2.js` (each file pushes half of the original text, as a string, onto `self.__ffsrc`).

The Wick Editor is licensed under the GNU GPL v3. See `license_en.txt`. Wick Editor is made by Wicklets LLC; this copy isn't affiliated with them.
