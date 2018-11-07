# hast-util-to-snabbdom

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]

Transform [hast][] to [Snabbdom][] tree.

## Installation

[npm][]:

```bash
npm install hast-util-snabbdom
```

## Usage

```javascript
const u = require('unist-builder')
const h = require('hastscript')
const toSnabbdom = require('hast-util-to-snabbdom')

const hast = h('form', {id: 'a', className: ['b', 'c']}, [
  'hey there!',
  u('comment', 'i am a comment'),
  u('element', {tagName: 'input', properties: {type: 'file'}}, [])
])

console.dir(toSnabbdom(hast))
```

```js
{ sel: 'form',
  data: { attrs: { id: 'a', class: 'b c' } },
  children:
   [ { sel: undefined,
       data: undefined,
       children: undefined,
       text: 'hey there!',
       elm: undefined,
       key: undefined },
     { sel: 'input',
       data: { attrs: { type: 'file' } },
       children: [],
       text: undefined,
       elm: undefined,
       key: undefined } ],
  text: undefined,
  elm: undefined,
  key: undefined }
```

## API

### `toSnabbdom(tree)`

Transform the given [hast][] tree to [Snabbdom][].

###### Parameters

`tree` (`*`) — Value to check.

##### Returns

A Snabbdom node.

## Related

*   [hast-to-hyperscript](https://github.com/syntax-tree/hast-to-hyperscript)
    — Transform hast to something else through a hyperscript DSL
*   [snabbdom](https://github.com/snabbdom/snabbdom)
    — A virtual DOM library with focus on simplicity, modularity, powerful
    features and performance

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[ISC][license] © [Jannis Redmann][author]

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-to-snabbdom.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-to-snabbdom

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-to-snabbdom.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-to-snabbdom

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-to-snabbdom.svg

[downloads]: https://www.npmjs.com/package/hast-util-to-snabbdom

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://jannisr.de

[hast]: https://github.com/syntax-tree/hast

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md

[snabbdom]: https://github.com/snabbdom/snabbdom#snabbdom
