import {SelectAFlow} from "../libs/SelectAFlow";
import { BaseCommand } from "./BaseCommand";
import {BuildNewFlow} from "../libs/BuildNewFlow";
import {FindUnusedElements} from "../rules/FindUnusedElements";
import {FindUnusedVariables} from "../rules/FindUnusedVariables";
import * as vscode from "vscode";
import Flow = require("../models/Flow");
import {FindFlowMetadata} from "../libs/FindFlowMetadata";
import {LintReport} from "../panels/LintReport";
import {FindHardcodedIds} from "../rules/FindHardcodedIds";

export class LintFlowCommand extends BaseCommand{

    constructor(context : vscode.ExtensionContext
    ) {
        super(context)
    }

    public async execute() {
        const selectedFlow: Flow = await new SelectAFlow(this.rootPath, 'Select a Flow to clean:').execute(this.rootPath);
        new FindFlowMetadata().execute(selectedFlow);
        new FindUnusedVariables().execute(selectedFlow);
        new FindUnusedElements().execute(selectedFlow);
        new FindHardcodedIds().execute(selectedFlow);
        new BuildNewFlow().execute(selectedFlow);
        LintReport.createOrShow(this.context.extensionUri, selectedFlow);
    }

}