import {Parser} from 'xml2js';
const xml2js = require("xml2js");
import {Flow} from "lightning-flow-scanner-core/out";

export class XMLParser{

    private parser : Parser;

    constructor(){
        this.parser = new Parser(xml2js.defaults["0.2"]);
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
