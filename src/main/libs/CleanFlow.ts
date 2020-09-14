import Flow = require("../Models/Flow");
import FlowElement = require("../Models/FlowElement");
import FlowMetadata = require("../Models/FlowMetadata");
import FlowVariable = require("../Models/FlowVariable");
import * as vscode from "vscode";

export class CleanFlow {

    public execute(flow) {
        const flowNodes = flow.nodes();
        const flowElements: FlowElement[] = flowNodes.filter(node => node instanceof FlowElement);
        const flowMetadata: FlowMetadata[] = flowNodes.filter(node => node instanceof FlowMetadata);

        let flowString = JSON.stringify(flow.xmldata);
        let unusedVariableReferences = [];
        let processedVariableReferences = [];
        for (const variableName of flowNodes.filter(node => node instanceof FlowVariable).map(variable => variable.name)) {
            if ([...flowString.matchAll(new RegExp(variableName, 'gi'))].map(a => a.index).length === 1) {
                unusedVariableReferences.push(variableName);
            } else {
                processedVariableReferences.push(variableName);
            }
        }
        const flowVariables: FlowVariable[] = flowNodes.filter(node => node instanceof FlowVariable && processedVariableReferences.includes(node.name));
        flowString = null;

        let indexesToProcess = [this.findStart(flowElements)];
        const processedElementIndexes = [];
        const unconnectedElementIndexes = [];
        do {
            indexesToProcess = indexesToProcess.filter(index => !processedElementIndexes.includes(index));
            if (indexesToProcess.length > 0) {
                for (const [index, element] of flowElements.entries()) {
                    if (indexesToProcess.includes(index)) {
                        let references = [];
                        if (element.connectors && element.connectors.length > 0) {
                            for (let connector of element.connectors) {
                                if (connector.reference) {
                                    references.push(connector.reference);
                                }
                            }
                        }
                        if (references.length > 0) {
                            let elementsByReferences = flowElements.filter(element => references.includes(element.name));
                            for (let nextElement of elementsByReferences) {
                                let nextIndex = flowElements.findIndex(element => nextElement.name === element.name);
                                if (!processedElementIndexes.includes(nextIndex)) {
                                    indexesToProcess.push(nextIndex);
                                }
                            }
                        }
                        processedElementIndexes.push(index);
                    }
                }
            } else {
                for (const index of flowElements.keys()) {
                    if (!processedElementIndexes.includes(index)) {
                        unconnectedElementIndexes.push(index);
                        unconnectedElementIndexes.push(index);
                    }
                }
            }
        } while ((processedElementIndexes.length + unconnectedElementIndexes.length) < flowElements.length);

        const processedElements = [];
        const unconnectedElements = [];
        for (const [index, element] of flowElements.entries()) {
            if (processedElementIndexes.includes(index)) {
                processedElements.push(element);
            } else if(unconnectedElementIndexes.includes(index)){
                unconnectedElements.push(element);
            }
        }

        //todo move
        vscode.window.showInformationMessage(`${unconnectedElementIndexes.length} Elements and ${unusedVariableReferences.length} Variables have been removed as they were not being used.`);

        const cleanedFlow = Object.assign({}, flow);
        cleanedFlow.flowVariables = flowVariables;
        cleanedFlow.flowMetadata = flowVariables;
        cleanedFlow.flowElements = flowVariables;
        cleanedFlow.unconnectElements = unconnectedElements;
        return cleanedFlow;
    }

    private findStart(nodes) {
        return nodes.findIndex((n) => {
            return n.subtype === "start";
        });
    }

}