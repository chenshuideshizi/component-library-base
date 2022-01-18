
import Demo1 from './index.vue';
Demo1.install = function (Vue) {
    Vue.component(Demo1.name, Demo1);
};
export default Demo1;