/* eslint-disable no-unused-vars */
import inherits from 'inherits'

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'
import {
    isObject,
    assign,
    forEach
} from 'min-dash';
import {
    append as svgAppend,
    create as svgCreate,
    classes as svgClasses
} from 'tiny-svg'

import { customElements, customConfig, hasLabelElements } from '../../utils/util'
/**
 * A renderer that knows how to render custom elements.
 */
export default function CustomRenderer(eventBus, styles, textRenderer) {
    BaseRenderer.call(this, eventBus, 2000)

    var computeStyle = styles.computeStyle

    function renderLabel(parentGfx, label, options) {

        options = assign({
            size: {
                width: 100
            }
        }, options);

        var text = textRenderer.createText(label || '', options);

        svgClasses(text).add('djs-label');

        svgAppend(parentGfx, text);

        return text;
    }

    this.drawCustomElements = function(parentNode, element) {
        console.log(element)
        const type = element.type // 获取到类型
        if (type !== 'label') {
            if (customElements.includes(type)) { // or customConfig[type]
                const { url, attr } = customConfig[type]
                const customIcon = svgCreate('image', {
                    ...attr,
                    href: url
                })
                element['width'] = attr.width // 这里我是取了巧, 直接修改了元素的宽高
                element['height'] = attr.height
                svgAppend(parentNode, customIcon)
                console.log(element.labels.length)
                console.log(element.label)
                    // 判断是否有name属性来决定是否要渲染出label
                    // if (!hasLabelElements.includes(type) && element.businessObject.name) {
                    //     const text = svgCreate('text', {
                    //         x: attr.x,
                    //         y: attr.y + attr.height + 20,
                    //         "font-size": "14",
                    //         "fill": "#000"
                    //     })
                    //     text.innerHTML = element.businessObject.name
                    //     svgAppend(parentNode, text)
                    //     console.log(text)
                    // }
                    // renderLabel(parentNode, element.label)
                return customIcon
            }
            const shape = this.bpmnRenderer.drawShape(parentNode, element)
            return shape
        } else {
            element
        }
    }
}

inherits(CustomRenderer, BaseRenderer)

CustomRenderer.$inject = ['eventBus', 'styles', 'textRenderer']

CustomRenderer.prototype.canRender = function(element) {
    // ignore labels
    return true
        // return !element.labelTarget;
}

CustomRenderer.prototype.drawShape = function(p, element) {
    console.log(element)
    console.log(element.type)
    if (customElements.includes(element.type)) {
        return this.drawCustomElements(p, element)
    }
}

CustomRenderer.prototype.getShapePath = function(shape) {
    console.log(shape)
}