<template>
    
</template>

<script>
export default {
    name: 'WxTabs',
    methods: {
        // 获取所有的 panel 实例
        calcPaneInstances() {
            if (this.$slots.default) {
                // 获取所有的 WxTabPane 组件
                const paneSlots = this.$slots.default.filter(vnode => {
                    if (vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'WxTabPane') {
                        return true
                    }
                    return false
                });

                // 获取所有的 WxTabPanel 实例
                const panes = paneSlots.map(({ componentInstance }) => componentInstance); // 
                // const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]));
                // if (isForceUpdate || panesChanged) {
                //     this.panes = panes;
                // }
                // } else if (this.panes.length !== 0) {
                // this.panes = [];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>