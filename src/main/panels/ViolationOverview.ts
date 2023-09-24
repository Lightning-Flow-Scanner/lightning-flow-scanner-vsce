import * as vscode from "vscode";
import { getNonce } from "../libs/getNonce";
import { URI, Utils } from 'vscode-uri';
import { ScanResult } from "lightning-flow-scanner-core/out/main/models/ScanResult";
import { ScanOverview } from "./ScanOverview";
import * as fs from "mz/fs";
import { convertArrayToCSV } from "convert-array-to-csv";

export class ViolationOverview {

    public static currentPanel: ViolationOverview | undefined;
    public static readonly viewType = "report";
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];
    private isDownloading = false;

    public static createOrShow(extensionUri: vscode.Uri, scanResults: ScanResult[], tab : string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        let title = tab ? "Results " + tab : "All Results";
        if (ViolationOverview.currentPanel && ViolationOverview.currentPanel._panel.title === title) {
            ViolationOverview.currentPanel._panel.reveal(column);
            ViolationOverview.currentPanel._update(scanResults);
            return;
        }
        
        const panel = vscode.window.createWebviewPanel(
            ViolationOverview.viewType,
            `${title}`,
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    Utils.joinPath(extensionUri, "media"),
                    Utils.joinPath(extensionUri, "out/compiled")
                ]
            }
        );
        ViolationOverview.currentPanel = new ViolationOverview(panel, extensionUri, scanResults);
    }

    public static kill() {
        ViolationOverview.currentPanel?.dispose();
        ViolationOverview.currentPanel = undefined;
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, scanResult: ScanResult[]) {
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._update(scanResult);
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public dispose() {
        ViolationOverview.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private async _update(scanResults: ScanResult[]) {
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
                case "overview": {
                    if (!data.value) {
                        return;
                    }
                    ScanOverview.createOrShow(this._extensionUri, data.value);
                    break;
                }
                case 'init-view': {
                    webview.postMessage({
                        type: 'init',
                        value: scanResults
                    });
                    return;
                }
                case 'download': {
                    if (!this.isDownloading && data.value) {
                        this.isDownloading = true;
                        let saveResult;
                        do {
                            saveResult = await vscode.window.showSaveDialog({
                                defaultUri: vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.fsPath),
                                filters: {
                                    'csv': ['.csv']
                                }
                            });
                        } while (!saveResult);
                        const csv = convertArrayToCSV(data.value);
                        await fs.writeFile(saveResult.fsPath, csv);
                        vscode.window.showInformationMessage('Downloaded file: ' + saveResult.fsPath);
                        this.isDownloading = false;
                    }
                }
            }
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const scriptUri = webview.asWebviewUri(
            Utils.joinPath(this._extensionUri, "out/compiled", "ViolationOverview.js")
        );
        const cssUri = webview.asWebviewUri(
            Utils.joinPath(this._extensionUri, "out/compiled", "ViolationOverview.css")
        );
        const tabulatorStyles = webview.asWebviewUri(Utils.joinPath(
            this._extensionUri,
            "media",
            "tabulator.css"
        ));
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
        const nonce = getNonce();
        return `
            <!DOCTYPE html>
			<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="${tabulatorStyles}" rel="stylesheet">
                    <link href="${stylesResetUri}" rel="stylesheet">
                    <link href="${stylesMainUri}" rel="stylesheet">
                    <link href="${cssUri}" rel="stylesheet">
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
