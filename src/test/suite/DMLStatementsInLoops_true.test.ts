import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import dmlsInLoop = require("./testfiles/allDMLStatementsInALoop.json");
import {DMLStatementInLoop} from "../../main/rules/DMLStatementInLoop";

describe("If there are any dml statements inside of a loop",async function () {
    let mainFlow;

    before("arrange",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : dmlsInLoop,
        });
    });
    it("they are flagged correctly", async function () {

        // ACT
        const dmlsInLoop = new DMLStatementInLoop().execute(mainFlow);

        // ASSERT
        assert.strictEqual(dmlsInLoop.length,4);

    });
});