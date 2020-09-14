import * as fs from "mz/fs";
import * as vscode from "vscode";
import { XMLParser } from "./XMLParser";
import Flow = require("../Models/Flow");
import {CleanFlow} from "./CleanFlow";

//todo use path

export class SelectAFlow {

    private message;
    private preprocess = false;

    constructor(message, preprocess){
            this.message = message;
            this.preprocess = preprocess;
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

    private async parseFlow(apath) {
        let tp = apath;
        if(tp.startsWith("/C:")){
            tp = tp.substring(3, tp.length);
        }
        const parsedContent = await new XMLParser().execute(await fs.readFile(tp));

        if(this.preprocess){
            return new CleanFlow().execute(new Flow(
                {
                    'label': parsedContent.Flow.label,
                    'path': tp,
                    'xmldata' : parsedContent
                }
            ));
        } else {
            return new Flow(
                {
                    'label': parsedContent.Flow.label,
                    'path': tp,
                    'xmldata' : parsedContent
                }
            );
        }
    }
}
