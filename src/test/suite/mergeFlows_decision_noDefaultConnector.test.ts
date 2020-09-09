import "mocha";
import * as assert from "assert";
import * as vscode from "vscode";
import {MergeFlows} from "../../main/libs/MergeFlows";
import {ImportMock} from "ts-mock-imports";
import sinon = require("sinon");
import main = require("./testfiles/main-example.json");
import secondary = require("./testfiles/secondary-example.json");

describe("When merging two pre-defined flows that have a common node with a different connector, it should return a new flow based on User selection, regardless of the selection order", async function () {
    let mergeFlowsInstance: MergeFlows;
    let mainFlow;
    let secondaryFlow;
    this.timeout(0);

    before("Assume User selection is the count connector in order to link the selected flows", async function () {
        // ARRANGE
        mainFlow = {
            label: 'main',
            path: 'anypath',
            description: 'main',
            detail: 'anypath',
            flownumber: 1,
            xmldata : main
        };
        secondaryFlow = {
            label: 'sec',
            path: 'anyotherpath',
            description: 'sec',
            detail: 'anyotherpath',
            flownumber: 2,
            xmldata: secondary
        };

        const showQuickPick = sinon.stub();
        showQuickPick.onCall(0).returns({'label': undefined, 'description': 'from mail', 'flownumber': '2'});
        showQuickPick.onCall(1).returns({'label': 'Merge', 'description': 'a', 'flownumber': '2'});
        const mockManager = ImportMock.mockOther(vscode, "window", {showQuickPick});
        mergeFlowsInstance = new MergeFlows();
    });
    it("A new flow is returned containing merges according to User selection", async function () {

        // ACT
        let mergedFlow = await mergeFlowsInstance.execute(
            [
                mainFlow, secondaryFlow
            ],            1
        );

        // ASSERT
        const resultingFlow = mergedFlow.xmldata.Flow._;
        assert.strictEqual(resultingFlow.decisions[0].defaultConnector,undefined);
        assert.strictEqual(resultingFlow.decisions[0].rules.length, 2);
        const notZeroRule = resultingFlow.decisions[0].rules.find(rule => rule.name[0] === "notzero");
        assert.strictEqual(notZeroRule.connector[0].targetReference[0],"loopovercoll");
        assert.strictEqual(resultingFlow.variables.length,4);
        assert.strictEqual(resultingFlow.status[0][0],'Draft');

    });
    after("restore dependencies", function () {
        ImportMock.restore();
    });
});