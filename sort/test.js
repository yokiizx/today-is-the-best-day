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

// class PriorityQueue {
//   // 初始化传入比较函数传入
//   constructor(data, cmp) {
//     this.data = [null].concat(data) // 注意这步操作，是为了方便计算父节点
//     this.cmp = cmp // 比较函数
//     for (let i = data.length >> 1; i > 0; i--) this.down(i)
//   }
//   get size() {
//     return this.data.length - 1
//   }
//   get top() {
//     return this.data[1]
//   }
//   swap(i, j) {
//     ;[this.data[i], this.data[j]] = [this.data[j], this.data[i]]
//   }
//   // 利用递归进行上浮和下沉
//   up(i) {
//     if (i === 1) return
//     const p = i >> 1
//     if (this.cmp(this.data[p], this.data[i])) {
//       this.swap(i, p)
//       this.up(p)
//     }
//   }
//   //        0
//   //    1       2
//   // 3     4  5     6
//   down(i) {
//     let j = i
//     const n = this.data.length
//     if (i === n - 1) return
//     const l = i << 1,
//       r = l + 1
//     if (l < n && this.cmp(this.data[i], this.data[l])) i = l
//     if (r < n && this.cmp(this.data[i], this.data[r])) i = r
//     if (j !== i) {
//       this.swap(i, j)
//       this.down(i)
//     }
//   }
//   push(val) {
//     // 把值加入末尾,然后上浮它
//     this.up(this.data.push(val) - 1)
//   }
//   pop() {
//     // 把第一个和最后一个交换, pop出需要的值,把最后一个下沉
//     this.swap(1, this.data.length - 1)
//     const res = this.data.pop()
//     this.down(1)
//     return res
//   }
// }

// class PriorityQueue {
//   // 初始化数据和比较函数
//   constructor(data, cmp) {
//     this.data = [null].concat(data) // 方便计算父节点 p为 i >> 1 l为 i << 1
//     this.cmp = cmp
//     for (let i = data.length >> 1; i > 0; --i) this.down(i) // 对后面的一半数据进行下沉处理,则全部排好序了
//   }
//   // 两个getter方法
//   get size() {
//     return this.data.length - 1
//   }
//   get top() {
//     return this.data[1]
//   }
//   // 通过递归来实现上浮和下沉方法
//   up(i) {
//     if (i === 1) return
//     const p = i >> 1
//     if (this.cmp(this.data[i], this.data[p])) {
//       this.swap(i, p)
//       this.up(p)
//     }
//   }
//   down(i) {
//     if (i === this.size) return
//     const old = i // 固定之前的索引
//     const l = i << 1,
//       r = l + 1
//     if (l <= this.size && this.cmp(this.data[l], this.data[i])) i = l
//     if (r <= this.size && this.cmp(this.data[r], this.data[i])) i = r
//     if (old !== i) {
//       this.swap(old, i)
//       this.down(i)
//     }
//   }
//   push(val) {
//     this.up(this.data.push(val) - 1) // 加入末尾然后开始上浮到正确的位置
//   }
//   pop() {
//     // 把堆顶交换到末尾,然后取出末尾, 再对刚放入堆顶的元素下沉即可
//     this.swap(1, this.data.length - 1)
//     const node = this.data.pop()
//     this.down(1)
//     return node
//   }
//   swap(i, j) {
//     ;[this.data[i], this.data[j]] = [this.data[j], this.data[i]]
//   }
// }

// let arr = [3, 1, 4, 6, 2, 7, 9, 8, 0, 5]

// const pq = new PriorityQueue(arr, (a, b) => a - b < 0)
// console.log('pq', pq)
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())
// console.log(pq.pop())

// const map = new Map([
//   ['I', 1],
//   ['V', 5],
//   ['X', 10],
//   ['L', 50],
//   ['C', 100],
//   ['D', 500],
//   ['M', 1000]
// ])
// console.log(map)

// function quickSort(nums, l, r) {
//   if (l >= r) return
//   const partitionIndex = partition(nums, l, r)
//   quickSort(nums, l, partitionIndex - 1)
//   quickSort(nums, partitionIndex + 1, r)
// }
// const partition = (nums, l, r) => {
//   const randomIndex = Math.floor(l + Math.random() * (r - l))

//   ;[nums[l], nums[randomIndex]] = [nums[randomIndex], nums[l]]
//   const pivot = nums[l]
//   let i = l + 1,
//     j = r
//   // 对基准之外的元素进行交换，让左边的都小于基准，右边的都大于基准
//   while (i < j) {
//     while (nums[i] <= pivot && i < r) {
//       i++
//     }
//     while (nums[j] >= pivot && j > l) {
//       j--
//     }
//     if (i >= j) break
//     ;[nums[i], nums[j]] = [nums[j], nums[i]]
//   }
//   // 把基准元素放到正确的位置
//   ;[nums[l], nums[i]] = [nums[i], nums[l]]
//   return i
// }

function quickSort(nums, l, r) {
  if (l >= r) return
  const partitionIndex = partition(nums, l, r)
  quickSort(nums, l, partitionIndex - 1)
  quickSort(nums, partitionIndex + 1, r)
}
const partition = (nums, l, r) => {
  const randomIndex = Math.floor(l + Math.random() * (r - l))
  // 与第一个交换
  ;[nums[l], nums[randomIndex]] = [nums[randomIndex], nums[l]]
  const pivot = nums[l]
  let i = l + 1,
    j = r
  while (i <= j) {
    while (nums[i] <= pivot && i < r) {
      i++
    }
    while (nums[j] > pivot && j > l) {
      j--
    }
    if (i >= j) break
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
  // 把基准元素放到正确的位置
  ;[nums[l], nums[j]] = [nums[j], nums[l]]
  return j
  // while (i < j) {
  //   while (i < j && nums[i] <= pivot) i++
  //   while (i < j && nums[j] >= pivot) j--
  //   ;[nums[i], nums[j]] = [nums[j], nums[i]]
  // }
  // // 当i和j相等时 要判断arr[j] 是否大于基准值, 是的话 j 就要减1
  // if (arr[j] > pivot) j--
  // ;[nums[l], nums[j]] = [nums[j], nums[l]]
  // return j
}

let arr = [2, 1, 9, 5, 3, 7, 6, 0, 8, 4, 0, 0, 4, 2, 6, 4, 7, 2]
quickSort(arr, 0, arr.length - 1)
console.log(arr)
