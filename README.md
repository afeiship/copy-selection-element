# copy-selection-element
> Copy html from selection element.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/copy-selection-element
```

## usage
```js
import copySelectionElement from "@jswork/copy-selection-element";

const el = document.querySelector(".content");
const successful = copySelectionElement(el);

if (successful) {
  // do somthing...
}
```

## license
Code released under [the MIT license](https://github.com/afeiship/copy-selection-element/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/copy-selection-element
[version-url]: https://npmjs.org/package/@jswork/copy-selection-element

[license-image]: https://img.shields.io/npm/l/@jswork/copy-selection-element
[license-url]: https://github.com/afeiship/copy-selection-element/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/copy-selection-element
[size-url]: https://github.com/afeiship/copy-selection-element/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/copy-selection-element
[download-url]: https://www.npmjs.com/package/@jswork/copy-selection-element
