### 基础之递归的思想

- 前中后续遍历

```js
function traversal(root) {
  // 前序遍历位置
  traversal(root.left);
  // 中序遍历位置
  traversal(root.right);
  // 后续遍历位置
}
```

**不同的遍历位置，有不同的作用，前序遍历自顶而下，能从函数参数中获取父节点传递来的数据，后续遍历自底向上，不仅可以获取函数参数数据，还可以获取到函数返回值传递回来的数据**

> 快速排序类似前序排序，归并排序类似后序排序

eg:

```js
// 前序遍历
function preorder = (root) {
  const res = []
  const traversal = (node) => {
    if(!node) return
    res.push(node.val) // 前序遍历位置
    traversal(node.left)
    traversal(node.right)
  }
  traversal(root)
  return res
}
```

迭代法

```js
// 前序 根左右
function preorder(root) {
  if (!root) return;
  const stack = [root],
    res = [];
  // 从根开始，右树先入栈，然后左树
  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return res;
}
// 中序
function inorder(root) {
  if (!root) return [];
  const stack = [],
    res = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    const node = stack.pop();
    res.push(node.val);
    if (node.right) root = node.right; // root 指针穿插入栈
  }
  return res;
}
// 后序
function postorder(root) {
  if (!root) return [];
  let stack = [],
    res = [],
    visited = null;
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    const node = stack.pop();
    // 如果右节点存在且没有被访问过，则该节点重新入栈
    if (node.right && visited !== node.right) {
      stack.push(node);
      root = node.right;
    } else {
      res.push(node.val);
      visited = node;
    }
  }
  return res;
}
```

前序迭代，因为从根开始，所以可以直接把左右树倒着入栈即可；
中序和后序，都是从‘左’开始，所以需要一个指针去寻找到最左子叶，同时经过的节点入栈，而且需要一个指针去穿插引到节点入栈；
后序，因为没办法直接拿到 sibling，而是回溯到父节点，通过父节点去拿，那么相比中序存在一个回溯的过程，可能从右回也可能从左回，所以需要另一个指针去记录是否访问过，未访问过，则父节点重新入栈，否则获取父节点的值(访问)。

- 层序遍历

```js
// 层序遍历利用队列，while遍历深度，for遍历每一层
// 遍历结果是一个二维数组，分别从左到右装着每一层的数据
function sequence(root) {
  const queue = [root],
    res = [];
  while (queue.length) {
    const size = queue.size; // 注意: 此处的size不改为在for循环中用queue.size,因为queue是在动态变化的
    res.push([]);
    for (let i = 0; i < size; ++i) {
      const node = queue.shift();
      res[res.length - 1].push(node.val);
      // 遍历每一层的同时，为下一层的队列做准备
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
}
```

### 练练手

[104.二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```js
// 法一：遍历整个树
function maxDepth(root) {
  if (!root) return 0;
  let depth = 0,
    ans = 0;
  const traversal = node => {
    if (!node) {
      ans = Math.max(depth, ans); // 到达叶节点，判断是否为最大深度
      return;
    }
    depth++; // 前序进入
    traversal(node.left);
    traversal(node.right);
    depth--; // 后续退出
  };
  traversal(root);
  return ans;
}
// 法二：分解为子树问题
function maxDepth(root) {
  if (!root) return 0;
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  return Math.max(leftDepth, rightDepth) + 1; // +1 是加上了自身
}
```

此题可以认识到，解决二叉树往往有两种最基本的方法：

- 遍历整个二叉树
- 分解为子树的问题

> 同时也应该看出，一般涉及到子树的问题，相关逻辑大部分都放在后序，后序就需要合理的返回值来做处理啦。

[543.二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

```js
var diameterOfBinaryTree = function (root) {
  let res = 0;
  const maxDep = node => {
    if (!node) return 0;
    const leftDep = maxDep(node.left);
    const rightDep = maxDep(node.right);
    res = Math.max(leftDep + rightDep, res);
    return Math.max(leftDep, rightDep) + 1;
  };
  maxDep(root);
  return res;
};
```

该题就是要转变下题目，实际上就是求*左右子树最大深度之和*
遇到子树问题，首先想到的是给函数设置返回值，然后在后序位置做文章。

### [更多题集](./题集.md)

