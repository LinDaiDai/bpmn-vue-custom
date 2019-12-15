import CustomPalette from '../CustomPalette'
import CustomRenderer from '../CustomRenderer'

export default {
    __init__: ['customPalette', 'customRenderer'],
    customPalette: ['type', CustomPalette],
    customRenderer: ['type', CustomRenderer]
}