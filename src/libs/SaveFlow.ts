import * as fs from "mz/fs";
const xml2js = require("xml2js");
import {Flow} from "lightning-flow-scanner-core/out/index";

export class SaveFlow {
    public async execute(flow: Flow) {
        await this.writeFlow(flow);
        return flow.fsPath;
    }

    private async writeFlow(flow: Flow) {
       const xml = new xml2js.Builder({rootName: "Flow", xmldec : {'version': '1.0', 'encoding': 'UTF-8'}}).buildObject(flow.xmldata);
        await fs.writeFile(flow.fsPath, xml);
        return true;
    }
}
