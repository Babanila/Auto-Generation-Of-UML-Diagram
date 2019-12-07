import React from "react";
import styled from "@emotion/styled";
import * as go from "gojs";
import { ToolManager, Diagram } from "gojs";
import { GojsDiagram, ModelChangeEventType } from "react-gojs";
import Button from "./Button";
import { getRandomColor } from "../Helpers/ColorHelper";

const GojsDiagramStyles = styled(GojsDiagram)`
    width: 70%;
    height: 500px;
    flex: 1 1 auto;
    margin: auto;
`;

class UMLDiagram extends React.Component {
    nodeId = 0;

    constructor(props) {
        super(props);
        this.state = {
            selectedNodeKeys: [],
            model: {
                nodeDataArray: [
                    { key: "Alpha", label: "Alpha", color: "lightblue" },
                    { key: "Beta", label: "Beta", color: "yellow" },
                    { key: "Gamma", label: "Gamma", color: "lightgreen" },
                    { key: "Delta", label: "Delta", color: "pink" },
                    { key: "Omega", label: "Omega", color: "grey" },
                ],
                linkDataArray: [
                    { from: "Alpha", to: "Beta" },
                    { from: "Gamma", to: "Beta" },
                    { from: "Beta", to: "Delta" },
                    { from: "Gamma", to: "Omega" },
                ],
            },
        };
    }

    render() {
        return [
            <Button key="operationButtons" />,
            <GojsDiagramStyles
                key="gojsDiagram"
                diagramId="myDiagramDiv"
                model={this.state.model}
                createDiagram={this.createDiagram}
                className="myDiagram"
                onModelChange={this.modelChangeHandler}
            />,
        ];
    }

    createDiagram = diagramId => {
        const $ = go.GraphObject.make;

        const myDiagram = $(go.Diagram, diagramId, {
            initialContentAlignment: go.Spot.LeftCenter,
        });

        myDiagram.nodeTemplate = $(
            go.Node,
            "Auto",
            $(go.Shape, "RoundedRectangle", { strokeWidth: 0 }, new go.Binding("fill", "color")),
            $(go.TextBlock, { margin: 8 }, new go.Binding("text", "key"))
        );

        return myDiagram;
    };

    /*
    createDiagram = diagramId => {
        const $ = go.GraphObject.make;

        const myDiagram = $(go.Diagram, diagramId, {
            initialContentAlignment: go.Spot.LeftCenter,
            layout: $(go.TreeLayout, {
                angle: 0,
                arrangement: go.TreeLayout.ArrangementVertical,
                treeStyle: go.TreeLayout.StyleLayered,
            }),
            isReadOnly: false,
            allowHorizontalScroll: true,
            allowVerticalScroll: true,
            allowZoom: false,
            allowSelect: true,
            autoScale: Diagram.Uniform,
            contentAlignment: go.Spot.LeftCenter,
            TextEdited: this.onTextEdited,
        });

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        myDiagram.nodeTemplate = $(
            go.Node,
            "Auto",
            {
                selectionChanged: node => this.nodeSelectionHandler(node.key, node.isSelected),
            },
            $(go.Shape, "RoundedRectangle", { strokeWidth: 0 }, new go.Binding("fill", "color")),
            $(go.TextBlock, { margin: 8, editable: true }, new go.Binding("text", "label"))
        );

        return myDiagram;
    };

    */

    modelChangeHandler = event => {
        switch (event.eventType) {
            case ModelChangeEventType.Remove:
                if (event.nodeData) {
                    this.removeNode(event.nodeData.key);
                }
                if (event.linkData) {
                    this.removeLink(event.linkData);
                }
                break;
            default:
                break;
        }
    };

    addNode = () => {
        const newNodeId = "node" + this.nodeId;
        const linksToAdd = this.state.selectedNodeKeys.map(parent => {
            return { from: parent, to: newNodeId };
        });
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray,
                    { key: newNodeId, label: newNodeId, color: getRandomColor() },
                ],
                linkDataArray:
                    linksToAdd.length > 0
                        ? [...this.state.model.linkDataArray].concat(linksToAdd)
                        : [...this.state.model.linkDataArray],
            },
        });
        this.nodeId += 1;
    };

    removeNode = nodeKey => {
        const nodeToRemoveIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToRemoveIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToRemoveIndex),
                    ...this.state.model.nodeDataArray.slice(nodeToRemoveIndex + 1),
                ],
            },
        });
    };

    removeLink = linKToRemove => {
        const linkToRemoveIndex = this.state.model.linkDataArray.findIndex(
            link => link.from === linKToRemove.from && link.to === linKToRemove.to
        );
        if (linkToRemoveIndex === -1) {
            return;
        }
        return {
            ...this.state,
            model: {
                ...this.state.model,
                linkDataArray: [
                    ...this.state.model.linkDataArray.slice(0, linkToRemoveIndex),
                    ...this.state.model.linkDataArray.slice(linkToRemoveIndex + 1),
                ],
            },
        };
    };

    updateNodeText = (nodeKey, text) => {
        const nodeToUpdateIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToUpdateIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToUpdateIndex),
                    {
                        ...this.state.model.nodeDataArray[nodeToUpdateIndex],
                        label: text,
                    },
                    ...this.state.model.nodeDataArray.slice(nodeToUpdateIndex + 1),
                ],
            },
        });
    };

    nodeSelectionHandler = (nodeKey, isSelected) => {
        if (isSelected) {
            this.setState({
                ...this.state,
                selectedNodeKeys: [...this.state.selectedNodeKeys, nodeKey],
            });
        } else {
            const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(key => key === nodeKey);
            if (nodeIndexToRemove === -1) {
                return;
            }
            this.setState({
                ...this.state,
                selectedNodeKeys: [
                    ...this.state.selectedNodeKeys.slice(0, nodeIndexToRemove),
                    ...this.state.selectedNodeKeys.slice(nodeIndexToRemove + 1),
                ],
            });
        }
    };

    onTextEdited = e => {
        const tb = e.subject;
        if (tb === null) {
            return;
        }
        const node = tb.part;
        if (node instanceof go.Node) {
            this.updateNodeText(node.key, tb.text);
        }
    };
}

export default UMLDiagram;
