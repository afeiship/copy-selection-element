# env-manager
> Environment manager for frontend.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/env-manager
```

## usage
```js
import EnvManager from '@jswork/env-manager';

// vite
const viteEnv = new EnvManager({
  prefix: 'VITE_APP_',
  env: import.meta.env
});

// webpack
const craEnv = new EnvManager({
  prefix: 'REACT_APP_',
  env: process.env
});
```

> You can use `env-cmd` to manage your envs.
```json
// ---------- package.json
"scripts": {
  "start": "env-cmd -e local react-scripts start",
  "build:beta": "env-cmd -e beta react-scripts build",
  "build:prod": "env-cmd -e prod react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

> You can use `env-cmdrc.js` to manage your envs.
```js
// ---------- .env-cmdrc.js
module.exports = craEnv.set({
  "local": {
    "API_URL": "http://localhost:3000",
    "BUILD_ENV": 'local-api.github.com/users/afeiship',
  },
  "beta": {
    "API_URL": "http://beta.api.com",
    "BUILD_ENV": 'beta-api.github.com/users/afeiship',
  },
  "production": {
    "API_URL": "http://api.com",
    "BUILD_ENV": 'api.github.com/users/afeiship',
  },
});

// ---------- src/app.tsx
// get 'BUILD_ENV'
const buildEnv = craEnv.get('BUILD_ENV');
// get all
const envs = craEnv.get();
```

## types
```ts
// add to global.d.ts OR nx-env.d.ts
/// <reference types="@jswork/env-manager/dist/@types" />
```

## license
Code released under [the MIT license](https://github.com/afeiship/env-manager/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/env-manager
[version-url]: https://npmjs.org/package/@jswork/env-manager

[license-image]: https://img.shields.io/npm/l/@jswork/env-manager
[license-url]: https://github.com/afeiship/env-manager/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/env-manager
[size-url]: https://github.com/afeiship/env-manager/blob/master/dist/env-manager.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/env-manager
[download-url]: https://www.npmjs.com/package/@jswork/env-manager
