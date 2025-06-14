import { describe, it, expect, jest } from '@jest/globals';
import * as cmd from '../../src/commands/handlers';

import { window, ExtensionContext } from 'vscode';
import * as core from 'lightning-flow-scanner-core';
import { CacheProvider } from '../../src/providers/cache-provider';
import { OutputChannel } from '../../src/providers/outputChannel';

jest.mock('lightning-flow-scanner-core');
jest.mock('../../src/providers/cache-provider');
jest.mock('../../src/providers/outputChannel');

describe('Commands', () => {
  it('should be defined', () => {
    expect(cmd).toBeDefined();
  });

  describe('configRules', () => {
    it('should allow selection [legacy]', async () => {
      jest.spyOn(core, 'getBetaRules').mockImplementation(() => [
        {
          label: 'beta-test',
          name: 'beta-test',
        } as unknown as core.IRuleDefinition,
      ]);
      jest.spyOn(core, 'getRules').mockImplementation(() => [
        {
          label: 'Flow Name',
          name: 'FlowName',
        } as unknown as core.IRuleDefinition,
        {
          label: 'API Version',
          name: 'APIVersion',
        } as unknown as core.IRuleDefinition,
      ]);

      const windowMock = {
        showQuickPick: jest.fn().mockReturnValue([
          {
            label: 'shit',
            value: 'shit',
          },
        ]),
      } as any;

      const spy = jest.spyOn(window, 'showQuickPick').mockReturnValue([
        { label: 'Flow Name', value: 'FlowName' },
        { label: 'API Version', value: 'APIVersion' },
      ] as any);

      const instanceMock = { set: jest.fn() };
      CacheProvider.instance = instanceMock as any;

      const outputMock = { logChannel: { debug: jest.fn() } };
      const outputSpy = jest.spyOn(OutputChannel, 'getInstance'); //.getInstance = outputMock as any;
      outputSpy.mockReturnValue(outputMock as any);

      const extensionContext = jest.fn();
      const command = new cmd.default(
        extensionContext as unknown as ExtensionContext
      );

      await command['configRules']();
    });

    it('should read from configuration', async () => {});

    it('should write to configuration', async () => {});
  });
});
