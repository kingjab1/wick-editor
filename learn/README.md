# Learn tab content

Everything in the editor's **Learn** tab comes from this folder. You never need to rebuild the editor. Upload files here and the site updates in a minute or two.

## Add an example

1. Make the animation in the editor. Put your teaching notes (arrows, spacing marks, text) on a layer named **Notes**. That layer shows while students study the file, opens locked, and never appears in exported GIFs, videos or HTML.
2. **Save** the project (`.wick`) and **Export** a GIF of it for the preview card.
3. Give both files the same name, in this pattern:

   `01 Bouncing Ball -- squash and stretch, timing.wick`
   `01 Bouncing Ball -- squash and stretch, timing.gif`

   - The number sets the order (01, 02, ...). It's optional.
   - The text before ` -- ` is the title.
   - The words after ` -- `, separated by commas, are the principles it teaches. Short forms work too: `squash`, `ease`, `overlap`, `pose to pose`. Words that don't match a principle (like `loops`) still show as tags.
4. Optional: add a `.txt` file with the same name containing one or two sentences. It shows under the title on the card.
5. Upload the files into `learn/examples` on GitHub (Add file > Upload files) and commit.

## Edit the principles

`principles.json` holds the principle list, in display order. Fill in a `description` to show it under the principle's name. Add a new entry to create your own category, such as Loops. Use `aliases` for other words you want to type in file names.

## How it works

On every push, a GitHub Action (`.github/workflows/deploy.yml`) runs `build-catalog.js` to rebuild `catalog.json` from the files in `examples/`, then publishes the site.
