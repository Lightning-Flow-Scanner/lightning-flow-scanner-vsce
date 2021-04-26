import Flow = require("../models/Flow");
import FlowVariable = require("../models/FlowVariable");
import FlowElement = require("../models/FlowElement");

export class FindUnusedVariables {

    public execute(flow: Flow) {
        let unusedVariableReferences: string[] = [];
        for (const variableName of flow.nodes.filter(node => node instanceof FlowVariable).map(variable => variable.name)) {
            // first check inside elements
            if ([...JSON.stringify(flow.nodes.filter(node => node instanceof FlowElement)).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index).length === 0) {
                // if not found check in other variables
                let currentVariable = flow.nodes.find(node => node.name === variableName);
                let insideCounter = [...JSON.stringify(currentVariable).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index);
                let variableUsage = [...JSON.stringify(flow.nodes.filter(node => node instanceof FlowVariable)).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index);
                if(variableUsage.length === insideCounter.length){
                    unusedVariableReferences.push(variableName);
                }
            }
        }
        if(unusedVariableReferences && unusedVariableReferences.length > 0){
            flow.unusedVariables = unusedVariableReferences
        }
    }

}