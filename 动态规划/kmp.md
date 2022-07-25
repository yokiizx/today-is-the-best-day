[kmp 讲解](https://labuladong.github.io/algo/3/28/97/)

KMP 算法永不回退 txt 的指针 i，不走回头路（不会重复扫描 txt），而是借助 dp 数组中储存的信息把 pat 移到正确的位置继续匹配，时间复杂度只需 O(N)，用空间换时间
