import {ChooseAFlow} from "../libs/ChooseAFlow";
import {MergeFlows} from "../libs/MergeFlows";
import * as vscode from "vscode";
import {SelectAFlow} from "../libs/SelectAFlow";
import { BaseCommand } from "./BaseCommand";
import {RemoveUnusedElements} from "../libs/RemoveUnusedElements";
import {SaveFlow} from "../libs/SaveFlow";
import Flow = require("../models/Flow");
const path = require('path');

export class MergeFlowsCommand extends BaseCommand{

    constructor(context : vscode.ExtensionContext) {
        super(context);
    }

    public async execute() {
        // const aFlow: Flow = new RemoveUnusedElements().execute(await new SelectAFlow(this.rootPath, 'Select A Flow').execute(this.rootPath));
        // const basePath = vscode.Uri.file(path.dirname(aFlow.uri.path));
        // const aSecondFlow: Flow = new RemoveUnusedElements().execute(await new SelectAFlow(this.rootPath, 'Select Another Flow').execute(basePath));
        // aFlow.flowNumber = 1;
        // aSecondFlow.flowNumber = 2;
        // const selectedFlowNumber: number = await this.chooseStartingFlow([
        //     aFlow,
        //     aSecondFlow,
        // ]);
        // const mergedFlow: Flow = await this.mergeFlows(
        //     [aFlow, aSecondFlow],
        //     selectedFlowNumber
        // );
        // const result : String = await new SaveFlow().execute(mergedFlow, basePath);
        // if(result && mergedFlow.path){
        //     vscode.workspace.openTextDocument(mergedFlow.flowUri).then(doc => {
        //         vscode.window.showTextDocument(doc);
        //     });
        // }
    }

    // private async chooseStartingFlow(flows) {
    //     return await new ChooseAFlow().execute(flows);
    // }
    //
    // private async mergeFlows(flows, selectedFlowNumber) {
    //     return await new MergeFlows().execute(flows, selectedFlowNumber);
    // }

}
