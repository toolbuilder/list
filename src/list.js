/**
 * The Node object is used by insertBefore and insertAfter to specify where to insert a new value.
 * Other methods return Nodes to support using those two methods. Nodes are only valid for the List that created them.
 *
 * The Node object has a `value` property, which provides the value associated with that node.
 * Other properties and methods of the Node object are subject to change, and are not considered part of the public API.
 *
 * @template Type
 * @example
 * const list = List.of('A', 'C')
 * list.insertAfter(list.firstNode(), 'B')
 * console.log([...list]) // prints ['A', 'B', 'C']
 * const node = list.firstNode()
 * console.log(node.value) // prints 'A'
 */
export class Node {
  /**
   * Constructor.
   *
   * @param {Node<Type>} prev
   * @param {Node<Type>} next
   * @param {Type} value only this property is part of the public API
   */
  constructor (prev, next, value) {
    this.prev = prev
    this.next = next
    this.value = value
  }

  release () {
    this.prev = null
    this.next = null
    this.value = null
  }
}

/**
 * Double-linked list.
 *
 * @template Type
 */
export class List {
  /**
   * Constructor.
   *
   * @param {Iterable<Type>} [iterable] - builds list using iterable
   * @example
   * const list = new List([1, 2, 3])
   * console.log([...list]) // prints [1, 2, 3]
   */
  constructor (iterable = null) {
    // two dummy nodes at each end of list to eliminate conditional checks on next/prev references
    /**
     * @private
     * @type {Node<Type>} */
    this.head = new Node(null, null, undefined)
    /**
     * @private
     * @type {Node<Type>} */
    this.tail = new Node(this.head, null, undefined)
    this.head.next = this.tail // setup empty list
    /**
     * Provides the number of elements in the list.
     * @type {number} */
    this.length = 0
    if (iterable != null) {
      for (const value of iterable) {
        this.push(value)
      }
    }
  }

  /**
   * Static constructor.
   *
   * @template U
   * @param {Iterable<U>} [iterable] - build list from iterable, may be null
   * @returns {List<U>}
   * @example
   * const list = List.from(['A', 'B'])
   * console.log([...list]) // prints ['A', 'B']
   */
  static from (iterable = null) {
    return new List(iterable)
  }

  /**
   * Static constructor from parameter values.
   *
   * @template V
   * @param  {...V} values - each value becomes an element of the list in the order provided
   * @returns {List<V>}
   * @example
   * const list = List.of(1, 2, 'B')
   * console.log([...list]) // prints [1, 2, 'B']
   */
  static of (...values) {
    return new List(values)
  }

  /**
   * Provides the first value in the list. Returns undefined if the list is empty.
   *
   * @returns {Type} - first value in list
   * @example
   * const list = List.from(['a', 'b', 'c'])
   * console.log(list.first()) // prints 'a'
   */
  first () {
    return (this.length === 0) ? undefined : this.firstNode().value
  }

  /**
   * Provides the last value in the list. Returns undefined if the list is empty.
   *
   * @returns {Type} - last value in the list
   * @example
   * const list = List.from(['A', 'B', 'C'])
   * console.log(list.last()) // prints 'C'
   */

  last () {
    return (this.length === 0) ? undefined : this.lastNode().value
  }

  /**
   * Provides the first node in the list. Returns undefined if list is empty.
   *
   * @returns {Node<Type>} - first node in list
   * @example
   * const list = List.from(['a', 'b', 'c'])
   * const node = list.firstNode()
   * console.log(node.value) // prints 'a'
   */
  firstNode () {
    return (this.length === 0) ? undefined : this.head.next
  }

  /**
   * Provides the last node in the list. Returns undefined if list is empty.
   *
   * @returns {Node<Type>} - last node in list
   * @example
   * const list = List.from(['A', 'B', 'C'])
   * const node = list.lastNode()
   * console.log(node.value) // prints 'C'
   */
  lastNode () {
    return (this.length === 0) ? undefined : this.tail.prev
  }

  /**
   * Provides the node that comes before the provided node.
   *
   * @param {Node<Type>} node - any Node element provided by the List instance
   * @returns {Node<Type>} value - the Node that comes before provided node or undefined if provided node is the first node or undefined.
   * @example
   * const list = List.from(['A', 'B', 'C'])
   * const node = list.lastNode()
   * const prevNode = list.previousNode(node)
   * console.log(prevNode.value) // prints 'B'
   */
  previousNode (node) {
    return (node && node.prev !== this.head) ? node.prev : undefined
  }

  /**
   * Provides the node that comes after the provided node.
   *
   * @param {Node<Type>} node - any Node element provided by the List instance
   * @returns {Node<Type>} value - the Node that follows provided node or undefined if provided node is the last node or undefined.
   * @example
   * const list = List.from(['A', 'B', 'C'])
   * const node = list.firstNode()
   * const nextNode = list.nextNode(node)
   * console.log(nextNode.value) // prints 'B'
   */
  nextNode (node) {
    return (node && node.next !== this.tail) ? node.next : undefined
  }

  /**
   * Insert value after a node.
   *
   * @param {Node<Type>} prevNode - node from this list to insert value behind
   * @param {Type} value - value to insert
   * @returns {Node<Type>} - the newly created node
   * @example
   * const list = new List(['A', 'B', 'D'])
   * const prevNode = list.find(value => value === 'B')
   * list.insertAfter(prevNode, 'C')
   * console.log([...list]) // prints ['A', 'B', 'C', 'D']
   */
  insertAfter (prevNode, value) {
    const nextNode = prevNode.next
    const newNode = new Node(prevNode, nextNode, value)
    prevNode.next = newNode
    nextNode.prev = newNode
    ++this.length
    return newNode
  }

  /**
   * Insert value before a node.
   *
   * @param {Node<Type>} nextNode - node from this list to insert value in front of
   * @param {Type} value - value to insert
   * @returns {Node<Type>} - the newly created node
   * @example
   * const list = new List(['A', 'C', 'D'])
   * const nextNode = list.find(value => value === 'C')
   * list.insertBefore(nextNode, 'B')
   * console.log([...list]) // prints ['A', 'B', 'C', 'D']
   */
  insertBefore (nextNode, value) {
    const prevNode = nextNode.prev
    const newNode = new Node(prevNode, nextNode, value)
    prevNode.next = newNode
    nextNode.prev = newNode
    ++this.length
    return newNode
  }

  /**
   * Remove a node from the list.
   *
   * @param {Node<Type>} node - the node to remove from the list. The node is no longer useable after this call,
   * and no longer references the associated value.
   * @example
   * const list = new List(['A', 'B', 'C', 'D'])
   * const node = list.find(value => value === 'C')
   * list.remove(node)
   * // at this point the variable 'node' is no longer useable, node.value will return null.
   * console.log([...list]) // prints ['A', 'B', 'D']
   */
  remove (node) {
    const prevNode = node.prev
    const nextNode = node.next
    prevNode.next = nextNode
    nextNode.prev = prevNode
    --this.length
    node.release()
  }

  /**
   * Add a value to the end of the list.
   *
   * @param {Type} value - to be added to end of list
   * @returns {Node<Type>} - the newly created Node
   * @example
   * const list = new List(['A', 'B', 'C'])
   * const node = list.push('D')
   * console.log([...list]) // prints ['A', 'B', 'C', 'D']
   * console.log(node.value) // prints 'D'
   */
  push (value) {
    return this.insertBefore(this.tail, value)
  }

  /**
   * Remove the last value in the list.
   *
   * @returns {Type} - the value of the removed node, or undefined if the list was empty
   * @example
   * const list = new List(['A', 'B', 'C'])
   * const value = list.pop()
   * console.log([...list]) // prints ['A', 'B']
   * console.log(value) // prints 'C'
   */
  pop () {
    if (this.length > 0) {
      const result = this.tail.prev.value
      this.remove(this.tail.prev)
      return result
    }
    return undefined
  }

  /**
   * Find the first value in the list where callback(value) returns truthy.
   *
   * @param {FindFunction<Type>} callback called for each value in the list until returns truthy
   * @param {object} [thisArg] value to use as `this` when calling callback, defaults to null
   * @returns {Node<Type>} the node that contains the value. The value property will provide the value.
   * Returns undefined if there was no value where callback returned truthy.
   * @example
   * const list = new List(['A', 'B', 'C', 'D'])
   * const node = list.find(value => value === 'C')
   * console.log(node.value) // prints 'C'
   */
  find (callback, thisArg = null) {
    for (const node of this.nodes()) {
      const found = callback.call(thisArg, node.value, this)
      if (found) return node
    }
    return undefined
  }

  /**
   * Remove first node from list, and return the value. When combined with
   * `push`, this enables `List` to work like a FIFO queue.
   *
   * @returns {Type} the value of the first node before the call to `shift`,
   * or undefined if the list is empty.
   * @example
   * const list = List.from(['A', 'B', 'C'])
   * const value = list.shift()
   * console.log(value) // prints 'A'
   * console.log([...list]) // prints ['B', 'C']
   */
  shift () {
    if (this.length === 0) return undefined
    const node = this.head.next
    const value = node.value
    this.remove(node)
    return value
  }

  /**
   * Push a value onto the front of the list.
   *
   * @param {Type} value - to be added to front of list
   * @returns {Node<Type>} - the newly created Node
   * @example
   * const list = new List(['B', 'C', 'D'])
   * const node = list.unshift('A')
   * console.log([...list]) // prints ['A', 'B', 'C', 'D']
   * console.log(node.value) // prints 'A'
   */
  unshift (value) {
    const firstNode = (this.length === 0) ? this.tail : this.head.next
    return this.insertBefore(firstNode, value)
  }

  /**
   * Creates a shallow copy of the list, with optional parameters to create a subset of
   * the original list. The Nodes of the copy are different, and cannot be used with the
   * original list. Modifying the list will not modify the parent list. However, modifying
   * values will modify values in the parent list if they are not primitives.
   *
   * @param {Node<Type>} [firstNode] - copy starts with this node. If firstNode is undefined, the first value of the copy
   * is list.first().
   * @param {Node<Type>} [lastNode] - last value of copy is list.previousNode(lastNode).value. If lastNode is undefined, the last
   * value of the copy is list.last()
   * @returns {List<Type>} - a shallow copy of the list with the specified values
   * @example
   * const list = List.of('A', 'B', 'C', 'D', 'E')
   * const cNode = list.find(c => c === 'C')
   * console.log([...list.slice()]) // prints ['A', 'B', 'C', 'D', 'E']
   * console.log([...list.slice(cNode)]) // prints ['C', 'D', 'E']
   * console.log([...list.slice(list.firstNode(), cNode)]) // prints ['A', 'B']
   * console.log([...list.slice(cNode, cNode)]) // prints []
   */
  slice (firstNode = undefined, lastNode = undefined) {
    return List.from(this[Symbol.iterator](firstNode, lastNode))
  }

  /**
   * Generator function that produces each node of the list in order from first to last. The value property of each node provides
   * the associated value.
   *
   * Unexpected results may happen if the list structure is modified during iteration.
   *
   * @param {Node<Type>} [first] - iteration starts with this node. If first is undefined, the first node returned
   * is list.firstNode().
   * @param {Node<Type>} [last] - last node returned is list.previousNode(last). If last is undefined, the last
   * node returned is list.lastNode()
   * @returns {IterableIterator<Node<Type>>}
   * @example
   * const list = List.from([1, 2, 3, 4])
   * const array = []
   * for (const node of list.nodes()) {
   *   array.push(node.value)
   * }
   * console.log(array) // prints [1, 2, 3, 4]
   */
  * nodes (first = undefined, last = undefined) {
    let current = first || this.head.next
    const tail = last || this.tail
    while (current !== tail) {
      yield current
      current = current.next
    }
  }

  /**
   * Generator function that produces each node in order from last to first.
   *
   * Unexpected results may happen if the list structure is modified during iteration.
   *
   * @returns {IterableIterator<Node<Type>>}
   */
  * nodesReversed () {
    let current = this.tail.prev
    while (current !== this.head) {
      yield current
      current = current.prev
    }
  }

  /**
   * Iterable protocol over the *values* in the list.
   *
   * @name Symbol.iterator
   * @param {Node<Type>} [firstNode] - iteration starts with this node. If firstNode is undefined, the first value returned
   * is list.first().
   * @param {Node<Type>} [lastNode] - last value returned is list.previousNode(lastNode).value. If lastNode is undefined, the last
   * value returned is list.last()
   * @returns {IterableIterator<Type>}
   * @example
   * const list = List.from([1, 2, 3, 4])
   * const array = []
   * for (const value of list) {
   *   array.push(value)
   * }
   * console.log(array) // prints [1, 2, 3, 4]
   */
  * [Symbol.iterator] (firstNode = undefined, lastNode = undefined) {
    for (const node of this.nodes(firstNode, lastNode)) {
      yield node.value
    }
  }
}

/**
 * Callback function for find. Returns truthy when value is found.
 *
 * @template T
 * @callback FindFunction
 * @param {T} value - candidate list value
 * @returns {any} - truthy if value is what you're looking for
 * @example
 * const list = List.from(['a', 'b'])
 * const findFunction = (value) => value === 'b'
 * const node = list.find(findFunction)
 * console.log(node.value) // prints 'b'
 */
