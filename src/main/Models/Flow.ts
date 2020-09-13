import FlowMetadata = require("./FlowMetadata");
import FlowVariable = require("./FlowVariable");
import FlowElement = require("./FlowElement");

export = class Flow{

    public description:string;
    public detail:string;
    public label:string;
    public path:string;
    public flownumber:number;
    public xmldata:JSON;
    public nodes: (FlowElement | FlowMetadata | FlowVariable)[];

    constructor(args){

        this.label = args.label;
        this.path = args.path;
        this.detail = args.detail ? args.detail : '';
        this.description = args.description ? args.description : '';
        this.xmldata = args.xmldata;
        if(args.label !== "")
        {
            this.nodes = this.preProcessFlowNodes(args.xmldata.Flow);
        }
    }

    private preProcessFlowNodes(flowXML) {
        const mergeableVariables = ["variables", "constants"];
        const flowMetadata = [
            "description",
            "interviewLabel",
            "label",
            "processMetadataValues",
            "processType",
            "status",
        ];
        const nameSpaceSymbol = "$";
        const allNodes = [];
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
            } else if (nodeType === nameSpaceSymbol) {
                continue;
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