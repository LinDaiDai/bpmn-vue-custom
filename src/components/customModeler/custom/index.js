import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'
import CustomContextPadProvider from './CustomContextPadProvider'
export default {
    __init__: ['paletteProvider', 'customRenderer', 'contextPadProvider'],
    paletteProvider: ['type', CustomPalette],
    customRenderer: ['type', CustomRenderer],
    contextPadProvider: ['type', CustomContextPadProvider]
}