[nsum 问题](https://mp.weixin.qq.com/s/fSyJVvggxHq28a0SdmZm6Q)

处理 nsum 的主题思想还是 排序+双指针

```js
// nSum求解
function nSumTarget(nums, n, start, target) {
  const res = []
  const len = nums.length
  // 边界条件排除
  if (n < 2 || len < n) return res
  if (n === 2) {
    // 双指针那套
    let l = start,
      r = len - 1
    while (l < r) {
      const left = nums[l],
        right = nums[r]
      const sum = left + right
      if (sum === target) {
        res.push([left, right])
        // && 后是为了跳过相同的元素，防止重复
        while (l < r && nums[l] === left) l++
        while (l < r && nums[r] === right) r--
      } else if (sum < target) {
        while (l < r && nums[l] === left) l++
      } else {
        while (l < r && nums[r] === right) r--
      }
    }
  } else {
    // 递归寻找target
    for (let i = start; i < len; ++i) {
      const sub = nSumTarget(nums, n - 1, i + 1, target - nums[i])
      for (let arr of sub) {
        arr.push(nums[i]) // 符合的子sum加上当前nums[i] 就是一种组合
        res.push(arr) // 把合规的组合都放入结果集中
      }
      while (i < len - 1 && nums[i] === nums[i + 1]) i++ // 相同的num过滤防止重复
    }
  }
  return res
}
```
