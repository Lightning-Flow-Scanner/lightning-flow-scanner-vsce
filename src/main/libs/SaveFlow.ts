import * as fs from "mz/fs";
const xml2js = require("xml2js");
import {URI} from 'vscode-uri';
import { Flow } from "lightning-flow-scanner-core/out/main/models/Flow";


export class SaveFlow {
    public async execute(flow: Flow, defaultUri: URI) {
        await this.writeFlow(flow, defaultUri);
        return defaultUri;
    }

    private async writeFlow(flow: Flow, pathToWrite: URI) {
       const xml = new xml2js.Builder({rootName: "Flow", xmldec : {'version': '1.0', 'encoding': 'UTF-8'}}).buildObject(flow.xmldata);
        await fs.writeFile(pathToWrite.fsPath, xml);
        return true;
    }
}
