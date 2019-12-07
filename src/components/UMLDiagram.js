import React from "react";
import styled from "@emotion/styled";
import * as go from "gojs";
import { ToolManager, Diagram } from "gojs";
import { GojsDiagram, ModelChangeEventType } from "react-gojs";
import Button from "./Button";
import { getRandomColor } from "../Helpers/ColorHelper";

const GojsDiagramStyles = styled(GojsDiagram)`
    width: 90%;
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
                    {
                        key: "Baba",
                        id: 1,
                        name: "Baba",
                        description: "1st test",
                        gender: "male",
                        age: 30,
                        to: "Mama",
                    },
                    {
                        key: "Mama",
                        id: 2,
                        name: "Mama",
                        description: "2nd test",
                        gender: "female",
                        age: 25,
                        to: "",
                    },
                    {
                        key: "Daughter",
                        id: 3,
                        name: "Daughter",
                        description: "3nd test",
                        gender: "female",
                        age: 10,
                        to: "",
                    },
                    {
                        key: "Son",
                        id: 4,
                        name: "Son",
                        description: "4nd test",
                        gender: "male",
                        age: 8,
                        to: "",
                    },
                    {
                        key: "GrandChild",
                        id: 5,
                        name: "GrandChild",
                        description: "4nd test for baba",
                        gender: "male",
                        age: 3,
                        to: "",
                    },
                ],
                linkDataArray: [
                    { from: "Baba", to: "Mama" },
                    { from: "Mama", to: "Daughter" },
                    { from: "Mama", to: "Son" },
                    { from: "Daughter", to: "GrandChild" },
                    { from: "Son", to: "GrandChild" },
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
            layout: $(go.TreeLayout, {
                angle: 0,
                arrangement: go.TreeLayout.ArrangementVertical,
                treeStyle: go.TreeLayout.StyleLayered,
            }),

            isReadOnly: false,
            allowHorizontalScroll: true,
            allowSelect: true,
            autoScale: Diagram.Uniform,
            contentAlignment: go.Spot.LeftCenter,
        });

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        myDiagram.nodeTemplate = $(
            go.Node,
            "Auto",
            {
                selectionChanged: node => this.nodeSelectionHandler(node.key, node.isSelected),
            },
            $(go.Shape, "Rectangle", { fill: "white", stroke: "black", strokeWidth: 2 }),
            $(
                go.Panel,
                "Table",
                $(
                    go.TextBlock,
                    "alignment: Center",
                    {
                        row: 0,
                        column: 0,
                        columnSpan: 4,
                        margin: 3,
                        font: "bold 15pt sans-serif",
                    },
                    new go.Binding("text", "name")
                ),
                // Horizontal line before row 1:
                $(go.RowColumnDefinition, {
                    row: 1,
                    column: 0,
                    separatorStrokeWidth: 1.5,
                    separatorStroke: "black",
                }),

                $(go.TextBlock, "id :", { row: 1, column: 0, margin: 2, editable: true }),
                $(go.TextBlock, { row: 1, column: 1, margin: 2, editable: true }, new go.Binding("text", "id")),
                $(go.TextBlock, "name :", { row: 2, column: 0, margin: 2, editable: true }),
                $(go.TextBlock, { row: 2, column: 1, margin: 2, editable: true }, new go.Binding("text", "name")),
                $(go.TextBlock, "description :", { row: 3, column: 0, margin: 2, editable: true }),
                $(
                    go.TextBlock,
                    { row: 3, column: 1, margin: 2, editable: true },
                    new go.Binding("text", "description")
                ),
                $(go.TextBlock, "gender :", { row: 4, column: 0, margin: 2, editable: true }),
                $(go.TextBlock, { row: 4, column: 1, margin: 2, editable: true }, new go.Binding("text", "gender")),
                $(go.TextBlock, "age :", { row: 5, column: 0, margin: 2, editable: true }),
                $(go.TextBlock, { row: 5, column: 1, margin: 2, editable: true }, new go.Binding("text", "age"))
            )
        );

        return myDiagram;
    };

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
