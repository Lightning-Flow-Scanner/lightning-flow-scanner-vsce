import {ChooseAFlow} from "../libs/ChooseAFlow";
import {MergeFlows} from "../libs/MergeFlows";
import * as vscode from "vscode";
import {SelectAFlow} from "../libs/SelectAFlow";
import {RenameFlow} from "../libs/RenameFlow";
import { BaseCommand } from "./BaseCommand";
import {CleanFlow} from "../libs/CleanFlow";
import {SaveFlow} from "../libs/SaveFlow";

export class MergeFlowsCommand extends BaseCommand{

    private rootPath;

    constructor() {
        super();
    }

    public async execute() {
        this.rootPath = this.getRootPath();
        const aFlow = new CleanFlow().execute(await new SelectAFlow('Select a Flow').execute(this.rootPath));
        const aSecondFlow = new CleanFlow().execute(await new SelectAFlow('Select another Flow').execute(this.rootPath));

        aFlow.flownumber = 1;
        aSecondFlow.flownumber = 2;
        const selectedFlowNumber: number = await this.chooseStartingFlow([
            aFlow,
            aSecondFlow,
        ]);

        const mergedFlow = await this.mergeFlows(
            [aFlow, aSecondFlow],
            selectedFlowNumber
        );
        const renamedFlow = await new SaveFlow(this.rootPath).execute(mergedFlow);
    }

    private async chooseStartingFlow(flows) {
        return await new ChooseAFlow().execute(flows);
    }

    private async mergeFlows(flows, selectedFlowNumber) {
        return await new MergeFlows().execute(flows, selectedFlowNumber);
    }

}
