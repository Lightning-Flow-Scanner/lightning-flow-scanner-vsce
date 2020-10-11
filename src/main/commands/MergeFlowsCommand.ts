import {ChooseAFlow} from "../libs/ChooseAFlow";
import {MergeFlows} from "../libs/MergeFlows";
import * as vscode from "vscode";
import {SelectAFlow} from "../libs/SelectAFlow";
import { BaseCommand } from "./BaseCommand";
import {CleanFlow} from "../libs/CleanFlow";
import {SaveFlow} from "../libs/SaveFlow";
import Flow = require("../Models/Flow");
const path = require('path');

export class MergeFlowsCommand extends BaseCommand{

    constructor() {
        super();
    }

    public async execute() {
        const aFlow: Flow = new CleanFlow().execute(await new SelectAFlow('Select A Flow').execute(this.rootPath));
        const aSecondFlow: Flow = new CleanFlow().execute(await new SelectAFlow('Select Another Flow').execute(vscode.Uri.parse(path.dirname(aFlow.path))));
        aFlow.flownumber = 1;
        aSecondFlow.flownumber = 2;
        const selectedFlowNumber: number = await this.chooseStartingFlow([
            aFlow,
            aSecondFlow,
        ]);
        const mergedFlow: Flow = await this.mergeFlows(
            [aFlow, aSecondFlow],
            selectedFlowNumber
        );
        const result : Boolean = await new SaveFlow().execute(mergedFlow, this.rootPath);
        if(result && vscode.Uri.parse(mergedFlow.path)){
            vscode.workspace.openTextDocument(vscode.Uri.parse(mergedFlow.path)).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        }
    }

    private async chooseStartingFlow(flows) {
        return await new ChooseAFlow().execute(flows);
    }

    private async mergeFlows(flows, selectedFlowNumber) {
        return await new MergeFlows().execute(flows, selectedFlowNumber);
    }

}
