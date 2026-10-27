# Max's Gravity Playground

A browser gravity sandbox with planet launches, orbit trails, time controls, a black hole, and a spaceship rescue mission.

Requires Node.js 18 or newer. No dependencies to install.

```sh
npm test
npm run build
npm start
```

Open http://localhost:4173. You can also open `dist/index.html` directly after building.

Edit the app in `src/`, then rebuild. Generated files are in `dist/`.

## Flight controls

Click **Launch rescue mission**. Arrow keys or WASD rotate, thrust, and brake. Pick up the pink astronaut and return slowly to the cyan station. Press R to retry. Touch buttons are also available.

The simulation uses simplified gravitational physics. The brake assists docking by matching the station's velocity. Fonts load from Google Fonts when connected; system fonts work offline.
