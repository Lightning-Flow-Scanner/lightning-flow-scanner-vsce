import * as vscode from "vscode";
import Flow = require("../Models/Flow");
import FlowElement = require("../Models/FlowElement");
import FlowMetadata = require("../Models/FlowMetadata");
import FlowVariable = require("../Models/FlowVariable");

export class BuildNewFlow {

    constructor() {

    }

    public execute(flow: Flow) {
        const newFlow = Object.assign({}, flow);
        newFlow.processeddata = this.buildFlow([...newFlow.flowMetadata, ...newFlow.flowVariables, ...newFlow.flowElements]);
        return newFlow;
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

    private convertFlowNodes(obj, nodesToMerge, key) {
        obj[key] = nodesToMerge;
        return obj;
    };


}
