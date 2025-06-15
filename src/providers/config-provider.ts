import { cosmiconfig, CosmiconfigResult } from 'cosmiconfig';
import { IRulesConfig } from 'lightning-flow-scanner-core';

export class ConfigProvider {
  public async loadConfig(configPath?: string): Promise<IRulesConfig> {
    const moduleName = 'flow-scanner';
    const searchPlaces = [
      'package.json',
      `.${moduleName}.yaml`,
      `.${moduleName}.yml`,
      `.${moduleName}.json`,
      `config/.${moduleName}.yaml`,
      `config/.${moduleName}.yml`,
      `.flow-scanner`,
    ];
    const explorer = cosmiconfig(moduleName, {
      searchPlaces,
    });
    let explorerResults: CosmiconfigResult;
    if (configPath) {
      // Forced config file name
      explorerResults = await explorer.load(configPath);
    }
    // Let cosmiconfig look for a config file
    explorerResults = explorerResults ?? (await explorer.search());
    return explorerResults?.config ?? {};
  }
}
