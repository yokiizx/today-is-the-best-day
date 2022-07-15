// function monotonicStack(nums) {
//   const n = nums.length
//   const stack = [],
//     res = new Array(n)
//   for (let i = n - 1; i >= 0; i--) {
//     while (stack.length && nums[i] >= stack[stack.length - 1]) {
//       stack.pop()
//     }
//     res[i] = stack.length === 0 ? -1 : stack[stack.length - 1]
//     stack.push(nums[i])
//   }
//   return res
// }

// let arr = [1, 2, 3, 4, 5]
// let n = arr.length,
//   index = 0
// while (index < 2 * n) {
//   console.log(arr[index % n])
//   index++
// }

// const arr = [1, 2, 3, 4, 5]

// function logReverse(arr, n) {
//   if (n < 0) return
//   console.log('前--', arr[n])
//   logReverse(arr, n - 1)
//   console.log('后====', arr[n])
// }

// logReverse(arr, arr.length - 1)

// function rabbit(n) {
//   if (n === 1 || n === 2) return 1
//   return rabbit(n - 1) + rabbit(n - 2)
// }
// console.log(rabbit(12))

// const map = new Map()
// map.set('1', 1)
// map.set('2', 2)
// map.set('3', 3)

// console.log(map.keys().next().value)

class PriorityQueue {
  // 初始化传入比较函数传入
  constructor(data, cmp) {
    this.data = [null].concat(data) // 注意这步操作，是为了方便计算父节点
    this.cmp = cmp // 比较函数
    // 这一步是为什么呢??? TODO
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

let arr = [3, 1, 4, 6, 2, 7, 9, 8, 0, 5]

const pq = new PriorityQueue(arr, (a, b) => a - b > 0)
console.log('pq', pq)
