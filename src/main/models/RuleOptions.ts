export = class RuleOptions {

    public dmlStatementInLoop;
    public duplicateDMLOperations;
    public hardcodedIds;
    public missingDescription;
    public missingFaultPaths;
    public missingNullHandlers;
    public unconnectedElements;
    public unusedVariables;

    constructor(dmlStatementInLoop, duplicateDMLOperations, hardcodedIds, missingDescription, missingFaultPaths, missingNullHandlers, unconnectedElements, unusedVariables, ){
        this.dmlStatementInLoop = dmlStatementInLoop;
        this.duplicateDMLOperations = duplicateDMLOperations;
        this.hardcodedIds = hardcodedIds;
        this.missingDescription = missingDescription;
        this.missingFaultPaths = missingFaultPaths;
        this.missingNullHandlers = missingNullHandlers;
        this.unconnectedElements = unconnectedElements;
        this.unusedVariables = unusedVariables;
    }

};