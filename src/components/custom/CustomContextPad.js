const SUITABILITY_SCORE_HIGH = 100
const SUITABILITY_SCORE_AVERGE = 50
const SUITABILITY_SCORE_LOW = 25

export default class CustomContextPad {
    constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate) {
        this.bpmnFactory = bpmnFactory
        this.create = create
        this.elementFactory = elementFactory
        this.translate = translate

        if (config.autoPlace !== false) {
            this.autoPlace = injector.get('autoPlace', false)
        }

        contextPad.registerProvider(this)
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            bpmnFactory,
            create,
            elementFactory,
            translate
        } = this

        function appendTask() {
            return function(event, element) {
                console.log('appendTask')
                const businessObject = bpmnFactory.create('bpmn:Task')
                const shape = elementFactory.createShape({
                    type: 'bpmn:Task',
                    businessObject
                })
                console.log('autoPlace', autoPlace)
                if (autoPlace) {
                    autoPlace.append(element, shape)
                } else {
                    appendTaskStart(event, element)
                }
            }
        }

        function appendTaskStart() {
            return function(event) {
                console.log('start')
                const businessObject = bpmnFactory.create('bpmn:Task')
                const shape = elementFactory.createShape({
                    type: 'bpmn:Task',
                    businessObject
                })
                create.start(event, shape, element)
            }
        }
        return {
            'append.lindaidai-task': {
                group: 'model',
                className: 'icon-custom lindaidai-task',
                title: translate('创建一个类型为lindaidai-task的任务节点'),
                action: {
                    dragstart: appendTask(),
                    click: appendTaskStart()
                }
            }
        }
    }
}

CustomContextPad.$inject = [
    'bpmnFactory',
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
]