### BFS

一般来说，我们写 BFS 算法都是用「队列」这种数据结构，每次将一个节点周围的所有节点加入队列。

BFS 相对 DFS 的最主要的区别是：**BFS 找到的路径一定是最短的，但代价就是空间复杂度可能比 DFS 大很多**

先举例一下 BFS 出现的常见场景好吧，问题的本质就是让你在一幅「图」中找到从起点 start 到终点 target 的最近距离，这个例子听起来很枯燥，但是 BFS 算法问题其实都是在干这个事儿

#### 框架

```js
/**
 * @desc    BFS 计算从起点 start 到终点 target 的最近距离
 * @param   {Node} start
 * @param   {Node} target
 */
function bfs(start, target) {
  const queue = [] // 核心数据结构
  const visited = [] // 有时候用set 避免走回头路

  queue.push(start) // 将起点加入队列
  visited.push(start)

  let step = 0 // 记录扩散的步数

  while (queue.length) {
    const size = queue.length
    /* 将当前队列中的所有节点向四周扩散 */
    for (let i = 0; i < size; ++i) {
      const curr = queue.shift()
      /* 划重点：这里判断是否到达终点 */
      if (curr === target) return step

      /* 将 cur 的相邻节点加入队列 */
      // for (let x of curr的相邻节点) {
      //     if (!visited.includes(x)) {
      //         q.offer(x)
      //         visited.add(x)
      //     }
      // }
    }
    /* 划重点：更新步数在这里 */
    step++
  }
}
```

> 其实就是没找到结果就会一直 while 迭代下去，在 for 循环当前层时找到了就会在当前层 return，没找到就招下一层去 step++
> curr 的相邻节点泛指相邻节点，比如说二维数组中，cur 上下左右四面的位置就是相邻节点

#### 试一试

[111.二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

核心思路：
显然起点就是 root 根节点，终点就是最靠近根节点的那个「叶子节点」嘛，叶子节点就是两个子节点都是 null 的节点

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (root === null) return 0
  const queue = [root]
  let minDepth = 1
  while (queue.length) {
    const size = queue.length
    for (let i = 0; i < size; ++i) {
      const node = queue.shift()
      if (node.left === node.right) return minDepth
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    minDepth++
  }
  return minDepth
}
```

> while 循环控制一层一层往下走，for 循环利用 size 变量控制从左到右遍历每一层二叉树节点

#### 心得

1、为什么 BFS 可以找到最短距离，DFS 不行吗？

首先，你看 BFS 的逻辑，depth 每增加一次，队列中的所有节点都向前迈一步，这保证了第一次到达终点的时候，走的步数是最少的。

DFS 不能找最短路径吗？其实也是可以的，但是时间复杂度相对高很多。你想啊，DFS 实际上是靠递归的堆栈记录走过的路径，你要找到最短路径，肯定得把二叉树中所有树杈都探索完才能对比出最短的路径有多长对不对？而 BFS 借助队列做到一次一步「齐头并进」，是可以在不遍历完整棵树的条件下找到最短距离的。

形象点说，DFS 是线，BFS 是面；DFS 是单打独斗，BFS 是集体行动。这个应该比较容易理解吧。

2、既然 BFS 那么好，为啥 DFS 还要存在？

BFS 可以找到最短距离，但是空间复杂度高，而 DFS 的空间复杂度较低。

还是拿刚才我们处理二叉树问题的例子，假设给你的这个二叉树是满二叉树，节点数为 N，对于 DFS 算法来说，空间复杂度无非就是递归堆栈，最坏情况下顶多就是树的高度，也就是 O(logN)。
但是你想想 BFS 算法，队列中每次都会储存着二叉树一层的节点，这样的话最坏情况下空间复杂度应该是树的最底层节点的数量，也就是 N/2，用 Big O 表示的话也就是 O(N)。

由此观之，BFS 还是有代价的，一般来说在找最短路径的时候使用 BFS，其他时候还是 DFS 使用得多一些（主要是递归代码好写）。

#### 继续试一试

[752.打开转盘锁](https://leetcode.cn/problems/open-the-lock/)

```js
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  let queue = [],
    visited = new Set() // 使用set
  let step = 0
  queue.push('0000')
  visited.add('0000')
  while (queue.length) {
    const size = queue.length
    // 向四周扩散, 这里是重点, 怎么扩散...每个都能上下转动,那么就是一共有8中情况
    for (let i = 0; i < size; ++i) {
      // 判断是否到达目标, 注意 另一个需要判断是否为死亡数组, 若是, 跳过这一层的遍历
      const str = queue.shift()
      // console.log(str)
      if (deadends.includes(str)) continue
      if (str === target) return step

      // 给相邻兄弟们加入队列, 先实现一下加一减一方法
      for (let j = 0; j < 4; ++j) {
        const up = plusOne(str, j)
        if (!visited.has(up)) {
          queue.push(up)
          visited.add(up)
        }
        const down = minusOne(str, j)
        if (!visited.has(down)) {
          queue.push(down)
          visited.add(down)
        }
      }
    }
    step++
  }
  return -1
}

const plusOne = (str, j) => {
  let arr = str.split('')
  if (arr[j] == 9) {
    arr[j] = 0
  } else {
    arr[j]++
  }
  return arr.join('')
}
const minusOne = (str, j) => {
  let arr = str.split('')
  if (arr[j] == 0) {
    arr[j] = 9
  } else {
    arr[j]--
  }
  return arr.join('')
}
```

[773.滑动谜题](https://leetcode.cn/problems/sliding-puzzle/)

对于这种计算最小步数的问题，我们就要敏感地想到 BFS 算法。

这个题目转化成 BFS 问题是有一些技巧的，我们面临如下问题：
1、一般的 BFS 算法，是从一个起点 start 开始，向终点 target 进行寻路，但是拼图问题不是在寻路，而是在不断交换数字，这应该怎么转化成 BFS 算法问题呢？
2、即便这个问题能够转化成 BFS 问题，如何处理起点 start 和终点 target？它们都是数组哎，把数组放进队列，套 BFS 框架，想想就比较麻烦且低效。
首先回答第一个问题，BFS 算法并不只是一个寻路算法，而是一种暴力搜索算法，只要涉及暴力穷举的问题，BFS 就可以用，而且可以最快地找到答案。
第二个问题：这里的 board 仅仅是 2x3 的二维数组，所以可以压缩成一个一维字符串。其中比较有技巧性的点在于，二维数组有「上下左右」的概念，压缩成一维后，如何得到某一个索引上下左右的索引？

如何穷举出 board 当前局面下可能衍生出的所有局面？这就简单了，看数字 0 的位置呗，和上下左右的数字进行交换就行了：

```js
/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
  // 求最短步数, 大概率是可以用BFS来求解了。难点在于怎么转换成BFS的思路
  // 转换一下: 1. start为一个m*n的初始字符串, target为'123450
  // 2. 扩散条件为 0 的可扩散方向 即 上下左右, 交换即可, 因此需要记录一维字符串的相邻索引
  const initialStr = board.reduce((t, v) => t + v.join(''), '')
  // 因为是2*3就直接写了,如果是比较大就需要借助initialStr了
  const neighbor = [
    [1, 3],
    [0, 2, 4],
    [1, 5],
    [0, 4],
    [1, 3, 5],
    [2, 4]
  ]

  // 开始BFS
  const queue = [initialStr],
    visited = [initialStr]
  let step = 0
  while (queue.length) {
    const size = queue.length
    for (let i = 0; i < size; ++i) {
      const str = queue.shift()
      if (str === '123450') return step
      // 找到str中0的位置, 然后扩散, 交换产生新字符加入队列
      const zeroIndex = str.indexOf('0')
      for (const dir of neighbor[zeroIndex]) {
        const swap_dir = swap(str, dir, zeroIndex)
        if (!visited.includes(swap_dir)) {
          queue.push(swap_dir)
          visited.push(swap_dir)
        }
      }
    }
    step++
  }
  return -1
}

function swap(str, i, j) {
  const arr = str.split('')
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
  return arr.join('')
}
```

![BFS-2022-06-20](https://raw.githubusercontent.com/yokiizx/picgo/main/images/BFS-2022-06-20.png)

### TODO 双向 BFS 优化

[labudalong 双向 BFS 优化](https://labuladong.github.io/algo/4/29/109/)
