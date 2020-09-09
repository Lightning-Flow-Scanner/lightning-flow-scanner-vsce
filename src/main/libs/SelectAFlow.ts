import * as fs from "mz/fs";
import * as vscode from "vscode";
import { XMLParser } from "./XMLParser";
import Flow = require("../Models/Flow");

export class SelectAFlow {

    private message;

    constructor(message){
        if(message){
            this.message = message;
        }
    }

    public async execute(rootPath: vscode.Uri | undefined) {
        vscode.window.showInformationMessage(this.message);
        const selectedFlowFile = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            defaultUri: rootPath,
            filters: {
                'Flow': ['flow-meta.xml']
            }
        });
        return new Flow(await this.parseFlow(selectedFlowFile[0].path));
    }

    private async parseFlow(path) {
        const fileContent = await fs.readFile(path);
        const parser = new XMLParser();
        const parsedContent = await parser.execute(fileContent);
        const combinedRes =
            {   
                'label': parsedContent.Flow.label,
                'path': path,
                'xmldata' : parsedContent
            };
        return combinedRes;
    }
}
