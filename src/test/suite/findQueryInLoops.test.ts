import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import queryInLoop = require("./testfiles/queryinaloop.json");
import {DMLStatementInLoop} from "../../main/rules/DMLStatementInLoop";

describe("If there are any DML queries inside of a loop",async function () {
    let mainFlow;

    before("arrange",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : queryInLoop,
        });
    });
    it("they are flagged correctly", async function () {

        // ACT
        const queriesInLoops = new DMLStatementInLoop().execute(mainFlow);

        // ASSERT
        assert.strictEqual(queriesInLoops.length,1);

    });
});