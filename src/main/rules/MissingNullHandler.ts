import Flow = require("../models/Flow");
import FlowElement = require("../models/FlowElement");

export class MissingNullHandler{

    public execute(flow: Flow) {

        const getOperations = ['recordLookups'];
        const getOperationElements: FlowElement[] = flow.nodes.filter(node => node.nodeType === 'element' && getOperations.includes(node.subtype)) as FlowElement[];
        const decisionElements: FlowElement[] = flow.nodes.filter(node => node.nodeType === 'element' && node.subtype === 'decisions') as FlowElement[];
        const getOperationsWithoutNullHandler = [];

        for(let getElement of getOperationElements){

            let nullCheckFound = false;
            let resultReference;
            // @ts-ignore
            if(getElement.element.storeOutputAutomatically){
                resultReference = getElement.name;
            } else {
                // @ts-ignore
                resultReference = getElement.element.outputReference
            }

            for( let el of decisionElements){

                // @ts-ignore
                let rules = el.element.rules;
                for( let rule of rules){
                    for (let condition of rule.conditions){
                        if(condition.leftValueReference && condition.leftValueReference.length > 0 && condition.leftValueReference[0] === resultReference
                            && condition.operator && condition.operator.length > 0 && condition.operator[0] === 'IsNull'
                            && condition.rightValue && condition.rightValue.length > 0 && condition.rightValue[0].booleanValue && condition.rightValue[0].booleanValue.length > 0
                            && condition.rightValue[0].booleanValue[0] === 'false'
                        ){
                            nullCheckFound = true;
                        }
                    }
                }

                if (!nullCheckFound){
                    getOperationsWithoutNullHandler.push(getElement);
                }
            }
        }

        return getOperationsWithoutNullHandler;
    }
}