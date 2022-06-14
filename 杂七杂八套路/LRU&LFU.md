淘汰策略也是很重要的

### LRU

全称: least recently used，最近最少使用。

分析：

1. cache 中的元素必须有时序, 便于后面删除需要淘汰的那个
2. 在 cache 中快速找到某个 key,判断是否存在并且得到对应的 val O(1)
3. 访问到的 key 需要被提到前面, 也就是说得能实现快速插入和删除 O(1)

> 哈希表能满足快速查找，但是没有时序；链表有时序，但是查找很慢; 所以结合一下, 使用哈希链表.JS 中没有内置这种数据结构,所以需要手动实现.

[146,LRU 缓存](https://leetcode.cn/problems/lru-cache/)

```js
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.hash = new Map()
  this.cache = new DoubleList()
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  // 1. 根据key返回value; 2. 提到队尾(最近使用),涉及到删除当前位置并且放到尾部位置
  if (!this.hash.has(key)) return -1
  const currNode = this.hash.get(key)
  this.cache.remove(currNode)
  this.cache.addLast(currNode)
  return this.hash.get(key).value
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 1. 判断是否已经存在，如果存在就找到key，放入新值，并且提到队尾，同时删除原位置
  // 2. 如果不存在需要判断是否超出容量需要删除队首
  // 每一次都要注意处理hash和linkedList
  if (this.hash.has(key)) {
    const moveNode = this.hash.get(key)
    this.cache.remove(moveNode)
  } else {
    // 超出部分需要删除头,插入尾
    if (this.cache.size === this.capacity) {
      const delNodeKey = this.cache.removeFirst()
      this.hash.delete(delNodeKey)
    }
  }
  const newNode = new Node(key, value)
  this.cache.addLast(newNode)
  this.hash.set(key, newNode)
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
function Node(key, value) {
  this.key = key
  this.value = value
  this.next = null
  this.prev = null
}
class DoubleList {
  constructor() {
    // 虚拟头尾节点
    this.head = new Node(0, 0)
    this.tail = new Node(0, 0)
    this.head.next = this.tail
    this.tail.prev = this.head
    this.size = 0
  }
  addLast(node) {
    node.prev = this.tail.prev
    node.next = this.tail
    this.size++
    this.tail.prev.next = node
    this.tail.prev = node
  }
  // 删除node并且返回删除的key,需要去处理map
  remove(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
    this.size--
    return node.key
  }
  removeFirst() {
    if (this.head.next === this.tail) return null
    return this.remove(this.head.next)
  }
}
```

### LFU

全称: Least Frequently Used，删除使用频次 freq 最低的键值对。如果 freq 最低的键值对有多个，则删除其中最旧的那个。

分析:

1. 调用 get(key) 方法时，要返回该 key 对应的 val。
2. 只要用 get 或者 put 方法访问一次某个 key，该 key 的 freq 就要加一。
3. 如果在容量满了的时候进行插入，则需要将 freq 最小的 key 删除，如果最小的 freq 对应多个 key，则删除其中最旧的那一个。

[460. LFU 缓存](https://leetcode.cn/problems/lfu-cache/)

1. 需要一个 key, value 映射
2. 需要一个 key, freq 映射
3. 这个需求应该是 LFU 算法的核心，所以我们分开说。

3.1 首先，肯定是需要 freq 到 key 的映射，用来找到 freq 最小的 key。
3.2 将 freq 最小的 key 删除，那你就得快速得到当前所有 key 最小的 freq 是多少。想要时间复杂度 O(1) 的话，肯定不能遍历一遍去找，那就用一个变量 minFreq 来记录当前最小的 freq 吧。
3.3 可能有多个 key 拥有相同的 freq，所以 freq 对 key 是一对多的关系，即一个 freq 对应一个 key 的列表。
3.4 希望 freq 对应的 key 的列表是存在时序的，便于快速查找并删除最旧的 key。
3.5 希望能够快速删除 key 列表中的任何一个 key，因为如果频次为 freq 的某个 key 被访问，那么它的频次就会变成 freq+1，就应该从 freq 对应的 key 列表中删除，加到 freq+1 对应的 key 的列表中。

了解下思想吧，前端大概率是碰不见这道题，因为太复杂，需要用到的也是前端没有的内置对象 LinkedHashSet
