import * as vscode from "vscode";
import {SelectAFlow} from "../libs/SelectAFlow";
import {BaseCommand} from "./BaseCommand";
import {BuildNewFlow} from "../libs/BuildNewFlow";
import {SaveFlow} from "../libs/SaveFlow";
import {FindUnusedElements} from "../rules/FindUnusedElements";
import {FindUnusedVariables} from "../rules/FindUnusedVariables";
import Flow = require("../models/Flow");
import {FixReport} from "../panels/FixReport";
import {FindFlowMetadata} from "../libs/FindFlowMetadata";

export class CleanFlowCommand extends BaseCommand {

    constructor(context: vscode.ExtensionContext
    ) {
        super(context)
    }

    public async execute() {
        const selectedFlow: Flow = await new SelectAFlow(this.rootPath, 'Select a Flow to clean:').execute(this.rootPath);
        new FindFlowMetadata().execute(selectedFlow);
        new FindUnusedVariables().execute(selectedFlow);
        new FindUnusedElements().execute(selectedFlow);
        new BuildNewFlow().execute(selectedFlow);
        const result = await new SaveFlow().execute(selectedFlow, selectedFlow.uri);
        if (result) {
            FixReport.createOrShow(this.context.extensionUri, selectedFlow);
        }
    }

}