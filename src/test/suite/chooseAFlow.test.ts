import "mocha";
import * as assert from "assert";
import * as vscode from "vscode";
import { ChooseAFlow } from "../../main/libs/ChooseAFlow";
import { ImportMock } from "ts-mock-imports";

describe("When choosing a flow, the correct flownumber is returned", function () {
  let chooseAStartingFlow: ChooseAFlow;
  before("Assume first pick", function () {
    const mockManager = ImportMock.mockOther(vscode, "window", {
      showQuickPick: () => {
        return { flownumber: 1 };
      },
    });
    chooseAStartingFlow = new ChooseAFlow();
  });
  after("restore dependencies", function () {
    ImportMock.restore();
  });
  it("flownumber should equal pick", async function () {
    assert.strictEqual(await chooseAStartingFlow.execute([]), 1);
  });
});
