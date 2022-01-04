import demo1 from './packages/demo1/index.vue';
import demo2 from './packages/demo2/index.vue';
import demo3 from './packages/demo3/index.vue';
import demo4 from './packages/demo4/index.vue';

const components = [
    demo1,
demo2,
demo3,
demo4
]
 
const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default {
    install,
    demo1,
demo2,
demo3,
demo4
}