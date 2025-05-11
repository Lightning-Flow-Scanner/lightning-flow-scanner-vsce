import * as vscode from 'vscode';
import { Sidebar } from './panels/SidebarPanel';
import Commands from './commands/handlers';
import { CacheProvider } from './providers/cache-provider';
import { OutputChannel } from './providers/outputChannel';

import {
  defineExtension,
  useCommand,
  useIsDarkTheme,
  useLogger,
  watchEffect,
} from 'reactive-vscode';

export async function activate(context: vscode.ExtensionContext) {
  const useVue = process.env.LFS_USE_REACTIVE_VSCE === 'true';
  vscode.window.showInformationMessage(`LFS_USE_REACTIVE_VSCE: ${useVue}`);
  if (useVue) {
    const { activate: vueActivate } = defineExtension(() => {
      const logger = useLogger('Lightning Flow Scanner');
      logger.info('Extension Activated');
      logger.show();

      useCommand('lightningflowscanner.viewDefaultFlowRules', () => {
        // window.showInformationMessage(message.value);
        vscode.window.showInformationMessage('Hello World');
      });

      const isDark = useIsDarkTheme();
      watchEffect(() => {
        logger.info('Is Dark Theme:', isDark.value);
      });
    });
    return vueActivate(context);
  }
  OutputChannel.getInstance().logChannel.debug('initialize');

  CacheProvider.init(context, { results: [], ruleconfig: {} });

  const sidebarPanel = new Sidebar(context.extensionUri);
  const commands = new Commands(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('lfs-sb', sidebarPanel)
  );

  commands.handlers.forEach(([cmd, fn]) =>
    context.subscriptions.push(vscode.commands.registerCommand(cmd, fn))
  );
}

export function deactivate() {}
