function monotonicStack(nums) {
  const n = nums.length
  const stack = [],
    res = new Array(n)
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && nums[i] >= stack[stack.length - 1]) {
      stack.pop()
    }
    res[i] = stack.length === 0 ? -1 : stack[stack.length - 1]
    stack.push(nums[i])
  }
  return res
}