import Flow = require("../models/Flow");

export class BuildNewFlow {

    constructor() {

    }

    public execute(flow: Flow) {

        const processedFlow : Flow = new Flow(Object.assign({}, flow));
        processedFlow.processedData = this.buildFlow([...flow.flowMetadata, ...flow.flowVariables, ...flow.flowElements]);
        return processedFlow;
    }

    private buildFlow(nodesToMerge) {
        let res = {};
        for (const nodeToMerge of nodesToMerge) {
            let subtype = nodeToMerge.subtype;
            const nodesOfType = nodesToMerge.filter(node => subtype === node.subtype);
            res = this.convertFlowNodes(res, nodesOfType, subtype);
        }
        return {'Flow': res};
    }

    private convertFlowNodes(obj, nodes, key) {
        obj[key] = nodes.map(node => node.element);
        return obj;
    };

}
