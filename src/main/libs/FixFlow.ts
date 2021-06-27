import { Flow } from "flowhealthcheck--core/out/main/models/Flow";
import { FlowVariable } from "flowhealthcheck--core/out/main/models/FlowVariable";
import { FlowElement } from "flowhealthcheck--core/out/main/models/FlowElement";

export class FixFlow {

    constructor() {

    }

    public execute(flow: Flow) {

        const unusedVariableReferences = flow.unusedVariables.map(unusedVariable => unusedVariable.name);
        const unconnectedElementsReferences = flow.unconnectedElements.map(unconnectedElement => unconnectedElement.name);
        const nodesToBuild = flow.nodes.filter(node => {
                switch (node.nodeType) {
                    case 'variable':
                        let nodeVar = node as FlowVariable;
                        if (!unusedVariableReferences.includes(nodeVar.name)) {
                            return node;
                        }
                        break;
                    case 'element':
                        let nodeElement = node as FlowElement;
                        if (!unconnectedElementsReferences.includes(nodeElement.name)) {
                            return node;
                        }
                        break;
                    case 'metadata':
                        return node;
                }
            }
        );
        return this.buildFlow(nodesToBuild);
    }

    private buildFlow(nodesToMerge) {
        let res = {};
        for (const nodeToMerge of nodesToMerge) {
            let subtype = nodeToMerge.subtype;
            const nodesOfType = nodesToMerge.filter(node => subtype === node.subtype);
            res = this.convertFlowNodes(res, nodesOfType, subtype);
        }
        return {'Flow': res};

        // return {
        //     'Flow': {
        //         $: root,
        //     }
        // };

    }

    private convertFlowNodes(obj, nodes, key) {
        obj[key] = nodes.map(node => node.element);
        return obj;
    };

}
