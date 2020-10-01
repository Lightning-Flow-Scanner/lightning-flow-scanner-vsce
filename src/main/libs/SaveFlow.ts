import * as vscode from "vscode";
import * as fs from "mz/fs";
import Flow = require("../Models/Flow");
const path = require('path');
const xml2js = require("xml2js");

export class SaveFlow {

    public async execute(flow: Flow, defaultPath: vscode.Uri) {
        const saveResult = await vscode.window.showSaveDialog({
                defaultUri: defaultPath,
                filters: {
                    'Flow': ['flow-meta.xml']
                }
        });
        let baseName = path.basename(saveResult.path, '.xml');
        baseName = baseName.substr(0, baseName.lastIndexOf('.'));
        flow.processedData.Flow.label = baseName;
        flow.path = saveResult.fsPath;
        flow.processedData.Flow.interviewLabel = baseName + ' {!$Flow.CurrentDateTime}';
        return await this.writeFlow(flow, saveResult.fsPath);
    }

    private async writeFlow(flow, pathToWrite) {
        const xml = new xml2js.Builder().buildObject(flow.processedData);
        await fs.writeFile(pathToWrite, xml);
        return true;
    }
}
