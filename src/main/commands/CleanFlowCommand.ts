import {SelectAFlow} from "../libs/SelectAFlow";
import { BaseCommand } from "./BaseCommand";
import {BuildNewFlow} from "../libs/BuildNewFlow";
import { SaveFlow } from "../libs/SaveFlow";
import {RemoveUnusedElements} from "../libs/RemoveUnusedElements";
import {RemoveUnusedVariables} from "../libs/RemoveUnusedVariables";
import * as vscode from "vscode";
import Flow = require("../models/Flow");
import {Report} from "../panels/Report";
import {FindFlowMetadata} from "../libs/FindFlowMetadata";

export class CleanFlowCommand extends BaseCommand{

    constructor(context : vscode.ExtensionContext
    ) {
        super(context)
    }

    public async execute() {
        const selectedFlow: Flow = await new SelectAFlow(this.rootPath, 'Select a Flow to clean:').execute(this.rootPath);
        new FindFlowMetadata().execute(selectedFlow);
        new RemoveUnusedVariables().execute(selectedFlow);
        new RemoveUnusedElements().execute(selectedFlow);
        new BuildNewFlow().execute(selectedFlow);
        const result = await new SaveFlow().execute(selectedFlow, selectedFlow.uri);
        if(result){
            Report.createOrShow(this.context.extensionUri, selectedFlow);
        }
    }

}