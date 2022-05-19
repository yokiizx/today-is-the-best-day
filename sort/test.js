
const arr = [2, 1, 5, 6, 7, 3, 4, 9, 8, 888, 8];

function bubble (nums) {
  for (let i = 0; i < nums.length; i++) {
    let sorted = true
    for (let j = i; j < nums.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        sorted = false // 几轮比较后当没有进入,说明已经排好序了
      }
    }
    if (sorted) break
  }
}

// bubble(arr)

function insert (nums) {
  // 第一个已经排好序了,从第二个开始
  for (let i = 1; i < nums.length; i++) {
    let prev = i - 1, num = nums[i]; // 指针，和当次需要排序的元素
    while (prev >= 0 && nums[prev] > num) {
      nums[prev + 1] = nums[prev] // 排好的元素后移
      prev--
    }
    nums[prev + 1] = num
  }
}

// insert(arr)
function select (nums) {
  // 最后一项没有必要比较
  for (let i = 0; i < nums.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[minIndex] > nums[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [nums[minIndex], nums[i]] = [nums[i], nums[minIndex]]
    }
  }
}
// select(arr)

// 快速排序就是二叉树的前序遍历。
// 便于理解的简单写法
function quickSort (nums, l, r) {
  if (l >= r) return
  const index = partition(nums, l, r)
  console.log('index', index);
  quickSort(nums, l, index - 1)
  quickSort(nums, index, r)
}
// 一次排序，随机选择一个数作为基准，大于放右，小于放左，这样就确定了该基数的位置，对两边做相同的操作
// 这里利用双指针进行操作
const partition = (nums, l, r) => {
  // 注意随机索引的设置，+1和+l都是必须的
  const randomIndex = l + Math.floor(Math.random() * (r - l + 1))
  console.log('randomIndex', randomIndex);
  const pivot = nums[randomIndex]
  let lt = l, gt = r
  while (lt <= gt) {
    while (nums[lt] < pivot) {
      lt++
    }
    while (nums[gt] > pivot) {
      gt--
    }
    if (lt <= gt) {
      [nums[lt], nums[gt]] = [nums[gt], nums[lt]]
      lt++
      gt--
    }
  }
  return lt
}

// 便于理解的简单写法
// 归并排序就是二叉树的后序遍历
// function mergeSort (arr) {
//   // 分 -- 不断递归二分直到数组长度为1后合并
//   const n = arr.length;
//   if (n == 1) {
//     return arr;
//   }
//   const mid = Math.floor(n / 2),
//     left = arr.slice(0, mid),
//     right = arr.slice(mid);
//   return merge(mergeSort(left), mergeSort(right)); // 调用两次递归
// }

// // 归 -- 用两个指针顺序合并两个小数组到大数组中
// function merge (left, right) {
//   let result = [],
//     i = 0,
//     j = 0;
//   // 两个小数组做比较顺次进入结果集中
//   while (i < left.length && j < right.length) {
//     if (left[i] > right[j]) {
//       result.push(right[j++]);
//     } else {
//       result.push(left[i++]);
//     }
//   }
//   // 上面处理完了某一个小数组, 处理剩下的另外一个数组
//   while (i < left.length) {
//     result.push(left[i++]);
//   }
//   while (j < right.length) {
//     result.push(right[j++]);
//   }
//   return result;
// }
function mergeSort (nums) {
  // 定义: 对nums[l..r]排序后进行合并
  const sort = (nums, l, r) => {
    if (l === r) return // 单个元素不用排序
    const mid = Math.floor(l + (r - l) / 2)
    sort(nums, l, mid)
    sort(nums, mid + 1, r)
    merge(nums, l, mid, r)
  }
  const merge = (nums, l, mid, r) => {
    // 辅助合并
    const temp = []
    // 对数组进行一次深拷贝，便于后续合并时直接存入原nums中
    for (let i = 0; i <= r; i++) {
      temp[i] = nums[i]
    }
    // 双指针合并两个有序数组
    let i = l, j = mid + 1;
    for (let p = l; p <= r; p++) {


      // if (i === mid + 1) {
      //   // 左边加完了,右边按序加入
      //   console.log(1)
      //   nums[p] = temp[j++]
      // } else if (j === r + 1) {
      //   console.log(2)

      //   // 左边加完了,右边按序加入
      //   nums[p] = temp[i++]
      // } else if (temp[i] > temp[j]) {
      //   console.log(3)

      //   nums[p] = temp[j++]
      // } else {
      //   console.log(4)

      //   nums[p] = temp[i++]
      // }

      if (temp[i] > temp[j]) {
        console.log(3)
        nums[p] = temp[j++]
      } else if (i === mid + 1) {
        console.log(1)
        nums[p] = temp[j++]
      } else if (j === r + 1) {
        console.log(2)
        nums[p] = temp[i++]
      } else if (temp[i] <= temp[j]) {
        console.log(4)
        nums[p] = temp[i++]
      }
    }
  }
  sort(nums, 0, nums.length - 1)
}


let arr1 = [-1, 2, -8, -10, 8, 3]
mergeSort(arr1)
// quickSort(arr1, 0, arr1.length - 1)
console.log('--1', arr1)
