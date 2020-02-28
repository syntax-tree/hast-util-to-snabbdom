# hast-util-to-snabbdom

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**hast**][hast] utility to transform to [**Snabbdom**][snabbdom].

## Install

[npm][]:

```sh
npm install hast-util-to-snabbdom
```

## Use

```js
const u = require('unist-builder')
const h = require('hastscript')
const toSnabbdom = require('hast-util-to-snabbdom')

const hast = h('form', {id: 'a', className: ['b', 'c']}, [
  'hey there!',
  u('comment', 'i am a comment'),
  h('input', {type: 'file'})
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

Transform the given [**hast**][hast] [*tree*][tree] to a
[**Snabbdom**][snabbdom] tree.

###### Parameters

*   `tree` (`*`) — Value to check, probably [`Node`][node].

##### Returns

A Snabbdom node.

## Security

Use of `hast-util-to-snabbdom` can open you up to a
[cross-site scripting (XSS)][xss] attack if the hast tree is unsafe.
Use [`hast-util-santize`][sanitize] to make the hast tree safe.

## Related

*   [hast-to-hyperscript](https://github.com/syntax-tree/hast-to-hyperscript)
    — Transform hast to something else through a hyperscript DSL
*   [hast-util-to-html](https://github.com/syntax-tree/hast-util-to-html)
    — Transform to HTML
*   [hast-util-to-parse5](https://github.com/syntax-tree/hast-util-to-parse5)
    — Transform to Parse5’s AST
*   [hast-util-to-dom](https://github.com/syntax-tree/hast-util-to-dom)
    — Transform to a DOM tree
*   [snabbdom](https://github.com/snabbdom/snabbdom)
    — Virtual DOM library with focus on simplicity, modularity, powerful
    features and performance

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[ISC][license] © [Jannis Redmann][author]

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-to-snabbdom.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-to-snabbdom

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-to-snabbdom.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-to-snabbdom

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-to-snabbdom.svg

[downloads]: https://www.npmjs.com/package/hast-util-to-snabbdom

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-to-snabbdom.svg

[size]: https://bundlephobia.com/result?p=hast-util-to-snabbdom

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://jannisr.de

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[tree]: https://github.com/syntax-tree/unist#tree

[hast]: https://github.com/syntax-tree/hast

[node]: https://github.com/syntax-tree/hast#nodes

[snabbdom]: https://github.com/snabbdom/snabbdom#snabbdom

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/syntax-tree/hast-util-sanitize
