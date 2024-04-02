import * as vscode from 'vscode';
import { Sidebar } from './panels/SidebarPanel';
import Commands from './commands/handlers';
import { CacheProvider } from './providers/cache-provider';

export async function activate(context: vscode.ExtensionContext) {

	CacheProvider.init(context, {'results' : [], 'ruleconfig': {}});

	const sidebarPanel = new Sidebar(context.extensionUri);
	const commands = new Commands(context);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'lfs-sb',
			sidebarPanel
		)
	);

	commands.handlers.forEach(([cmd, fn]) =>
		context.subscriptions.push(vscode.commands.registerCommand(cmd, fn))
	);

}

export function deactivate() { }
