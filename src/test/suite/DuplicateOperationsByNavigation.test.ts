import "mocha";
import * as assert from "assert";
import duplicatechangesbynavigation2 = require("./testfiles/createproperty.json");
import {Flow} from "../../main/models/Flow";
import {DuplicateDMLOperationsByNavigation} from "../../main/rules/DuplicateDMLOperationsByNavigation";

describe("If there are changes made to the database between screens",async function () {
    let flow;

    before("arrange",  async function () {

        // ARRANGE
        flow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : duplicatechangesbynavigation2,
        });
    });
    it("they are flagged as potential duplicate changes ", async function () {

        // ACT
        const duplicateDMLByNavigation = new DuplicateDMLOperationsByNavigation().execute(flow);

        // ASSERT
        assert.strictEqual(duplicateDMLByNavigation.length,3);

    });
});
