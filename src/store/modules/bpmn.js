const bpmn = {
    state: {
        nodeVisible: false,
        nodeInfo: {}
    },
    mutations: {
        TOGGLENODEVISIBLE: (state, visible) => {
            state.nodeVisible = visible
        },
        SETNODEINFO: (state, info) => {
            state.nodeInfo = info
        }
    },
    actions: {

    }
}

export default bpmn