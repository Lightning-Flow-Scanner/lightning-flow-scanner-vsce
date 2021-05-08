import FlowMetadata = require("./FlowMetadata");
import FlowVariable = require("./FlowVariable");
import FlowElement = require("./FlowElement");
import FlowNode = require("./FlowNode");
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
    public root;

    public path?: string;
    public unconnectedElements : FlowElement [];
    public unusedVariables : FlowVariable [];
    public nodesWithHardcodedIds : FlowElement [];
    public dmlStatementInLoop : FlowElement[];
    public duplicateDMLOperationsByNavigation : FlowElement[];
    public missingFaultPaths : FlowElement[];

    public processedData?;
    public nodes? : FlowNode[];

    constructor(args) {
        this.interviewLabel = args.interviewLabel;
        this.label = args.label;
        this.processMetadataValues = args.processMetadataValues;
        this.processType = args.processType;
        this.start = args.start;
        this.status = args.status;
        this.uri = args.uri;
        if(args.uri){
            this.path = args.uri.fsPath;
        }
        if(args.path){
            this.path = args.path;
        }
        this.xmldata = args.xmldata;
        this.preProcessNodes(args.xmldata);
    }

    private preProcessNodes(xml) {
        const mergeableVariables = ["variables", "constants", "formulas", "stages", "textTemplates"];
        const flowMetadata = ["$",
            "description",
            "apiVersion",
            "processMetadataValues",
            "processType",
            "interviewLabel",
            "label",
            "status"
        ];

        const allNodes:(FlowVariable | FlowElement | FlowMetadata)[] = [];
        const flowXML = xml.Flow;
        for (let nodeType in flowXML) {
            let nodesOfType = flowXML[nodeType];
            // skip xmlns url
            if (nodeType == '$'){
                this.root = nodesOfType;
                continue;
            }
            if (flowMetadata.includes(nodeType)) {
                for (let node of nodesOfType) {
                    allNodes.push(new FlowMetadata(
                        nodeType,
                        node
                    ));
                }
            } else if (mergeableVariables.includes(nodeType)) {
                for (let node of nodesOfType) {
                    allNodes.push(
                        new FlowVariable(node.name, nodeType, node)
                    );
                }
            } else {
                for (let node of nodesOfType) {
                    allNodes.push(
                        new FlowElement(node.name, nodeType, node)
                    );
                }
            }
        }

        this.label= xml.Flow.label;
        this.interviewLabel= xml.Flow.interviewLabel;
        this.processType = xml.Flow.processType;
        this.processMetadataValues = xml.Flow.processMetadataValues;
        this.start= xml.Flow.start;
        this.status= xml.Flow.status;
        this.nodes = allNodes;
    }

};