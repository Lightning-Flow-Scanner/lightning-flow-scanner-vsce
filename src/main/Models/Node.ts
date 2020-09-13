export = class Node{

    public subtype:string;
    public element:object = {};

    constructor(subtype:string, element:object){

        this.element = element;
        this.subtype = subtype;
    }

};