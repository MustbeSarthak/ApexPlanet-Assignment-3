# Task 3: Advanced Styling and JavaScript

## What was built

- `task-3/quiz.html`: an accessible, one-question-at-a-time web development quiz with eight HTML, CSS and JavaScript questions, instant answer feedback, progress text, scoring and restart.
- `task-3/weather.html`: a city weather lookup with loading and friendly error states. It uses Open-Meteo geocoding to find coordinates and the Open-Meteo forecast endpoint for current conditions.
- `task-3/css/task-3.css`: shared mobile-first responsive styling for mobile (including 360px), tablet (768px) and desktop (1280px) layouts.
- `task-3/js/quiz.js` and `task-3/js/weather.js`: separate JavaScript files with no inline handlers or styles.

Open either HTML file directly in a browser to run it. An internet connection is required for the weather lookup.

The Open-Meteo geocoding and forecast endpoints were checked before implementation and both responded successfully. No API key is required.

## Files created or changed

Created:

- `README.md`
- `task-3/quiz.html`
- `task-3/weather.html`
- `task-3/css/task-3.css`
- `task-3/js/quiz.js`
- `task-3/js/weather.js`

Changed:

- None. No existing portfolio project or main navigation was present under `C:\Task 3` when this task was completed.

## Assumptions and limitations

- The expected existing portfolio folder (`index.html`, `css/`, `js/`, and `images/`) was not available in the workspace, so the new pages use a standalone accessible blue theme and their own `task-3` structure.
- Browser network-off testing requires toggling the browser's network/devtools state; the weather script handles failed requests with an in-page message.
