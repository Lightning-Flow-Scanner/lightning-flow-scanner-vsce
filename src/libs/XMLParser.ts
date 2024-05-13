var xml2js = require('xml2js');
import {Flow} from "lightning-flow-scanner-core/out";

export class XMLParser{

    private parser;

    constructor(){
        this.parser = new xml2js.Parser();
    }

    public execute(xml): Promise<{ Flow : Flow }>{
        return new Promise<{ Flow : Flow }>((resolve, reject) => {
            this.parser.parseString(xml, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
