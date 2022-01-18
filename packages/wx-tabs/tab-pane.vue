<template>
  <div class="wx-tab-pane" v-show="active">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WxTabPane',
    componentName: 'WxTabPane',
    props: {
      label: String,
      name: String
    },

    data() {
      return {
        loaded: false
      };
    },

    computed: {
      active() {
        const active = this.$parent.currentName === this.name
        if (active) {
          this.loaded = true;
        }
        return active;
      },
      paneName() {
        return this.name
      }
    }
  };
</script>
