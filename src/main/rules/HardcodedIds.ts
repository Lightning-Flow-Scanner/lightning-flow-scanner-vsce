import {Flow} from "../models/Flow";
import * as IdPrefixes from '../data/IdPrefixes.json'

export class HardcodedIds{

    public execute(flow : Flow) {
        const prefixes = IdPrefixes.ids.map(prefix => {
            return prefix['Key Prefix'];
        });
        const nodesWithHardcodedIds = [];
        let customPrefixes = new Array(100);
        for(let i = 0; i < customPrefixes.length; i++){
            let prefix = ("" + i).length === 1 ? 'a0' + String(i) :'a' + String(i) ;
            prefixes.push(prefix);
        }
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
        return nodesWithHardcodedIds;
    }
}
