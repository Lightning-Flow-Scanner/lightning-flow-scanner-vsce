import * as vscode from "vscode";
import {SelectAFlow} from "../libs/SelectAFlow";
import {BaseCommand} from "./BaseCommand";
import {BuildNewFlow} from "../libs/BuildNewFlow";
import {SaveFlow} from "../libs/SaveFlow";
import {FixReport} from "../panels/FixReport";
import {Flow} from "flowhealthcheck--core/out/main/models/Flow";
import {UnconnectedElements} from "flowhealthcheck--core/out/main/rules/UnconnectedElements";
import {UnusedVariables} from "flowhealthcheck--core/out/main/rules/UnusedVariables";
import {FlowVariable} from "flowhealthcheck--core/out/main/models/FlowVariable";
import {FlowElement} from "flowhealthcheck--core/out/main/models/FlowElement";

export class FixFlowCommand extends BaseCommand {

  constructor(context: vscode.ExtensionContext
  ) {
    super(context)
  }

  public async execute() {
    const selectedFlow: Flow = await new SelectAFlow(this.rootPath, 'Select a Flow to clean:').execute(this.rootPath);
    if (selectedFlow) {
      selectedFlow.unusedVariables = new UnusedVariables().execute(selectedFlow) as FlowVariable[];
      selectedFlow.unconnectedElements = new UnconnectedElements().execute(selectedFlow) as FlowElement[];
      selectedFlow.processedData = new BuildNewFlow().execute(selectedFlow);
      const result = await new SaveFlow().execute(selectedFlow, selectedFlow.uri);
      if (result) {
        FixReport.createOrShow(this.context.extensionUri, selectedFlow);
      }
    }
  }
}
