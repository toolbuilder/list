import { test } from 'zora'
import { List } from '../src/list.js'

const listOk = (test, list, expected, methodName) => {
  const empty = (expected.length === 0) ? ' empty ' : ' '
  test.deepEqual(Array.from(list), expected, `${methodName} leaves${empty}list with expected contents`)
  test.equal(list.length, expected.length, `${methodName} leaves${empty}list with expected length`)
  test.equal(list.head.prev, null, 'internal head ok')
  test.equal(list.tail.next, null, 'internal tail node ok')
}

test('constructor', (subtest) => {
  let list = new List()
  subtest.equal(list.length, 0, 'default constructed list has zero length')

  const expected = ['A', 'B', 'C']
  list = new List(expected)
  subtest.deepEqual(Array.from(list), expected, 'list constructor uses iterable when provided')
  subtest.equal(list.length, 3, 'construction from iterable sets length property correctly')
  listOk(subtest, list, expected, 'constructor')
})

test('from', subtest => {
  let list = List.from()
  subtest.equal(list.length, 0, 'from with no parameters creates empty list')

  list = List.from('ABCD')
  listOk(subtest, list, Array.from('ABCD'), 'from')
})

test('of', subtest => {
  let list = List.of()
  subtest.equal(list.length, 0, 'of with no parameters creates empty list')

  list = List.of('A', 'B', 'C', 'D')
  listOk(subtest, list, Array.from('ABCD'), 'of')
})

test('first', subtest => {
  let list = new List()
  subtest.equal(list.first(), undefined, 'first element of empty list is undefined')
  list = List.from(['a', 'b', 'c'])
  subtest.equal(list.first(), 'a', 'first returns first value of non-empty list')
})

test('last', subtest => {
  let list = List.from()
  subtest.equal(list.last(), undefined, 'last element of empty list is undefined')
  list = List.from(['A', 'B', 'C'])
  subtest.equal(list.last(), 'C', 'last returns last value of non-empty list')
})

test('firstNode', subtest => {
  let list = new List()
  subtest.equal(list.firstNode(), undefined, 'first node of empty list is undefined')
  list = new List([1, 2, 3])
  subtest.equal(list.firstNode().value, 1, 'firstNode returns first node of non-empty list')
})

test('lastNode', subtest => {
  let list = new List()
  subtest.equal(list.lastNode(), undefined, 'last node of empty list is undefined')
  list = new List([1, 2, 3])
  subtest.equal(list.lastNode().value, 3, 'lastNode returns first node of non-empty list')
})

test('find', subtest => {
  let list = new List()
  subtest.equal(list.find((v) => v === 'Z'), undefined, 'find returns undefined when list is empty')

  list = new List(['A', 'B', 'C', 'D'])
  subtest.equal(list.find((v) => v === 'A').value, 'A', 'find locates node at beginning of list')
  subtest.equal(list.find((v) => v === 'C').value, 'C', 'find locates node in middle of list')
  subtest.equal(list.find((v) => v === 'D').value, 'D', 'find locates node at end of list')
  subtest.equal(list.find((v) => v === 'Z'), undefined, 'find returns undefined when item not present')
})

test('insert after', subtest => {
  let list = new List()
  subtest.throws(() => list.insertAfter(undefined), null, 'insertAfter throws when after node is undefined')
  listOk(subtest, list, [], 'insertAfter')

  list = new List(['A', 'B', 'D'])
  list.insertAfter(list.find((v) => v === 'B'), 'C')
  listOk(subtest, list, ['A', 'B', 'C', 'D'], 'insertAfter')
})

test('insert before', subtest => {
  let list = new List()
  subtest.throws(() => list.insertBefore(undefined), null, 'insertBefore throws when before node is undefined')
  listOk(subtest, list, [], 'insertBefore')

  list = new List(['A', 'B', 'D'])
  list.insertBefore(list.find((v) => v === 'D'), 'C')
  listOk(subtest, list, ['A', 'B', 'C', 'D'], 'insertBefore')
})

test('remove', subtest => {
  let list = new List()
  subtest.throws(() => list.remove(undefined), null, 'remove throws when node to remove is undefined')
  listOk(subtest, list, [], 'remove')

  list = new List(['A', 'B', 'D'])
  list.remove(list.find((v) => v === 'D'))
  listOk(subtest, list, ['A', 'B'], 'remove')
})

test('push', (subtest) => {
  const list = new List()
  list.push('A')
  subtest.equal(list.length, 1, 'push to empty list results in length 1')
  listOk(subtest, list, ['A'], 'push')
  list.push('B')
  listOk(subtest, list, ['A', 'B'], 'push')
})

test('pop', subtest => {
  let list = new List()
  subtest.equal(list.pop(), undefined, 'pop on empty list returns undefined')
  listOk(subtest, list, [], 'pop')

  list = new List(['A'])
  subtest.equal(list.pop(), 'A', 'pop returns popped element from one element list')
  listOk(subtest, list, [], 'pop')

  list = new List('ABCD') // String is iterable, so this works
  subtest.equal(list.pop(), 'D', 'pop returns popped value from list')
  listOk(subtest, list, ['A', 'B', 'C'], 'pop')
})

test('shift', subtest => {
  let list = List.from(['A', 'B', 'C'])
  let value = list.shift()
  subtest.equal(value, 'A', 'shift returns the first value of the list')
  listOk(subtest, list, ['B', 'C'], 'shift')

  list = new List()
  value = list.shift()
  subtest.equal(value, undefined, 'shift returns undefined for empty list')
  listOk(subtest, list, [], 'shift')
})

test('unshift', subtest => {
  let list = List.from(['B', 'C', 'D'])
  let node = list.unshift('A')
  subtest.deepEqual(node, list.firstNode(), 'unshift returns the first node of the list')
  listOk(subtest, list, ['A', 'B', 'C', 'D'], 'unshift')

  list = new List()
  node = list.unshift('A')
  subtest.deepEqual(node, list.firstNode(), 'unshift returns first node for previously empty list')
  listOk(subtest, list, ['A'], 'unshift')
})

test('Symbol.iterator', subtest => {
  const expected = ['A', 'B', 'C', 'D']
  const list = List.from(expected)
  const actual = []
  for (const value of list) {
    actual.push(value)
  }
  subtest.deepEqual(actual, expected, 'Symbol.iterator provided all nodes of list in order')
})

test('nodes', subtest => {
  for (const node of List.from().nodes()) {
    subtest.fail(`empty list should not be iterated: ${node}`)
  }

  const expected = ['A', 'B', 'C']
  const list = List.from(expected)
  const actual = []
  for (const node of list.nodes()) {
    actual.push(node.value)
  }
  subtest.deepEqual(actual, expected, 'nodes provided all nodes of list in order')
})

test('nodesReversed', subtest => {
  for (const node of List.from().nodesReversed()) {
    subtest.fail(`empty list should not be iterated: ${node}`)
  }

  const list = List.from(['C', 'B', 'A'])
  const actual = []
  for (const node of list.nodesReversed()) {
    actual.push(node.value)
  }
  subtest.deepEqual(actual, ['A', 'B', 'C'], 'nodesReversed provided all nodes of list in reverse order')
})
