
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
function quickSort (nums, l, r) {
  if (l >= r) return
  const index = partition(nums, l, r)
  quickSort(nums, l, index - 1)
  quickSort(nums, index + 1, r)
}
// 一次排序，随机选择一个数作为基准，大于放右，小于放左，这样就确定了该基数的位置，对两边做相同的操作
// 这里利用双指针进行操作
const partition = (nums, l, r) => {
  // 注意随机索引的设置，+1和+l都是必须的
  const randomIndex = Math.floor(Math.random() * (r - l + 1)) + l
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

// 归并排序就是二叉树的后序遍历
function merge (nums) {

}

function shell (params) {

}

let arr1 = [-1,2,-8,-10]
quickSort(arr1, 0, arr1.length - 1)
console.log('--', arr1)
