# hast-util-to-snabbdom

**Transform a [HAST](https://github.com/syntax-tree/hast/blob/master/readme.md) into a [Snabbdom](https://github.com/snabbdom/snabbdom#snabbdom) tree.**

[![npm version](https://img.shields.io/npm/v/hast-util-to-snabbdom.svg)](https://www.npmjs.com/package/hast-util-to-snabbdom)
[![build status](https://api.travis-ci.org/syntax-tree/hast-util-to-snabbdom.svg?branch=master)](https://travis-ci.org/syntax-tree/hast-util-to-snabbdom)
![license](https://img.shields.io/github/license/syntax-tree/hast-util-to-snabbdom.svg)


## Installing

```shell
npm install hast-util-to-snabbdom
```


## Usage

This is our input [HTML Abstract Syntax Tree (HAST)](https://github.com/syntax-tree/hast/blob/master/readme.md):

```js
const u = require('unist-builder')

const uTree = u('element', {
	tagName: 'form',
	properties: {
		id: 'a',
		className: ['b', 'c']
	}
}, [
	u('text', 'hey there!'),
	u('comment', 'i am a comment'),
	u('element', {
		tagName: 'input',
		properties: {type: 'file'}
	}, [])
])
```

Let's convert it into a [Snabbdom](https://github.com/snabbdom/snabbdom#snabbdom) tree and print the result:

```js
const toSnabbdom = require('hast-util-to-snabbdom')
const util = require('util')

const sTree = toSnabbdom(uTree)
console.log(util.inspect(sTree, {depth: Infinity}))
```

```js
{
	sel: 'form',
	data: {
		attrs: {id: 'a', class: 'b c'}
	},
	children: [
		{
			sel: undefined,
			data: undefined,
			children: undefined,
			text: 'hey there!',
			elm: undefined,
			key: undefined
		},
		{
			sel: 'input',
			data: {
				attrs: {type: 'file'}
			},
			children: [],
			text: undefined,
			elm: undefined,
			key: undefined
		}
	],
	text: undefined,
	elm: undefined,
	key: undefined
}
```


## Contribute

See [`contribute.md` in `syntax-tree/hast`][contribute] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

[contribute]: https://github.com/syntax-tree/hast/blob/master/contributing.md
[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md
