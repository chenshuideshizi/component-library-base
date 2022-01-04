
import demo1 from './index.vue';
demo1.install = function (Vue) {
    Vue.component(demo1, demo1);
};
export default demo1;
