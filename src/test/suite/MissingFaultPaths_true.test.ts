import "mocha";
import * as assert from "assert";
import Flow = require("../../main/models/Flow");
import MissingFaultPaths = require("./testfiles/MissingFaultPaths.json");
import {MissingFaultPath} from "../../main/rules/MissingFaultPath";

describe("When there are any fault paths missing",async function () {
    let flow;

    before("arrange",  async function () {

        // ARRANGE
        flow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : MissingFaultPaths,
            detail: 'anypath'
        });
    });
    it("they are flagged correctly", async function () {

        // ACT
        const missingFaultPaths = new MissingFaultPath().execute(flow);

        // ASSERT
        assert.strictEqual(missingFaultPaths.length,5);
    });
});