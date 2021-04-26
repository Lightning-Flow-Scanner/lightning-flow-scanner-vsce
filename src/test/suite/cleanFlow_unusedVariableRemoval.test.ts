import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import mainwithaddvars = require("./testfiles/main-add-vars-example.json");
import {FindUnusedVariables} from "../../main/rules/FindUnusedVariables";

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
        new FindUnusedVariables().execute(mainFlow);

        // ASSERT
        assert.strictEqual(mainFlow.unusedVariables.length,2);
    });
});