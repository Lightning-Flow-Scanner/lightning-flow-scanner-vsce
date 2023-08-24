export var singleresult = { "flow": { "flowVariables": ["choices", "constants", "dynamicChoiceSets", "formulas", "stages", "textTemplates", "variables"], "flowMetadata": ["description", "apiVersion", "processMetadataValues", "processType", "interviewLabel", "label", "status", "runInMode", "startElementReference", "isTemplate", "fullName"], "flowNodes": ["actionCalls", "apexPluginCalls", "assignments", "collectionProcessors", "decisions", "loops", "recordCreates", "recordDeletes", "recordLookups", "recordUpdates", "recordRollbacks", "screens", "start", "steps", "subflows", "waits"], "uri": { "scheme": "file", "authority": "", "path": "/Users/rubenhalman/IdeaProjects/flowscannercore/lightning-flow-scanner-example-flows/force-app/main/default/flows/api58test.flow", "query": "", "fragment": "", "_formatted": null, "_fsPath": "/Users/rubenhalman/IdeaProjects/flowscannercore/lightning-flow-scanner-example-flows/force-app/main/default/flows/api58test.flow" }, "path": "/Users/rubenhalman/IdeaProjects/flowscannercore/lightning-flow-scanner-example-flows/force-app/main/default/flows/api58test.flow", "name": "api58test", "xmldata": { "$": { "xmlns": "http://soap.sforce.com/2006/04/metadata" }, "apiVersion": ["58.0"], "collectionProcessors": [{ "name": ["filter_test_accounts"], "elementSubtype": ["FilterCollectionProcessor"], "label": ["filter test accounts"], "locationX": ["176"], "locationY": ["134"], "assignNextValueToReference": ["currentItem_af_0"], "collectionProcessorType": ["FilterCollectionProcessor"], "collectionReference": ["c"], "conditionLogic": ["and"], "conditions": [{ "leftValueReference": ["currentItem_af_0.Name"], "operator": ["Contains"], "rightValue": [{ "stringValue": ["test"] }] }], "connector": [{ "targetReference": ["sort_acc"] }] }, { "name": ["sort_acc"], "elementSubtype": ["SortCollectionProcessor"], "label": ["sort acc"], "locationX": ["176"], "locationY": ["242"], "collectionProcessorType": ["SortCollectionProcessor"], "collectionReference": ["filter_test_accounts"], "connector": [{ "targetReference": ["rb"] }], "sortOptions": [{ "doesPutEmptyStringAndNullFirst": ["false"], "sortField": ["AccountNumber"], "sortOrder": ["Asc"] }] }], "environments": ["Default"], "interviewLabel": ["api58test {!$Flow.CurrentDateTime}"], "label": ["api58test"], "processMetadataValues": [{ "name": ["BuilderType"], "value": [{ "stringValue": ["LightningFlowBuilder"] }] }, { "name": ["CanvasMode"], "value": [{ "stringValue": ["AUTO_LAYOUT_CANVAS"] }] }, { "name": ["OriginBuilderType"], "value": [{ "stringValue": ["LightningFlowBuilder"] }] }], "processType": ["Flow"], "recordRollbacks": [{ "name": ["rb"], "label": ["rb"], "locationX": ["176"], "locationY": ["350"], "connector": [{ "targetReference": ["aa"] }] }], "screens": [{ "name": ["aa"], "label": ["aa"], "locationX": ["176"], "locationY": ["458"], "allowBack": ["true"], "allowFinish": ["true"], "allowPause": ["true"], "fields": [{ "name": ["bb"], "dataTypeMappings": [{ "typeName": ["T"], "typeValue": ["Account"] }], "extensionName": ["flowruntime:datatable"], "fieldType": ["ComponentInstance"], "inputParameters": [{ "name": ["label"], "value": [{ "stringValue": ["Data Table"] }] }, { "name": ["selectionMode"], "value": [{ "stringValue": ["MULTI_SELECT"] }] }, { "name": ["minRowSelection"], "value": [{ "numberValue": ["0.0"] }] }, { "name": ["tableData"], "value": [{ "elementReference": ["filter_test_accounts"] }] }, { "name": ["columns"], "value": [{ "stringValue": ["[{\"apiName\":\"AccountNumber\",\"guid\":\"column-8e94\",\"editable\":false,\"hasCustomHeaderLabel\":false,\"customHeaderLabel\":\"\",\"wrapText\":true,\"order\":0,\"label\":\"Account Number\",\"type\":\"text\"}]"] }] }], "inputsOnNextNavToAssocScrn": ["UseStoredValues"], "isRequired": ["true"], "storeOutputAutomatically": ["true"] }], "showFooter": ["true"], "showHeader": ["true"] }], "start": [{ "locationX": ["50"], "locationY": ["0"], "connector": [{ "targetReference": ["filter_test_accounts"] }] }], "status": ["Active"], "variables": [{ "name": ["c"], "dataType": ["SObject"], "isCollection": ["true"], "isInput": ["true"], "isOutput": ["false"], "objectType": ["Account"] }, { "name": ["currentItem_af_0"], "dataType": ["SObject"], "isCollection": ["false"], "isInput": ["false"], "isOutput": ["false"], "objectType": ["Account"] }] }, "label": ["api58test"], "interviewLabel": ["api58test {!$Flow.CurrentDateTime}"], "processType": ["Flow"], "processMetadataValues": [{ "name": ["BuilderType"], "value": [{ "stringValue": ["LightningFlowBuilder"] }] }, { "name": ["CanvasMode"], "value": [{ "stringValue": ["AUTO_LAYOUT_CANVAS"] }] }, { "name": ["OriginBuilderType"], "value": [{ "stringValue": ["LightningFlowBuilder"] }] }], "status": ["Active"], "start": [{ "locationX": ["50"], "locationY": ["0"], "connector": [{ "targetReference": ["filter_test_accounts"] }] }], "type": ["Flow"], "root": { "xmlns": "http://soap.sforce.com/2006/04/metadata" }, "nodes": [{ "element": "58.0", "subtype": "apiVersion", "nodeType": "metadata" }, { "element": { "name": ["filter_test_accounts"], "elementSubtype": ["FilterCollectionProcessor"], "label": ["filter test accounts"], "locationX": ["176"], "locationY": ["134"], "assignNextValueToReference": ["currentItem_af_0"], "collectionProcessorType": ["FilterCollectionProcessor"], "collectionReference": ["c"], "conditionLogic": ["and"], "conditions": [{ "leftValueReference": ["currentItem_af_0.Name"], "operator": ["Contains"], "rightValue": [{ "stringValue": ["test"] }] }], "connector": [{ "targetReference": ["sort_acc"] }] }, "subtype": "collectionProcessors", "nodeType": "element", "connectors": [{ "element": [{ "targetReference": ["sort_acc"] }], "processed": false, "type": "connector", "reference": "sort_acc" }], "name": "filter_test_accounts" }, { "element": { "name": ["sort_acc"], "elementSubtype": ["SortCollectionProcessor"], "label": ["sort acc"], "locationX": ["176"], "locationY": ["242"], "collectionProcessorType": ["SortCollectionProcessor"], "collectionReference": ["filter_test_accounts"], "connector": [{ "targetReference": ["rb"] }], "sortOptions": [{ "doesPutEmptyStringAndNullFirst": ["false"], "sortField": ["AccountNumber"], "sortOrder": ["Asc"] }] }, "subtype": "collectionProcessors", "nodeType": "element", "connectors": [{ "element": [{ "targetReference": ["rb"] }], "processed": false, "type": "connector", "reference": "rb" }], "name": "sort_acc" }, { "element": "api58test {!$Flow.CurrentDateTime}", "subtype": "interviewLabel", "nodeType": "metadata" }, { "element": "api58test", "subtype": "label", "nodeType": "metadata" }, { "element": { "name": ["BuilderType"], "value": [{ "stringValue": ["LightningFlowBuilder"] }] }, "subtype": "processMetadataValues", "nodeType": "metadata" }, { "element": { "name": ["CanvasMode"], "value": [{ "stringValue": ["AUTO_LAYOUT_CANVAS"] }] }, "subtype": "processMetadataValues", "nodeType": "metadata" }, { "element": { "name": ["OriginBuilderType"], "value": [{ "stringValue": ["LightningFlowBuilder"] }] }, "subtype": "processMetadataValues", "nodeType": "metadata" }, { "element": "Flow", "subtype": "processType", "nodeType": "metadata" }, { "element": { "name": ["rb"], "label": ["rb"], "locationX": ["176"], "locationY": ["350"], "connector": [{ "targetReference": ["aa"] }] }, "subtype": "recordRollbacks", "nodeType": "element", "connectors": [{ "element": [{ "targetReference": ["aa"] }], "processed": false, "type": "connector", "reference": "aa" }], "name": "rb" }, { "element": { "name": ["aa"], "label": ["aa"], "locationX": ["176"], "locationY": ["458"], "allowBack": ["true"], "allowFinish": ["true"], "allowPause": ["true"], "fields": [{ "name": ["bb"], "dataTypeMappings": [{ "typeName": ["T"], "typeValue": ["Account"] }], "extensionName": ["flowruntime:datatable"], "fieldType": ["ComponentInstance"], "inputParameters": [{ "name": ["label"], "value": [{ "stringValue": ["Data Table"] }] }, { "name": ["selectionMode"], "value": [{ "stringValue": ["MULTI_SELECT"] }] }, { "name": ["minRowSelection"], "value": [{ "numberValue": ["0.0"] }] }, { "name": ["tableData"], "value": [{ "elementReference": ["filter_test_accounts"] }] }, { "name": ["columns"], "value": [{ "stringValue": ["[{\"apiName\":\"AccountNumber\",\"guid\":\"column-8e94\",\"editable\":false,\"hasCustomHeaderLabel\":false,\"customHeaderLabel\":\"\",\"wrapText\":true,\"order\":0,\"label\":\"Account Number\",\"type\":\"text\"}]"] }] }], "inputsOnNextNavToAssocScrn": ["UseStoredValues"], "isRequired": ["true"], "storeOutputAutomatically": ["true"] }], "showFooter": ["true"], "showHeader": ["true"] }, "subtype": "screens", "nodeType": "element", "connectors": [{ "processed": false, "type": "connector" }], "name": "aa" }, { "element": { "locationX": ["50"], "locationY": ["0"], "connector": [{ "targetReference": ["filter_test_accounts"] }] }, "subtype": "start", "nodeType": "element", "connectors": [{ "element": [{ "targetReference": ["filter_test_accounts"] }], "processed": false, "type": "connector", "reference": "filter_test_accounts" }], "name": "flowstart" }, { "element": "Active", "subtype": "status", "nodeType": "metadata" }, { "element": { "name": ["c"], "dataType": ["SObject"], "isCollection": ["true"], "isInput": ["true"], "isOutput": ["false"], "objectType": ["Account"] }, "subtype": "variables", "nodeType": "variable", "name": "c" }, { "element": { "name": ["currentItem_af_0"], "dataType": ["SObject"], "isCollection": ["false"], "isInput": ["false"], "isOutput": ["false"], "objectType": ["Account"] }, "subtype": "variables", "nodeType": "variable", "name": "currentItem_af_0" }] }, "ruleResults": [{ "ruleName": "APIVersion", "ruleDescription": "Newer API components may cause older versions of Flows to start behaving incorrectly due to differences in the underlying mechanics. The Api Version has been available as an attribute on the Flow since API v50.0 and it is recommended to limit variation and to update them on a regular basis.", "ruleLabel": "Old API version", "supportedFlowTypes": ["Appointments", "AutoLaunchedFlow", "ContactRequestFlow", "CustomerLifecycle", "CustomEvent", "LoyaltyManagementFlow", "FSCLending", "FSCLending", "FieldServiceMobile", "FieldServiceWeb", "Flow", "InvocableProcess", "Survey", "SurveyEnrich", "Workflow"], "severity": "error", "type": "flow", "occurs": false }, { "ruleName": "CopyOf", "ruleDescription": "Having multiple elements called Copy_X_Of_Element will decrease the readability of the Flow. If you copy and paste them, make sure to update the API name of the new copy.", "ruleLabel": "Copy Of API Name", "supportedFlowTypes": ["Appointments", "AutoLaunchedFlow", "ContactRequestFlow", "CustomerLifecycle", "CustomEvent", "LoyaltyManagementFlow", "FSCLending", "FSCLending", "FieldServiceMobile", "FieldServiceWeb", "Flow", "InvocableProcess", "Survey", "SurveyEnrich", "Workflow"], "severity": "error", "type": "pattern", "occurs": false, "details": [] }, { "ruleName": "DMLStatementInLoop", "ruleDescription": "To avoid hitting Apex governor limits, we recommend grouping all of your database changes together at the end of the flow, whether those changes create, update, or delete records.", "ruleLabel": "DML statements in a loop", "supportedFlowTypes": ["AutoLaunchedFlow", "CustomEvent", "InvocableProcess", "Flow", "Appointments", "ContactRequestFlow", "ContactRequestFlow", "FieldServiceMobile", "FieldServiceWeb", "Survey", "SurveyEnrich"], "severity": "error", "type": "pattern", "occurs": false, "details": [] }, { "ruleName": "DuplicateDMLOperations", "ruleDescription": "If the flow commits changes to the database or performs actions between two screens, don't let users navigate back between screen. Otherwise, the flow may perform duplicate database operations.", "ruleLabel": "Duplicate DML operations", "supportedFlowTypes": ["Flow", "Appointments", "ContactRequestFlow", "ContactRequestFlow", "FieldServiceMobile", "FieldServiceWeb", "Survey", "SurveyEnrich"], "severity": "error", "type": "pattern", "occurs": false, "details": [] }, { "ruleName": "FlowDescription", "ruleDescription": "Descriptions are useful for documentation purposes. It is recommended to provide information about where it is used and what it will do.", "ruleLabel": "Missing flow description", "supportedFlowTypes": ["Appointments", "AutoLaunchedFlow", "ContactRequestFlow", "CustomerLifecycle", "CustomEvent", "LoyaltyManagementFlow", "FSCLending", "FSCLending", "FieldServiceMobile", "FieldServiceWeb", "Flow", "InvocableProcess", "Survey", "SurveyEnrich", "Workflow"], "severity": "error", "type": "flow", "occurs": true, "details": "undefined" }, { "ruleName": "FlowName", "ruleDescription": "Readability of a flow is very important. Setting a naming convention for the Flow Name will improve the findability/searchability and overall consistency. It is recommended to at least provide a domain and a short description of the actions undertaken in the flow, in example Service_OrderFulfillment.", "ruleLabel": "Flow Naming Convention", "supportedFlowTypes": ["Appointments", "AutoLaunchedFlow", "ContactRequestFlow", "CustomerLifecycle", "CustomEvent", "LoyaltyManagementFlow", "FSCLending", "FSCLending", "FieldServiceMobile", "FieldServiceWeb", "Flow", "InvocableProcess", "Survey", "SurveyEnrich", "Workflow"], "severity": "error", "type": "flow", "occurs": true, "details": "The name api58test does not meet the regex convention [A-Za-z0-9]+_[A-Za-z0-9]+" }, { "ruleName": "HardcodedIds", "ruleDescription": "IDs are org-specific, so don’t hard-code IDs. Instead, pass them into variables when the flow starts. You can do so, for example, by using merge fields in URL parameters or by using a Get Records element.", "ruleLabel": "Hardcoded Ids", "supportedFlowTypes": ["Appointments", "AutoLaunchedFlow", "ContactRequestFlow", "CustomerLifecycle", "CustomEvent", "LoyaltyManagementFlow", "FSCLending", "FSCLending", "FieldServiceMobile", "FieldServiceWeb", "Flow", "InvocableProcess", "Survey", "SurveyEnrich", "Workflow"], "severity": "error", "type": "pattern", "occurs": false, "details": [] }, { "ruleName": "MissingFaultPath", "ruleDescription": "Sometimes a flow doesn’t perform an operation that you configured it to do. By default, the flow shows an error message to the user and emails the admin who created the flow. However, you can control that behavior.", "ruleLabel": "Missing error handlers", "supportedFlowTypes": ["AutoLaunchedFlow", "CustomEvent", "InvocableProcess", "Flow", "Appointments", "ContactRequestFlow", "ContactRequestFlow", "FieldServiceMobile", "FieldServiceWeb", "Survey", "SurveyEnrich"], "severity": "error", "type": "pattern", "occurs": false, "details": [] }, { "ruleName": "MissingNullHandler", "ruleDescription": "If a Get Records operation does not find any data it will return null. Use a decision element on the operation result variable to validate that the result is not null.", "ruleLabel": "Missing null handlers", "supportedFlowTypes": ["AutoLaunchedFlow", "CustomEvent", "InvocableProcess", "Flow", "Appointments", "ContactRequestFlow", "ContactRequestFlow", "FieldServiceMobile", "FieldServiceWeb", "Survey", "SurveyEnrich"], "severity": "error", "type": "pattern", "occurs": false, "details": [] }, { "ruleName": "UnconnectedElements", "ruleDescription": "Removing unconnected elements which are not being used by the Flow makes your Flow more efficient and maintainable.", "ruleLabel": "Unconnected elements", "supportedFlowTypes": ["AutoLaunchedFlow", "CustomEvent", "InvocableProcess", "Flow", "Appointments", "ContactRequestFlow", "ContactRequestFlow", "FieldServiceMobile", "FieldServiceWeb", "Survey", "SurveyEnrich"], "severity": "error", "type": "pattern", "occurs": false, "details": [] }, { "ruleName": "UnusedVariables", "ruleDescription": "Removing unconnected variables which are not being used by the Flow makes your Flow more efficient and maintainable.", "ruleLabel": "Unused variables", "supportedFlowTypes": ["AutoLaunchedFlow", "CustomEvent", "InvocableProcess", "Flow", "Appointments", "ContactRequestFlow", "ContactRequestFlow", "FieldServiceMobile", "FieldServiceWeb", "Survey", "SurveyEnrich"], "severity": "error", "type": "pattern", "occurs": false, "details": [] }], "coverage": 0, "resultCount": 2, "label": "api58test", "type": "Flow" };