import {ICommand} from "../commands/interfaces/ICommand";
import * as vscode from "vscode";
import * as fs from "mz/fs";
import Flow = require("../Models/Flow");
const xml2js = require("xml2js");

export class RenameFlow {

    public async execute(rootPath: vscode.Uri, flow: Flow) {

        const saveResult = await
            vscode.window.showSaveDialog({
                defaultUri: rootPath,
                filters: {
                    'Flow': ['.flow-meta']
                }
            });

        let splitPath = saveResult?.path.split("/");
        let setPath = splitPath?.pop();
        let index;
        if (setPath.includes('.xml')) {
            index = setPath.indexOf('.flow-meta.xml');
        } else if (setPath.includes('.flow-meta')) {
            index = setPath.indexOf('.flow-meta');
        }
        const chosenName = setPath.slice(0, index);
        const newPath = splitPath.join("/") + "/" + chosenName + '.flow-meta.xml';

        flow.xmldata.Flow._.label = [chosenName];
        flow.xmldata.Flow._.interviewLabel = [chosenName + ' {!$Flow.CurrentDateTime}'];
        flow.path = newPath;
        const isSaved = await this.writeFlow(flow);
        return flow;
    }

    private async writeFlow(flow) {
        const xml = new xml2js.Builder().buildObject(flow.xmldata);
        await fs.writeFile(flow.path, xml);
        return true;
    }
}
