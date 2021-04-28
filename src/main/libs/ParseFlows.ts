import * as vscode from "vscode";
import {XMLParser} from "./XMLParser";
import * as fs from "mz/fs";
import {URI} from "vscode-uri";
import Flow = require("../models/Flow");
import path = require("path");


export class ParseFlows {

    public async execute(selectedFlowUris: vscode.Uri[]) {
        const flows: Flow[] = await this.parseFlows(selectedFlowUris);
        return flows;
    }

    private async parseFlows(selectedUris: vscode.Uri[]) {

        let parsedFlows = [];
        for (let uri of selectedUris) {
            const parsedContent: { Flow: Flow } = await new XMLParser().execute(await fs.readFile(path.normalize(uri.fsPath)));
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
        }
        return parsedFlows;
    }
}
