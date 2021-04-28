import * as fs from "mz/fs";
import * as vscode from "vscode";
import {XMLParser} from "./XMLParser";
import Flow = require("../models/Flow");
const path = require('path');

export class SelectFlows {

    private message: string;

    constructor(rootPath: vscode.Uri, message: string) {
        this.message = message;
    }

    public async execute(initialPath : vscode.Uri) {
        vscode.window.showInformationMessage(this.message);

        let selectedFlows;
        do {
            selectedFlows = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: true,
                canSelectMany: true,
                defaultUri: initialPath,
                filters: {
                    'Flow': ['flow-meta.xml']
                }
            });
        } while (!selectedFlows);
        return selectedFlows;
    }

}
