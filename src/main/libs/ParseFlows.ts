import * as vscode from "vscode";
import {XMLParser} from "./XMLParser";
import * as fs from "mz/fs";
import {URI} from "vscode-uri";
import path = require("path");
import { Flow } from "lightning-flow-scanner-core/out/main/models/Flow";


export class ParseFlows {

    public async execute(selectedFlowUris: vscode.Uri[]) {
        const flows: Flow[] = await this.parseFlows(selectedFlowUris);
        return flows;
    }

    private async parseFlows(selectedUris: vscode.Uri[]) {

        let parsedFlows = [];
        for (let uri of selectedUris) {
            try{
                const parsedContent: { Flow: Flow } = await new XMLParser().execute(await fs.readFile(path.normalize(uri.fsPath ? uri.fsPath : uri.path)));
                parsedFlows.push(new Flow(
                    {
                        interviewLabel: parsedContent.Flow.interviewLabel,
                        label: parsedContent.Flow.label,
                        processMetadataValues: parsedContent.Flow.processMetadataValues,
                        processType: parsedContent.Flow.processType,
                        start: parsedContent.Flow.start,
                        status: parsedContent.Flow.status,
                        uri: uri,
                        xmldata: parsedContent
                    }));
            } catch (e) {
                vscode.window.showInformationMessage(e.name + ' ' + uri);
            }
        }
        return parsedFlows;
    }
}
