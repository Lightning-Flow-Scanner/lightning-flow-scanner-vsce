import Flow = require("../Models/Flow");
import FlowElement = require("../Models/FlowElement");
import FlowMetadata = require("../Models/FlowMetadata");
import FlowVariable = require("../Models/FlowVariable");
import Node = require("../Models/Node");

export class CleanFlow {

    public execute(flow: Flow) {
        let unusedVariableReferences: string[] = [];
        let processedVariableReferences: string[] = [];
        const flowNodes = flow.nodes();
        for (const variableName of flowNodes.filter(node => node instanceof FlowVariable).map(variable => variable.name)) {
            if ([...JSON.stringify(flow.xmldata).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index).length === 1) {
                unusedVariableReferences.push(variableName);
            } else {
                processedVariableReferences.push(variableName);
            }
        }
        const flowVariables: FlowVariable[] = flowNodes.filter(node => node instanceof FlowVariable && processedVariableReferences.includes(node.name));
        const unusedFlowVariables: FlowVariable[] = flowNodes.filter(node => node instanceof FlowVariable && unusedVariableReferences.includes(node.name));
        const flowElements: FlowElement[] = flowNodes.filter(node => node instanceof FlowElement);
        const flowMetadata: FlowMetadata[] = flowNodes.filter(node => node instanceof FlowMetadata);

        let indexesToProcess = [this.findStart(flowElements)];
        const processedElementIndexes: number[] = [];
        const unconnectedElementIndexes: number[]  = [];
        do {
            indexesToProcess = indexesToProcess.filter(index => !processedElementIndexes.includes(index));
            if (indexesToProcess.length > 0) {
                for (const [index, element] of flowElements.entries()) {
                    if (indexesToProcess.includes(index)) {
                        let references: string[] = [];
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

        const cleanedFlow = Object.assign({}, flow);
        cleanedFlow.flowVariables = flowVariables;
        cleanedFlow.flowMetadata = flowMetadata;
        cleanedFlow.flowElements = processedElements;
        cleanedFlow.unconnectElements = unconnectedElements;
        cleanedFlow.unusedVariables = unusedFlowVariables;
        return cleanedFlow;
    }

    private findStart(nodes: Node[]) {
        return nodes.findIndex((n) => {
            return n.subtype === "start";
        });
    }

}