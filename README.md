# Blizzard
A library for adding a blizzard snow storm effect.

## How to use
Currently the only way to use the library is to download the built file and import it within a project.
```js
import { initialiseBlizzard } from './path-to-your-file/index.es.js';
document.addEventListener('DOMContentLoaded', () => {
    initialiseBlizzard({
        flakeCount: 300
    });
});
```