# Task Manager Frontend

A small to-do list built with React. You can add a task, mark it done, and delete it.

## Run it

You need [Node.js](https://nodejs.org) installed, and the Django backend running at `http://127.0.0.1:8000`.

In this folder, run:

```bash
npm install
npm run dev
```

Then open <http://localhost:5173> in your browser.

## What to read

All of the app's code is in two files. Read them in this order:

1. `src/api.js` talks to the backend. It has one function each to get, add, change, and delete tasks.
2. `src/App.jsx` is the whole page: the data it remembers, what each button does, and what you see on screen.

The other files are setup, and you can leave them alone for now:

- `index.html` is the empty page that React fills in.
- `src/main.jsx` starts React.
- `src/index.css` turns on Tailwind, which provides style names like `rounded` and `p-4`.
- `vite.config.js` sets up Vite, the tool that runs the app.

## How it works

Every button follows the same steps:

1. You click the button.
2. `App.jsx` calls a function in `api.js`, and the backend saves the change.
3. `App.jsx` calls `loadTasks()` to get the new list from the backend.
4. `setTasks` stores the list, and React redraws the page.
