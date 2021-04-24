import Node = require("./Node");
import FlowElementConnector = require("./FlowElementConnector");

export = class FlowElement extends Node {

    public connectors = [];
    public name: string;
    public index: number;
    public flowNumber: number;

    constructor(name: string, subtype: string, element: object) {

        super(subtype, element);
        this.name = (subtype === 'start' ? 'flowstart' : name[0]);
        let connectors = this.getConnectors(subtype, element);
        if (connectors.length > 0 && connectors[0] !== undefined) {
            this.connectors = connectors;
        }
    }

    private getConnectors(subtype, element) {

        if (subtype === "start") {
            return [new FlowElementConnector("connector", element.connector, {})];
        } else if (subtype === "decisions") {
            let connectors = [];
            connectors.push(
                new FlowElementConnector("defaultConnector", element.defaultConnector, {})
            );
            for (const rule of element.rules) {
                if (rule.connector) {
                    connectors.push(
                        new FlowElementConnector("connector", rule.connector, {
                            'childName': rule.name[0],
                            'childOf': "rules"
                        })
                    );
                }
            }
            return connectors;
        } else if (subtype === "assignments") {
            return [new FlowElementConnector("connector", element.connector, {})];
        } else if (subtype === "loops") {
            return [
                new FlowElementConnector(
                    "nextValueConnector",
                    element.nextValueConnector,
                    {}
                ),
                new FlowElementConnector(
                    "noMoreValuesConnector",
                    element.noMoreValuesConnector,
                    {}
                ),
            ];
        } else if (subtype === "actionCalls") {
            let connectors = [];
            if(element.connector){
                connectors.push(new FlowElementConnector("connector", element.connector, {}));
            }
            if(element.faultConnector){
                connectors.push(new FlowElementConnector("faultConnector", element.faultConnector, {}));
            }
            return connectors;
        } else if (subtype === "waits") {
            let connectors = [];
            if(element.defaultConnector){
                connectors.push(
                    new FlowElementConnector("defaultConnector", element.defaultConnector, {})
                );
            }
            if(element.faultConnector){
                connectors.push(
                    new FlowElementConnector("faultConnector", element.faultConnector, {})
                );
            }
            for (const waitEvent of element.waitEvents) {
                if (waitEvent.connector) {
                    connectors.push(
                        new FlowElementConnector("connector", waitEvent.connector, {
                            'childName': waitEvent.name[0],
                            'childOf': "rules"
                        })
                    );
                }
            }
            return connectors;
        } else if (subtype === "recordCreates") {
            let connectors = [];
            if(element.connector){
                connectors.push(new FlowElementConnector("connector", element.connector, {}));
            }
            if(element.faultConnector){
                connectors.push(new FlowElementConnector("faultConnector", element.faultConnector, {}));
            }
            return connectors;
        } else if (subtype === "recordDeletes") {
            let connectors = [];
            if(element.connector){
                connectors.push(new FlowElementConnector("connector", element.connector, {}));
            }
            if(element.faultConnector){
                connectors.push(new FlowElementConnector("faultConnector", element.faultConnector, {}));
            }
            return connectors;
        } else if (subtype === "recordLookups") {
            let connectors = [];
            if(element.connector){
                connectors.push(new FlowElementConnector("connector", element.connector, {}));
            }
            if(element.faultConnector){
                connectors.push(new FlowElementConnector("faultConnector", element.faultConnector, {}));
            }
            return connectors;
        } else if (subtype === "recordUpdates") {
            let connectors = [];
            if(element.connector){
                connectors.push(new FlowElementConnector("connector", element.connector, {}));
            }
            if(element.faultConnector){
                connectors.push(new FlowElementConnector("faultConnector", element.faultConnector, {}));
            }
            return connectors;
        } else if (subtype === "subflows") {
            return [new FlowElementConnector("connector", element.connector, {})];
        }
        return [];
    }

    public setConnectors(connectors) {
        // todo use setter
        this.connectors = connectors;
        for (let connector of connectors) {
            if (connector.childOf === undefined) {
                this.element[connector.type] = connector.element;
            } else if (connector.childName !== undefined) {
                let connectorToReplace = this.element[connector.childOf].find((c) => {
                    return connector.childName === c.name[0];
                });
                connectorToReplace.connector = connector.element;
            }
        }
    }
};