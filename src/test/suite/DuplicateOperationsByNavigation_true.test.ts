import "mocha";
import * as assert from "assert";
import duplicatechangesbynavigation = require("./testfiles/duplchangesbynav.json");
import {Flow} from "../../main/models/Flow";
import {DuplicateDMLOperationsByNavigation} from "../../main/rules/DuplicateDMLOperationsByNavigation";

describe("If there are changes made to the database between screens",async function () {
    let flow;

    before("arrange",  async function () {

        // ARRANGE
        flow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : duplicatechangesbynavigation,
        });
    });
    it("they are flagged as potential duplicate changes if there is a previous button available on the last screen", async function () {

        // ACT
        const queriesInLoops = new DuplicateDMLOperationsByNavigation().execute(flow);

        // ASSERT
        assert.strictEqual(queriesInLoops.length,1);

    });
});
