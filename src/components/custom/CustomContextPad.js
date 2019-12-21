export default class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate, modeling) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;
        this.modeling = modeling;

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
            modeling
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
            'delete': deleteElement()
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
    'modeling'
];