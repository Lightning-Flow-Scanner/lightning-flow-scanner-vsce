import Node = require("./Node");

export = class FlowMetadata extends Node{

    constructor(subtype:string, flownumber:number, element:object){

        super(subtype, flownumber, element);
    }

};