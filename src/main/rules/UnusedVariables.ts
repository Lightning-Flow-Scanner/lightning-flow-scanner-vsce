import {Flow} from "../models/Flow";
import FlowVariable = require("../models/FlowVariable");
import FlowElement = require("../models/FlowElement");

export class UnusedVariables{

    public execute(flow: Flow) {
        let unusedVariables : FlowVariable[] = [];
        for (const variable of flow.nodes.filter(node => node instanceof FlowVariable) as FlowVariable[]) {
            // first check if any inside of flow elements
            let variableName = variable.name;
            if ([...JSON.stringify(flow.nodes.filter(node => node instanceof FlowElement)).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index).length === 0) {
                // if none found check in other flow variables
                let insideCounter = [...JSON.stringify(variable).matchAll(new RegExp(variable.name, 'gi'))].map(a => a.index);
                let variableUsage = [...JSON.stringify(flow.nodes.filter(node => node instanceof FlowVariable)).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index);
                if(variableUsage.length === insideCounter.length){
                    unusedVariables.push(variable);
                }
            }
        }
        return  unusedVariables;
    }

}
