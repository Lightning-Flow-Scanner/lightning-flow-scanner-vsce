import Flow = require("../models/Flow");
import FlowElement = require("../models/FlowElement");
import Node = require("../models/Node");

export class FindUnusedElements {

    public execute(flow: Flow) {
        const flowElements: FlowElement[] = flow.nodes.filter(node => node instanceof FlowElement);
        let indexesToProcess = [this.findStart(flowElements)];
        const processedElementIndexes: number[] = [];
        const unconnectedElementIndexes: number[] = [];
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
            } else if (unconnectedElementIndexes.includes(index)) {
                unconnectedElements.push(element);
            }
        }
        flow.unconnectedElements = unconnectedElements;
    }

    private findStart(nodes: Node[]) {
        return nodes.findIndex((n) => {
            return n.subtype === "start";
        });
    }


}