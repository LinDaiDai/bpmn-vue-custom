import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'
import CustomContextPad from './CustomContextPad'
import MagicPropertiesProvider from './MagicPropertiesProvider'

export default {
    __init__: ['customPalette', 'customRenderer', 'customContextPad', 'propertiesProvider'],
    customPalette: ['type', CustomPalette],
    customRenderer: ['type', CustomRenderer],
    customContextPad: ['type', CustomContextPad],
    propertiesProvider: ['type', MagicPropertiesProvider]
}