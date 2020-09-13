import "mocha";
import * as assert from "assert";
import * as vscode from "vscode";
import {MergeFlows} from "../../main/libs/MergeFlows";
import {ImportMock} from "ts-mock-imports";
import main = require("./testfiles/main-example.json");
import mainwithaddvars = require("./testfiles/main-add-vars-example.json");
import Flow = require("../../main/Models/Flow");

describe("When merging two pre-defined flows that have a different variables",async function () {
    let mergeFlowsInstance: MergeFlows;
    let mainFlow;
    let secondaryFlow;
    this.timeout(0);

    before("Assume User selection is the count connector in order to link the selected flows",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : main,
            description: 'main',
            detail: 'anypath'
        });
        mainFlow.flownumber = 1;
        secondaryFlow = new Flow({
            label: 'sec',
            path: 'anyotherpath',
            description: 'sec',
            detail: 'anyotherpath',
            xmldata: mainwithaddvars
        });
        secondaryFlow.flownumber = 2;

        const mockManager = ImportMock.mockOther(vscode, "window", {
            showQuickPick: () => {
                return {'label': 'count', 'description': 'from mail', 'flownumber': 1};
            },
        });
        mergeFlowsInstance = new MergeFlows();
    });
    it("A new flow is returned containing the variables from both source flows", async function () {

        // ACT
        let mergedFlow = await mergeFlowsInstance.execute(
            [
                mainFlow, secondaryFlow
            ],
            1
        );

        // ASSERT
        const resultingFlow = mergedFlow.xmldata.Flow._;
        assert.strictEqual(resultingFlow.status[0][0],'Draft');
        assert.strictEqual(resultingFlow.variables.find((variable )=> "anotherVar" === variable.name[0]).name[0], "anotherVar");
        assert.strictEqual(resultingFlow.variables.length,5);    });
    after("restore dependencies", function () {
        ImportMock.restore();
    });
});