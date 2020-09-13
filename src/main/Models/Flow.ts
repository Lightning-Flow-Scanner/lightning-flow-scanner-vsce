import FlowMetadata = require("./FlowMetadata");
import FlowVariable = require("./FlowVariable");
import FlowElement = require("./FlowElement");

export = class Flow{

    public detail:string;
    public label:string;
    public path:string;
    public flownumber:number;
    public xmldata:JSON;

    constructor(args){

        this.label = args.label;
        this.path = args.path;
        this.detail = args.detail ? args.detail : '';
        this.xmldata = args.xmldata;
    }

    public nodes() : (FlowElement | FlowMetadata | FlowVariable)[]{
        return this.preProcessFlowNodes(this.xmldata);
    }

    private preProcessFlowNodes(xml) {
        const mergeableVariables = ["variables", "constants"];
        const flowMetadata = [
            "description",
            "interviewLabel",
            "label",
            "processMetadataValues",
            "processType",
            "status",
        ];
        const allNodes = [];
        delete xml.Flow.$;
        const flowXML = xml.Flow;
        for (let nodeType in flowXML) {
            let nodes = flowXML[nodeType];
            if (flowMetadata.includes(nodeType)) {
                let metadataNode = new FlowMetadata(
                    nodeType,
                    flowXML[nodeType]
                );
                allNodes.push(metadataNode);
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