import Flow = require("../models/Flow");
import FlowMetadata = require("../models/FlowMetadata");

export class FindFlowMetadata {

    public execute(flow: Flow) {
        flow.flowMetadata = flow.nodes.filter(node => node instanceof FlowMetadata);
    }

}