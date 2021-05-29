import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import withDescription = require("./testfiles/withDescription.json");
import {MissingFlowDescription} from "../../main/rules/MissingFlowDescription";

describe("When there is a flow description",async function () {
    let flow;

    before("arrange",  async function () {

        // ARRANGE
        flow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : withDescription,
            detail: 'anypath'
        });
    });
    it("this is also returning", async function () {

        // ACT
        const missingDescription = new MissingFlowDescription().execute(flow);

        // ASSERT
        assert.strictEqual(missingDescription, false);
    });
});