import FlowMetadata = require("./FlowMetadata");
import FlowVariable = require("./FlowVariable");
import FlowElement = require("./FlowElement");
import {Uri} from "vscode";

export = class Flow {

    public interviewLabel: string;
    public label: string;
    public processType;
    public processMetadataValues;
    public start;
    public status;
    public uri: Uri;
    public xmldata;

    public detail?: string;
    public path?: string;
    public flowNumber?: number;
    public flowVariables?;
    public flowMetadata?;
    public flowElements?;
    public unconnectedElements?;
    public unusedVariables?;
    public processedData?;
    public nodesWithHardcodedIds?;
    public nodes?;

    constructor(args) {
        this.uri = args.uri;
        if(args.uri){
            this.path = args.uri.fsPath;
        }
        this.label = args.label;
        this.detail = args.detail ? args.detail : '';
        this.xmldata = args.xmldata;
        this.flowVariables = args.flowVariables;
        this.unusedVariables = args.unusedVariables;
        this.flowElements = args.flowElements;
        this.unconnectedElements = args.unconnectedElements;
        this.nodesWithHardcodedIds = args.nodesWithHardcodedIds;
        this.flowMetadata = args.flowMetadata;
        this.nodes = this.preProcessNodes(args.xmldata);
    }

    private preProcessNodes(xml) {
        const mergeableVariables = ["variables", "constants", "formulas", "stages", "textTemplates"];
        const flowMetadata = ["description",
            "apiVersion",
            "processMetadataValues",
            "processType",
            "interviewLabel",
            "label",
            "status"
        ];
        const allNodes = [];
        const flowXML = xml.Flow;
        for (let nodeType in flowXML) {
            let nodes = flowXML[nodeType];
            // skip xmlns url
            if (nodeType == '$'){
                continue;
            }
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