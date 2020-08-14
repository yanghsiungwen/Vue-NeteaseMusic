<!--
  切换
  @author yang 2020-7-13
-->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Toggle',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    reserveDoms: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    hasParent(dom, parentDom) {
      parentDom = Array.isArray(parentDom) ? parentDom : [parentDom]
      while (dom) {
        if (parentDom.find((p) => p === dom)) {
          return true
        } else {
          dom = dom.parentNode
        }
      }
    },
    clickEvent(e) {
      const triggerElement = e.target
      // 触发点击事件的dom是否是playlist的子节点
      const firstChildElm = this.$slots.default[0].elm
      const defaultReserveDoms = Array.from(
        document.querySelectorAll('.ivu-spin')
      )
      const reserves = defaultReserveDoms.concat(firstChildElm)
      if (!this.hasParent(triggerElement, reserves.concat(this.reserveDoms))) {
        this.$emit('update:show', false)
      }
    },
    bindClick() {
      document.addEventListener('mousedown', this.clickEvent)
    },
    removeClick() {
      document.removeEventListener('mousedown', this.clickEvent)
    },
  },
  watch: {
    show(newShow) {
      setTimeout(() => {
        if (newShow) {
          this.bindClick()
        } else {
          this.removeClick()
        }
      }, 0)
    },
  },
  beforeDestroy() {
    this.removeClick()
  },
}
</script>

<style scoped>
</style>
