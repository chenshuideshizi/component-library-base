/**
 * 功能：脚本自动化引入 实现全局注册
 * 通过执行命令：npm run build:pck，生成的代码：
 */

/**
 * 生成代码示例：
 * import demo1 from './demo1/index.js
 * import demo2 from './demo2/index.js
 * 
 * const components = [
 *  demo1,
 *  demo2
 * ]
 * 
 * const install = function(Vue) {
 *  components.forEach(component => {
 *    Vue.component(component.name, component);
 *  });
 * }
 *
 * export default {
 *   install,
 *   demo1,
 *   demo2
 * }
 */

/**
 * 功能：脚本自动化引入 实现组件按需引入的步骤之一
 * 通过执行命令：npm run build:cp，生成的代码
 * 生成 packages 目录下 组件目录里的 index.js 文件
 */

/**
 * 生成代码示例
 * import MyButton from './index.vue';
 * MyButton.install = function (Vue) {
 *     Vue.component(MyButton.name, MyButton);
 * };
 * export default MyButton;
 */

const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const packagesRoot = path.resolve(__dirname, '../packages')
const rootPath = path.resolve(__dirname, '..')

// 1. 读取 packages 文件夹下的所有文件
const files = fs.readdirSync('./packages');
// 2. 过滤出所有的文件夹
const folders = files.filter(file => {
    const stat = fs.statSync(`${packagesRoot}/${file}`)
    return stat.isDirectory()
})

// 3. 把文件写入本地
const mainTemplate = `{{importList}}

const components = [
    {{componentList}}
]
 
const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default {
    install,
    {{componentList}}
}`

const importTemplate = 'import {{ComponentName}} from \'../packages/{{ComponentFolderName}}/index.vue\';';

const componentList = []
const importList = []
folders.forEach(folderName => {
    const componentName = _.upperFirst(_.camelCase(folderName))
    componentList.push(componentName)
    importList.push(importTemplate.replace(/\{\{ComponentName\}\}/g, componentName).replace(/\{\{ComponentFolderName\}\}/, folderName))
});

console.log('content', componentList.join(',\n'))
let content

content = mainTemplate.replace(/\{\{importList\}\}/g, importList.join('\n'))
                        .replace(/\{\{componentList\}\}/g, componentList.join(',\n'))

const p = `${rootPath}/src/index.js`
fs.writeFileSync(p, content);