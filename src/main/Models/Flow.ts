export = class Flow{

    public description:string;
    public detail:string;
    public label:string;
    public path:string;
    public flownumber:number;
    public xmldata:JSON;

    constructor(args){

        this.label = args.label;
        this.path = args.path;
        this.detail = args.detail ? args.detail : '';
        this.description = args.description ? args.description : '';
        this.xmldata = args.xmldata;
    }

};