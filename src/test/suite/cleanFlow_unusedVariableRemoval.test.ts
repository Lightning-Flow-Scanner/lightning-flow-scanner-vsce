import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import {RemoveUnusedElements} from "../../main/libs/RemoveUnusedElements";
import mainwithaddvars = require("./testfiles/main-add-vars-example.json");

describe("When there are any unused variables",async function () {
    let mainFlow;

    before("A",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : mainwithaddvars,
            detail: 'anypath'
        });
    });
    it("A new flow is returned excluding these unused variables", async function () {

        // ACT
        new RemoveUnusedElements().execute(mainFlow);

        // ASSERT
        assert.strictEqual(mainFlow.flowVariables.length,3);
        assert.strictEqual(mainFlow.unusedVariables.length,2);
    });
});