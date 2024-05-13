import * as vscode from 'vscode';
import { RuleOverview } from '../panels/RuleOverviewPanel';
import { SelectFlows } from "../libs/SelectFlows";
import { SaveFlow } from '../libs/SaveFlow';
import { ScanOverview } from "../panels/ScanOverviewPanel";
import * as core from 'lightning-flow-scanner-core/out';
import { findFlowCoverage } from '../libs/FindFlowCoverage';
import { CacheProvider } from '../providers/cache-provider';
import { testdata } from '../store/testdata';


export default class Commands {

  constructor(private context: vscode.ExtensionContext) { }

  get handlers() {
    /* eslint-disable @typescript-eslint/naming-convention */
    return Object.entries({
      'lightningflowscanner.viewDefaulFlowRules': () => this.viewDefaulFlowRules(),
      'lightningflowscanner.configRules': () => this.configRules(),
      'lightningflowscanner.debugView': () => this.debugView(),
      'lightningflowscanner.scanFlows': () => this.scanFlows(),
      'lightningflowscanner.fixFlows': () => this.fixFlows(),
      'lightningflowscanner.calculateFlowTestCoverage': () => this.calculateFlowTestCoverage()
    });
  }

  private viewDefaulFlowRules() {
    RuleOverview.createOrShow(this.context.extensionUri);
  }

  private async configRules() {
    const allRules = core.getRules();
    const ruleConfig = { rules: {} };

    let items = allRules.map((rule) => {
      return { label: rule.label, value: rule.name };
    });
    items.forEach(item => {
      item['picked'] = true;
    });

    const selectedRules = await vscode.window.showQuickPick(items, { canPickMany: true });

    for (const rule of allRules) {
      if (selectedRules.map((r) => r.value).includes(rule.name)) {
        ruleConfig.rules[rule.name] = { 'severity': 'error' };
      }
    }
    if (selectedRules.map((r) => r.value).includes('FlowName')) {
      const namingConventionString = await vscode.window.showInputBox({ 'prompt': 'Readability of a flow is very important. Setting a naming convention for the Flow Name will improve the findability/searchability and overall consistency. You can define your default naming convention using REGEX.', placeHolder: '[A-Za-z0-9]+_[A-Za-z0-9]+', value: '[A-Za-z0-9]+_[A-Za-z0-9]+' });
      ruleConfig.rules['FlowName'] = { 'severity': 'error', 'expression': namingConventionString };
      await vscode.workspace.getConfiguration().update('lightningFlowScanner.NamingConvention', namingConventionString, true);
    }
    if (selectedRules.map((r) => r.value).includes('APIVersion')) {
      const apiVersionEvalExpressionString = await vscode.window.showInputBox({ 'prompt': ' The Api Version has been available as an attribute on the Flow since API v50.0 and it is recommended to limit variation and to update them on a regular basis. Set an expression to set a valid range of API versions(Minimum 50).', placeHolder: '>50', value: '>50' });
      ruleConfig.rules['APIVersion'] = { 'severity': 'error', 'expression': apiVersionEvalExpressionString };
      await vscode.workspace.getConfiguration().update('lightningFlowScanner.APIVersion', apiVersionEvalExpressionString, true);
    }
    await CacheProvider.instance.set("ruleconfig", ruleConfig);
  }

  private async debugView() {

    let results  = testdata as unknown as core.ScanResult[];
    await CacheProvider.instance.set("results", results);
    ScanOverview.createOrShow(this.context.extensionUri, results);
    await vscode.commands.executeCommand('workbench.action.webview.openDeveloperTools');
  }

  private async calculateFlowTestCoverage() {
    const results = CacheProvider.instance.get('results');
    ScanOverview.createOrShow(this.context.extensionUri, []);
    if(results && results.length > 0){
      const coverageMap = await findFlowCoverage(results);
      const newResults = [];
      for (let result of results) {
        let flowName = result.flow.name;
        const coverage = coverageMap.get(flowName);
        result['coverage'] = coverage;
        newResults.push(result);
        await CacheProvider.instance.set('results', newResults);
        ScanOverview.createOrShow(this.context.extensionUri, newResults);
      }
    } else {
      vscode.window.showInformationMessage('No results found. Please make sure to complete a scan before calculating coverage.');
    }
    

  }



  private async scanFlows() {

    const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri;
    const selectedUris: vscode.Uri[] = await new SelectFlows(rootPath, 'Select a root folder:').execute(rootPath);
    if (selectedUris.length > 0) {

      let results: core.ScanResult[] = [];
      const panel = ScanOverview.createOrShow(this.context.extensionUri, results);
      let selected = [];
      for(let uri of selectedUris){
        selected.push(uri.path);
      }
      let configReset: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('lightningFlowScanner').get("Reset") ?? undefined;
      if (configReset) {
        await this.configRules();
      }
      const ruleConfig = CacheProvider.instance.get('ruleconfig');
      results = core.scan(await core.parse(selected), ruleConfig);
      await CacheProvider.instance.set("results", results );
      ScanOverview.createOrShow(this.context.extensionUri, results);
    } else {
      vscode.window.showInformationMessage('No flow files found.');
    }
  }

  private async fixFlows() {
    const storedResults = CacheProvider.instance.get('results');
    if (storedResults && storedResults.length > 0) {
      ScanOverview.createOrShow(this.context.extensionUri, []);
      const newResults: core.ScanResult[] = core.fix(storedResults);
      for (const newResult of newResults) {
        const uri = vscode.Uri.file(newResult.flow.fsPath);
        await new SaveFlow().execute(newResult.flow, uri);
      }
      await CacheProvider.instance.set("results", newResults);
      ScanOverview.createOrShow(this.context.extensionUri, newResults);
    }

  }
}