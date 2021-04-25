import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import {RemoveUnusedElements} from "../../main/libs/RemoveUnusedElements";
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
        new RemoveUnusedElements().execute(mainFlow);

        // ASSERT
        assert.strictEqual(mainFlow.flowElements.length,6);
        assert.strictEqual(mainFlow.flowVariables.length,3);
        assert.strictEqual(mainFlow.unusedVariables.length,1);
    });
});