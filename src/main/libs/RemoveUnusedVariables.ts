import Flow = require("../models/Flow");
import FlowVariable = require("../models/FlowVariable");

export class RemoveUnusedVariables {

    public execute(flow: Flow) {
        let unusedVariableReferences: string[] = [];
        let processedVariableReferences: string[] = [];
        for (const variableName of flow.nodes.filter(node => node instanceof FlowVariable).map(variable => variable.name)) {

            // todo (prevent multiple results due to label vs api name) Exclude current node
            if ([...JSON.stringify(flow.xmldata).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index).length === 1) {
                unusedVariableReferences.push(variableName);
            } else {
                processedVariableReferences.push(variableName);
            }
        }
        flow.flowVariables = flow.nodes.filter(node => node instanceof FlowVariable && processedVariableReferences.includes(node.name));
        flow.unusedVariables = flow.nodes.filter(node => node instanceof FlowVariable && unusedVariableReferences.includes(node.name));
    }

}