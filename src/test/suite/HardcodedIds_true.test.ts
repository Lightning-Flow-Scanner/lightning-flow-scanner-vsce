import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import assignHardcodedId = require("./testfiles/assignHardcodedId.json");
import {HardcodedIds} from "../../main/rules/HardcodedIds";

describe("When there are any hardcoded ids",async function () {
    let mainFlow;

    before("arrange",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : assignHardcodedId,
        });
    });
    it("they are flagged correctly", async function () {

        // ACT
        const nodesWithHardcodedIds = new HardcodedIds().execute(mainFlow);

        // ASSERT
        assert.strictEqual(nodesWithHardcodedIds.length,1);
    });
});