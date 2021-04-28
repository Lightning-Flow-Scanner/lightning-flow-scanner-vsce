import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import assignHardcodedId = require("./testfiles/assignHardcodedId.json");
import {FindHardcodedIds} from "../../main/rules/FindHardcodedIds";

describe("When there are any hardcoded ids",async function () {
    let mainFlow;

    before("A",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : assignHardcodedId,
        });
    });
    it("they are flagged correctly", async function () {

        // ACT
        new FindHardcodedIds().execute(mainFlow);

        // ASSERT
        assert.strictEqual(mainFlow.nodesWithHardcodedIds.length,1);
    });
});