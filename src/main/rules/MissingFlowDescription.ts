import {Flow} from "../models/Flow";

export class MissingFlowDescription{

    public execute(flow: Flow) {

        if(flow.xmldata.Flow.description){
            return false;
        } else {
            return true;
        }

    }
}
