/**
 * v-clickoutside
 * @desc 点击元素外面才触发的事件
 * @example
 * <div v-element-clickoutside="handleClose></div>"
 */

// 命名空间（必须比较特殊，防止和其它特性重名）
const clickoutsideContext = '@@clickoutsideContext'

// 自定义指令(vue官方文档)
export default {
  bind(el, binding, vnode) {
    const documentHandler = function (e) {
      if (vnode.context && !el.contains(e.target)) { // vnode.context 相当于是当前组件实例
        vnode.context[el[clickoutsideContext].methodName]() // 从实例中查找出方法，并触发自定义指令的函数，这里是 hideShow()
      }
      // console.log(el[clickoutsideContext])
      // console.log(vnode.context)
    }
    el[clickoutsideContext] = {
      documentHandler,
      methodName: binding.expression,
      arg: binding.arg || 'click'
    }
    document.addEventListener(el[clickoutsideContext].arg, documentHandler)
  },

  update(el, binding) {
    el[clickoutsideContext].methodName = binding.expression
  },

  unbind(el) {
    document.removeEventListener(el[clickoutsideContext].arg, el[clickoutsideContext].documentHandler)
  },

  install(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind
    })
  }
}
