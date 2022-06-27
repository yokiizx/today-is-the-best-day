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
