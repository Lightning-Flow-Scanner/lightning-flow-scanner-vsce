import Flow = require("../models/Flow");

export class RenameFlow {

    public execute(flow: Flow) {

        const processedFlow = Object.assign({}, flow);
        processedFlow.processedData = flow.xmldata;
        return processedFlow;
    }
}
