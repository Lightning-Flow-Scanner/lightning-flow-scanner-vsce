import { BaseCommand } from "./BaseCommand";
import * as vscode from "vscode";
import { SelectRules } from "../panels/SelectRules";

export class LintFlowsCommand extends BaseCommand{

    constructor(context : vscode.ExtensionContext
    ) {
        super(context)
    }

    public async execute() {

        SelectRules.createOrShow(this.rootPath, this.context.extensionUri);
    }

}