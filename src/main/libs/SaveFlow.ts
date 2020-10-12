import * as vscode from "vscode";
import * as fs from "mz/fs";
import Flow = require("../Models/Flow");
const path = require('path');
const xml2js = require("xml2js");

export class SaveFlow {

    public async execute(flow: Flow, defaultUri: vscode.Uri) {
        let saveResult;
        do {
            saveResult = await vscode.window.showSaveDialog({
                defaultUri,
                filters: {
                    'Flow': ['flow-meta.xml']
                }
        });
        } while (!saveResult);
        let baseName = path.basename(saveResult?.path, '.xml');
        let pathToWrite : String | undefined = saveResult?.fsPath;
        if(baseName.lastIndexOf('.') > -1){
            baseName = baseName.substr(0, baseName.lastIndexOf('.'));
        } else if(!baseName.includes("flow-meta")) {
            pathToWrite = saveResult?.fsPath.replace(".xml", ".flow-meta.xml");
        }
        flow.processedData.Flow.label = baseName;
        flow.processedData.Flow.interviewLabel = baseName + ' {!$Flow.CurrentDateTime}';
        return await this.writeFlow(flow, pathToWrite);
    }

    private async writeFlow(flow, pathToWrite) {
        const xml = new xml2js.Builder().buildObject(flow.processedData);
        await fs.writeFile(pathToWrite, xml);
        return true;
    }
}
