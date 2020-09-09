export = class Node{

    public subtype:string;
    public element:object = {};
    public flownumber: number;

    constructor(subtype:string, flownumber:number, element:object){

        this.flownumber = flownumber;
        this.element = element;
        this.subtype = subtype;
    }

};