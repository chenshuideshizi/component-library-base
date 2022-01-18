import Demo1 from '../packages/demo1/index.vue';
import Demo2 from '../packages/demo2/index.vue';
import Demo3 from '../packages/demo3/index.vue';
import TabPane from '../packages/tab-pane/index.vue';
import Tabs from '../packages/tabs/index.vue';

const components = [
    Demo1,
Demo2,
Demo3,
TabPane,
Tabs
]
 
const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default {
    install,
    Demo1,
Demo2,
Demo3,
TabPane,
Tabs
}