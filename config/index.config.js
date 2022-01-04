/**
 * 功能：脚本自动化引入 实现组件按需引入的步骤之一
 * 通过执行命令：npm run build:cp，生成的代码
 * 生成 packages 目录下 组件目录里的 index.js 文件
 * 
 * 代码示例:
 * import demo from './index.vue'
 * demo.install = function (Vue) {
 *  Vue.component(demo.name, demo)
 * }
 * export default demo
 */

const fs = require('fs')
const path = require('path')
var endOfLine = require('os').EOL; // ???
const render = require('json-templater/string'); // 这个包4年没有更新

const IMPORT_TEMPLATE='import {{name}} from \'./index.vue\';';
const USE_TEMPLATE='Vue.component({{name}}, {{component}});';
const MAIN_TEMPLATE=`{{include}}
{{component}}.install = function (Vue) {
    {{list}}
};
export default {{component}};
`

const files = fs.readdirSync('./packages');

console.log('files', files)
const folder = files.slice(0,-1)

console.log('folder', folder)


const includeComponentTemplate = [];
const listComponentTemplate =[];

const writeFile = function ( file, include, list){
    const p=path.resolve(__dirname,`../packages/${file}/index.js`);
    fs.writeFileSync(p,render(MAIN_TEMPLATE,{
        include:include,
        list: list,
        component:file
    }));
}

folder.forEach((item)=>{
    const include=render(IMPORT_TEMPLATE,{
        name: item,
        component: item,
    });
    const list = render(USE_TEMPLATE,{
        name:item,
        component:item,
    });
    writeFile(item,include,list);
});