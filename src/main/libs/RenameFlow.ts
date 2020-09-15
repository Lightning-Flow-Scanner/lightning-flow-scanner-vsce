import Flow = require("../Models/Flow");
const xml2js = require("xml2js");

export class RenameFlow {

    public execute(flow: Flow) {

        const processedFlow = Object.assign({}, flow);
        processedFlow.processedData = flow.xmldata;
        return processedFlow;
    }
}
