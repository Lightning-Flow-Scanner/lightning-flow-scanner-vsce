
import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import combinedNullCheck = require("./testfiles/testNullCheckAssignment.json");
import {MissingNullHandler} from "../../main/rules/MissingNullHandler";

describe("When there no null handler for results of get operations",async function () {
    let flow;

    before("arrange",  async function () {

        // ARRANGE
        flow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : combinedNullCheck,
            detail: 'anypath'
        });
    });
    it("these get operations are flagged", async function () {

        // ACT
        const missingNullHandlers = new MissingNullHandler().execute(flow);

        // ASSERT
        assert.strictEqual(missingNullHandlers.length, 1);
    });
});