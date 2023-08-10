import * as vscode from "vscode";
import {getNonce} from "../libs/getNonce";
import {URI, Utils} from 'vscode-uri';
import {FlowReport} from "./FlowReport";
import {ScanResult} from "lightning-flow-scanner-core/out/main/models/ScanResult";

export class ScanOverview {

    public static currentPanel: ScanOverview | undefined;
    public static readonly viewType = "report";
    private static _commandType: string;
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri, scanResults: ScanResult[], type: string) {
      this._commandType = type;
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (ScanOverview.currentPanel && ScanOverview._commandType === type) {
            ScanOverview.currentPanel._panel.reveal(column);
            ScanOverview.currentPanel._update(scanResults, type);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            ScanOverview.viewType,
          this._commandType + " Results",
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    Utils.joinPath(extensionUri, "media"),
                    Utils.joinPath(extensionUri, "out/compiled")
                ]
            }
        );
        ScanOverview.currentPanel = new ScanOverview(panel, extensionUri, scanResults, type);
    }

    public static kill() {
        ScanOverview.currentPanel?.dispose();
        ScanOverview.currentPanel = undefined;
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, scanResults: ScanResult[], type: string) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        this._update(scanResults, type);
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public dispose() {
        ScanOverview.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private async _update(scanResults: ScanResult[], type: string) {
        const webview = this._panel.webview;
        this._panel.webview.html = this._getHtmlForWebview(webview);
        webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "goToFile": {
                    if (!data.value) {
                        return;
                    }
                    vscode.workspace.openTextDocument(data.value.path).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                    break;
                }
                case "goToDetails": {
                    if (!data.value) {
                        return;
                    }
                    FlowReport.create(this._extensionUri, data.value, type);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
                case 'init-view': {
                    webview.postMessage({
                        type: 'init',
                        value: scanResults
                    });
                    return;
                }
            }
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const scriptUri = webview.asWebviewUri(
            Utils.joinPath(this._extensionUri, "out/compiled", "ScanOverview.js")
        );
        const stylesResetUri = webview.asWebviewUri(Utils.joinPath(
            this._extensionUri,
            "media",
            "reset.css"
        ));
        const stylesMainUri = webview.asWebviewUri(Utils.joinPath(
            this._extensionUri,
            "media",
            "vscode.css"
        ));
        const cssUri = webview.asWebviewUri(Utils.joinPath(
            this._extensionUri,
            "media",
            "ScanOverview.css"
        ));
        const spinnerUri = webview.asWebviewUri(Utils.joinPath(
            this._extensionUri,
            "media",
            "Spinner.css"
        ));
        const nonce = getNonce();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesResetUri}" rel="stylesheet">
        <link href="${stylesMainUri}" rel="stylesheet">
        <link href="${cssUri}" rel="stylesheet">
        <link href="${spinnerUri}" rel="stylesheet">
        <script nonce="${nonce}">
        const tsvscode = acquireVsCodeApi();
        </script>
			</head>
      <body>
            <script src="${scriptUri}" nonce="${nonce}"></script>
			</body>
			</html>`;
    }

}
