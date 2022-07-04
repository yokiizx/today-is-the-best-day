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

js 简易版，利用 map 可以保持顺序

```js
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.map = new Map() // 简易版使用map保持顺序
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const map = this.map
  if (!map.has(key)) return -1

  const val = map.get(key)
  map.delete(key)
  map.set(key, val)
  return val
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const map = this.map
  if (map.has(key)) {
    map.delete(key)
  }
  map.set(key, value)
  if (map.size > this.capacity) {
    map.delete(map.keys().next().value) // 利用了迭代器
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

```js
class PriorityQueue {
  // 初始化传入比较函数传入
  constructor(data, cmp) {
    this.data = [null].concat(data) // 注意这步操作，是为了方便计算父节点
    this.cmp = cmp // 比较函数
    // 这一步是为什么呢??? todo
    for (let i = data.length >> 1; i > 0; i--) this.down(i)
  }
  get size() {
    return this.data.length - 1
  }
  get top() {
    return this.data[1]
  }
  swap(i, j) {
    ;[this.data[i], this.data[j]] = [this.data[j], this.data[i]]
  }
  // 利用递归进行上浮和下沉
  up(i) {
    if (i === 1) return
    const p = i >> 1
    if (this.cmp(this.data[p], this.data[i])) {
      this.swap(i, p)
      this.up(p)
    }
  }
  down(i) {
    let j = i
    const n = this.data.length
    if (i === n - 1) return
    const l = i << 1,
      r = l + 1
    if (l < n && this.cmp(this.data[i], this.data[l])) i = l
    if (r < n && this.cmp(this.data[i], this.data[r])) i = r
    if (j !== i) {
      this.swap(i, j)
      this.down(i)
    }
  }
  push(val) {
    // 把值加入末尾,然后上浮它
    this.up(this.data.push(val) - 1)
  }
  pop() {
    // 把第一个和最后一个交换, pop出需要的值,把最后一个下沉
    this.swap(1, this.data.length - 1)
    const res = this.data.pop()
    this.down(1)
    return res
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
