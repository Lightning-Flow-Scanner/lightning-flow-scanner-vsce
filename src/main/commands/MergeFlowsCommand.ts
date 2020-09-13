import {ICommand} from "./interfaces/ICommand";
import {ChooseAFlow} from "../libs/ChooseAFlow";
import {MergeFlows} from "../libs/MergeFlows";
import * as vscode from "vscode";
import {SelectAFlow} from "../libs/SelectAFlow";
import {RenameFlow} from "../libs/RenameFlow";

export class MergeFlowsCommand implements ICommand {

    private readonly rootPath: undefined | vscode.WorkspaceFolder;

    constructor() {
        this.rootPath = this.getRootPath();
    }

    private getRootPath() {
        if (!vscode.workspace.getWorkspaceFolder) {
            vscode.window.showErrorMessage("Open a Project Folder first!");
            return undefined;
        } else {
            return vscode.workspace.getWorkspaceFolder;
        }
    }

    public dispose() {
    }

    public async execute() {
        const aFlow = await new SelectAFlow('Select a Flow').execute(this.rootPath);
        const aSecondFlow = await new SelectAFlow('Select another Flow').execute(this.rootPath);

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
        const renamedFlow = await new RenameFlow().execute(this.rootPath, mergedFlow);
    }

    private async chooseStartingFlow(flows) {
        return await new ChooseAFlow().execute(flows);
    }

    private async mergeFlows(flows, selectedFlowNumber) {
        return await new MergeFlows().execute(flows, selectedFlowNumber);
    }

}
