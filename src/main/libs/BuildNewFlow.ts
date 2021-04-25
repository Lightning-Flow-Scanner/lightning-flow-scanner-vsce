import Flow = require("../models/Flow");

export class BuildNewFlow {

    constructor() {

    }

    public execute(flow: Flow) {
        flow.processedData = this.buildFlow([...flow.flowMetadata, ...flow.flowVariables, ...flow.flowElements]);
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
