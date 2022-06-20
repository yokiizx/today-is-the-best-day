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
  const visited = [] // 避免走回头路

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
    visited = new Set()
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

### todo 双向 BFS 优化

[labudalong 双向 BFS 优化](https://labuladong.github.io/algo/4/29/109/)
