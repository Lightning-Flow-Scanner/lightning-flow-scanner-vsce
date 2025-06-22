import { describe, it, expect, jest, beforeEach } from '@jest/globals';

import { ConfigProvider } from '../../src/providers/config-provider';

import * as yml from 'yaml';
import * as vsce from 'vscode';

jest.mock('yaml');
jest.mock('vscode');

describe('Config-Provider', () => {
  let provider: ConfigProvider;
  const mockFs: any = {};
  const mockWorkspace: any = {};
  const mockUri = (path: string) => ({ fsPath: path, path });

  beforeEach(() => {
    provider = new ConfigProvider();
    jest.clearAllMocks();
    // Mock VSCE
    mockFs.stat = jest.fn();
    mockFs.readFile = jest.fn();
    mockFs.writeFile = jest.fn();
    (vsce.workspace.fs as any).stat = mockFs.stat;
    (vsce.workspace.fs as any).readFile = mockFs.readFile;
    (vsce.workspace.fs as any).writeFile = mockFs.writeFile;
    if (vsce.Uri) {
      (vsce.Uri as any).file = mockUri;
    }
    // Mock YAML
    jest.spyOn(yml, 'parse').mockImplementation(() => jest.fn());
    jest.spyOn(yml, 'Document').mockImplementation((c: any) => c);
    // TextEncoder
    (global as any).TextEncoder = class {
      encode(str: string) {
        return Buffer.from(str);
      }
    };
  });

  it('should be defined', () => {
    expect(ConfigProvider).toBeDefined();
  });

  it('discover: finds JSON config', async () => {
    mockFs.stat.mockResolvedValueOnce(true);
    mockFs.readFile.mockResolvedValueOnce(Buffer.from('{"foo":1}'));
    (yml as any).parse.mockReturnValue({ foo: 1 });
    const config = await provider.discover('/path');
    expect(config).toBeDefined();
    expect(config.config).toEqual({ foo: 1 });
  });

  it('discover: finds YAML config', async () => {
    mockFs.stat.mockRejectedValueOnce(new Error('not found'));
    mockFs.stat.mockRejectedValueOnce(new Error('not found'));
    mockFs.stat.mockResolvedValueOnce(true);
    mockFs.readFile.mockResolvedValueOnce(Buffer.from('bar: 2'));
    (yml as any).parse.mockReturnValue({ bar: 2 });
    const config = await provider.discover('/path');
    expect(config).toBeDefined();
    expect(config.config).toEqual({ bar: 2 });
  });

  it('discover: creates new config if not found', async () => {
    mockFs.stat.mockRejectedValue(new Error('not found'));
    mockFs.writeFile.mockResolvedValueOnce(undefined);
    const config = await provider.discover('/path');
    expect(config).toBeDefined();
    expect(config.fspath).toContain('/path/.flow-scanner.yml');
    expect(mockFs.writeFile).toHaveBeenCalled();
  });

  it('writeConfigFile: writes a new config file', async () => {
    mockFs.writeFile.mockResolvedValueOnce(undefined);
    const result = await (provider as any).writeConfigFile(
      'flow-scanner',
      '/base'
    );
    expect(result.fspath).toContain('/base/.flow-scanner.yml');
    expect(mockFs.writeFile).toHaveBeenCalled();
  });

  it('attemptToReadConfig: returns config if file exists', async () => {
    mockFs.stat.mockResolvedValueOnce(true);
    mockFs.readFile.mockResolvedValueOnce(Buffer.from('{"a":3}'));
    const parser = jest.fn().mockReturnValue({ a: 3 });
    const result = await (provider as any).attemptToReadConfig(
      '/foo',
      ['bar.json'],
      parser
    );
    expect(result).toBeDefined();
    expect(result.config).toEqual({ a: 3 });
  });

  it('attemptToReadConfig: returns null if file does not exist', async () => {
    mockFs.stat.mockRejectedValue(new Error('not found'));
    const parser = jest.fn();
    const result = await (provider as any).attemptToReadConfig(
      '/foo',
      ['bar.json'],
      parser
    );
    expect(result).toBeUndefined();
  });

  it('loadConfig: returns config from discover', async () => {
    const fakeConfig = { rules: { test: { severity: 'error' } } };
    jest
      .spyOn(provider, 'discover')
      .mockResolvedValueOnce({ fspath: '/f', config: fakeConfig });
    const result = await provider.loadConfig('/some');
    expect(result).toEqual(fakeConfig);
  });
});
