'use strict'

const propInfo = require('property-information')
const kebabCase = require('kebab-case')
const h = require('snabbdom/h').default

const hasProp = Object.prototype.hasOwnProperty

const toSnabbdom = (uTree) => {
	if (typeof uTree !== 'object' || Array.isArray(uTree)) {
		throw new Error('uTree must be an object')
	}

	// todo: handle `root` root node
	// todo: handle `comment` root node

	return convert(uTree)
}

const convert = (node) => {
	if (node.type === 'text') return node.value
	// ignoring `comment` and `doctype` nodes
	if (node.type !== 'element') return null

	let selector = node.tagName
	const data = {}

	const props = node.properties || {}
	if (props.id) selector += '#' + props.id
	if (props.className) {
		const c = props.className
		selector += '.' + (Array.isArray(c) ? c.join('.') : c) // todo: empty arr
	}

	if (typeof props.style === 'string') {
		if (props.style) {} // todo: parse style, assign to data.style
	} else if (typeof props.style === 'object' && !Array.isArray(props.style)) {
		data.style = props.style
	}

	for (let prop in props) {
		if (!hasProp.call(props, prop)) continue
		if (prop === 'id' || prop === 'className' || prop === 'style') continue

		let val = props[prop]
		const info = propInfo(prop) || {}

		// ignore nully, `false`, `NaN` and falsey known booleans
		if (
			val === null ||
			val === undefined ||
			val === false ||
			Number.isNaN(val) ||
			(info.boolean && !val)
		) return

		if (Array.isArray(val)) {
			val = info.commaSeparated ? val.join(', ') : val.join(' ')
		}

		data[info.name || kebabCase(prop)] = val
	}

	const children = []
	if (Array.isArray(node.children)) {
		for (let child of node.children) {
			const res = convert(child)
			if (res !== null && res !== undefined) children.push(res)
		}
	}

	return h(selector, data, children)
}

module.exports = toSnabbdom
