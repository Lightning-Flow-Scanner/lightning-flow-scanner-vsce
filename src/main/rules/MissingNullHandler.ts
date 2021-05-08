import Flow = require("../models/Flow");
import FlowElement = require("../models/FlowElement");

export class MissingNullHandler{

    public execute(flow: Flow) {

        const getOperations = ['recordLookups'];
        const getOperationElements: FlowElement[] = flow.nodes.filter(node => node.nodeType === 'element' && getOperations.includes(node.subtype)) as FlowElement[];
        const allFlowElements: FlowElement[] = flow.nodes.filter(node => node.nodeType === 'element') as FlowElement[];
        const getOperationsWithoutNullHandler = [];
        for(let element of getOperationElements){
            let connector = element.connectors.find(connector => 'connector' === connector.type);
            let nextNode = allFlowElements.find(node => node.name === connector.reference);
            if (nextNode.subtype !== 'decisions'){
                getOperationsWithoutNullHandler.push(element);
            }
        }
        return getOperationsWithoutNullHandler;
    }
}