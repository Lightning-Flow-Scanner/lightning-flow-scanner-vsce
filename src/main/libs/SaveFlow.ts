import * as fs from "mz/fs";
import {Flow} from "../models/Flow";
const xml2js = require("xml2js");
import {URI} from 'vscode-uri';


export class SaveFlow {
    public async execute(flow: Flow, defaultUri: URI) {
        await this.writeFlow(flow, defaultUri);
        return defaultUri;
    }

    private async writeFlow(flow: Flow, pathToWrite: URI) {
        const xml = new xml2js.Builder().buildObject(flow.processedData);
        await fs.writeFile(pathToWrite.fsPath, xml);
        return true;
    }
}
