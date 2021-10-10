import {RunSFDXCommand} from "./RunCommand";

export interface SFDX {
  status: number,
  result: {
    id: string,
    accessToken: string,
    instanceUrl: string,
    username: string,
    clientId: string,
    connectedStatus: string,
    alias: string
  }
}

export class GetOrgInfo {

  public getOrgInfo(): Promise<SFDX> {

    return RunSFDXCommand('sfdx force:org:display --json') as Promise<SFDX>;
  }
}
