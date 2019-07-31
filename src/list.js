// Mutable double linked list

class Node {
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
 * Doubly linked list.
 */
class List {
  /**
   * Constructor.
   *
   * @param {Iterable} iterable - build list from iterable, may be null
   */
  constructor (iterable = null) {
    // two dummy nodes at each end of list to eliminate conditional checks on next/prev references
    this.head = new Node(null, null, undefined)
    this.tail = new Node(this.head, null, undefined)
    this.head.next = this.tail
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
   * @param {Iterable} iterable - build list from iterable, may be null
   */
  static from (iterable = null) {
    return new List(iterable)
  }

  /**
   * Static constructor from parameter values.
   *
   * @param  {...any} values - each value becomes an element of the list in the order provided
   */
  static of (...values) {
    return new List(values)
  }

  /**
   * Provide the first element in the list. Returns undefined if list is empty.
   */
  first () {
    return (this.length === 0) ? undefined : this.head.next
  }

  /**
   * Provide the last element in the list. Returns undefined if list is empty.
   */
  last () {
    return (this.length === 0) ? undefined : this.tail.prev
  }

  /**
   * Insert value after a node.
   *
   * @param {Node} prevNode - node from this list to insert value behind
   * @param {any} value - value to insert
   * @returns {Node} - the newly created node
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
   * @param {Node} nextNode - node from this list to insert value in front of
   * @param {any} value - value to insert
   * @returns {Node} - the newly created node
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
   * @param {Node} node - the node to remove from the list. The node is no longer useable after this call,
   * and no longer references the associated value.
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
   * @param {any} value - to be added to end of list
   * @returns - the newly created Node
   */
  push (value) {
    return this.insertBefore(this.tail, value)
  }

  /**
   * Remove the last value in the list.
   * @returns - the value of the removed node, or undefined if the list was empty
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
   * @param {Function} callback called for each value in the list until returns truthy
   * @param {Object} thisArg value to use as this when executing callback, defaults to null
   * @returns {Node} the node that contains the value. The value property will provide the value.
   */
  find (callback, thisArg = null) {
    for (const node of this.nodes()) {
      const found = callback.call(thisArg, node.value, this)
      if (found) return node
    }
    return undefined
  }

  /**
   * Generator that produces each node list in order. The value property of each node provides
   * the associated value.
   */
  * nodes () {
    let current = (this.head === this.tail) ? this.tail : this.head.next
    while (current !== this.tail) {
      yield current
      current = current.next
    }
  }

  /**
   * Iterable protocol over the *values* in the list.
   */
  * [Symbol.iterator] () {
    let current = (this.head === this.tail) ? this.tail : this.head.next
    while (current !== this.tail) {
      yield current.value
      current = current.next
    }
  }
}

export {
  List
}
