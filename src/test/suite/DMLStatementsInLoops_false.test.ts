import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import missingFaultPaths = require("./testfiles/MissingFaultPaths.json");
import {DMLStatementInLoop} from "../../main/rules/DMLStatementInLoop";

describe("If there are no queries inside of a loop",async function () {
    let flow;

    before("arrange",  async function () {

        // ARRANGE
        flow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : missingFaultPaths,
        });
    });
    it("they are flagged correctly", async function () {

        // ACT
        const queriesInLoops = new DMLStatementInLoop().execute(flow);

        // ASSERT
        assert.strictEqual(queriesInLoops.length,0);

    });
});