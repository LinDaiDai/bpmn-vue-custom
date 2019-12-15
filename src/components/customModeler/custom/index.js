import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'
export default {
    __init__: ['paletteProvider', 'customRenderer'],
    paletteProvider: ['type', CustomPalette],
    customRenderer: ['type', CustomRenderer]
}