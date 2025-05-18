import { describe, it, expect, jest } from '@jest/globals';
import { initialize, activate } from '../src/vue-extension';
import * as rvs from 'reactive-vscode';
import * as vw from '../src/webviews/views/sidebar';

jest.mock('reactive-vscode', () => ({
  defineExtension: jest
    .fn()
    .mockImplementation(() => ({ activate: jest.fn() })),
  useLogger: jest.fn().mockImplementation(() => ({
    info: jest.fn(),
    show: jest.fn(),
  })),
  useCommand: jest.fn(),
  useIsDarkTheme: jest.fn(),
  watchEffect: jest.fn(),
}));
jest.mock('../src/webviews/views/sidebar', () => ({
  useSidebarView: jest.fn(),
}));

describe('Vue Extension', () => {
  it('should be defined with active', () => {
    expect(initialize).toBeDefined();
    expect(activate).toBeDefined();
  });

  describe('initialize', () => {
    it('should call log initialization', () => {
      const infoSpy = jest.spyOn(rvs, 'useLogger');
      const showSpy = jest.spyOn(vw, 'useSidebarView');
      initialize();
      expect(infoSpy).toHaveBeenCalled();
      expect(showSpy).toHaveBeenCalled();
    });
  });
});
