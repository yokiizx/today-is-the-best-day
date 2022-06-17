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

const arr = [1, 2, 3, 4, 5]

function logReverse(arr, n) {
  if (n < 0) return
  console.log('前--', arr[n])
  logReverse(arr, n - 1)
  console.log('后====', arr[n])
}

logReverse(arr, arr.length - 1)
