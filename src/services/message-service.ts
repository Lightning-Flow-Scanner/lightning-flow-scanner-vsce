import { CacheProvider } from '../providers/cache-provider';
import * as vscode from 'vscode';

export default class MessageService {
  constructor(private webview: vscode.Webview) {}

  onInfo(query: object) {
    if (!('value' in query)) {
      return;
    }
    vscode.window.showInformationMessage(query.value as string);
  }

  onError(query: object) {
    if (!('value' in query)) {
      return;
    }
    vscode.window.showErrorMessage(query.value as string);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  viewRules(query: unknown) {
    vscode.commands.executeCommand('lightningflowscanner.viewDefaulFlowRules');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scanFlows(query: unknown) {
    vscode.commands.executeCommand('lightningflowscanner.scanFlows');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fixFlows(query: unknown) {
    vscode.commands.executeCommand('lightningflowscanner.fixFlows');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  runTests(query: unknown) {
    vscode.commands.executeCommand(
      'lightningflowscanner.calculateFlowTestCoverage'
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configRules(query: unknown) {
    vscode.commands.executeCommand('lightningflowscanner.configRules');
  }

  // Todo implement Cache in Front end components

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCache(query: any) {
    const { nonce, key } = query;
    this.sendResponse(
      () => Promise.resolve(CacheProvider.instance.get(key)),
      nonce
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCache(query: any) {
    const { nonce, key, value } = query;
    this.sendResponse(
      () => Promise.resolve(CacheProvider.instance.set(key, value)),
      nonce
    );
  }

  private async sendResponse(fetchData: () => unknown, nonce: string) {
    try {
      const result = await fetchData();
      this.webview.postMessage({
        ok: true,
        data: result,
        nonce,
      });
    } catch (e) {
      this.webview.postMessage({
        ok: false,
        error: e?.message || 'generic_error',
        nonce,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onVsMessage(data: any) {
    const { type, ...query } = data;
    if (type in this) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[type](query);
    } else {
      this.sendResponse(() => Promise.reject('method not found'), query.nonce);
    }
  }
}
