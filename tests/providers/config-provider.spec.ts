import { describe, it, expect, jest } from '@jest/globals';

import { ConfigProvider } from '../../src/providers/config-provider';
import * as cosmi from 'cosmiconfig';

jest.mock('cosmiconfig');

describe('Config-Provider', () => {
  it('should be defined', () => {
    expect(ConfigProvider).toBeDefined();
  });

  it('should not error when no config', async () => {
    const cosmiMock = {
      load: jest.fn(),
      search: jest.fn(),
    };
    const cosmiSpy = jest.spyOn(cosmi, 'cosmiconfig');
    cosmiSpy.mockReturnValue(cosmiMock as any);

    const configProvider = new ConfigProvider();
    await expect(configProvider.loadConfig()).resolves.toStrictEqual({});
  });

  it('should load config when directly passed from settings', async () => {
    const cosmiMock = {
      load: jest.fn().mockImplementation(() => ({
        config: {
          rules: {
            FlowName: {
              severity: 'error',
            },
          },
          exceptions: {},
        },
        filepath: '',
      })),
      search: jest.fn(),
    };
    const cosmiSpy = jest.spyOn(cosmi, 'cosmiconfig');
    cosmiSpy.mockReturnValue(cosmiMock as any);

    const configProvider = new ConfigProvider();
    await expect(
      configProvider.loadConfig('some config')
    ).resolves.toStrictEqual({
      rules: {
        FlowName: {
          severity: 'error',
        },
      },
      exceptions: {},
    });
    expect(cosmiMock.search).not.toHaveBeenCalled();
  });

  it('should resolve a config via workspace directory', async () => {
    const cosmiMock = {
      load: jest.fn(),
      search: jest.fn().mockImplementation(() => ({
        config: {
          rules: {
            APIVersion: {
              severity: 'error',
            },
          },
          exceptions: {},
        },
        filepath: '',
      })),
    };
    const cosmiSpy = jest.spyOn(cosmi, 'cosmiconfig');
    cosmiSpy.mockReturnValue(cosmiMock as any);

    const configProvider = new ConfigProvider();
    await expect(configProvider.loadConfig()).resolves.toStrictEqual({
      rules: {
        APIVersion: {
          severity: 'error',
        },
      },
      exceptions: {},
    });
    expect(cosmiMock.load).not.toHaveBeenCalled();
  });
});
