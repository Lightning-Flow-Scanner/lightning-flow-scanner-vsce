import FlowMetadata = require("../models/FlowMetadata");
import FlowVariable = require("../models/FlowVariable");
import FlowElement = require("../models/FlowElement");
import Flow = require("../models/Flow");
import * as vscode from "vscode";
import {BuildNewFlow} from "./BuildNewFlow";

export class MergeFlows {
    private runningFlowNumber: number = 1;
    public flows : Flow[] = [];

    constructor() {
    }

    public async execute(flows, selectedFlowNr) {

        this.flows = flows;
        this.runningFlowNumber = selectedFlowNr;
        const flowMetaData = this.processFlowMetadata(flows);
        const xmlNodes = this.preProcessFlows(flows);
        const flowVariables = this.processVariables(xmlNodes.filter(node => node instanceof FlowVariable));
        const flowElements = await this.processFlowElements(xmlNodes.filter(node => node instanceof FlowElement));

        // const newFlow = new Flow({
        //     label: "",
        //     uri: undefined,
        //     detail: "",
        // });
        // newFlow.flowMetadata = flowMetaData;
        // newFlow.flowElements = flowElements;
        // newFlow.flowVariables = flowVariables;
        //
        // return new BuildNewFlow().execute(newFlow);
    }

    private preProcessFlows(flows: Flow[]) {
        const mainNodes = [...flows[0].flowElements, ...flows[0].flowVariables];
        mainNodes.forEach(node => {
            node.flowNumber = flows[0].flowNumber;
        });
        const secondaryNodes = [...flows[1].flowElements, ...flows[1].flowVariables];
        secondaryNodes.forEach(node => {
            node.flowNumber = flows[1].flowNumber;
        });
        return [...mainNodes, ...secondaryNodes];
    }

    private processFlowMetadata(flows : Flow[]) {

        const result = [];
        if (
            flows[0].flowMetadata.find(node => "processMetadataValues" === node.subtype).element.value[0].stringValue[0] !==
            flows[1].flowMetadata.find(node => "processMetadataValues" === node.subtype).element.value[0].stringValue[0]
        ) {
            throw new Error("Flows can not have different Metadata Values");
        } else {
            result.push(flows[0].flowMetadata.find(node => "processMetadataValues" === node.subtype));
        }
        if (flows[0].flowMetadata.find(node => "processType" === node.subtype).element !== flows[1].flowMetadata.find(node => "processType" === node.subtype).element) {
            throw new Error("Flows can not have a different Process Type");
        } else {
            result.push(flows[0].flowMetadata.find(node => "processType" === node.subtype));
        }
        const aStatus = flows[0].flowMetadata.find(node => "status" === node.subtype);
        let newStatus = Object.assign({}, aStatus);
        newStatus.element = "Draft";
        result.push(newStatus);
        for (let nodeType of ["description", "label", "interviewLabel"]) {
            const nodesWithType = [...flows[0].flowMetadata, ...flows[1].flowMetadata].filter(node => nodeType === node.subtype);
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
            const variablesFromSelectedFlow = variables.filter(variable => this.runningFlowNumber === variable.flowNumber);
            const variablesFromOtherFlow = variables.filter(variable => this.runningFlowNumber !== variable.flowNumber);
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
        const elementIndexesToMerge = [this.findStart(flowElements.filter(el => this.runningFlowNumber === el.flowNumber)).index];
        const processedIndexes = [];
        const result = [];
        do {
            const elementsToProcess: FlowElement[] = flowElements.filter(el => elementIndexesToMerge.includes(el.index) && !processedIndexes.includes(el.index));
            if (elementsToProcess.length > 0){
                for (const element of elementsToProcess){
                    const newElement: FlowElement = new FlowElement(element.name, element.subtype, element.element);
                    newElement.flowNumber = element.flowNumber;
                    if(this.runningFlowNumber !== element.flowNumber){
                            this.runningFlowNumber = element.flowNumber;
                        }
                        const matchingElementIndex = flowElements.findIndex(el => el.name === element.name && element.flowNumber !== el.flowNumber);
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
                            if(flowElements.filter(el =>  this.runningFlowNumber === el.flowNumber && !processedIndexes.includes(el.index) && elementReferencesToMerge.includes(el.name))){
                                for (let unprocessedElement of flowElements.filter(el =>  this.runningFlowNumber === el.flowNumber && !processedIndexes.includes(el.index) && elementReferencesToMerge.includes(el.name))) {
                                        elementIndexesToMerge.push(unprocessedElement.index);
                                    // @ts-ignore
                                        elementReferencesToMerge.splice(unprocessedElement.name, 1);
                                }
                            }
                            if(flowElements.filter(el =>  this.runningFlowNumber !== el.flowNumber && elementReferencesToMerge.includes(el.name))){
                                for (let unprocessedElement of flowElements.filter(el =>  this.runningFlowNumber !== el.flowNumber && elementReferencesToMerge.includes(el.name))) {
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
                connector.flowNumber = element.flowNumber;
            });
        }
        if(matchingElement && matchingElement.connectors){
            matchingElement.connectors.forEach(connector => {
                connector.flowNumber = matchingElement.flowNumber;
            });
        }

        let allConnectors =
            matchingElement && matchingElement.connectors && matchingElement.connectors.length > 0
                ? [...element.connectors, ...matchingElement.connectors]
                : [...element.connectors];
        let result = [];

        do {
            const connectorsToProcess = allConnectors.filter((c) => this.runningFlowNumber === c.flowNumber && false === c.processed);
            for (let connector of connectorsToProcess) {
                let sameConnector;
                sameConnector = allConnectors.find((c) => connector.alias === c.alias && element.flowNumber !== c.flowNumber);
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
                                    description: `Resolve using the reference "${connector.reference}" from "${this.getFlowName(connector.flowNumber)}" flow.`,
                                    flownumber: `${connector.flowNumber}`,
                                },
                                {
                                    label: `${sameConnector.reference}`,
                                    description: `Resolve using the reference "${sameConnector.reference}" from "${this.getFlowName(sameConnector.flowNumber)}" flow.`,
                                    flownumber: `${sameConnector.flowNumber}`,
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

                    selection.flowNumber == connector.flowNumber
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
            if (allConnectors.filter(c => this.runningFlowNumber !== c.flowNumber && false === c.processed).length > 0) {

                for (const connector of allConnectors.filter((c) => this.runningFlowNumber !== c.flowNumber && false === c.processed)){
                    // Handle Additional Nodes By User Selection
                    let selection;
                    do {
                        selection = await vscode.window.showQuickPick(
                            [
                                {
                                    label: "Merge Nodes",
                                    description:`Merge connectors at "${element.name}" from "${this.getFlowName(connector.flowNumber)}" flow.`,
                                    flownumber: `${connector.flowNumber}`,
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

                    if(Number.parseInt(selection.flowNumber) < 0){
                        connector.element = undefined;
                        result.push({reference: undefined, connector: connector});
                    } else if (Number.parseInt(selection.flowNumber) === 0){
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
        return this.flows.find(flow => flownumber === flow.flowNumber).label;
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
