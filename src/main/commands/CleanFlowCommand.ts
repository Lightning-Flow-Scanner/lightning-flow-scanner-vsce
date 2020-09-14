import { CleanFlow } from "../libs/CleanFlow";
import {SelectAFlow} from "../libs/SelectAFlow";
import { BaseCommand } from "./BaseCommand";

export class CleanFlowCommand extends BaseCommand{

    constructor(
    ) {
        super()
    }

    public async execute() {
        const cleanedFlow = await new SelectAFlow('Select a Flow to clean:', true).execute(this.getRootPath());
    }

}