import Flow = require("../models/Flow");
import FlowMetadata = require("../models/FlowMetadata");
import FlowVariable = require("../models/FlowVariable");
import FlowElement = require("../models/FlowElement");

export class BuildNewFlow {

    constructor() {

    }

    public execute(flow: Flow) {
        flow.processedData = this.buildFlow([
            ...flow.nodes.filter(node => node instanceof FlowMetadata),
            ...flow.nodes.filter(node => {
                if(flow.unusedVariables.length > 0){
                    if(node instanceof FlowVariable && !flow.unusedVariables.includes(node)){
                        return node;
                    }
                } else {
                    if(node instanceof FlowVariable){
                        return node;
                    }
                }
            }),
            ...flow.nodes.filter(node => {
                if(flow.unconnectedElements.length > 0){
                    if(node instanceof FlowElement && !flow.unconnectedElements.includes(node)){
                        return node;
                    }
                } else {
                    if(node instanceof FlowElement){
                        return node;
                    }
                }
            })]);
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
