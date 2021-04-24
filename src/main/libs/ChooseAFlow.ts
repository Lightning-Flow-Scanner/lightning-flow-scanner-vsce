import * as vscode from "vscode";

export class ChooseAFlow {

  private options: vscode.QuickPickOptions;
    
  constructor(){
    this.options = { 
      matchOnDetail: false,
      matchOnDescription: true,
      canPickMany: false,
      placeHolder: "Which Flow should be used as a starting point?",
    };
  }

  public async execute(flows) {
    let flowDisplayOptions = [];
    for(let flow of flows){
      let opt = {
        label :flow.label[0],
        description :"",
        detail: flow.path,
        flowNumber: flow.flowNumber
      };
      flowDisplayOptions.push(opt);
    }
    let selection = await vscode.window.showQuickPick(flowDisplayOptions, this.options);
    if (!selection) {
      vscode.window.showInformationMessage("Which Flow should be used as a starting point?");
      return;
    }
    return selection.flowNumber;
  }
  
}
 