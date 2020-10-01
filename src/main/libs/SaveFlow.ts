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
        const chosenPath = path.resolve(saveResult.path);
        const newPath = path.join(path.dirname(chosenPath), path.basename(chosenPath, path.extname(chosenPath)) + '.flow-meta.xml');
        flow.processedData.Flow.label = path.basename(chosenPath);
        flow.path = newPath.fsPath;
        flow.processedData.Flow.interviewLabel = path.basename(chosenPath) + ' {!$Flow.CurrentDateTime}';
        return await this.writeFlow(flow, newPath);
    }

    private async writeFlow(flow, pathToWrite) {
        const xml = new xml2js.Builder().buildObject(flow.processedData);
        await fs.writeFile(pathToWrite, xml);
        return true;
    }
}
