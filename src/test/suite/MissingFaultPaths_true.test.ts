import "mocha";
import * as assert from "assert";
import {Flow} from "../../main/models/Flow";
import {MissingFaultPath} from "../../main/rules/MissingFaultPath";
import MissingFaultPathsFlow = require("./testfiles/MissingFaultPaths.json");

describe("When there are any fault paths missing",async function () {
    let flow;

    before("arrange",  async function () {

        // ARRANGE
        flow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : MissingFaultPathsFlow,
            detail: 'anypath'
        });
    });
    it("they are flagged correctly", async function () {

        // ACT
        const missingFaultPaths = new MissingFaultPath().execute(flow);

        // ASSERT
        assert.strictEqual(missingFaultPaths.length,5);
    });
});
