# hast-to-snabbdom

[![Greenkeeper badge](https://badges.greenkeeper.io/derhuerst/hast-to-snabbdom.svg)](https://greenkeeper.io/)

**Transform a [HAST](https://github.com/syntax-tree/hast/blob/master/readme.md) into a [Snabbdom](https://github.com/snabbdom/snabbdom#snabbdom) tree.**

[![npm version](https://img.shields.io/npm/v/hast-to-snabbdom.svg)](https://www.npmjs.com/package/hast-to-snabbdom)
[![build status](https://api.travis-ci.org/derhuerst/hast-to-snabbdom.svg?branch=master)](https://travis-ci.org/derhuerst/hast-to-snabbdom)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/hast-to-snabbdom.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install hast-to-snabbdom
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
const toSnabbdom = require('hast-to-snabbdom')
const util = require('util')

const sTree = toSnabbdom(uTree)
console.log(util.inspect(sTree, {depth: Infinity}))
```

```js
{
	sel: 'form#a.b.c',
	data: {},
	children: [ {
		sel: undefined,
		data: undefined,
		children: undefined,
		text: 'hey there!',
		elm: undefined,
		key: undefined
	}, {
		sel: 'input',
		data: {type: 'file'},
		children: [],
		text: undefined,
		elm: undefined,
		key: undefined
	} ],
	text: undefined,
	elm: undefined,
	key: undefined
}
```


## Contributing

If you have a question or have difficulties using `hast-to-snabbdom`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/hast-to-snabbdom/issues).
