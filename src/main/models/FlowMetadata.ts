import FlowNode = require("./FlowNode");

export = class FlowMetadata extends FlowNode{

    constructor(subtype:string, element:object){
        super('metadata', subtype, element);
    }

};