import * as fs from "mz/fs";
import * as vscode from "vscode";
import {XMLParser} from "../libs/XMLParser";
import {BaseCommand} from "./BaseCommand";
import {Flow} from "lightningflowscan-core/out/main/models/Flow";

const path = require('path');

export class CreateTestDataCommand extends BaseCommand {

  constructor(context: vscode.ExtensionContext
  ) {
    super(context)
  }

  public async execute() {
    let selectedFlowFile;
    selectedFlowFile = await vscode.window.showOpenDialog({
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: false,
      defaultUri: this.rootPath,
      filters: {
        'Flow': ['flow-meta.xml']
      }
    });
    if (selectedFlowFile) {
      this.parseFlow(selectedFlowFile[0]);
    }
  }

  private async parseFlow(selectedUri: vscode.Uri) {
    const parsedContent: { Flow: Flow } = await new XMLParser().execute(await fs.readFile(path.normalize(selectedUri.fsPath)));
    let saveResult;
    do {
      saveResult = await vscode.window.showSaveDialog({
        filters: {
          'JSON': ['json']
        }
      });
    } while (!saveResult);
    await fs.writeFile(saveResult.fsPath, JSON.stringify(parsedContent));
  }
}
