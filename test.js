'use strict'

const u = require('unist-builder')
const s = require('snabbdom/h').default
const test = require('tape')

const toSnabbdom = require('.')

test('should throw on invalid usage', (t) => {
  t.throws(() => toSnabbdom())
  t.throws(() => toSnabbdom('bar'))

  t.end()
})

test('removes invalid & unknown falsy props', (t) => {
  const uTree = u('element', {
    tagName: 'p',
    properties: {
      ignored: false, // unknown booleans are ignored
      disabled: 0 // falsy known booleans are ignored
    }
  }, [])

  t.deepEqual(toSnabbdom(uTree), s('p', {}, []))
  t.end()
})

test('handles id and classes', (t) => {
  const uTree = u('element', {
    tagName: 'p',
    properties: {
      id: 'a',
      className: ['b', 'c']
    }
  }, [])

  t.deepEqual(toSnabbdom(uTree), s('p#a.b.c', {}, []))
  t.end()
})

test('handles styles', (t) => {
  const uTree = u('element', {
    tagName: 'p',
    properties: {
      style: 'color: red; background-color: blue'
    }
  }, [])
  const expected = s('p', {
    style: {
      color: 'red',
      'background-color': 'blue'
    }
  }, [])
  // console.error(require('util').inspect(expected, {depth: Infinity}))

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})

test('handles case', (t) => {
  const uTree = u('element', {
    tagName: 'input',
    properties: {
      camelCase: 'foo', // unknown props are dash-cased
      acceptCharset: 'bar', // known props are dash-cased
      ariaValuenow: '1' // ARIA props
    }
  }, [])
  const expected = s('input', {
    'camel-case': 'foo',
    'accept-charset': 'bar',
    'aria-valuenow': '1'
  }, [])

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})

test('handles data-*', (t) => {
  const uTree = u('element', {
    tagName: 'p',
    properties: {
      'data-foo': 'a',
      'data-bar-baz': 'b'
    }
  }, [])
  const expected = s('p', {
    dataset: {
      foo: 'a',
      'bar-baz': 'b'
    }
  }, [])

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})

test('handles lists', (t) => {
  const uTree = u('element', {
    tagName: 'input',
    properties: {
      type: 'file',
      foo: ['on', 'off'], // unknown lists are space-separated
      accept: ['.jpg', '.jpeg'] // known lists are separated appropriately
    }
  }, [])
  const expected = s('input', {
    type: 'file',
    foo: 'on off',
    accept: '.jpg, .jpeg'
  }, [])

  t.deepEqual(toSnabbdom(uTree), expected)
  t.end()
})

test('handles `root` root node', (t) => {
  const h1 = u('element', {
    tagName: 'h1',
    properties: {}
  }, [
    u('text', 'foo')
  ])
  const p = u('element', {
    tagName: 'p',
    properties: {id: 'foo'}
  }, [
    u('text', 'bar')
  ])

  const uTreeWith1 = u('root', {}, [p])
  const uTreeWith2 = u('root', {}, [h1, p])

  t.deepEqual(toSnabbdom(u('root', {}, [])), null)
  t.deepEqual(toSnabbdom(uTreeWith1), s('p#foo', {}, ['bar']))
  t.deepEqual(toSnabbdom(uTreeWith2), s('div', {}, [
    s('h1', {}, ['foo']),
    s('p#foo', {}, ['bar'])
  ]))
  t.end()
})

test('handles `comment` root node', (t) => {
  t.equal(toSnabbdom(u('comment', 'foo')), null)
  t.end()
})

test('more complex tree', (t) => {
  const uTree = u('element', {tagName: 'h1'}, [
    u('text', 'hey there!'),
    u('comment', 'i am a comment'),
    u('element', {tagName: 'p'}, [
      u('text', 'foo')
    ]),
    u('text', 'bar'),
    u('element', {
      tagName: 'input',
      properties: {
        type: 'file',
        name: 'baz'
      }
    }, [])
  ])

  const expected = s('h1', {}, [
    'hey there!',
    s('p', {}, ['foo']),
    'bar',
    s('input', {type: 'file', name: 'baz'}, [])
  ])

  const actualSTree = toSnabbdom(uTree)
  t.deepEqual(actualSTree, expected)
  t.end()
})
