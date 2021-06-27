import * as vscode from "vscode";
import {BaseCommand} from "./BaseCommand";
import {SaveFlow} from "../libs/SaveFlow";
import {FixReport} from "../panels/FixReport";
import {Flow} from "flowhealthcheck--core/out/main/models/Flow";
import {SelectFlows} from "../libs/SelectFlows";
import {ParseFlows} from "../libs/ParseFlows";
import * as core from "flowhealthcheck--core/out";

export class FixFlowCommand extends BaseCommand {

  constructor(context: vscode.ExtensionContext
  ) {
    super(context)
  }

  public async execute() {
    const selectedUris: vscode.Uri[] = await new SelectFlows(this.rootPath, 'Select your Flow(s):').execute(this.rootPath);
    if (selectedUris) {
      const flows: Flow[] = await new ParseFlows().execute(selectedUris);
      core.fix(flows);
      for (const flow of flows){
        const result = await new SaveFlow().execute(flow, flow.uri);
      }
    }
  }
}
