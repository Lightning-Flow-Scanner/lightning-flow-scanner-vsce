import Flow = require("../models/Flow");
import {UnconnectedElements} from "../rules/UnconnectedElements";
import {UnusedVariables} from "../rules/UnusedVariables";
import {HardcodedIds} from "../rules/HardcodedIds";
import {DMLStatementInLoop} from "../rules/DMLStatementInLoop";
import {MissingFaultPath} from "../rules/MissingFaultPath";

export class ScanFlows{

    public execute(flows : Flow[], options) {

        for (const flow of flows){
            if(options.dmlStatementInLoop){
                flow.dmlStatementInLoop = [];
                // flow.dmlStatementInLoop = new DMLStatementInLoop().execute(flow);
            }
            if(options.hardcodedIds){
                flow.nodesWithHardcodedIds = new HardcodedIds().execute(flow);
            }
            if(options.missingFaultPaths){
                flow.missingFaultPaths = new MissingFaultPath().execute(flow);
            }
            if(options.unconnectedElements){
                flow.unconnectedElements = new UnconnectedElements().execute(flow);
            }
            if(options.unusedVariables){
                flow.unusedVariables = new UnusedVariables().execute(flow);
            }
        }
    }
}