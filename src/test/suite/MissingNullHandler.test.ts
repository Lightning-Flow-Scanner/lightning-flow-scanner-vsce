import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import withDescription = require("./testfiles/withDescription.json");
import {MissingFlowDescription} from "../../main/rules/MissingFlowDescription";
import {MissingNullHandler} from "../../main/rules/MissingNullHandler";

describe("When there no null handler after get operations",async function () {
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
    it("this is flagged correctly", async function () {

        // ACT
        const missingNullHandlers = new MissingNullHandler().execute(flow);

        // ASSERT
        assert.strictEqual(missingNullHandlers.length, 1);
    });
});