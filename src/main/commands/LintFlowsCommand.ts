import { BaseCommand } from "./BaseCommand";
import * as vscode from "vscode";
import Flow = require("../models/Flow");
import { SelectFlows } from "../libs/SelectFlows";
import {ParseFlows} from "../libs/ParseFlows";
import { ScanFlows } from "../libs/ScanFlows";
import { LintFlowsReport } from "../panels/LintFlowsReport";
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