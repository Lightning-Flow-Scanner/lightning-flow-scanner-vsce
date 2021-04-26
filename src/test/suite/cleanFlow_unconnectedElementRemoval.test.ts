import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import mainwithloosenodes = require("./testfiles/mainwithloosenodes.json");
import {FindUnusedElements} from "../../main/rules/FindUnusedElements";

describe("When there are any unconnected nodes",async function () {
    let mainFlow;

    before("",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : mainwithloosenodes,
            detail: 'anypath'
        });
    });
    it("They should be removed from the new flow result", async function () {

        // ACT
        new FindUnusedElements().execute(mainFlow);

        // ASSERT
        assert.strictEqual(mainFlow.unconnectedElements.length,1);
    });
});