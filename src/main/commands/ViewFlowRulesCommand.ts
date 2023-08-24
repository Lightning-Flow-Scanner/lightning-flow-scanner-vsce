import {BaseCommand} from "./BaseCommand";
import * as vscode from "vscode";
import {RuleOverview} from "../panels/RuleOverview";

export class ViewFlowRulesCommand extends BaseCommand {

  constructor(context: vscode.ExtensionContext
  ) {
    super(context)
  }

  public async execute() {
    RuleOverview.createOrShow(this.context.extensionUri);
  }

}
