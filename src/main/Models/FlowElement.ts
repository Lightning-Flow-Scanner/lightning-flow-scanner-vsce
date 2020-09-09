import Node = require("./Node");
import FlowElementConnector = require("./FlowElementConnector");

export = class FlowElement extends Node {

    public connectors = [];
    public name: string;

    constructor(name: string, subtype: string, flownumber: number, element: object) {

        super(subtype, flownumber, element);
        this.name = (subtype === 'start' ? 'flowstart' : name[0]);
        let connectors = this.getConnectors(subtype, flownumber, element);
        if (connectors.length > 0 && connectors[0] !== undefined) {
            this.connectors = connectors;
        }
    }

    private getConnectors(subtype, flownumber, element) {

        if (subtype === "start") {
            return [new FlowElementConnector("connector", flownumber, element.connector, {})];
        } else if (subtype === "decisions") {
            let connectors = [];
            connectors.push(
                new FlowElementConnector("defaultConnector", flownumber, element.defaultConnector, {})
            );
            for (const rule of element.rules) {
                if (rule.connector) {
                    connectors.push(
                        new FlowElementConnector("connector", flownumber, rule.connector, {
                            'childName': rule.name[0],
                            'childOf': "rules"
                        })
                    );
                }
            }
            return connectors;
        } else if (subtype === "assignments") {
            return [new FlowElementConnector("connector", flownumber, element.connector, {})];
        } else if (subtype === "loops") {
            return [
                new FlowElementConnector(
                    "nextValueConnector",
                    flownumber,
                    element.nextValueConnector,
                    {}
                ),
                new FlowElementConnector(
                    "noMoreValuesConnector",
                    flownumber,
                    element.noMoreValuesConnector,
                    {}
                ),
            ];
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