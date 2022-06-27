### 核心

动态规划一般就是求最值，求最值的最直观思路那就是穷举，然后找到最好的呗，但就是这么个过程在计算机领域缺并不那么简单，回溯算法算一种，动态规划就是另一种。

动规三大件：

- 重叠子问题
- 最优子结构
- 状态转移方程

> 辅助写出状态转移方程：明确 base case -> 明确「状态」-> 明确「选择」 -> 定义 dp **数组/函数**的含义。

```js
// 思路1: 自顶向下的动态规划
function dp(staus1, ...other_staus) {
  for (const 选择 of 所有可能的选择) {
    // 状态因为选择而发生了改变
    result = 求最值(result, dp(status1, ...otherStatus))
  }
  return result
}

// 思路2: 自底向上的动态规划
const dp[0][0][...maybe] = base case
for(const 状态1 of 状态1中的所有取值) {
  for(const 状态2 of 状态2中的所有取值) {
    //...其他状态for循环
    dp[状态1][状态2][...] = 求最值(选择1，选择2...)
  }
}
```

[322.零钱兑换](https://leetcode.cn/problems/coin-change/)

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // 思考，很明显变化的是count 设定dp状态转移为 dp[i] = dp[i-1] + 1
  // 定义dp数组,amount的变化, 注意这里不是1,2,3...的变化,而是根据硬币的数值产生变化!!!
  const dp = new Array(amount + 1).fill(amount + 1)
  // base case
  dp[0] = 0
  // 遍历 ---> 状态 dp
  for (let i = 0; i < dp.length; ++i) {
    // 没有别的状态了,开始做选择
    for (const coin of coins) {
      // 子问题无解 跳过
      if (i - coin < 0) continue
      dp[i] = Math.min(dp[i], dp[i - coin] + 1)
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount]
}
```

> 为啥 dp 数组中的值都初始化为 amount + 1 呢，因为凑成 amount 金额的硬币数最多只可能等于 amount（全用 1 元面值的硬币），所以初始化为 amount + 1 就相当于初始化为正无穷，便于后续取最小值。
