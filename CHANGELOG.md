## Changelog

### v0.2.0

🐞 Bug fixes:

- Fixed weird resizing and jittering bug when displaying images larger
  than half of the viewport.
- Fixed laggy movement of enlarged media. All responses are 60 FPS
  now.
- Fixed large memory usage caused by potential memory leak which
  originated by storing and operating on the list of websites in the
  content script.

✨ Features:

- Popup listing and website support management. This release comes
  with a popup action that displays all currently supported websites
  alongside a form to add new websites to the support list.
- Greeting page with changelog and better documentation for users.
- Performance optimizations and reduces memory usage by depending on
  storage rather than in-memory site management and having 1 event
  listener active at all times instead of multiple, constantly spawned
  and despawned listeners.
- Storage migration system. This system's role is to maintain the
  storage, upgrade it, and apply any needed transformations in case of
  changes to the data structure Zoomit uses. This guarantees that your
  custom-added websites remain untouched as Zoomit is updated. This
  system is completely automatic and doesn't require anything further
  from you.

### v0.1.0

Initial release! 🥳
