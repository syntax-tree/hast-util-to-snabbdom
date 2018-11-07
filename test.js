'use strict'

const u = require('unist-builder')
const s = require('snabbdom/h').default
const test = require('tape')

const toSnabbdom = require('./src')

test('should throw on invalid usage', t => {
  t.throws(() => toSnabbdom())
  t.throws(() => toSnabbdom('bar'))

  t.end()
})

test('removes invalid & unknown falsy props', t => {
  const uTree = u(
    'element',
    {
      tagName: 'p',
      properties: {
        ignored: false, // Unknown booleans are ignored
        disabled: 0 // Falsy known booleans are ignored
      }
    },
    []
  )

  t.deepEqual(toSnabbdom(uTree), s('p', {}, []))
  t.end()
})

test('handles id and classes', t => {
  const uTree = u(
    'element',
    {
      tagName: 'p',
      properties: {
        id: 'a',
        className: ['b', 'c']
      }
    },
    []
  )
  const expected = s(
    'p',
    {
      attrs: {
        id: 'a',
        class: 'b c'
      }
    },
    []
  )

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})

test('handles case', t => {
  const uTree = u(
    'element',
    {
      tagName: 'input',
      properties: {
        camelCase: 'foo', // Unknown props are dash-cased
        acceptCharset: 'bar', // Known props are dash-cased
        ariaValuenow: '1' // ARIA props
      }
    },
    []
  )
  const expected = s(
    'input',
    {
      attrs: {
        camelCase: 'foo',
        'accept-charset': 'bar',
        'aria-valuenow': '1'
      }
    },
    []
  )

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})

test('passes through data-*', t => {
  const uTree = u(
    'element',
    {
      tagName: 'p',
      properties: {
        'data-foo': 'a',
        'data-bar-baz': 'b'
      }
    },
    []
  )
  const expected = s(
    'p',
    {
      attrs: {
        'data-foo': 'a',
        'data-bar-baz': 'b'
      }
    },
    []
  )

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})

test('handles lists', t => {
  const uTree = u(
    'element',
    {
      tagName: 'input',
      properties: {
        type: 'file',
        foo: ['on', 'off'], // Unknown lists are space-separated
        accept: ['.jpg', '.jpeg'] // Known lists are separated appropriately
      }
    },
    []
  )
  const expected = s(
    'input',
    {
      attrs: {
        type: 'file',
        foo: 'on off',
        accept: '.jpg, .jpeg'
      }
    },
    []
  )

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})

test('handles `root` root node', t => {
  const h1 = u(
    'element',
    {
      tagName: 'h1',
      properties: {}
    },
    [u('text', 'foo')]
  )
  const p = u(
    'element',
    {
      tagName: 'p'
    },
    [u('text', 'bar')]
  )

  const uTreeWith1 = u('root', {}, [p])
  const uTreeWith2 = u('root', {}, [h1, p])

  t.deepEqual(toSnabbdom(u('root', {}, [])), null)
  t.deepEqual(toSnabbdom(uTreeWith1), s('p', {}, ['bar']))
  t.deepEqual(
    toSnabbdom(uTreeWith2),
    s('div', {}, [s('h1', {}, ['foo']), s('p', {}, ['bar'])])
  )
  t.end()
})

test('handles `comment` root node', t => {
  t.equal(toSnabbdom(u('comment', 'foo')), null)
  t.end()
})

test('more complex tree', t => {
  const uTree = u('element', {tagName: 'h1'}, [
    u('text', 'hey there!'),
    u('comment', 'i am a comment'),
    u('element', {tagName: 'p'}, [u('text', 'foo')]),
    u('text', 'bar'),
    u(
      'element',
      {
        tagName: 'input',
        properties: {
          type: 'file',
          name: 'baz',
          style: 'color: red; background-color: blue'
        }
      },
      []
    )
  ])

  const expected = s('h1', {}, [
    'hey there!',
    s('p', {}, ['foo']),
    'bar',
    s(
      'input',
      {
        attrs: {
          type: 'file',
          name: 'baz',
          style: 'color: red; background-color: blue'
        }
      },
      []
    )
  ])

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})

test('style as an object', t => {
  const uTree = u(
    'element',
    {
      tagName: 'div',
      properties: {
        style: {color: 'red', 'background-color': 'blue'}
      }
    },
    []
  )

  const expected = s(
    'div',
    {
      style: {color: 'red', 'background-color': 'blue'},
      attrs: {style: {color: 'red', 'background-color': 'blue'}}
    },
    []
  )

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})
