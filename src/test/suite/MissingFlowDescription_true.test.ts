import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import MissingFaultPaths = require("./testfiles/MissingFaultPaths.json");
import {MissingFlowDescription} from "../../main/rules/MissingFlowDescription";

describe("When there is no flow description", async function () {
    let flow;

    before("arrange", async function () {

        // ARRANGE
        flow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata: MissingFaultPaths,
            detail: 'anypath'
        });
    });
    it("this is flagged correctly", async function () {

        // ACT
        const missingFlowDescription = new MissingFlowDescription().execute(flow);

        // ASSERT
        assert.strictEqual(missingFlowDescription, true);
    });
});