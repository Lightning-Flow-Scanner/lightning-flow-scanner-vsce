import * as vscode from "vscode";
import {getNonce} from "../libs/getNonce";
import {URI, Utils} from 'vscode-uri';
import Flow = require("../models/Flow");
import {LintReport} from "./LintReport";

export class LintFlowsReport {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: LintFlowsReport | undefined;

    public static readonly viewType = "report";

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri, flows: Flow[]) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        if (LintFlowsReport.currentPanel) {
            LintFlowsReport.currentPanel._panel.reveal(column);
            LintFlowsReport.currentPanel._update(flows);
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            LintFlowsReport.viewType,
            "Lint Flows Report",
            column || vscode.ViewColumn.One,
            {
                // Enable javascript in the webview
                enableScripts: true,

                // And restrict the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    Utils.joinPath(extensionUri, "media"),
                    Utils.joinPath(extensionUri, "out/compiled")
                ]
            }
        );
        LintFlowsReport.currentPanel = new LintFlowsReport(panel, extensionUri, flows);
    }

    public static kill() {
        LintFlowsReport.currentPanel?.dispose();
        LintFlowsReport.currentPanel = undefined;
    }

    // public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    //     LintFlowsReport.currentPanel = new LintFlowsReport(panel, extensionUri);
    // }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, flows: Flow[]) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        // Set the webview's initial html content
        this._update(flows);

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // // Handle messages from the webview
        // this._panel.webview.onDidReceiveMessage(
        //   (message) => {
        //     switch (message.command) {
        //       case "alert":
        //         vscode.window.showErrorMessage(message.text);
        //         return;
        //     }
        //   },
        //   null,
        //   this._disposables
        // );
    }

    public dispose() {
        LintFlowsReport.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private async _update(flows: Flow[]) {
        const webview = this._panel.webview;
        this._panel.webview.html = this._getHtmlForWebview(webview);
        webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "goToFile": {
                    if (!data.flow) {
                        return;
                    }
                    vscode.workspace.openTextDocument(data.flow.path).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                    break;
                }
                case "goToDetails": {
                    if (!data.flow) {
                        return;
                    }

                    LintReport.create(this._extensionUri, data.flow);
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
                        flows: flows
                    });
                    return;
                }
            }
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const scriptUri = webview.asWebviewUri(
            Utils.joinPath(this._extensionUri, "out/compiled", "LintFlowsReport.js")
        );
        // vscode css reset
        const stylesResetUri = webview.asWebviewUri(Utils.joinPath(
            this._extensionUri,
            "media",
            "reset.css"
        ));
        // vscode recommended css
        const stylesMainUri = webview.asWebviewUri(Utils.joinPath(
            this._extensionUri,
            "media",
            "vscode.css"
        ));
        const cssUri = webview.asWebviewUri(Utils.joinPath(
            this._extensionUri,
            "media",
            "LintFlowsReport.css"
        ));
        // Use a nonce to only allow specific scripts to be run
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