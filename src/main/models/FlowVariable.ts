import Node = require("./Node");

export = class FlowVariable extends Node{

        public name:string;

        constructor(name:string, subtype:string, element:object){
    
            super(subtype, element);
            this.name = name[0];
        }

};