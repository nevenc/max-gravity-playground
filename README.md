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

## Space missions

Choose a mission below the playground. Starting or retrying creates a fresh universe at normal speed.

- **Orbit keeper:** launch three planets and keep three player-created planets within 1,200 km of the sun for 30 consecutive seconds. Losing one resets the timer; launch a replacement to continue.
- **Rescue captain:** pick up the astronaut and dock at the cyan station with relative speed below 45.
- **Black hole survivor:** keep at least three planets within 1,200 km of the black hole for 15 seconds. Losing too many fails the attempt.

Timers use real, unpaused gameplay seconds; simulation speed still changes the physics. Each mission earns one star, saved locally in this browser when storage is available. Resetting or returning to the sandbox keeps earned stars. Stars do not sync between devices.
