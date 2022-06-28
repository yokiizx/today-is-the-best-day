[最优子结构原理和 DP 数组遍历方向](https://labuladong.github.io/algo/3/23/68/)

![最优子结构和dp方向-2022-06-27](https://raw.githubusercontent.com/yokiizx/picgo/main/images/%E6%9C%80%E4%BC%98%E5%AD%90%E7%BB%93%E6%9E%84%E5%92%8Cdp%E6%96%B9%E5%90%91-2022-06-27.png)

[72.编辑距离](https://leetcode.cn/problems/edit-distance/)

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  // 思路，基本常规，比较两个字符串大概率是要使用两个指针，来会比较
  // 这道题比较含蓄的就是状态和选择不是特别明确,但是也有点明确
  // 首先选择算是比较明确的, 就三个 插入,删除和替换
  // 状态呢, 既然用指针了, 那大概率也是跟指针相关的吧dp[i][j]这样子

  // 最后可以添加备忘录优化

  // 开干，定义dp[i][j]为 word1[0..i] 和 word2[0..j] 的最小编辑距离是 dp[i+1][j+1]
  const m = word1.length,
    n = word2.length
  const dp = Array.from(new Array(m + 1), _ => new Array(n + 1))
  // base case 当一方为0的时候,另一方需要操作的次数
  for (let i = 0; i <= m; ++i) {
    dp[i][0] = i
  }
  for (let j = 0; j <= n; ++j) {
    dp[0][j] = j
  }

  // 两个指针 遍历状态
  for (let i = 1; i <= m; ++i) {
    for (let j = 1; j <= n; ++j) {
      // 处理选择
      // 选择的先决条件是两个字符不相等,先处理先决条件
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] // 这里同时移动指针切不需要进行操作
      } else {
        // 看看插入,删除和替换哪个的操作步骤最少 然后+1
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1)
      }
    }
  }

  return dp[m][n]
}
```

[64.最小路径和](https://leetcode.cn/problems/minimum-path-sum/)

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  // 思路, 向下或向右 是选择 状态就是 每个格子的最小值, 对应的就是dp[i][j]
  const m = grid.length,
    n = grid[0].length
  const dp = Array.from(new Array(m), _ => new Array(n))
  // base case
  dp[0][0] = grid[0][0]
  for (let i = 1; i < m; ++i) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }
  for (let j = 1; j < n; ++j) {
    dp[0][j] = dp[0][j - 1] + grid[0][j]
  }

  // 状态
  for (let i = 1; i < m; ++i) {
    for (let j = 1; j < n; ++j) {
      // 选择
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }

  return dp[m - 1][n - 1]
}
```

### 加餐 遍历方向

二维数组 正向, 竖向, 反向, **斜向**遍历

```js
const arr = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]

const forwardTraverse = arr => {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr[0].length; ++j) {
      console.log(arr[i][j])
    }
  }
}

// forwardTraverse(arr)

const virticalTraverse = arr => {
  for (let i = 0; i < arr[0].length; ++i) {
    for (let j = 0; j < arr.length; ++j) {
      console.log(arr[j][i])
    }
  }
}

// virticalTraverse(arr)

const backTraverse = arr => {
  for (let i = arr.length - 1; i >= 0; --i) {
    for (let j = arr[0].length - 1; j >= 0; --j) {
      console.log(arr[i][j])
    }
  }
}

// backTraverse(arr)

// 一般斜着遍历是针对 n * n 的二维数组
const slantedTraverse = n => {
  // l代表从第几条斜线 相比纵坐标偏移了1 (若不包括对角线,则 l=2 )
  for (let l = 1; l <= n; ++l) {
    for (let i = 0; i <= n - l; ++i) {
      const j = l + i - 1
      console.log(arr[i][j])
    }
  }
}

slantedTraverse(4)
```
