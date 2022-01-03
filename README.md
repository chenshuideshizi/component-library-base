# 组件库搭建

**学习目标**

- 通过什么方式进行项目管理   - lerna
- 如何搭建组件库的demo环境  
- 如何搭建组件库的开发环境
- 如何搭建组件库编译打包生成资源的存放位置
- 自动化将组件注册为全局组件
- 如何实现按需引入
- 约束规范
- 如何将一个组件库发布到npm上

初始化Lerna项目 ```lerna init```

补全目录

```
DDMC-UI /
  config /  
  example / 
      app.js
      index.html
  packages /
      demo1 /
          index.vue
          index.js
      demo2 /
          index.vue
          index.js
      index.js
  src /
      utils /
      common /
  package.json
  lerna.json
```


babel-plugin-import 可以实现自动按需加载

具体配置

```js
// .babelrc
{
    ...
    "plugins":[
        "import", {
            "libraryName": "xxx-ui",
        }
    ]
}
```

### 二、约束规范

规范除了书面上的阐述外，还需要一些自动化的、强制性的约束

- husky 给GIT提交添加钩子执行一些我们需要做的验证，并执行一些脚本去验证代码是否有问题是否规范。

- lint-staged 是一个在git暂存文件上运行linters的工具。可以搭配husky进行git commit前的代码校验。

- commitlint 提交信息校验，基于以上的两个工具包，我们有能力在Git的钩子里做一些事情。首先不得不提的是代码的提交规范和规范的校验，优雅的提交方便团队协作和快速定位问题。
    - 一般GIT比较常见的提交格式规范是：<type>: <subject>。

#### 实现约束规范的过程：

**安装**

```
npm install -D husky lint-staged
```

**初始化**

```js
npx husky install
npx husky add .husky/pre-commit "npm run test"
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

**package.json配置**

```
"lint-staged": { "src/* */* .{js,json,vue,ts,tsx}": [ "npm run lint" ] }
```

**新建commitlint.js**

```
module.exports = { extends: ['@commitlint/config-conventional'] }
```

### 三、将一个组件库发布到npm上

在ackage.json配置：

配置组件库名称

{
  "name": "foxit-ui"
}

将组件库设置为公开

{
   "private": true
}

配置关键词、描述、作者

{
  "description": "XXX 组件库",
  "keywords": [
    "element",
    "vue",
    "ddmc-ui"
  ],
  "author": "hhl"
}

配置主入口文件地址


{
  "main": "lib/index/index.js"
}

设置忽略文件，减少依赖包大小

根目录下创建一个  .npmignore 文件中把没必要发布的资源忽略掉，减少依赖包大小

### 四、关于优化

从webpack配置进行优化

- 删除无用的css样式
- 将打包后的图片进行压缩
- CDN加载文件
- 过滤第三方包。比如vue，vuex之类的。使用webpack的externals选项。externals来防止这些依赖包被打包
- tree-shaking ：没有用的代码剔除掉等。后续会慢慢迭代项目优化这块
- happypack 多线程打包，可以将不同的逻辑交给不同的线程来处理
- DllReferencePlugin 和 DllPlugin提前打包，大幅度提升构建速度
- 动态加载 通过import引入文件：添加webpackChunkName字段，webpack配置output选项