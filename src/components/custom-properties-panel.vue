<template>
  <div class="containers">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
  </div>
</template>

<script>
// 引入相关的依赖
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import { xmlStr } from '../mock/xmlStr'
import propertiesProviderModule from './custom/ImportJS/onlyPropertiesProvider'
import magicModdleDescriptor from './custom/descriptors/magic'
export default {
  name: '',
  components: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted() {
    this.init()
  },
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null
    }
  },
  // 方法集合
  methods: {
    init() {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas
      // 建模
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        //添加控制板
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [propertiesPanelModule, propertiesProviderModule],
        moddleExtensions: {
          magic: magicModdleDescriptor
        }
      })
      this.createNewDiagram()
    },
    createNewDiagram() {
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(xmlStr, err => {
        if (err) {
          // console.error(err)
        } else {
          // 这里是成功之后的回调, 可以在这里做一系列事情
          this.success()
        }
      })
    },
    success() {
      // console.log('创建成功!')
      this.addModelerListener()
      this.addEventBusListener()
    },
    addModelerListener() {
      // 监听 modeler
      const bpmnjs = this.bpmnModeler
      const that = this
      // 'shape.removed', 'connect.end', 'connect.move'
      const events = ['shape.added', 'element.updateLabel']
      events.forEach(function(event) {
        that.bpmnModeler.on(event, e => {
          var elementRegistry = bpmnjs.get('elementRegistry')
          var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
          // console.log(shape)
          if (event === 'shape.added') {
            console.log('新增了shape')
          } else if (event === 'shape.move.end') {
            console.log('移动了shape')
          } else if (event === 'shape.removed') {
            console.log('删除了shape')
          } else if (event === 'element.updateLabel') {
            console.log('element.updateLabel', e.element)
          }
        })
      })
    },
    addEventBusListener() {
      // 监听 element
      let that = this
      const eventBus = this.bpmnModeler.get('eventBus')
      const modeling = this.bpmnModeler.get('modeling')
      const elementRegistry = this.bpmnModeler.get('elementRegistry')
      // console.log(Object.keys(eventBus._listeners))
      // const eventTypes = ['element.click', 'element.changed']
      // const eventTypes = Object.keys(eventBus._listeners)
      const eventTypes = ['directEditing.activate', 'directEditing.complete']
      // const eventTypes = ['interactionEvents.updateHit', 'directEditing.complete']
      console.log(elementRegistry.getAll('bpmn:StartEvent'))
      eventTypes.forEach(function(eventType) {
        eventBus.on(eventType, function(e) {
          console.log(eventType)
          if (!e || !e.element) {
            console.log('无效的e', e)
            return
          }
          if (!e || e.element.type == 'bpmn:Process') return
          if (eventType === 'element.changed') {
            // that.elementChanged(e)
          } else if (eventType === 'element.click') {
            console.log('点击了element', e)
            var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
            if (shape.type === 'bpmn:StartEvent') {
              modeling.updateProperties(shape, {
                name: '我是修改后的虚线节点',
                isInterrupting: false,
                customText: '我是自定义的text属性'
              })
            }
          } else if (eventType === 'interactionEvents.updateHit') {
            console.log('interactionEvents.updateHit', e.element)
          } else if (eventType === 'directEditing.complete') {
            console.log('directEditing.complete', e.element)
          }
        })
      })
    }
  },
  // 计算属性
  computed: {}
}
</script>

<style scoped>
.containers {
  background-color: #ffffff;
  width: 100%;
  height: calc(100vh - 52px);
}
.canvas {
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
</style>
