export = class FlowElementConnector{

    public type:string;
    public flownumber:number;
    public element:object = {};
    public processed = false;
    public alias:string;
    public reference:string;
    public childName:string;
    public childOf:string;

    constructor(type:string, flownumber:number, element:object, args){
        this.type = type;
        this.flownumber = flownumber;
        this.element = element;
        this.childName = args.childName ? args.childName : undefined;
        this.childOf = args.childOf ? args.childOf : undefined;
        this.alias = !this.childName ? this.type : (this.childName + ' ' + this.type);
        
        if(element && element[0] && element[0].targetReference && element[0].targetReference[0]){
            this.reference = element[0].targetReference[0];
        }
    }
};