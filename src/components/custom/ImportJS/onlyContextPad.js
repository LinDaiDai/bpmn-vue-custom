import CustomPalette from '../CustomPalette'
import CustomRenderer from '../CustomRenderer'
import CustomContextPad from '../CustomContextPad'

export default {
    __init__: ['customPalette', 'customRenderer', 'customContextPad'],
    customPalette: ['type', CustomPalette],
    customRenderer: ['type', CustomRenderer],
    customContextPad: ['type', CustomContextPad]
}