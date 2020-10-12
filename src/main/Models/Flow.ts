import FlowMetadata = require("./FlowMetadata");
import FlowVariable = require("./FlowVariable");
import FlowElement = require("./FlowElement");
import {Uri} from "vscode";

export = class Flow {

    public detail: string;
    public label: string;
    public path: string;
    public flowUri: Uri;
    public flownumber: number;
    public xmldata: JSON;
    public flowVariables;
    public flowMetadata;
    public flowElements;
    public unconnectElements;
    public unusedVariables;
    public processedData;

    constructor(args) {
        this.flowUri = args.uri;
        if(args.uri){
            this.path = args.uri.fsPath;
        }
        this.label = args.label;
        this.detail = args.detail ? args.detail : '';
        this.xmldata = args.xmldata;
    }

    public nodes(): (FlowElement | FlowMetadata | FlowVariable)[] {
        return this.preProcessFlowNodes(this.xmldata);
    }

    private preProcessFlowNodes(xml) {
        const mergeableVariables = ["variables", "constants"];
        const flowMetadata = ["description",
            "processMetadataValues",
            "processType",
            "interviewLabel",
            "label",
            "status"
        ];
        const allNodes = [];
        delete xml.Flow.$;
        const flowXML = xml.Flow;
        for (let nodeType in flowXML) {
            let nodes = flowXML[nodeType];
            if (flowMetadata.includes(nodeType)) {
                for (let node of nodes) {
                    allNodes.push(new FlowMetadata(
                        nodeType,
                        node
                    ));
                }
            } else if (mergeableVariables.includes(nodeType)) {
                for (let node of nodes) {
                    allNodes.push(
                        new FlowVariable(node.name, nodeType, node)
                    );
                }
            } else {
                for (let node of nodes) {
                    allNodes.push(
                        new FlowElement(node.name, nodeType, node)
                    );
                }
            }
        }
        return allNodes;
    }

};