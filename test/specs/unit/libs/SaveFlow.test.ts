import { describe, it, expect, jest } from '@jest/globals';
import { Flow } from 'lightning-flow-scanner-core';

import { SaveFlow } from '../../../../src/libs/SaveFlow';

import { Uri, workspace, FileSystem } from 'vscode';

describe('Save Flow', () => {
  class NoErrorThrownError extends Error {}
  const getError = async <TError>(call: () => unknown): Promise<TError> => {
    try {
      await call();
      throw new NoErrorThrownError();
    } catch (error: unknown) {
      return error as TError;
    }
  };
  it('should not encounter an error', async () => {
    const flow: Flow = {
      xmldata: {
        '@xmlns': 'http://soap.sforce.com/2006/04/metadata',
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        dynamicChoiceSets: {
          name: 'Priority',
          dataType: 'Picklist',
          displayField: {
            '@xsi:nil': 'true',
          },
          object: {
            '@xsi:nil': 'true',
          },
          picklistField: 'Priority',
          picklistObject: 'Task',
        },
      },
    } as unknown as Flow;

    const sut: SaveFlow = new SaveFlow();
    jest.spyOn(workspace, 'fs', 'get').mockReturnValue({
      writeFile: jest.fn().mockReturnValue(() => {}),
    } as unknown as FileSystem);
    const error = await getError(async () =>
      sut.execute(flow, Uri.from({ scheme: 'file', path: 'file:///home' }))
    );
    expect(error).toBeInstanceOf(NoErrorThrownError);
  });

  it('should write an xml discovery', () => {
    const flow: Flow = {
      xmldata: {
        '@xmlns': 'http://soap.sforce.com/2006/04/metadata',
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        dynamicChoiceSets: {
          name: 'Priority',
          dataType: 'Picklist',
          displayField: {
            '@xsi:nil': 'true',
          },
          object: {
            '@xsi:nil': 'true',
          },
          picklistField: 'Priority',
          picklistObject: 'Task',
        },
      },
    } as unknown as Flow;

    const sut: SaveFlow = new SaveFlow();
    jest
      .spyOn(workspace, 'fs', 'get')
      .mockReturnValue({ writeFile: jest.fn() } as unknown as FileSystem);

    sut['writeFlow'](flow, Uri.from({ scheme: 'file', path: 'file:///home' }));

    expect(sut['xml']).toBeTruthy();
    expect(sut['xml']).toContain(`<displayField xsi:nil="true"/>`);
    expect(sut['xml']).toContain(`<object xsi:nil="true"/>`);
  });

  it('should write an xml e2e', () => {
    const flow: Flow = {
      xmldata: {
        '@xmlns': 'http://soap.sforce.com/2006/04/metadata',
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        dynamicChoiceSets: {
          name: 'Priority',
          dataType: 'Picklist',
          displayField: {
            '@xsi:nil': 'true',
          },
          object: {
            '@xsi:nil': 'true',
          },
          picklistField: 'Priority',
          picklistObject: 'Task',
        },
      },
    } as unknown as Flow;

    const sut: SaveFlow = new SaveFlow();
    jest
      .spyOn(workspace, 'fs', 'get')
      .mockReturnValue({ writeFile: jest.fn() } as unknown as FileSystem);

    sut.execute(flow, Uri.from({ scheme: 'file', path: 'file:///home' }));

    expect(sut['xml']).toBeTruthy();
    expect(sut['xml']).toContain(`<displayField xsi:nil="true"/>`);
    expect(sut['xml']).toContain(`<object xsi:nil="true"/>`);
  });

  it('should not write a property on class instantiation', () => {
    const sut: SaveFlow = new SaveFlow();
    expect(sut['xml']).toBeFalsy();
    expect(sut['doc']).toBeFalsy();
  });
});
