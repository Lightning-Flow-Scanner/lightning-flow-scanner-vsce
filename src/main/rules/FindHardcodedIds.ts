import Flow = require("../models/Flow");
import * as IdPrefixes from '../data/IdPrefixes.json'

export class FindHardcodedIds {

    public execute(flow: Flow) {

        const prefixes = IdPrefixes.ids.map(prefix => {
            return prefix['Key Prefix'];
        });
        const nodesWithHardcodedIds = [];

        for(const prefix of prefixes){
            const match18charIds: RegExp = new RegExp('\\b'+ prefix + '\\w{15}\\b');
            const match15charIds: RegExp = new RegExp('\\b'+ prefix + '\\w{12}\\b');

            for(const node of flow.nodes){
                let nodeString = JSON.stringify(node);
                let hardcodedIdsL18 = nodeString.match(match18charIds);
                let hardcodedIdsL15 = nodeString.match(match15charIds);

                if(hardcodedIdsL15 || hardcodedIdsL18){
                    nodesWithHardcodedIds.push(node);
                }
            }
        }
        if(nodesWithHardcodedIds && nodesWithHardcodedIds.length > 0){
            flow.nodesWithHardcodedIds = nodesWithHardcodedIds
        }
    }
}