import "mocha";
import * as assert from "assert";
import {Flow} from "../../main/models/Flow";
import mainwithloosenodes = require("./testfiles/mainwithloosenodes.json");
import {UnconnectedElements} from "../../main/rules/UnconnectedElements";

describe("When there are any unconnected nodes",async function () {
    let mainFlow;

    before("arrange",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : mainwithloosenodes,
        });
    });
    it("They are flagged correctly", async function () {

        // ACT
        const unconnectedElements = new UnconnectedElements().execute(mainFlow);

        // ASSERT
        assert.strictEqual(unconnectedElements.length,1);
    });
});
