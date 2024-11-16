import * as vscode from 'vscode';

// Usage in the OutputChannel class
export class OutputChannel {
  private static instance: OutputChannel;

  private constructor(public logChannel: vscode.LogOutputChannel) {}

  public static getInstance(): OutputChannel {
    if (!this.instance) {
      this.instance = new OutputChannel(
        vscode.window.createOutputChannel('Lightning Flow Scanner', {
          log: true,
        })
      );
    }
    return this.instance;
  }
}
