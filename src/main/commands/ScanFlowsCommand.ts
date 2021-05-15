import { BaseCommand } from "./BaseCommand";
import * as vscode from "vscode";
import { SelectRules } from "../panels/SelectRules";
import {SelectFlows} from "../libs/SelectFlows";
import {ParseFlows} from "../libs/ParseFlows";
import {ScanFlows} from "../libs/ScanFlows";
import {LintFlowsReport} from "../panels/LintFlowsReport";
import Flow = require("../models/Flow");
import RuleOptions = require("../models/RuleOptions");

export class ScanFlowsCommand extends BaseCommand{

    constructor(context : vscode.ExtensionContext
    ) {
        super(context)
    }

    public async execute() {

        const selectedUris: vscode.Uri[] = await new SelectFlows(this.rootPath, 'Select your Flow(s):').execute(this.rootPath);
        if(selectedUris){
            const flows: Flow[] = await new ParseFlows().execute(selectedUris);
            new ScanFlows().execute(flows, new RuleOptions(
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ));
            LintFlowsReport.createOrShow(this.context.extensionUri, flows);
        }
    }

}