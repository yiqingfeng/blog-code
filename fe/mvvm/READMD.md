## 实现一个简易的 MVVM 双向数据绑定

在手写双向数据绑定之前，

所谓双向数据绑定，即视图和数据之间，当一方发生变化时，另一方也会随之变化。

### 实现思路

https://github.com/DMQ/mvvm
https://juejin.im/post/5b578682f265da0f504a5c6d

1. 数据劫持，通过 Observer 监听 $data 数据变化

![](https://user-gold-cdn.xitu.io/2018/7/25/164cde75b446f4a4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


- 利用 `Observer` 进行数据劫持，监听 Data 各个 key 值的数据变更情况
- 利用 `Dependence` 发布订阅
- 利用 `Watcher` 进行数据监听
- 利用 `Compile` 进行模板编译


实现MVVM需要实现的点：

- 数据监听
- DOM编译
- 依赖收集