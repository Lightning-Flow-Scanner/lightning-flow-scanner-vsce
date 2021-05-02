import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import unusedVariables = require("./testfiles/unusedVariables.json");
import {UnusedVariables} from "../../main/rules/UnusedVariables";

describe("When there are any unused variables",async function () {
    let mainFlow;

    before("arrange",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : unusedVariables,
        });
    });
    it("they are flagged correctly", async function () {

        // ACT
        const unusedVariables = new UnusedVariables().execute(mainFlow);

        // ASSERT
        assert.strictEqual(unusedVariables.length,5);
    });
});