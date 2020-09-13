import "mocha";
import * as assert from "assert";
import Flow = require("../../main/Models/Flow");
import {CleanFlow} from "../../main/libs/CleanFlow";
import mainwithaddvars = require("./testfiles/mainwithloosenodes.json");

describe("When there are any unconnected nodes",async function () {
    let mainFlow;

    before("",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : mainwithaddvars,
            detail: 'anypath'
        });
    });
    it("They should be removed from the new flow result", async function () {

        // ACT
        let result = new CleanFlow().execute(mainFlow);

        // ASSERT
        assert.strictEqual(result.xmldata.Flow.assignments.length,2);
    });
});