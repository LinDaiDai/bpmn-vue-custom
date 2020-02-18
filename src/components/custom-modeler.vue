<template>
  <div class="containers">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
    <div class="modal" v-if="bpmnNodeVisible" @click="close">
      <div class="modal-content">
        <div class="modal-ctx">
          <div class="modal-item">节点id: {{ bpmnNodeInfo.id }}</div>
          <div class="modal-item">节点type: {{ bpmnNodeInfo.type }}</div>
        </div>
      </div>
    </div>
    <ul class="buttons">
      <li>
        <a ref="saveDiagram" href="javascript:" title="保存为bpmn">保存为bpmn</a>
      </li>
    </ul>
  </div>
</template>

<script>
// 引入相关的依赖
import { xmlStr } from '../mock/xmlStr'
import CustomModeler from './customModeler'
import { mapState, mapMutations } from 'vuex'
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
    ...mapMutations(['TOGGLENODEVISIBLE']),
    init() {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas
      // 建模
      this.bpmnModeler = new CustomModeler({
        container: canvas,
        //添加控制板
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: []
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
      this.addBpmnListener()
      this.addEventBusListener()
    },
    addEventBusListener() {
      // 监听 element
      let that = this
      const eventBus = this.bpmnModeler.get('eventBus')
      const modeling = this.bpmnModeler.get('modeling')
      const elementRegistry = this.bpmnModeler.get('elementRegistry')
      const eventTypes = ['element.click', 'element.changed']
      eventTypes.forEach(function(eventType) {
        eventBus.on(eventType, function(e) {
          console.log(e)
          if (!e || e.element.type == 'bpmn:Process') return
          if (eventType === 'element.changed') {
            // that.elementChanged(e)
          } else if (eventType === 'element.click') {
            console.log('点击了element', e.element)
            var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
            if (shape.type === 'bpmn:StartEvent') {
              modeling.updateProperties(shape, {
                name: '我是修改后的虚线节点',
                isInterrupting: false,
                customText: '我是自定义的text属性'
              })
              // modeling.setColor(shape, {
              //   fill: '#ff0000',
              //   stroke: null
              // })
            }
          }
        })
      })
    },
    close() {
      // window.localStorage.setItem('nodeVisible', 'false')
      this.TOGGLENODEVISIBLE(false)
    },
    addBpmnListener() {
      const that = this
      // 获取a标签dom节点
      const downloadLink = this.$refs.saveDiagram
      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.bpmnModeler.on('commandStack.changed', function() {
        that.saveDiagram(function(err, xml) {
          that.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
        })
      })
    },
    // 下载为bpmn格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml)
      })
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data)
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      console.log(link, name, data)
      let xmlFile = new File([data], 'test.bpmn')
      //   console.log(xmlFile)
      if (data) {
        link.className = 'active'
        link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
        link.download = name
      }
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      bpmnNodeInfo: state => state.bpmn.nodeInfo,
      bpmnNodeVisible: state => state.bpmn.nodeVisible
    })
    // bpmnNodeInfo () {
    //   return JSON.parse(window.localStorage.getItem('nodeInfo'))
    // },
    // bpmnNodeVisible () { // 好像不能监听到它的改变, 我就弃用了
    //   console.log(JSON.parse(window.localStorage.getItem('nodeVisible')))
    //   return JSON.parse(window.localStorage.getItem('nodeVisible'))
    // }
  }
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
.buttons {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
.buttons li {
  display: inline-block;
  margin: 5px;
}
.buttons li a {
  color: #999;
  background: #eee;
  cursor: not-allowed;
  padding: 8px;
  border: 1px solid #ccc;
  text-decoration: none;
}
.buttons li a.active {
  color: #333;
  background: #fff;
  cursor: pointer;
}
.modal {
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.modal-content {
  width: 100%;
  height: 100%;
  position: relative;
}
.modal-ctx {
  position: absolute;
  width: 300px;
  height: 250px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 5px 2px rgba(225, 225, 225, 0.8);
}
.modal-item {
  padding: 10px;
  width: 100%;
}
</style>
