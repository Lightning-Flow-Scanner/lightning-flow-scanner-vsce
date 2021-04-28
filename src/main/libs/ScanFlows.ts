import Flow = require("../models/Flow");
import {FindUnusedElements} from "../rules/FindUnusedElements";
import {FindUnusedVariables} from "../rules/FindUnusedVariables";
import {FindHardcodedIds} from "../rules/FindHardcodedIds";

export class ScanFlows{

    public execute(flows : Flow[]) {

        for (const flow of flows){
            new FindUnusedVariables().execute(flow);
            new FindUnusedElements().execute(flow);
            new FindHardcodedIds().execute(flow);
        }
    }
}