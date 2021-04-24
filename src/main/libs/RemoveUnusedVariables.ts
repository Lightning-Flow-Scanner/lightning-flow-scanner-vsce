import Flow = require("../models/Flow");
import FlowVariable = require("../models/FlowVariable");

export class RemoveUnusedVariables {

    public execute(flow: Flow) {
        let unusedVariableReferences: string[] = [];
        let processedVariableReferences: string[] = [];
        // @ts-ignore
        for (const variableName of flow.nodes.filter(node => node instanceof FlowVariable).map(variable => variable.name)) {

            // todo (prevent multiple results due to label vs api name) Exclude current node
            // @ts-ignore
            if ([...JSON.stringify(flow.xmldata).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index).length === 1) {
                unusedVariableReferences.push(variableName);
            } else {
                processedVariableReferences.push(variableName);
            }
        }
        const processedFlow : Flow = new Flow(Object.assign({}, flow));
        processedFlow.flowVariables = flow.nodes.filter(node => node instanceof FlowVariable && processedVariableReferences.includes(node.name));
        processedFlow.unusedVariables = flow.nodes.filter(node => node instanceof FlowVariable && unusedVariableReferences.includes(node.name));
        return processedFlow;
    }

}