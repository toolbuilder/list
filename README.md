# List

Small, mutable, double linked, iterable list.

`List` supports iteration over values and nodes. If you wish to have functions like map, filter, forEach, and such, please use an iterable or Observable library. One such possibility is [Iterablefu](https://github.com/toolbuilder/iterablefu).

## Table of Contents

<!-- !toc (minlevel=2 omit="Features;Table of Contents") -->

* [Installation](#installation)
* [Getting Started](#getting-started)
* [API](#api)
  * [Node](#node)
  * [constructor](#constructor)
  * [first](#first)
  * [last](#last)
  * [firstNode](#firstnode)
  * [lastNode](#lastnode)
  * [previousNode](#previousnode)
  * [nextNode](#nextnode)
  * [insertAfter](#insertafter)
  * [insertBefore](#insertbefore)
  * [remove](#remove)
  * [push](#push)
  * [pop](#pop)
  * [find](#find)
  * [shift](#shift)
  * [unshift](#unshift)
  * [slice](#slice)
  * [nodes](#nodes)
  * [nodesReversed](#nodesreversed)
  * [from](#from)
  * [of](#of)
  * [Symbol.iterator](#symboliterator)
* [Releases](#releases)
* [Contributing](#contributing)
* [Issues](#issues)
* [License](#license)

<!-- toc! -->

## Installation

```bash
npm install --save @toolbuilder/list
```

Access the latest UMD package from [unpkg](https://unpkg.com) like this:

```html
<script src="https://unpkg.com/@toolbuilder%2flist/umd/list.umd.min.js"></script>
```

Or for the full version:

```html
<script src="https://unpkg.com/@toolbuilder%2flist/umd/list.umd.js"></script>
```

Both packages create a global variable representing the list as `DoubleLinkedList`.

## Getting Started

This is the import for require:

```javascript
let { List } = require('@toolbuilder/list')
```

This is the import for JavaScript modules:

```javascript
import { List } from '@toolbuilder/list'
```

For bundlers, the `module` property of 'package.json' points directly to the module version of `List`. You can also import it directly:

```javascript
import { List } from '@toolbuilder/list/src/list.js'
```

Quick example:

```javascript
import { List } from '@toolbuilder/list'

const list = new List(['A', 'B', 'D'])
list.push('E') // add 'E' to the end
console.log(list.first()) // prints 'A'
const node = list.find(value => value === 'B')
list.insertAfter(node, 'C') // list is ['A', 'B', 'C', 'D', 'E'] now
console.log(list.last()) // prints 'B'
for (const value of list) {
  // do something here
}
```

## API

Some methods work with `Node` objects to change the structure of the list. For convenience, other methods provide the values directly. For example, `List.first()` returns the value of the first element, and `List.firstNode()` returns the first `Node`. `Nodes` are required for operations such as `List.insertBefore(node, value)` and `List.remove(node)`.

These methods are value based:

* [first](#first)
* [last](#last)
* [push](#push) - returns a Node, but accepts a value
* [pop](#pop)
* [shift](#shift)
* [unshift](#unshift) - returns a Node, but accepts a value
* [from](#from)
* [of](#of)
* [Symbol.iterator](#symboliterator)

API documentation follows.

### Node

The Node object is used by [insertBefore](#insertbefore) and [insertAfter](#insertafter) to specify where to insert a new value. Other methods return Nodes to support using those two methods. Nodes are only valid for the List that created them.

```javascript
const list = List.of('A', 'C')
list.insertAfter(list.firstNode(), 'B')
console.log([...list]) // prints ['A', 'B', 'C']
```

The Node object has a `value` property, which provides the value associated with that node. Other properties and methods of the Node object are subject to change, and are not considered part of the public API.

```javascript
const list = List.of('A')
const node = list.firstNode()
console.log(node.value) // prints 'A'
```

<!-- include (api.md) -->
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### constructor

Constructor.

#### Parameters

- `iterable` [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) builds list using iterable (optional, default `null`)

#### Examples

```javascript
const list = new List([1, 2, 3])
console.log([...list]) // prints [1, 2, 3]
```

### first

Provides the first value in the list. Returns undefined if the list is empty.

#### Examples

```javascript
const list = List.from(['a', 'b', 'c'])
console.log(list.first()) // prints 'a'
```

Returns **any** first value in list

### last

Provides the last value in the list. Returns undefined if the list is empty.

#### Examples

```javascript
const list = List.from(['A', 'B', 'C'])
console.log(list.last()) // prints 'C'
```

Returns **any** last value in the list

### firstNode

Provides the first node in the list. Returns undefined if list is empty.

#### Examples

```javascript
const list = List.from(['a', 'b', 'c'])
const node = list.firstNode()
console.log(node.value) // prints 'a'
```

Returns [Node](#node) first node in list

### lastNode

Provides the last node in the list. Returns undefined if list is empty.

#### Examples

```javascript
const list = List.from(['A', 'B', 'C'])
const node = list.lastNode()
console.log(node.value) // prints 'C'
```

Returns [Node](#node) last node in list

### previousNode

Provides the node that comes before the provided node.

#### Parameters

- `node` [Node](#node) any Node element provided by the List instance

#### Examples

```javascript
const list = List.from(['A', 'B', 'C'])
const node = list.lastNode()
const prevNode = list.previousNode(node)
console.log(prevNode.value) // prints 'B'
```

Returns [Node](#node) value - the Node that comes before provided node or undefined if provided node is the first node or undefined.

### nextNode

Provides the node that comes after the provided node.

#### Parameters

- `node` [Node](#node) any Node element provided by the List instance

#### Examples

```javascript
const list = List.from(['A', 'B', 'C'])
const node = list.firstNode()
const nextNode = list.nextNode(node)
console.log(nextNode.value) // prints 'B'
```

Returns [Node](#node) value - the Node that follows provided node or undefined if provided node is the last node or undefined.

### insertAfter

Insert value after a node.

#### Parameters

- `prevNode` [Node](#node) node from this list to insert value behind
- `value` **any** value to insert

#### Examples

```javascript
const list = new List(['A', 'B', 'D'])
const prevNode = list.find(value => value === 'B')
list.insertAfter(prevNode, 'C')
console.log([...list]) // prints ['A', 'B', 'C', 'D']
```

Returns [Node](#node) the newly created node

### insertBefore

Insert value before a node.

#### Parameters

- `nextNode` [Node](#node) node from this list to insert value in front of
- `value` **any** value to insert

#### Examples

```javascript
const list = new List(['A', 'C', 'D'])
const nextNode = list.find(value => value === 'C')
list.insertBefore(nextNode, 'B')
console.log([...list]) // prints ['A', 'B', 'C', 'D']
```

Returns [Node](#node) the newly created node

### remove

Remove a node from the list.

#### Parameters

- `node` [Node](#node) the node to remove from the list. The node is no longer useable after this call,
  and no longer references the associated value.

#### Examples

```javascript
const list = new List(['A', 'B', 'C', 'D'])
const node = list.find(value => value === 'C')
list.remove(node)
// at this point the variable 'node' is no longer useable, node.value will return null.
console.log([...list]) // prints ['A', 'B', 'D']
```

### push

Add a value to the end of the list.

#### Parameters

- `value` **any** to be added to end of list

#### Examples

```javascript
const list = new List(['A', 'B', 'C'])
const node = list.push('D')
console.log([...list]) // prints ['A', 'B', 'C', 'D']
console.log(node.value) // prints 'D'
```

Returns [Node](#node) the newly created Node

### pop

Remove the last value in the list.

#### Examples

```javascript
const list = new List(['A', 'B', 'C'])
const value = list.pop()
console.log([...list]) // prints ['A', 'B']
console.log(value) // prints 'C'
```

Returns **any** the value of the removed node, or undefined if the list was empty

### find

Find the first value in the list where callback(value) returns truthy.

#### Parameters

- `callback` **[Function][2]** called for each value in the list until returns truthy
- `thisArg` **[Object][3]** value to use as `this` when executing callback, defaults to null (optional, default `null`)

#### Examples

```javascript
const list = new List(['A', 'B', 'C', 'D'])
const node = list.find(value => value === 'C')
console.log(node.value) // prints 'C'
```

Returns [Node](#node) the node that contains the value. The value property will provide the value.

### shift

Remove first node from list, and return the value. When combined with
`push`, this enables `List` to work like a FIFO queue.

#### Examples

```javascript
const list = List.from(['A', 'B', 'C'])
const value = list.shift()
console.log(value) // prints 'A'
console.log([...list]) // prints ['B', 'C']
```

Returns **any** the value of the first node before the call to `shift`,
or undefined if the list is empty.

### unshift

Push a value onto the front of the list.

#### Parameters

- `value` **any** to be added to front of list

#### Examples

```javascript
const list = new List(['B', 'C', 'D'])
const node = list.unshift('A')
console.log([...list]) // prints ['A', 'B', 'C', 'D']
console.log(node.value) // prints 'A'
```

Returns [Node](#node) the newly created Node

### slice

Creates a shallow copy of the list, with optional parameters to create a subset of
the original list.

#### Parameters

- `firstNode` [Node](#node) copy starts with this node. If firstNode is undefined, the first value of the copy
  is list.first().
- `lastNode` [Node](#node) last value of copy is list.previousNode(lastNode).value. If lastNode is undefined, the last
  value of the copy is list.last()

#### Examples

```javascript
const list = List.of('A', 'B', 'C', 'D', 'E')
const cNode = list.find(c => c === 'C')
console.log([...list.slice()]) // prints ['A', 'B', 'C', 'D', 'E']
console.log([...list.slice(cNode)]) // prints ['C', 'D', 'E']
console.log([...list.slice(list.firstNode(), cNode)]) // prints ['A', 'B']
console.log([...list.slice(cNode, cNode)]) // prints []
```

Returns **List** a shallow copy of the list with the specified values

### nodes

Generator that produces each node list in order from first to last. The value property of each node provides
the associated value.

Unexpected results may happen if the list structure is modified during iteration.

#### Parameters

- `first` [Node](#node) iteration starts with this node. If first is undefined, the first node returned
  is list.firstNode().
- `last` [Node](#node) last node returned is list.previousNode(last). If last is undefined, the last
  node returned is list.lastNode()

#### Examples

```javascript
const list = List.from([1, 2, 3, 4])
const array = []
for (const node of list.nodes()) {
  array.push(node.value)
}
console.log(array) // prints [1, 2, 3, 4]
```

Returns [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) 

### nodesReversed

Generator that produces each node in order from last to first.

Unexpected results may happen if the list structure is modified during iteration.

Returns [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) 

### from

Static constructor.

#### Parameters

- `iterable` [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) build list from iterable, may be null (optional, default `null`)

#### Examples

```javascript
const list = List.from(['A', 'B'])
console.log([...list]) // prints ['A', 'B']
```

Returns **List** 

### of

Static constructor from parameter values.

#### Parameters

- `values` **...any** each value becomes an element of the list in the order provided

#### Examples

```javascript
const list = List.of(1, 2, 'B')
console.log([...list]) // prints [1, 2, 'B']
```

Returns **List** 

### Symbol.iterator

Iterable protocol over the _values_ in the list.

#### Parameters

- `firstNode` [Node](#node) iteration starts with this node. If firstNode is undefined, the first value returned
  is list.first().
- `lastNode` [Node](#node) last value returned is list.previousNode(lastNode).value. If lastNode is undefined, the last
  value returned is list.last()

#### Examples

```javascript
const list = List.from([1, 2, 3, 4])
const array = []
for (const value of list) {
  array.push(value)
}
console.log(array) // prints [1, 2, 3, 4]
```

Returns [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) 

[1]: https://developer.mozilla.org/docs/Web/API/Node/nextSibling

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
<!-- /include -->

## Releases

* 1.0.0 - Has breaking changes. The methods `first` and `last` now return a value instead of a `Node`. New methods `firstNode` and `lastNode` provide access to the `Nodes`.

## Contributing

Contributions are welcome. Please create a pull request. Linting with [standard](https://standardjs.com/), version 13.1.0.

## Issues

This project uses Github issues.

## License

<!-- include (LICENSE) -->
The MIT License (MIT)

Copyright 2019 Kevin Hudson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
<!-- /include -->
