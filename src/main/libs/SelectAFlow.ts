import * as fs from "mz/fs";
import * as vscode from "vscode";
import {XMLParser} from "./XMLParser";
import { Flow } from "flowhealthcheck--core/out/main/models/Flow";

const path = require('path');

export class SelectAFlow {

    private message: string;

    constructor(rootPath: vscode.Uri, message: string) {
        this.message = message;
    }

    public async execute(flowUri: vscode.Uri) {
        vscode.window.showInformationMessage(this.message);

        let selectedFlowFile;
        selectedFlowFile = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            defaultUri: flowUri,
            filters: {
                'Flow': ['flow-meta.xml']
            }
        });
        let parsedFlow;
        if(selectedFlowFile){
            parsedFlow = this.parseFlow(selectedFlowFile[0]);
        }
        return parsedFlow;
    }

    private async parseFlow(selectedUri: vscode.Uri) {
        const parsedContent: { Flow: Flow } = await new XMLParser().execute(await fs.readFile(path.normalize(selectedUri.fsPath)));
        return new Flow(
            {
                uri: selectedUri,
                xmldata: parsedContent
            }
        );
    }
}
