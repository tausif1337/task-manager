# Deck source

`task-manager-guide.html` is the source for `../project-task-manager-step-by-step-guide.pdf`.

The original PDF had no source in this repo — it was printed from Chrome on macOS
(`Skia/PDF m150`), and the HTML behind it lives on the author's machine. This file is a
rebuild, so the deck can be edited and reprinted from here on.

## Regenerate the PDF

```bash
chrome --headless=new --disable-gpu \
  --no-pdf-header-footer \
  --virtual-time-budget=25000 \
  --run-all-compositor-stages-before-draw \
  --print-to-pdf="../project-task-manager-step-by-step-guide.pdf" \
  "file:///C:/xampp/htdocs/claude/task-manager/deck/task-manager-guide.html"
```

On Windows the binary is `C:/Program Files/Google/Chrome/Application/chrome.exe`.
Requires a network connection the first time — Poppins loads from Google Fonts.

## How it is put together

- One `<div class="slide">` per slide, a fixed 1280×720 with `overflow:hidden`.
- `@page { size: 1280px 720px; margin: 0 }` makes one slide print as one page.
- Poppins for text, Menlo/Consolas for code. Palette matches the app: teal-700 on slate.

Two scripts run at the end of the file:

1. **Auto-numbering** — each slide's page number comes from its position, so inserting
   or reordering slides never desyncs the numbering. The `data-n` in the markup is ignored.
2. **Auto-fit** — slides clip silently at 720px, so any slide whose content overflows has
   its code, bullets and tables shrunk until everything fits. Without this, the last lines
   of a long code block disappear with no warning. If you add a dense slide and the type
   comes out small, split the slide rather than raising the floor.

## Editing

Add a slide by copying an existing `<div class="slide">`; leave `data-n` at any value.
Code blocks are HTML-escaped — `<` is `&lt;`, `>` is `&gt;`, `&` is `&amp;`. The
`<span class="c">` wrapper greys out a comment; `<span class="k">` highlights.

## Keeping it true to the code

Every code block is copied from the real files. When you change the app, change the deck.
The blocks that are quoted whole should stay byte-identical to their source file:

| Slide | File |
| --- | --- |
| 12 | `backend/requirements.txt` |
| 15 | `backend/.env.example` |
| 16 | `backend/.gitignore` |
| 24 | `backend/tasks/models.py` |
| 26 | `backend/tasks/serializers.py` |
| 27 | `backend/tasks/views.py` |
| 29 | `backend/tasks/urls.py` |
| 30 | `backend/task_manager/urls.py` |
| 31 | `backend/tasks/admin.py` |
| 32 | `backend/tasks/tests.py` |
| 37 | `frontend/vite.config.js` |
| 40–41 | `frontend/src/api.js` |
| 44–48 | `frontend/src/App.jsx` |
| 49–50 | `frontend/src/components/TaskForm.jsx` |
| 51–52 | `frontend/src/components/TaskList.jsx` |

Slides 38, 51 and 52 elide long Tailwind class strings with `...`, matching the original
deck's style.
