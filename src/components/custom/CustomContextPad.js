export default class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate, modeling, bpmnFactory) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;
        this.modeling = modeling;
        this.bpmnFactory = bpmnFactory;

        if (config.autoPlace !== false) {
            this.autoPlace = injector.get('autoPlace', false);
        }

        contextPad.registerProvider(this); // // 定义这是一个contextPad
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            create,
            elementFactory,
            translate,
            modeling,
            bpmnFactory
        } = this;
        // 删除功能
        function removeElement(e) {
            modeling.removeElements([element])
        }

        function clickElement(e) {
            console.log(element)
        }

        function appendTask(event, element) {
            console.log(autoPlace)
            if (autoPlace) {
                const shape = elementFactory.createShape({ type: 'bpmn:Task' });
                autoPlace.append(element, shape);
            } else {
                appendTaskStart(event, element);
            }
        }

        function appendTaskStart(event) {
            console.log(event)
            const shape = elementFactory.createShape({ type: 'bpmn:Task' });
            create.start(event, shape, element);
        }

        function editElement() { // 创建编辑图标
            return {
                group: 'edit',
                className: 'icon-custom icon-custom-edit',
                title: translate('编辑'),
                action: {
                    click: clickElement
                }
            }
        }

        function deleteElement() {
            return {
                group: 'edit',
                className: 'icon-custom icon-custom-delete',
                title: translate('删除'),
                action: {
                    click: removeElement
                }
            }
        }

        function appendAndClickAnnotation(color) {
            return function(event, element) {
                const businessObject = bpmnFactory.create('bpmn:TextAnnotation');
                if (color) {
                    businessObject.color = color
                }
                const shape = elementFactory.createShape({ type: 'bpmn:TextAnnotation', businessObject });
                autoPlace.append(element, shape);
                console.log(shape)
                    // window.open('https://www.baidu.com')
            }
        }
        return {
            'append.lindaidai-task': {
                group: 'model',
                className: 'icon-custom lindaidai-task',
                title: translate('创建一个类型为lindaidai-task的任务节点'),
                action: {
                    click: appendTask,
                    dragstart: appendTaskStart
                }
            },
            'edit': editElement(),
            'delete': deleteElement(),
            'append.text-annotation': {
                group: 'model',
                className: 'bpmn-icon-text-annotation',
                title: '添加自定义text-annotation并能进行跳转',
                action: {
                    click: appendAndClickAnnotation
                }
            },
            'append.green-text-annotation': {
                group: 'model',
                className: 'bpmn-icon-text-annotation green-text-annotation',
                title: '绿色的注释',
                action: {
                    click: appendAndClickAnnotation('green')
                }
            }
        }
    }
}

CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate',
    'modeling',
    'bpmnFactory'
];