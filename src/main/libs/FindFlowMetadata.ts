import Flow = require("../models/Flow");
import FlowMetadata = require("../models/FlowMetadata");

export class FindFlowMetadata {

    public execute(flow: Flow) {
        return flow.nodes.filter(node => node instanceof FlowMetadata);
    }

}