import * as vscode from "vscode";

export class BuildNewFlow {


    constructor(){

    }

    public async execute(flow) {
        const newFlow = Object.assign({}, flow);
        newFlow.processeddata = {'Flow': this.buildFlowJSON([...newFlow.flowMetadata, ...newFlow.flowVariables, ...newFlow.flowElements])};
    }


    private buildFlowJSON(nodesToMerge) {
        let flowJson = {};
        for (let node of nodesToMerge.filter(node => node instanceof FlowElement || node instanceof FlowVariable)) {
            if (flowJson[node.subtype] !== undefined) {
                flowJson[node.subtype].push(node.element);
            } else {
                flowJson[node.subtype] = [node.element];
            }
        }
        return flowJson;
    }

}
