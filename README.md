# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

重构建议：
1. 直接使用layout
    本来我是觉得搞个赛果收集这个平台用不上layout的，后来写着写着想想把其他功能也加上吧，于是需要header，数据多了需要分开展示，于是有了侧边栏，最后发现不好看，要有个footer兜底。但是已经手撸完所有组件样式了，不想动了

2. 有多个组件重复，比如work（工作人员）和schedule（赛事安排）本质上是一个页面，没时间重构了
3. 没有统一封装接口，比较难维护
4. 部分数据，例如定义的样式之类的很多写在组件里了，应统一封装处理，按需调用
5. 建议重写