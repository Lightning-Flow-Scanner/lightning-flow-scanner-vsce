import {Disposable} from 'vscode';

export interface ICommand extends Disposable {

  execute(uri?: vscode.Uri);
}