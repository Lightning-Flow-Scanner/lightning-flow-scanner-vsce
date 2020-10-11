import * as fs from "mz/fs";
import * as vscode from "vscode";
import {XMLParser} from "./XMLParser";
import Flow = require("../Models/Flow");
const path = require('path');

export class SelectAFlow {

    private message: string;

    constructor(rootPath: vscode.Uri, message: string) {
        this.message = message;
    }

    public async execute(flowUri : vscode.Uri) {
        vscode.window.showInformationMessage(this.message);

        // todo add while loop
        const selectedFlowFile = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            defaultUri: flowUri,
            filters: {
                'Flow': ['flow-meta.xml']
            }
        });
        return this.parseFlow(selectedFlowFile[0]);
    }

    private async parseFlow(selectedUri: vscode.Uri) {
        let aPath = path.normalize(selectedUri.fsPath);
        const parsedContent = await new XMLParser().execute(await fs.readFile(aPath));
        return new Flow(
            {
                'label': parsedContent.Flow.label,
                'uri': selectedUri,
                'xmldata': parsedContent
            }
        );
    }
}
