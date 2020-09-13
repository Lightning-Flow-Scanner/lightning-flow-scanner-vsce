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

        let flowMetadata = flow.xmldata.Flow._ ? flow.xmldata.Flow._ : flow.xmldata.Flow;
        flowMetadata.label = [chosenName];
        flowMetadata.interviewLabel = [chosenName + ' {!$Flow.CurrentDateTime}'];
        flow.path = newPath;
        const isSaved = await this.writeFlow(flow);
        return flow;
    }

    private async writeFlow(flow) {
        const xml = new xml2js.Builder().buildObject(flow.xmldata);
        let path = flow.path;
        if(path.startsWith("/C:")){
            path = path.substring(3, path.length);
            path = path.replace("..", ".");
        }

        await fs.writeFile(path, xml);
        return true;
    }
}
