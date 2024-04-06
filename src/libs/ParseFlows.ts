import * as vscode from "vscode";
import * as core from "lightning-flow-scanner-core/out/index";

export class ParseFlows {

    public async execute(selectedFlowUris: vscode.Uri[]) {
        const flows: core.Flow[] = await core.parse(selectedFlowUris.map((u)=>u.fsPath));
        return flows;
    }

}
