'use strict'

const u = require('unist-builder')
const util = require('util')

const toSnabbdom = require('.')

const uTree = u('element', {
	tagName: 'form',
	properties: {
		id: 'a',
		className: ['b', 'c'],
		style: 'color: red; background-color: blue',
		acceptCharset: 'bar', // known attributes are dash-cased
		camelCase: 'foo', // unknown attributes are dash-cased
		'data-foo': 'a' // data-* attributes are supported
	}
}, [
	u('text', 'hey there!'),
	u('comment', 'i am a comment'),
	u('element', {
		tagName: 'input',
		properties: {
			type: 'file',
			ignored: false, // unknown booleans are ignored
			disabled: 0, // falsy known booleans are ignored
			ariaValuenow: '1' // ARIA attributes are supported
		}
	}, [])
])

const sTree = toSnabbdom(uTree)
console.log(util.inspect(sTree, {depth: Infinity}))
