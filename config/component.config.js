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

const packagesRoot = path.resolve(__dirname, '../packages')

// 1. 读取 packages 文件夹下的所有文件
const files = fs.readdirSync('./packages');
// 2. 过滤出所有的文件夹
const folders = files.filter(file => {
    const stat = fs.statSync(`${packagesRoot}/${file}`)
    return stat.isDirectory()
})

// 3. 把文件写入本地
folders.forEach(folderName => {
    const mainTemplate=`
import {{Component}} from \'./index.vue\';
{{Component}}.install = function (Vue) {
    Vue.component({{Component}}.name, {{Component}});
};
export default {{Component}};`


    const content = mainTemplate.replace(/\{\{Component\}\}/g, folderName)
    const p = `${packagesRoot}/${folderName}/index.js`
    fs.writeFileSync(p, content);
});