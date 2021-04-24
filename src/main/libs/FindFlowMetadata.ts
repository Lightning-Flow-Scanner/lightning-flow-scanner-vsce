import Flow = require("../models/Flow");
import FlowMetadata = require("../models/FlowMetadata");

export class FindFlowMetadata {

    public execute(flow: Flow) {
        const processedFlow : Flow = new Flow(Object.assign({}, flow));
        processedFlow.flowMetadata = flow.nodes.filter(node => node instanceof FlowMetadata);
        return processedFlow;
    }

}