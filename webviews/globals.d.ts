import * as _vscode from 'vscode';

//todo why types
declare global{
    const tsvscode : {
        postMessage: ({type: string, value: any}) => void;
        getState: () => any;
        setState: (state: any) => void;
    };
}