import FlowMetadata = require("../Models/FlowMetadata");
import FlowVariable = require("../Models/FlowVariable");
import FlowElement = require("../Models/FlowElement");
import Flow = require("../Models/Flow");
import * as vscode from "vscode";

export class MergeFlows {
    private runningFlowNumber: number = 1;
    public flows : Flow[] = [];

    constructor() {
    }

    public async execute(flows, selectedFlowNr) {

        this.flows = flows;
        this.runningFlowNumber = selectedFlowNr;
        const xmlNodes = this.preProcessFlows(flows);
        const flowMetaData = this.processFlowMetadata(xmlNodes.filter(node => node instanceof FlowMetadata));
        const flowVariables = this.processVariables(xmlNodes.filter(node => node instanceof FlowVariable));

        const flowElements = await this.processFlowElements(xmlNodes.filter(node => node instanceof FlowElement));

        return new Flow({
            label: "",
            path: "",
            detail: "",
            xmldata: {
                Flow: {
                    $: {xmlns: "http://soap.sforce.com/2006/04/metadata"},
                    _: this.buildFlowJSON(
                        [...flowMetaData, ...flowVariables, ...flowElements]
                    ),
                },
            },
        });
    }

    private preProcessFlows(flows: Flow[]) {
        const mainNodes = flows[0].nodes();
        mainNodes.forEach(node => {
            node.flownumber = flows[0].flownumber;
        });
        const secondaryNodes = flows[1].nodes();
        secondaryNodes.forEach(node => {
            node.flownumber = flows[1].flownumber;
        });
        return [...mainNodes, ...secondaryNodes];
    }

    private processFlowMetadata(nodes) {
        const flowProcessMetadataValues = nodes.filter(node => "processMetadataValues" === node.subtype);
        const result = [];
        if (
            flowProcessMetadataValues[0].element[0].value[0].stringValue[0] !==
            flowProcessMetadataValues[1].element[0].value[0].stringValue[0]
        ) {
            throw new Error("Flows can not have different Metadata Values");
        } else {
            result.push(flowProcessMetadataValues[0]);
        }
        const flowProcessTypes = nodes.filter(node => "processType" === node.subtype);
        if (flowProcessTypes[0].element[0] !== flowProcessTypes[1].element[0]) {
            throw new Error("Flows can not have a different Process Type");
        } else {
            result.push(flowProcessTypes[0]);
        }
        const flowStatusses = nodes.filter(node => "status" === node.subtype);
        let newStatus = Object.assign({}, flowStatusses[0]);
        newStatus.element = ["Draft"];
        result.push(newStatus);
        for (let nodeType of ["description", "label", "interviewLabel"]) {
            const nodesWithType = nodes.filter(node => nodeType === node.subtype);
            let types = [];
            for (let node of nodesWithType) {
                if (types.length === 0 || !types.includes(node.subtype)) {
                    types.push(node.subtype);
                    result.push(node);
                }
            }
        }
        return result;
    }

    private processVariables(variables) {
        for(const [index, element] of variables.entries()){
            element.index = index;
        }

        const result = [];
        const processedVariableIndexes = [];

        do {
            const variablesFromSelectedFlow = variables.filter(variable => this.runningFlowNumber === variable.flownumber);
            const variablesFromOtherFlow = variables.filter(variable => this.runningFlowNumber !== variable.flownumber);
            for (const aVariable of variablesFromSelectedFlow) {
                let matchedVariable = variablesFromOtherFlow.find(variable => aVariable.name === variable.name);
                if (
                    matchedVariable &&
                    this.sameVariable(matchedVariable, aVariable) &&
                    this.sameVariableType(matchedVariable, aVariable)
                ) {
                    processedVariableIndexes.push(aVariable.index);
                    processedVariableIndexes.push(matchedVariable.index);
                    result.push(aVariable);
                } else if (
                    matchedVariable &&
                    this.sameVariable(matchedVariable, aVariable) &&
                    !this.sameVariableType(matchedVariable, aVariable)
                ) {
                    throw Error(
                        "The Flows both contain a variable with the name: " +
                        this.sameVariable.name +
                        ", but they have a different data type."
                    );
                } else if (!matchedVariable) {
                    processedVariableIndexes.push(aVariable.index);
                    result.push(aVariable);
                }
            }
            if (
                !variablesFromSelectedFlow.find(variable => !processedVariableIndexes.includes(variable.index))
                && variablesFromOtherFlow.find(variable => !processedVariableIndexes.includes(variable.index))
            ) {
                for (const aVariable of variablesFromOtherFlow.filter(variable => !processedVariableIndexes.includes(variable.index))) {
                    processedVariableIndexes.push(aVariable.index);
                    result.push(aVariable);
                }
            }
        } while (processedVariableIndexes.length < variables.length);

        return result;
    }

    private async processFlowElements(allFlowElements) {
        const flowElements: FlowElement[] = JSON.parse(JSON.stringify(allFlowElements));
        for(const [index, element] of flowElements.entries()){
            element.index = index;
        }
        const elementIndexesToMerge = [this.findStart(flowElements.filter(el => this.runningFlowNumber === el.flownumber)).index];
        const processedIndexes = [];
        const result = [];
        do {
            const elementsToProcess: FlowElement[] = flowElements.filter(el => elementIndexesToMerge.includes(el.index) && !processedIndexes.includes(el.index));
            if (elementsToProcess.length > 0){
                for (const element of elementsToProcess){
                    const newElement: FlowElement = new FlowElement(element.name, element.subtype, element.element);
                    newElement.flownumber = element.flownumber;
                    if(this.runningFlowNumber !== element.flownumber){
                            this.runningFlowNumber = element.flownumber;
                        }
                        const matchingElementIndex = flowElements.findIndex(el => el.name === element.name && element.flownumber !== el.flownumber);
                        const matchingElement = flowElements[matchingElementIndex];
                        let resultingConnectorMap = await this.compareConnectors(element, matchingElement);
                        if (resultingConnectorMap.length > 0) {

                            let elementReferencesToMerge = [];
                            let connectorsToProcess = [];
                            for (let connector of resultingConnectorMap) {
                                
                                connectorsToProcess.push(connector.connector);
                                if (connector.reference) {
                                    elementReferencesToMerge.push(connector.reference);
                                }
                            }
                            newElement.setConnectors(connectorsToProcess);
                            if(flowElements.filter(el =>  this.runningFlowNumber === el.flownumber && !processedIndexes.includes(el.index) && elementReferencesToMerge.includes(el.name))){
                                for (let unprocessedElement of flowElements.filter(el =>  this.runningFlowNumber === el.flownumber && !processedIndexes.includes(el.index) && elementReferencesToMerge.includes(el.name))) {
                                        elementIndexesToMerge.push(unprocessedElement.index);
                                        elementReferencesToMerge.splice(unprocessedElement.name, 1);
                                }
                            }
                            if(flowElements.filter(el =>  this.runningFlowNumber !== el.flownumber && elementReferencesToMerge.includes(el.name))){
                                for (let unprocessedElement of flowElements.filter(el =>  this.runningFlowNumber !== el.flownumber && elementReferencesToMerge.includes(el.name))) {
                                    if(!processedIndexes.includes(element.index)) {
                                            elementIndexesToMerge.push(unprocessedElement.index);
                                    }
                                }
                            }
                        }
                    processedIndexes.push(element.index);
                    if (matchingElementIndex !== -1) {
                        processedIndexes.push(matchingElementIndex);
                    }
                    result.push(newElement);
                    }
            } else {
                // floating nodes are skipped for now
                for(const leftoverElement of flowElements){
                    if(!processedIndexes.includes(leftoverElement.index)){
                        processedIndexes.push(leftoverElement.index);
                    }                }
            }
        } while (processedIndexes.length < flowElements.length);

        return result;
    }

    private async compareConnectors(element, matchingElement) {
        if(element.connectors){
            element.connectors.forEach(connector => {
                connector.flownumber = element.flownumber;
            });
        }
        if(matchingElement && matchingElement.connectors){
            matchingElement.connectors.forEach(connector => {
                connector.flownumber = matchingElement.flownumber;
            });
        }

        let allConnectors =
            matchingElement && matchingElement.connectors && matchingElement.connectors.length > 0
                ? [...element.connectors, ...matchingElement.connectors]
                : [...element.connectors];
        let result = [];

        do {
            const connectorsToProcess = allConnectors.filter((c) => this.runningFlowNumber === c.flownumber && false === c.processed);
            for (let connector of connectorsToProcess) {
                let sameConnector;
                sameConnector = allConnectors.find((c) => connector.alias === c.alias && element.flownumber !== c.flownumber);
                if (sameConnector && sameConnector.reference === connector.reference) {
                    connector.processed = true;
                    sameConnector.processed = true;
                    result.push({reference: connector.reference, connector: connector});
                } else if (
                    sameConnector &&
                    sameConnector.reference !== connector.reference
                ) {
                    // Handle Conflict By User Selection
                    let selection;
                    do {
                        selection = await vscode.window.showQuickPick(
                            [
                                {
                                    label: `${connector.reference}`,
                                    description: `Resolve using the reference "${connector.reference}" from "${this.getFlowName(connector.flownumber)}" flow.`,
                                    flownumber: `${connector.flownumber}`,
                                },
                                {
                                    label: `${sameConnector.reference}`,
                                    description: `Resolve using the reference "${sameConnector.reference}" from "${this.getFlowName(sameConnector.flownumber)}" flow.`,
                                    flownumber: `${sameConnector.flownumber}`,
                                },
                            ],
                            {
                                matchOnDetail: false,
                                matchOnDescription: true,
                                canPickMany: false,
                                placeHolder: `There is a conflict in the ${connector.alias} of the node called: ${element.name}`,
                            }
                        );
                    } while (selection === undefined);
                    connector.processed = true;
                    sameConnector.processed = true;

                    selection.flownumber == connector.flownumber
                        ? result.push({reference: connector.reference, connector: connector})
                        : result.push({
                            reference: sameConnector.reference,
                            connector: sameConnector,
                        });
                } else {
                    connector.processed = true;
                    result.push({reference: connector.reference, connector: connector});
                }
            }
            if (allConnectors.filter(c => this.runningFlowNumber !== c.flownumber && false === c.processed).length > 0) {

                for (const connector of allConnectors.filter((c) => this.runningFlowNumber !== c.flownumber && false === c.processed)){
                    // Handle Additional Nodes By User Selection
                    let selection;
                    do {
                        selection = await vscode.window.showQuickPick(
                            [
                                {
                                    label: "Merge Nodes",
                                    description:`Merge connectors at "${element.name}" from "${this.getFlowName(connector.flownumber)}" flow.`,
                                    flownumber: `${connector.flownumber}`,
                                },
                                {
                                    label: "Split Merge",
                                    description: "Merge additional nodes separately without merging the connectors",
                                    flownumber: `0`,
                                },
                                {
                                    label: "Skip Merge",
                                    description: "Skip additional nodes from merge",
                                    flownumber: `-1`,
                                }
                            ],
                            {
                                matchOnDetail: false,
                                matchOnDescription: true,
                                canPickMany: false,
                                placeHolder:
                                    `There are additional connectors found in the element: "${element.name}"`
                            }
                        );
                    } while (selection === undefined);

                    if(Number.parseInt(selection.flownumber) < 0){
                        connector.element = undefined;
                        result.push({reference: undefined, connector: connector});
                    } else if (Number.parseInt(selection.flownumber) === 0){
                        connector.element = undefined;
                        result.push({reference: connector.reference, connector: connector, splitMerge: true});
                    } else {
                        result.push({
                            reference: connector.reference,
                            connector: connector
                        });
                    }
                    connector.processed = true;
                }
            }
        } while (allConnectors.find((c) => c.processed === false));

        return result;
    }

    private getFlowName(flownumber){
        return this.flows.find(flow => flownumber === flow.flownumber).label;
    }

    private findStart(nodes) {
        return nodes.find((n) => {
            return n.subtype === "start";
        });
    }

    private sameVariable(variable1, variable2) {
        return variable1.name === variable2.name;

    }

    private sameVariableType(variable1, variable2) {
        return variable1.element.dataType[0] === variable2.element.dataType[0];
    }

    private buildFlowJSON(nodesToMerge) {
        let flowJson = {};
        for (let node of nodesToMerge) {
            if (flowJson[node.subtype] !== undefined) {
                flowJson[node.subtype].push(node.element);
            } else {
                flowJson[node.subtype] = [node.element];
            }
        }
        return flowJson;
    }
}
