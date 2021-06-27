import "mocha";
import * as assert from "assert";
import {Flow} from "../../main/models/Flow";
import mainwithaddvars = require("./testfiles/main-add-vars-example.json");
import {UnusedVariables} from "../../main/rules/UnusedVariables";

describe("When there are any unused variables",async function () {
    let mainFlow;

    before("arrange",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : mainwithaddvars,
            detail: 'anypath'
        });
    });
    it("they are flagged correctly", async function () {

        // ACT
        const unusedVariables = new UnusedVariables().execute(mainFlow);

        // ASSERT
        assert.strictEqual(unusedVariables.length,2);
    });
});
