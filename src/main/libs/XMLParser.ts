import {Parser} from 'xml2js';

export class XMLParser{

    private parser : Parser;

    constructor(){
        this.parser = new Parser();
    }

    public execute(xml) {
        return new Promise((resolve, reject) => {
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