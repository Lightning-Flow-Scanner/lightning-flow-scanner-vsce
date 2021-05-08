export = class RuleOptions {

    public dmlStatementInLoop;
    public duplicateDMLOperations;
    public hardcodedIds;
    public missingFaultPaths;
    public unconnectedElements;
    public unusedVariables;

    constructor(dmlStatementInLoop, duplicateDMLOperations, hardcodedIds, missingFaultPaths, unconnectedElements, unusedVariables, ){
        this.dmlStatementInLoop = dmlStatementInLoop;
        this.duplicateDMLOperations = duplicateDMLOperations;
        this.hardcodedIds = hardcodedIds;
        this.missingFaultPaths = missingFaultPaths;
        this.unconnectedElements = unconnectedElements;
        this.unusedVariables = unusedVariables;
    }

};