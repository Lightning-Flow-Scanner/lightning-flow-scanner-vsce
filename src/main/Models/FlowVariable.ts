import Node = require("./Node");

export = class FlowVariable extends Node{

        public name:string;

        constructor(name:string, subtype:string, flownumber:number, element:object){
    
            super(subtype, flownumber, element);
            this.name = name[0];
        }

};