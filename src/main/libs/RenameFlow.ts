import Flow = require("../Models/Flow");

export class RenameFlow {

    public execute(flow: Flow) {

        const processedFlow = Object.assign({}, flow);
        processedFlow.processedData = flow.xmldata;
        return processedFlow;
    }
}
